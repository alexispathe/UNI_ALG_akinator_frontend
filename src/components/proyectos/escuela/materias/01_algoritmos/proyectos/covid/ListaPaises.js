import { useState, useEffect } from "react"
import { ConfiguracionGrafica } from "./ConfiguracionGraficas";
import { Spinner } from "../../../../../../spinner/Spinner";
import axios from 'axios';

export const ListaPaises = () => {
    // const [pais, setPais] = useState('');
    const [DataCovid, setData] = useState([]);
    const [nombrePais, setNombrePais] = useState([]);
    const [statusSpinner, setStatusSpinner] = useState(false);
    const date = "2022-12-01";
    useEffect(() => {
        // let fecha = new Date("2022-11-28T00:00:00Z").getUTCDate() + '/'+ getUTCMonth()+'/'+getUTCFullYear();
        // let fecha2 = new Date("2022-11-28 23:30:14");

        // const [day, month, year] = [fecha.getUTCDate(), fecha.getUTCMonth()+1, fecha.getUTCFullYear()];
       
        // console.log(day)
        // console.log(fecha)

        // console.log(fecha2)
        axios.get('https://api.covid19api.com/total/country/' + "mx").then(res => {
            // console.log(res.data)
            // res.data.map(res=>{
            //     res.Date = 
            // })
            setData(res.data.filter(data => data.Date >= date));
        })

        axios.get('https://api.covid19api.com/countries').then(res => {
            setNombrePais(res.data);
            setStatusSpinner(true);
        })
    }, []);
    const handleChange = (option) => {
        setStatusSpinner(false);
        // setPais(option.target.value)
        // console.log(option.target.value)
        axios.get('https://api.covid19api.com/total/country/' + option.target.value).then(res => {
            setData(res.data.filter(data => data.Date >= date));
            setStatusSpinner(true);
            // console.log(DataCovid)
        })

    }
    
  /***********CONFIGURACION PARA LA GRAFICA QUE SE VA A MOSTRAR*******/
  
    return (
        <>
       
            {DataCovid.length >= 1?
                <div className="container mt-5">
                    <form>
                        <div className="form-group">
                            <select className="form-select" onChange={(value) => handleChange(value)}>
                                <option value="mx" >México</option>
                                {nombrePais.map(nombre => (
                                    // console.log(nombre.ISO2)
                                    <option value={nombre.ISO2} key={nombre.ISO2}>{nombre.Country}</option>
                                ))}
                            </select>
                        </div>
                    </form>

                    {statusSpinner? <ConfiguracionGrafica DataCovid={DataCovid} />: <Spinner/>}
                    
                </div>

                : <Spinner/>

            }

        </>
    )
}