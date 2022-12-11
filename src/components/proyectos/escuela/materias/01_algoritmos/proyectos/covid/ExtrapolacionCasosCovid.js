import { useEffect, useState } from "react"
import { Grafica } from "./Grafica";
export const ExtrapolacionCasosCovid = ({ DataCovid }) => {
    const [newCasosCovid, setNewCasosCovid] = useState(DataCovid);
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
        y = ((y2 - y1) / (x2 - x1)) * (x - x1) + y1;
        const nuevaFecha = new Date(newCasosCovid[logitudArreglo - 1].Date)
        const nuevosCasos = {
            Country: newCasosCovid[0].Country,
            Confirmed: y,
            Date: nuevaFecha.getMonth() + '/' + (nuevaFecha.getDate() + 1) + '/' + nuevaFecha.getFullYear()
        };
        setNewCasosCovid([...newCasosCovid, nuevosCasos]);
    }
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Casos COVID-19 noviembre en ${newCasosCovid[0].Country}`,
            },
        },
    };
    const casosCovid = {
        labels: newCasosCovid.map(data => data.Date),
        datasets: [
            {
                fill: true,
                label: 'Casos confirmados',
                data: newCasosCovid.map(data => data.Confirmed),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            }
        ]
    }
    return (
        <>
            <div className='row'>
                <h1>Extrapolacion casos covid</h1>

                <div className='col-sm-12 col-lg-6'> <Grafica options={options} casosCovid={casosCovid} /></div>
            </div>
        </>
    )
}