import { useState, useEffect } from "react"
import { GraficaContainer } from "./GraficaContainer";
import { Spinner } from "../../../../../../spinner/Spinner";
import axios from 'axios';

export const DatosCovidContainer = () => {
    // const [pais, setPais] = useState('');
    const [DataCovid, setData] = useState([]);
    const [nombrePais, setNombrePais] = useState([]);
    const [statusSpinner, setStatusSpinner] = useState(false);
    // const [date, setDate] = useState("2022-12-01")
    const date = "2022-12-01";
    const [country, setCountry] = useState("mx")
    useEffect(() => {
        axios.get('https://api.covid19api.com/total/country/' + country).then(res => {
            // console.log(res.data)
            res.data = res.data.filter(data => data.Date >= date)
            res.data.map(datos => {
                datos.Date = new Date(datos.Date);
                datos.Date = datos.Date.getUTCMonth() + 1 + "/" + datos.Date.getUTCDate() + "/" + datos.Date.getUTCFullYear()
                return datos
            })
            setData(res.data);
        })

        axios.get('https://api.covid19api.com/countries').then(res => {
            setNombrePais(res.data);
            setStatusSpinner(true);
        })
    }, []);
   
    const handleChange = (option,date = "2022-12-01") => {
        setStatusSpinner(false);
        setCountry(option)
        axios.get('https://api.covid19api.com/total/country/' + option).then(res => {
            res.data = res.data.filter(data => data.Date >= date)
            res.data.map(datos => {
                datos.Date = new Date(datos.Date);
                datos.Date = datos.Date.getUTCMonth() + 1 + "/" + datos.Date.getUTCDate() + "/" + datos.Date.getUTCFullYear()
                return datos;
            })
            setData(res.data);
            setStatusSpinner(true);
            // console.log(DataCovid)
        }).catch(err=> alert("Error"))

    }

    /***********CONFIGURACION PARA LA GRAFICA QUE SE VA A MOSTRAR*******/

    return (
        <>

            {DataCovid.length >= 1 ?
                <div className="container">
                    <h1 className="text-center">Casos COVID-19</h1>
                    <form>
                        <div className="form-group d-flex">
                                <select className="form-select" onChange={(e) => handleChange(e.target.value)}>
                                    <option value="mx" >México</option>
                                    {nombrePais.map(nombre => (
                                        // console.log(nombre.ISO2)
                                        <option value={nombre.ISO2} key={nombre.ISO2}>{nombre.Country}</option>
                                    ))}
                                </select>
                                    <input type="date" name="date"  onChange={(e)=> {
                                        
                                        handleChange(country, e.target.value)}} />
                        </div>
                    </form>

                    {statusSpinner ? <GraficaContainer DataCovid={DataCovid} /> : <Spinner />}

                </div>

                : <Spinner />

            }

        </>
    )
}