export const Triangle = ({ width = 20, height = 17, fillColor = '#eee', strokeColor = '#aaa', strokeWidth = 2 }) => {
  const path = `M 0 0 L ${width} 0 L ${width / 2} ${height} Z`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} xmlns='http://www.w3.org/2000/svg'>
      <path d={path} fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
    </svg>
  );
};
