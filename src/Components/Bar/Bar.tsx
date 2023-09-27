import { CSSProperties } from 'react';
import { BaseChartProps } from '../../types/global';
import { calcBarGraphMinMaxValues } from './barUtils';
import * as d3 from 'd3-scale';

export type BarProps<T = Record<string, number>> = Omit<BaseChartProps<T>, 'yValue'> & {
  gridColor?: CSSProperties['stroke'];
  gridMidColor?: CSSProperties['stroke'];
  gridMidStrokeDasharray?: CSSProperties['strokeDasharray'];
  gridWidth?: number;
  yValue?: (dataPoint: T) => number[];
  barColors?: CSSProperties['fill'][];
  xPadding?: number;
  barScaleFactor?: number;
  barStrokeWidth?: number;
  barStrokeColor?: CSSProperties['stroke'];
};

export const Bar = <T extends Record<string, number>>({
  data,
  width = 0,
  height = 200,
  xValue = (dataPoint: T) => dataPoint.x,
  yValue = (dataPoint: T) => [dataPoint.val1, dataPoint.val2],
  yDomain,
  gridColor = '#6b6b6b',
  gridWidth = 1,
  gridMidColor = '#d4d4d4',
  gridMidStrokeDasharray = '2,4',
  barColors = ['#FF9393', 'teal'],
  xPadding = 5,
  barScaleFactor = 0.7,
  barStrokeWidth = 1,
  barStrokeColor = '#4a4a4a',
}: BarProps<T>): JSX.Element => {
  const [svgViewBoxWidth, svgViewBoxHeight] = [500, 200];
  const gridTopPath = `M 0 0 L ${svgViewBoxWidth} 0`;
  const gridMidPath = `M 0 ${svgViewBoxHeight / 2} L ${svgViewBoxWidth} ${svgViewBoxHeight / 2}`;
  const gridBottomPath = `M 0 ${svgViewBoxHeight} L ${svgViewBoxWidth} ${svgViewBoxHeight}`;
  const barWidth = (svgViewBoxWidth / data.length) * barScaleFactor;

  const { minX, minY, maxX, maxY } = calcBarGraphMinMaxValues({
    data,
    xAxisAccessor: xValue,
    yAxisAccessor: yValue,
  });

  const yScale = d3.scaleLinear(yDomain || [0, maxY], [0, svgViewBoxHeight * 0.95]);
  const xScale = d3.scaleLinear([minX, maxX], [xPadding, svgViewBoxWidth - barWidth - xPadding]);

  const barRenderData: Array<{
    x: number;
    y: number;
    bars: Array<{ height: number; color: string }>;
  }> = data.map((d) => {
    const byHeight = (a: { height: number }, b: { height: number }) => b.height - a.height;
    const toRenderData: (val: number, i: number) => { height: number; color: string } = (val, i) => ({
      height: yScale(val),
      color: barColors[i] || '#ccc',
    });

    return { x: xScale(xValue(d)), y: svgViewBoxHeight, bars: yValue(d).map(toRenderData).sort(byHeight) };
  });

  return (
    <svg
      style={{ width: width || '100%', height: height }}
      preserveAspectRatio='none'
      viewBox={`0 0 ${svgViewBoxWidth} ${svgViewBoxHeight}`}
      xmlns='http://www.w3.org/2000/svg'
    >
      {barRenderData.map((barData, i) => {
        const { x, y, bars } = barData;
        return bars.map((bar, j) => {
          return (
            <rect
              key={`${i}-${j}`}
              x={x}
              y={y - bar.height}
              width={barWidth}
              height={bar.height}
              fill={bar.color}
              stroke={barStrokeColor}
              strokeWidth={barStrokeWidth}
              vectorEffect='non-scaling-stroke'
            />
          );
        });
      })}
      <path d={gridTopPath} stroke={gridColor} strokeWidth={gridWidth} />
      <path d={gridMidPath} stroke={gridMidColor} strokeWidth={gridWidth} strokeDasharray={gridMidStrokeDasharray} />
      <path d={gridBottomPath} stroke={gridColor} strokeWidth={gridWidth} />
    </svg>
  );
};
