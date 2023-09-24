import React, { CSSProperties, useMemo } from "react";
import { parseTimeSeries } from "../utils";

export type TimeSeries = Array<{ ts: number; value: number }>;
export type AreaProps = {
  timeSeries: TimeSeries;
  width?: number;
  height?: number;
  fill?: CSSProperties["fill"];
  stroke?: CSSProperties["stroke"];
  strokeWidth?: number;
};

export const Area: React.FC<AreaProps> = ({
  timeSeries,
  width = 0,
  height = 200,
  fill = "transparent",
  stroke = "transparent",
  strokeWidth = 1
}) => {
  const [svgViewBoxWidth, svgViewBoxHeight] = [500, 200];

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
      <polygon points={polygonString} fill={fill} />
      <path
        d={strokePath}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill="none"
      />
    </svg>
  );
};
