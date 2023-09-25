import { ChartData } from '../../types/global';
import { calcTableMinMaxValues } from '../../utils/globalUtils';
import * as d3 from 'd3-scale';

export function calcAreaConfig<T extends any>({
  data,
  svgViewBoxHeight,
  svgViewBoxWidth,
  strokeWidth,
  xValue,
  yValue,
}: {
  data: ChartData<T>;
  svgViewBoxHeight: number;
  svgViewBoxWidth: number;
  strokeWidth: number;
  xValue: (dataPoint: T) => number;
  yValue: (dataPoint: T) => number;
}) {
  const { minX, maxX, minY, maxY } = calcTableMinMaxValues({
    data: data,
    height: svgViewBoxHeight,
    width: svgViewBoxWidth,
    strokeWidth,
    xAxisAccessor: xValue,
    yAxisAccessor: yValue,
  });

  const xScale = d3.scaleUtc([minX, maxX], [0 - strokeWidth / 2, svgViewBoxWidth + strokeWidth / 2]);
  const yScale = d3.scaleLinear([minY, maxY], [0 + strokeWidth / 2, svgViewBoxHeight - strokeWidth / 2]);

  const polygons = data.reduce<{
    polygonString: string;
    strokePath: string;
  }>(
    (acc, current) => {
      const x = xScale(xValue(current));
      const y = svgViewBoxHeight - yScale(yValue(current));
      const coordinates = `${x},${y} `;
      acc.strokePath += `L${x} ${y} `;
      acc.polygonString += coordinates;
      return acc;
    },
    { polygonString: `0,${svgViewBoxHeight} `, strokePath: '' },
  );

  const polygonString = polygons.polygonString.concat(`${svgViewBoxWidth},${svgViewBoxHeight}`);
  const strokePath = 'M'.concat(polygons.strokePath.slice(1));
  return { polygonString, strokePath };
}

// export function calcProgressConfig<T extends any>({
//   data,
//   svgViewBoxHeight,
//   svgViewBoxWidth,
//   xValue,
//   yValue,
// }: {
//   data: TimeSeries<T>;
//   svgViewBoxHeight: number;
//   svgViewBoxWidth: number;
//   strokeWidth: number;
//   xValue: (dataPoint: T) => number;
//   yValue: (dataPoint: T) => number;
// }) {
//   const { minX, maxX, minY, maxY } = calcTableMinMaxValues({
//     data: data,
//     height: svgViewBoxHeight,
//     width: svgViewBoxWidth,
//     xAxisAccessor: xValue,
//     yAxisAccessor: yValue,
//   });

//   const xScale = d3.scaleUtc([minX, maxX], [0, svgViewBoxWidth]);
//   return { xScale };
// }
