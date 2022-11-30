import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );

  
export const Grafica = ({options, data}) => {
    return (
        <>
            <div className="container">
                <h1 className="text-center">Casos covid Noviembre 2022</h1>
                <Line options={options} data={data} />
                
            </div>
        </>
    )
}