import { Grafica } from "./Grafica"
import { useEffect, useState } from "react"
export const InterpolacionCasosCovid = ({ DataCovid, opcionesGrafica, graficaCasosCovid }) => {
    const [casosCovid, setCasosCovid] = useState(DataCovid);
    useEffect(() => {
        interpolacion();
    }, []);
    const interpolacion =()=>{
        const dia = "12/4/2022"
        let fecha = new Date(dia) ; //Devuelve el dia "12/4/2022"
        // console.log(fecha.getMonth()+1)
        const fecha1 = casosCovid.filter(casos => casos.Date === (fecha.getMonth()+1)+ "/"+(fecha.getDate()-1)+"/"+fecha.getFullYear());
        const fecha2 = casosCovid.filter(casos => casos.Date === (fecha.getMonth()+1)+ "/"+(fecha.getDate()+1)+"/"+fecha.getFullYear());

        let x = fecha.getDate() //DIA QUE DEBEMOS ENCONTRAR
        let y = 0;
        let x0 = new Date(fecha1[0].Date).getDate(); //DIA
        let y0 = fecha1[0].Confirmed; //CASOS COVID DEL DIA ANTERIOR

        let x1 = new Date(fecha2[0].Date).getDate(); // DIA ; 
        let y1 = fecha2[0].Confirmed; //CASOS COVID DIA POSTORIOR;

        y = ((y1 - y0) / (x1 - x0)) * (x - x0) + y0;
        // console.log(y)
        // console.log(fechaSeleccionada)
        casosCovid.map(casos=>{
            if(casos.Date ===dia){
                casos.Confirmed = y
            }
        })
        setCasosCovid(casosCovid)
    }
    return (
        <>
            <div className='row'>
                <h1>Interpolacion casos covid</h1>
                <div className='col-sm-12 col-lg-6'>
                    <Grafica
                        options={opcionesGrafica}
                        graficaCasosCovid={
                            graficaCasosCovid(casosCovid, "Casos con interpolacion", "rgb(53, 162, 235)", "rgba(53, 162, 235, 0.5)")
                        }
                    />
                </div>
            </div>
        </>
    )
}