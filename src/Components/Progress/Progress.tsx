import { CSSProperties, useMemo } from 'react';
import { BaseChartProps } from '../../types/global';
import { defaultTicks } from './progressUtils';
import { Triangle } from '../General/Trinalgle';

// reference https://docs.google.com/presentation/d/1xnfRDtsjX_Fah45z-JtIgrJf6UVhI6H3/edit#slide=id.p1

export type Ticks = Array<{ position: number; label: string }>;

export type ProgressProps<T> = Omit<BaseChartProps<T>, 'yValue'> & {
  /** Optional: Array of numbers representing the ticks positions and labels */
  ticks?: Ticks;
  /** Optional: Axis line color (default = black) */
  axisColor?: CSSProperties['stroke'];
  /** Optional: Axis line width */
  axisWidth?: number;
  /** Optional: Axis cross line size */
  axisCrossLineSize?: number;
  /** Optional: Axis cross line color */
  axisCrossLineColor?: CSSProperties['stroke'];
  /** Optional: Axis cross line width */
  axisCrossLineWidth?: number;
  /** Optional: Axis label font family */
  axisLabelFontFamily?: CSSProperties['fontFamily'];
  /** Optional: Axis label font size */
  axisLabelFontSize?: number;
  /** Optional: Axis label color */
  axisLabelColor?: CSSProperties['fill'];
  /** Optional: Label padding */
  labelPadding?: number;
  /** Optional: Render function for the x value */
  renderXValue?: (dataPoint: T) => JSX.Element;
};

export const Progress = <T extends any>({
  data,
  renderXValue = (dataPoint: T) => <Triangle />,
  width = 0,
  height = 200,
  xValue = (dataPoint: T | any) => dataPoint.value as number,
  ticks,
  axisColor = 'black',
  axisWidth = 1,
  axisCrossLineSize = 10,
  axisCrossLineColor = 'black',
  axisCrossLineWidth = 1,
  axisLabelFontFamily = 'Urbanist, sans-serif',
  axisLabelFontSize = 15,
  axisLabelColor = 'black',
  labelPadding = 15,
}: ProgressProps<T>): JSX.Element => {
  const [svgViewBoxWidth, svgViewBoxHeight] = [300, 200];
  const labelPlusCrossLineSize = axisCrossLineSize * 2 + axisLabelFontSize;
  const pathY = svgViewBoxHeight - labelPlusCrossLineSize - labelPadding;
  const path = `M 0 ${pathY} L ${svgViewBoxWidth} ${pathY}`;

  return (
    <div style={{ position: 'relative', width: width || '100%', height: height }}>
      <svg
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
        preserveAspectRatio='none'
        viewBox={`0 0 ${svgViewBoxWidth} ${svgViewBoxHeight}`}
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d={path} stroke={axisColor} strokeWidth={axisWidth} fill='none' />
        {(ticks || defaultTicks)?.map((tick) => {
          const x = (tick.position / 100) * svgViewBoxWidth;
          const yPosition = svgViewBoxHeight - (axisCrossLineSize * 2 + axisLabelFontSize) - labelPadding;
          return (
            <g key={tick.position}>
              <path
                d={`M ${x} ${yPosition + axisCrossLineSize} L ${x} ${yPosition - axisCrossLineSize}`}
                stroke={axisCrossLineColor}
                strokeWidth={axisCrossLineWidth}
                fill='none'
                vectorEffect='non-scaling-stroke'
              />
            </g>
          );
        })}
      </svg>
      {(ticks || defaultTicks)?.map((tick) => (
        <div
          key={tick.position}
          style={{
            position: 'absolute',
            bottom: 0,
            left: `${tick.position}%`,
            transform: 'translateX(-50%)',
            fontFamily: axisLabelFontFamily,
            fontSize: `${axisLabelFontSize}px`,
            color: axisLabelColor,
          }}
        >
          {tick.label}
        </div>
      ))}
      {data.map((dataPoint, index) => {
        const leftPosition = `${xValue(dataPoint)}%`;
        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: leftPosition,
              top: '50%',
              transform: 'translateX(-50%) translateY(-50%)',
            }}
          >
            {renderXValue(dataPoint)}
          </div>
        );
      })}
    </div>
  );
};
