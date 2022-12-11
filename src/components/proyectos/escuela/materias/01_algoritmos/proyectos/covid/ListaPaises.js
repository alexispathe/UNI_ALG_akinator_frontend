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
        axios.get('https://api.covid19api.com/total/country/' + "mx").then(res => {
            // console.log(res.data)
            res.data = res.data.filter(data => data.Date >= date)
            res.data.map(datos=>{
                datos.Date = new Date(datos.Date);
                datos.Date = datos.Date.getUTCMonth() +1 +"/"+ datos.Date.getUTCDate() +"/" +datos.Date.getUTCFullYear()
                return datos
            })
            setData(res.data);
        })

        axios.get('https://api.covid19api.com/countries').then(res => {
            setNombrePais(res.data);
            setStatusSpinner(true);
        })
    }, []);
    const handleChange = (option) => {
        setStatusSpinner(false);
       
        axios.get('https://api.covid19api.com/total/country/' + option.target.value).then(res => {
            res.data = res.data.filter(data => data.Date >= date)
            res.data.map(datos=>{
                datos.Date = new Date(datos.Date);
                datos.Date = datos.Date.getUTCMonth() +1 +"/"+ datos.Date.getUTCDate() +"/" +datos.Date.getUTCFullYear()
                return datos;
            })
            setData(res.data);
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