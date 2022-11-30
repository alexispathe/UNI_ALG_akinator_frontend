import { DataCovid} from "../../database/covidDB";

// ESTA ES LA CONFIGURACION QUE SE USARA PARA IMPLEMENTAR LA GRAFICA

export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };
// AQUI LLAMAMOS LOS DATOS PARA MOSTRARLO EN LA GRAFICA
export const data = {
    labels: DataCovid.map( data=> data.year),
    datasets: [
      {
        fill: true,
        label: 'Casos Covid',
        data: DataCovid.map(data => data.userGain),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };