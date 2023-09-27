import { Area } from './Components/Area/Area';
import { Bar } from './Components/Bar/Bar';
import { Triangle } from './Components/General/Trinalgle';
import { Progress } from './Components/Progress/Progress';
import { barDataMock1, progressDataMock1, progressTicksDefault, timeSeriesMock1 } from './data/mockData';
import './styles.css';

export default function App() {
  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gridGap: '20px',
          padding: '20px',
        }}
      >
        <Bar data={barDataMock1} barColors={['#FF9393', 'teal']} yValue={(d) => [d.v1, d.v2]} />
        <Area
          data={timeSeriesMock1}
          stroke='teal'
          strokeWidth={3}
          gradient={{
            startColor: 'rgba(44, 217, 253, 0.75)',
            endColor: 'rgba(44, 217, 253, 0.2)',
          }}
          xValue={(d) => d.x}
          yValue={(d) => d.y}
        />
        <Area
          data={timeSeriesMock1}
          stroke='teal'
          strokeWidth={3}
          gradient={{
            startColor: 'rgba(44, 217, 253, 0.75)',
            endColor: 'rgba(44, 217, 253, 0.2)',
          }}
          xValue={(d) => d.x}
          yValue={(d) => d.y}
          yDomain={[0, 100]}
        />
        <Area data={timeSeriesMock1} stroke='black' fill='#ccc' xValue={(d) => d.x} yValue={(d) => d.y} />
        <Progress
          data={progressDataMock1}
          axisCrossLineWidth={2}
          renderXValue={(d) => (d.value < 50 ? <Triangle fillColor='#FF9393' /> : <Triangle />)}
          ticks={progressTicksDefault}
        />
        <Progress
          data={progressDataMock1}
          axisCrossLineWidth={2}
          renderXValue={(d) => (d.value > 50 ? <Triangle fillColor='#FF9393' /> : <Triangle />)}
        />
      </div>
    </>
  );
}
