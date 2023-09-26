import { Area } from './Components/Area/Area';
import { Triangle } from './Components/General/Trinalgle';
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
  { value: 100 },
  { value: 0 },
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
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <Progress
          width={800}
          data={progressData}
          axisCrossLineWidth={2}
          renderXValue={(d) => (d.value < 50 ? <Triangle fillColor='#FF9393' /> : <Triangle />)}
          ticks={[
            { position: 0, label: '0%' },
            { position: 10, label: '' },
            { position: 20, label: '20%' },
            { position: 30, label: '' },
            { position: 40, label: '' },
            { position: 50, label: '50%' },
            { position: 60, label: '' },
            { position: 70, label: '' },
            { position: 80, label: '80%' },
            { position: 90, label: '' },
            { position: 100, label: '100%' },
          ]}
        />
        <Progress
          width={500}
          data={progressData}
          axisCrossLineWidth={2}
          renderXValue={(d) => (d.value > 50 ? <Triangle fillColor='#FF9393' /> : <Triangle />)}
        />
      </div>
    </>
  );
}
