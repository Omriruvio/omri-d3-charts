import { Area, TimeSeries } from "./Components/Area";
import "./styles.css";

const timeSeries: TimeSeries = [
  { ts: new Date(2023, 8, 24, 14, 0).valueOf(), value: 20 },
  { ts: new Date(2023, 8, 24, 14, 10).valueOf(), value: 40 },
  { ts: new Date(2023, 8, 24, 14, 20).valueOf(), value: 60 },
  { ts: new Date(2023, 8, 24, 14, 40).valueOf(), value: 65 },
  { ts: new Date(2023, 8, 24, 14, 50).valueOf(), value: 75 },
  { ts: new Date(2023, 8, 24, 15, 30).valueOf(), value: 90 },
  { ts: new Date(2023, 8, 24, 15, 32).valueOf(), value: 60 }
];

export default function App() {
  return (
    <div className="App">
      <Area
        timeSeries={timeSeries}
        stroke="teal"
        fill="skyblue"
        strokeWidth={2}
      />
      <Area timeSeries={timeSeries} stroke="black" fill="#ccc" />
    </div>
  );
}
