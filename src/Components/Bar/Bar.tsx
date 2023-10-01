import { CSSProperties } from 'react';
import { BaseChartProps } from '../../types/global';
import { calcBarGraphMinMaxValues } from './barUtils';
import { scaleLinear } from 'd3';

export type BarProps<T = Record<string, number>> = Omit<BaseChartProps<T>, 'yValue'> & {
  gridColor?: CSSProperties['stroke'];
  gridMidColor?: CSSProperties['stroke'];
  gridMidStrokeDasharray?: CSSProperties['strokeDasharray'];
  gridWidth?: number;
  yValue?: (dataPoint: T) => number[];
  barColors?: CSSProperties['fill'][];
  xPadding?: number;
  yPadding?: number;
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
  gridWidth = 2,
  gridMidColor = '#d4d4d4',
  gridMidStrokeDasharray = '2,4',
  barColors = ['#1e4e79', '#2cd9fd'],
  xPadding = 5,
  yPadding = 10,
  barScaleFactor = 0.7,
  barStrokeWidth = 1,
  barStrokeColor = '#4a4a4a',
  yAxisPosition = 'right',
  yAxisLabelFormatter = (val: number) => String(val.toFixed(1)),
  xAxisTicks,
  yAxisTicks,
}: BarProps<T>): JSX.Element => {
  const [svgViewBoxWidth, svgViewBoxHeight] = [500, 200];
  const barWidth = (svgViewBoxWidth / data.length) * barScaleFactor;

  const { minX, minY, maxX, maxY } = calcBarGraphMinMaxValues({
    data,
    xAxisAccessor: xValue,
    yAxisAccessor: yValue,
  });

  const calculatedYDomain = typeof yDomain === 'function' ? yDomain([minY, maxY]) : yDomain;
  const yScale = scaleLinear(calculatedYDomain || [0, maxY], [0, svgViewBoxHeight]);
  const xScale = scaleLinear([minX, maxX], [xPadding, svgViewBoxWidth - barWidth - xPadding]);

  const gridTopPath = `M 0 0 L ${svgViewBoxWidth} 0`;
  const gridMidPath = `M 0 ${yScale(maxY / 2)} L ${svgViewBoxWidth} ${yScale(maxY / 2)}`;
  const gridBottomPath = `M 0 ${svgViewBoxHeight} L ${svgViewBoxWidth} ${svgViewBoxHeight}`;

  const xTicks: number[] = xAxisTicks || xScale.ticks(data.length).filter((_, i) => i % 5 === 0);
  const yTicks: number[] = yAxisTicks || [0, yScale.invert(svgViewBoxHeight / 2), yScale.invert(svgViewBoxHeight)];

  const xAxisTickLabels = xTicks.map((tick, i) => {
    const tickX = xScale(xTicks[i]);
    const tickY = svgViewBoxHeight + yPadding;
    return (
      <text key={tick} x={tickX + barWidth / 2} y={tickY} textAnchor='middle' fontSize={10} fill={gridColor}>
        {tick}
      </text>
    );
  });

  const yAxisTickLabels = yTicks.map((tick, i) => {
    // const tickX = -xPadding;
    const tickX = yAxisPosition === 'left' ? -xPadding : svgViewBoxWidth + xPadding;
    const tickY = svgViewBoxHeight - yScale(tick) - 10;
    return (
      <text key={tick} x={tickX} y={tickY} textAnchor='end' fontSize={10} fill={gridColor}>
        {yAxisLabelFormatter(tick)}
      </text>
    );
  });

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
      overflow={'visible'}
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
      {xAxisTickLabels}
      {yAxisTickLabels}
    </svg>
  );
};
