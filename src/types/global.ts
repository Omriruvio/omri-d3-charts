import { CSSProperties } from "react";

export type DefaultChartItem = {
  ts: number;
  value: number;
};

export type ChartData<T = DefaultChartItem> = Array<T>;

export type BaseTick = { label: string | number };
export type ProgressTick = { position: number } & BaseTick;
export type BaseTicks = Array<BaseTick>;
export type ProgressTicks = Array<ProgressTick>;

export type BaseChartProps<T = DefaultChartItem> = {
  /** Time series data to be visualized */
  data: ChartData<T>;
  /** Optional: Width of the SVG (default = 100%) */
  width?: CSSProperties["width"];
  /** Optional: Height of the SVG (default = 200) */
  height?: CSSProperties["height"];
  /** Optional: Accessor function for the x axis value (default = (d) => d.ts) */
  xValue?: (dataPoint: T) => number;
  /** Optional: Accessor function for the y axis value (default = (d) => d.value) */
  yValue?: (dataPoint: T) => number | number[];
  /**
   * Optional: Custom Y domain e.g. [0, 100] or function to calculate the domain based on the extent
   * @example ([min, max]) => [min, max * 1.1]
   */
  yDomain?: [number, number] | ((extent: [number, number]) => [number, number]);
  yAxisPosition?: "left" | "right";
  yAxisLabelFormatter?: (value: number) => string;
  xAxisTicks?: number[];
  yAxisTicks?: number[];
};
