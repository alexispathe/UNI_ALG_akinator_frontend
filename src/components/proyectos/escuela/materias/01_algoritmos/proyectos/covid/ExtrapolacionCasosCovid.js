import { useEffect, useState } from "react"
import { Grafica } from "./Grafica";
export const ExtrapolacionCasosCovid = ({ DataCovid, opcionesGrafica, graficaCasosCovid }) => {
    const datos = DataCovid;
    const [newCasosCovid, setNewCasosCovid] = useState(datos);
    useEffect(() => {
        extrapolacion();

    }, []);
    const extrapolacion = () => {
        let logitudArreglo = newCasosCovid.length;
        let x = logitudArreglo + 1; //DeVUELVE EL SIGUIENTE DIA PARA PREDECIR LOS CASOS COVID
        let y = 0;

        let y1 = newCasosCovid[logitudArreglo - 2].Confirmed; //Devuelve el penultimo registros de casos confirmados de covid
        let y2 = newCasosCovid[logitudArreglo - 1].Confirmed; //Devuelve el ultimo registros de casos confirmados de covid
        let x1 = new Date(newCasosCovid[logitudArreglo - 2].Date).getDate(); //Devuelve la penultima fecha donde existen registros 
        let x2 = new Date(newCasosCovid[logitudArreglo - 1].Date).getDate(); //Devuelve el ultimo dia con registros de casos covid
        // console.log(new Date(newCasosCovid[logitudArreglo-2].Date))
        y = ((y2 - y1) / (x2 - x1)) * (x - x1) + y1; //formula para la extrapolacion
        const nuevaFecha = new Date(newCasosCovid[logitudArreglo - 1].Date); //sacamos la nueva fecha para la grafica
        const nuevosCasos = {
            Country: newCasosCovid[0].Country,
            Confirmed: y,
            Date: (nuevaFecha.getMonth() + 1) + '/' + (nuevaFecha.getDate() + 1) + '/' + nuevaFecha.getFullYear()
        };
        setNewCasosCovid([...newCasosCovid, nuevosCasos]);
    }

    return (
        <>
            <div className='row'>
                <h1>Extrapolacion casos covid</h1>
                <div className='col-sm-12 col-lg-6'> <Grafica options={opcionesGrafica} graficaCasosCovid={graficaCasosCovid(newCasosCovid, "Casos con preddicion", "rgb(53, 162, 235)", "rgba(53, 162, 235, 0.5)")} /></div>
            </div>
        </>
    )
}