import { Grafica} from "./Grafica";
// import {options, casosCovid } from './ConfiguracionGraficas';
import React from 'react';
export const Covid = ({options, casosCovid}) => {

    return (
        <>
            <Grafica options={options} casosCovid={casosCovid}/>
            {/* <Casos dataCovid={dataCovid} setDataCovid={setDataCovid} /> */}
        </>
    );
}