import { BaseTicks, ChartData } from "../../types/global"

export const monthlyBarTicks: BaseTicks = Array(30).map((_, i) => {
  return { label: i + 1 }
})

export const weeklyBarTicks: BaseTicks = Array(7).map((_, i) => {
  return { label: i + 1 }
})

type CalcMinMaxArgs<T extends Record<string, number>> = {
  data: ChartData<T>;
  xAxisAccessor?: (dataPoint: T) => number;
  yAxisAccessor?: (dataPoint: T) => number[];
  strokeWidth?: number;
};

export function calcBarGraphMinMaxValues<T extends Record<string, number>>({
  data,
  xAxisAccessor = (d: T) => d.x,
  yAxisAccessor = (d: T) => [d.val1, d.val2],
}: CalcMinMaxArgs<T>) {
  const { minX, maxX, minY, maxY } = data.reduce<{
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  }>(
    (minMax, current) => {
      const xValue = xAxisAccessor(current);
      const y = yAxisAccessor(current);
      const yValue = Array.isArray(y) ? y : [y];

      if (xValue === undefined || yValue === undefined) {
        throw new Error('xValue or yValue is undefined. Please check your accessor functions.');
      }
      const minX = Math.min(xValue, minMax.minX);
      const maxX = Math.max(xValue, minMax.maxX);
      const minY = Math.min.apply(null, [...yValue, minMax.minY]);
      const maxY = Math.max.apply(null, [...yValue, minMax.maxY]);
      return { minX, maxX, minY, maxY };
    },
    { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity },
  );

  return { minX, maxX, minY, maxY };
}