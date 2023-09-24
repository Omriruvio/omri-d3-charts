import { TimeSeries } from "./App";
import * as d3 from "d3-scale";

export function parseTimeSeries(
  timeSeries: TimeSeries,
  height: number,
  width: number,
  strokeWidth = 0
) {
  const { minX, maxX, minY, maxY } = timeSeries.reduce<{
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  }>(
    (minMax, current) => {
      const minX = Math.min(current.ts, minMax.minX);
      const maxX = Math.max(current.ts, minMax.maxX);
      const minY = Math.min(current.value, minMax.minY);
      const maxY = Math.max(current.value, minMax.maxY);
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
      const x = xScale(current.ts);
      const y = height - yScale(current.value);
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
