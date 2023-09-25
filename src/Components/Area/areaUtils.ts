import * as d3 from "d3-scale";
import { TimeSeries } from "./Area";

export function parseTimeSeries<T = any>(
  timeSeries: TimeSeries<T>,
  height: number,
  width: number,
  strokeWidth = 0,
  timestampAccessor: (dataPoint: T) => number,
  valueAccessor: (dataPoint: T) => number
) {
  const { minX, maxX, minY, maxY } = timeSeries.reduce<{
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  }>(
    (minMax, current) => {
      const minX = Math.min(timestampAccessor(current), minMax.minX);
      const maxX = Math.max(timestampAccessor(current), minMax.maxX);
      const minY = Math.min(valueAccessor(current), minMax.minY);
      const maxY = Math.max(valueAccessor(current), minMax.maxY);
      return { minX, maxX, minY, maxY };
    },
    { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity }
  );

  const xScale = d3.scaleUtc(
    [minX, maxX],
    [0 - strokeWidth / 2, width + strokeWidth / 2]
  );
  const yScale = d3.scaleLinear(
    [minY, maxY],
    [0 + strokeWidth / 2, height - strokeWidth / 2]
  );

  const { polygonString, strokePath } = timeSeries.reduce<{
    polygonString: string;
    strokePath: string;
  }>(
    (acc, current) => {
      const x = xScale(timestampAccessor(current));
      const y = height - yScale(valueAccessor(current));
      const coordinates = `${x},${y} `;
      acc.strokePath += `L${x} ${y} `;
      acc.polygonString += coordinates;
      return acc;
    },
    { polygonString: `0,${height} `, strokePath: "" }
  );

  return {
    polygonString: polygonString.concat(`${width},${height}`),
    strokePath: "M".concat(strokePath.slice(1))
  };
}
