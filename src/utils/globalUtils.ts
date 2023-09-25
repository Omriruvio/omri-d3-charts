import * as d3 from 'd3-scale';
import { ChartData } from '../types/global';
import { CSSProperties } from 'react';

type ParseTimeseriesArgs<T> = {
  data: ChartData<T>;
  height: number;
  width: number;
  xAxisAccessor: (dataPoint: T) => number;
  yAxisAccessor?: (dataPoint: T) => number;
  strokeWidth?: number;
};

export function calcTableMinMaxValues<T>({
  data,
  xAxisAccessor = (d: any) => d.x,
  yAxisAccessor = (d: any) => d.y,
}: ParseTimeseriesArgs<T>) {
  const { minX, maxX, minY, maxY } = data.reduce<{
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  }>(
    (minMax, current) => {
      const xValue = xAxisAccessor(current);
      const yValue = yAxisAccessor(current);
      if (xValue === undefined || yValue === undefined) {
        throw new Error('xValue or yValue is undefined. Please check your accessor functions.');
      }
      const minX = Math.min(xValue, minMax.minX);
      const maxX = Math.max(xValue, minMax.maxX);
      const minY = Math.min(yValue, minMax.minY);
      const maxY = Math.max(yValue, minMax.maxY);
      return { minX, maxX, minY, maxY };
    },
    { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity },
  );

  return { minX, maxX, minY, maxY };
}