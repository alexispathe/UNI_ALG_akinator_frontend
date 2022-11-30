import { Grafica } from "./Grafica";
import {options, data } from './ConfiguracionGraficas';
import React from 'react';

export const Covid = () => {
    return (
        <>
            <Grafica options={options} data={data}/>
            {/* <Casos dataCovid={dataCovid} setDataCovid={setDataCovid} /> */}
        </>
    );
}