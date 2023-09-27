import { CSSProperties, useMemo } from 'react';
import { parseTimeSeries } from './areaUtils';
import { BaseChartProps } from '../../types/global';

export type DefaultDataPoint = {
  ts: number;
  value: number;
};

export type TimeSeries<T = DefaultDataPoint> = Array<T>;

export type GradientProps = {
  startColor: string;
  startOpacity?: number;
  endColor: string;
  endOpacity?: number;
};

export type AreaProps<T = DefaultDataPoint> = BaseChartProps<T> & {
  /** Optional: Fill color (default = transparent) */
  fill?: CSSProperties['fill'];
  /** Optional: Stroke color (default = transparent) */
  stroke?: CSSProperties['stroke'];
  /** Optional: Stroke width (default = 1) */
  strokeWidth?: number;
  /** Optional: Gradient definition */
  gradient?: GradientProps;
  /** Optional: Custom Y domain e.g. [0, 100] */
  yDomain?: [number, number];
  /** Optional: Y value accessor function */
  yValue?: (dataPoint: T) => number;
};

export const Area = <T extends any>({
  data,
  width = 0,
  height = 200,
  fill = 'transparent',
  stroke = 'transparent',
  strokeWidth = 1,
  gradient,
  xValue = (dataPoint: T | any) => dataPoint.ts as number,
  yValue = (dataPoint: T | any) => dataPoint.value as number,
  yDomain,
}: AreaProps<T>): JSX.Element => {
  const [svgViewBoxWidth, svgViewBoxHeight] = [500, 200];
  const fillValue = gradient ? 'url(#gradientDefinition)' : fill;

  const { polygonString, strokePath } = useMemo(() => {
    return parseTimeSeries(data, svgViewBoxHeight, svgViewBoxWidth, strokeWidth, xValue, yValue, yDomain);
  }, [data, svgViewBoxWidth, svgViewBoxHeight, strokeWidth]);

  return (
    <svg
      style={{ width: width || '100%', height: height }}
      preserveAspectRatio='none'
      viewBox={`0 0 ${svgViewBoxWidth} ${svgViewBoxHeight}`}
      xmlns='http://www.w3.org/2000/svg'
    >
      <polygon points={polygonString} fill={fillValue} />
      <path d={strokePath} stroke={stroke} strokeWidth={strokeWidth} fill='none' vectorEffect='non-scaling-stroke' />
      {gradient && (
        <defs>
          <linearGradient id='gradientDefinition' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%' stopColor={gradient.startColor} stopOpacity={gradient.startOpacity || 1} />
            <stop offset='100%' stopColor={gradient.endColor} stopOpacity={gradient.endOpacity || 1} />
          </linearGradient>
        </defs>
      )}
    </svg>
  );
};
