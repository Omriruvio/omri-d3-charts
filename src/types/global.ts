export type DefaultChartItem = {
  ts: number;
  value: number;
};

export type ChartData<T = DefaultChartItem> = Array<T>;

export type BaseChartProps<T = DefaultChartItem> = {
  /** Time series data to be visualized */
  data: ChartData<T>;
  /** Optional: Width of the SVG (default = 100%) */
  width?: number;
  /** Optional: Height of the SVG (default = 200) */
  height?: number;
  /** Optional: Fill color (default = transparent) */
  /** Optional: Accessor function for the x axis value (default = (d) => d.ts) */
  xValue?: (dataPoint: T) => number;
  /** Optional: Accessor function for the y axis value (default = (d) => d.value) */
  yValue?: (dataPoint: T) => number;
};
