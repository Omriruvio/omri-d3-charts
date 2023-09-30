import { useTheme } from './hooks/useTheme';
import { Area } from './Components/Area/Area';
import { Bar } from './Components/Bar/Bar';
import { Triangle } from './Components/General/Trinalgle';
import { Progress } from './Components/Progress/Progress';
import { barDataMock1, progressDataMock1, progressTicksDefault, timeSeriesMock1 } from './data/mockData';
import './App.css'

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <div className='flex flex-row w-full justify-end'>
        <button className='mt-2 mr-2' onClick={toggleTheme}>Switch to {theme === 'dark' ? 'light' : 'dark'} theme</button>
      </div>
      <div className='kitchen-sink-wrapper'>
        <Bar
          data={[{ x: 1, v1: 20, v2: 25 }]}
          barColors={['#1e4e79', '#2cd9fd']}
          yValue={(d) => [d.v1, d.v2]}
          yDomain={([, max]) => [0, max * 1.1]}
        />
        <Bar
          data={barDataMock1}
          barColors={['#1e4e79', '#2cd9fd']}
          yValue={(d) => [d.v1, d.v2]}
          yDomain={([, max]) => [0, max * 1.1]}
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
  )
}

export default App
