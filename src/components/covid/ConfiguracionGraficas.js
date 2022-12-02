import {getDatosCovidMexico} from "../../database/covidDB";
import {useState} from 'react';
// ESTA ES LA CONFIGURACION QUE SE USARA PARA IMPLEMENTAR LA GRAFICA
const DataCovid = [];
getDatosCovidMexico().then(res=>{
  // console.log(res);
  DataCovid.push(...res);
})

console.log(DataCovid);
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
export const casosCovid = {
    labels: DataCovid.map( data=> data.Date),
    datasets: [
      {
        fill: true,
        label: 'Casos Covid',
        data: DataCovid.map(data => data.Confirmed),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };