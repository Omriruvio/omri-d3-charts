import React, { CSSProperties, useMemo } from "react";
import { parseTimeSeries } from "../utils";

export type TimeSeries = Array<{ ts: number; value: number }>;
export type GradientProps = {
  startColor: string;
  startOpacity: number;
  endColor: string;
  endOpacity: number;
};
export type AreaProps = {
  timeSeries: TimeSeries;
  width?: number;
  height?: number;
  fill?: CSSProperties["fill"];
  stroke?: CSSProperties["stroke"];
  strokeWidth?: number;
  gradient?: GradientProps;
};

export const Area: React.FC<AreaProps> = ({
  timeSeries,
  width = 0,
  height = 200,
  fill = "transparent",
  stroke = "transparent",
  strokeWidth = 1,
  gradient,
}) => {
  const [svgViewBoxWidth, svgViewBoxHeight] = [500, 200];
  const fillValue = gradient ? "url(#gradientDefinition)" : fill;

  const { polygonString, strokePath } = useMemo(() => {
    return parseTimeSeries(
      timeSeries,
      svgViewBoxHeight,
      svgViewBoxWidth,
      strokeWidth
    );
  }, [timeSeries, svgViewBoxWidth, svgViewBoxHeight, strokeWidth]);

  return (
    <svg
      style={{ width: width || "100%", height: height }}
      preserveAspectRatio="none"
      viewBox={`0 0 ${svgViewBoxWidth} ${svgViewBoxHeight}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points={polygonString} fill={fillValue} />
      <path
        d={strokePath}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
      {gradient && (
        <defs>
          <linearGradient id="gradientDefinition" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={gradient.startColor} stopOpacity={gradient.startOpacity} />
            <stop offset="100%" stopColor={gradient.endColor} stopOpacity={gradient.endOpacity} />
          </linearGradient>
        </defs>
      )}
    </svg>
  );
};
