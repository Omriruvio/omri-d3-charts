import { Area, TimeSeries } from "./Components/Area/Area";
import "./styles.css";

const timeSeries: TimeSeries<{timestamp: number, val: number}> = [
  { timestamp: new Date(2023, 8, 24, 14, 0).valueOf(), val: 20 },
  { timestamp: new Date(2023, 8, 24, 14, 10).valueOf(), val: 40 },
  { timestamp: new Date(2023, 8, 24, 14, 20).valueOf(), val: 60 },
  { timestamp: new Date(2023, 8, 24, 14, 40).valueOf(), val: 65 },
  { timestamp: new Date(2023, 8, 24, 14, 50).valueOf(), val: 75 },
  { timestamp: new Date(2023, 8, 24, 15, 30).valueOf(), val: 90 },
  { timestamp: new Date(2023, 8, 24, 15, 32).valueOf(), val: 60 }
];

export default function App() {
  return (
    <>
      <Area
        data={timeSeries}
        stroke="teal"
        strokeWidth={3}
        gradient={{
          startColor: "rgba(44, 217, 253, 0.75)",
          endColor:  "rgba(44, 217, 253, 0.2)",
        }}
        xValue={(d) => d.timestamp}
        yValue={(d) => d.val}
      />
      <Area data={timeSeries} stroke="black" fill="#ccc" xValue={d => d.timestamp} yValue={d => d.val} />
    </>
  );
}
