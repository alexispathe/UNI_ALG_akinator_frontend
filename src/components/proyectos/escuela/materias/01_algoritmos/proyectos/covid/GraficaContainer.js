import React from 'react';

// import {options, casosCovid } from './ConfiguracionGraficas';
// Estamos mandando a llamar la api donde se encuentran los datos
// IMPORTAMOS EL COMPONENTE DE COVID
import { CasosCovid } from './CasosCovid';
import { ExtrapolacionCasosCovid } from './ExtrapolacionCasosCovid';
import { opcionesGrafica, datosConfirmadosCovidGrafica, datosMuertesCovidGrafica } from './ConfiguracionDeGraficas';
export const GraficaContainer = ({ DataCovid }) => {
  return (
    <>

      <CasosCovid
        DataCovid={DataCovid}
        opcionesGrafica={opcionesGrafica}
        datosConfirmadosCovidGrafica={datosMuertesCovidGrafica}
        datosMuertesCovidGrafica={datosMuertesCovidGrafica}
      />

      <ExtrapolacionCasosCovid
        DataCovid={DataCovid} options={opcionesGrafica(`Prediccion de Casos COVID-19 noviembre en ${DataCovid[0].Country}`)}
        graficaCasosCovid={datosConfirmadosCovidGrafica}
      />
    </>
  );
}