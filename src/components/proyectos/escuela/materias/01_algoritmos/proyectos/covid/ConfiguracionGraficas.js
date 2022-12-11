import React from 'react';

// import {options, casosCovid } from './ConfiguracionGraficas';
// Estamos mandando a llamar la api donde se encuentran los datos
// IMPORTAMOS EL COMPONENTE DE COVID
import { Grafica } from './Grafica';
import { ExtrapolacionCasosCovid } from './ExtrapolacionCasosCovid';

export const ConfiguracionGrafica = ({DataCovid}) => {

  
  /***********CONFIGURACION PARA LA GRAFICA QUE SE VA A MOSTRAR*******/
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Casos COVID-19 noviembre en ${DataCovid[0].Country}`,
      },
    },
  };
  // AQUI LLAMAMOS LOS DATOS PARA MOSTRARLO EN LA GRAFICA
  const casosCovid = {
    labels: DataCovid.map(data => data.Date),
    datasets: [
      {
        fill: true,
        label: 'Casos confirmados',
        data: DataCovid.map(data => data.Confirmed),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ]
  };
  const muertesCovid = {
    labels: DataCovid.map(data => data.Date),
    datasets: [
      {
        fill: true,
        label: 'Muertes confirmadas',
        data: DataCovid.map(data => data.Deaths),
        borderColor: 'rgb(255,0,0)',
        backgroundColor: 'rgba(255,0,0, 0.5)',
      }
    ]
  };
  /*************FIN DE CONFIGURACION GRAFICA************/
  return (
    <>
    <h1 className="text-center">Predicción de contagios COVID-19</h1>
    <div className='row'>
      <div className='col-sm-12 col-lg-6'> <Grafica options={options} casosCovid={casosCovid}  /></div>
      <div className='col-sm-12 col-lg-6'> <Grafica options={options} casosCovid={muertesCovid}  /></div>
    </div>
     
      {/* <Casos dataCovid={dataCovid} setDataCovid={setDataCovid} /> */}
     <ExtrapolacionCasosCovid DataCovid={DataCovid}  />
    </>
  );
}