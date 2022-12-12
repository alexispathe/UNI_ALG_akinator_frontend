import { Grafica } from './Grafica';

export const CasosCovid = ({ DataCovid, opcionesGrafica, datosConfirmadosCovidGrafica, datosMuertesCovidGrafica }) => {
    return (
        <>
            <div className='row'>
                <div className='col-sm-12 col-lg-6'>
                    <Grafica
                        options={opcionesGrafica(`Casos COVID-19 en ${DataCovid[0].Country}`)}
                        graficaCasosCovid={datosConfirmadosCovidGrafica(DataCovid, "Casos confirmados", "rgb(53, 162, 235)", "rgba(53, 162, 235, 0.5)")}
                    />
                </div>
                <div className='col-sm-12 col-lg-6'>
                    <Grafica
                        options={opcionesGrafica(`Muertes de COVID-19 en ${DataCovid[0].Country}`)}
                        graficaCasosCovid={datosMuertesCovidGrafica(DataCovid, "Muertes confirmadas", "rgb(255,0,0)", "rgba(255,0,0,0.5)")}
                    />
                </div>
            </div>
        </>
    )
}