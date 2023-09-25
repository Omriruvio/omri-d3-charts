import { Area } from './Components/Area/Area';
import { Progress } from './Components/Progress/Progress';
import './styles.css';
import { ChartData } from './types/global';

const timeSeries: ChartData<{ x: number; y: number }> = [
  { x: new Date(2023, 8, 24, 14, 0).valueOf(), y: 20 },
  { x: new Date(2023, 8, 24, 14, 10).valueOf(), y: 40 },
  { x: new Date(2023, 8, 24, 14, 20).valueOf(), y: 60 },
  { x: new Date(2023, 8, 24, 14, 40).valueOf(), y: 65 },
  { x: new Date(2023, 8, 24, 14, 50).valueOf(), y: 75 },
  { x: new Date(2023, 8, 24, 15, 30).valueOf(), y: 90 },
  { x: new Date(2023, 8, 24, 15, 32).valueOf(), y: 60 },
];

const progressData = [
  { value: 20 },
  { value: 40 },
  { value: 60 },
  { value: 65 },
  { value: 75 },
  { value: 90 },
  { value: 60 },
];

export default function App() {
  return (
    <>
      <Area
        data={timeSeries}
        stroke='teal'
        strokeWidth={3}
        gradient={{
          startColor: 'rgba(44, 217, 253, 0.75)',
          endColor: 'rgba(44, 217, 253, 0.2)',
        }}
        xValue={(d) => d.x}
        yValue={(d) => d.y}
      />
      <Area data={timeSeries} stroke='black' fill='#ccc' xValue={(d) => d.x} yValue={(d) => d.y} />
      <Progress data={progressData} axisCrossLineWidth={2} />
    </>
  );
}
