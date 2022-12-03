import React from 'react';

// import {options, casosCovid } from './ConfiguracionGraficas';
import { useState, useEffect } from "react";
// Estamos mandando a llamar la api donde se encuentran los datos
import { getDatosCovidMexico,getNombresPais } from "../../database/covidDB";
// IMPORTAMOS EL COMPONENTE DE COVID
import { Covid } from './Covid';

export const ConfiguracionGrafica = () => {
  // DEVOLVER LOS ULTIMOS 30 DIAS DE CONTAGIO 
  const [DataCovid, setData] = useState([]);
  const [nombrePais, setNombrePais] = useState([]);
  useEffect(() => {
    getDatosCovidMexico().then(res => {
      setData(res);
    })
    getNombresPais().then(res=>{
      setNombrePais(res.data);

    })
  }, []);
  /***********CONFIGURACION PARA LA GRAFICA QUE SE VA A MOSTRAR*******/
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Casos COVID-19 noviembre en México',
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

  /*************FIN DE CONFIGURACION GRAFICA************/
  return (
    <>
      <Covid options={options} casosCovid={casosCovid} nombrePais={nombrePais} />
      {/* <Casos dataCovid={dataCovid} setDataCovid={setDataCovid} /> */}
    </>
  );
}