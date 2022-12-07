import { useState, useEffect } from "react"
import { ConfiguracionGrafica } from "./ConfiguracionGraficas";
import { Spinner } from "../../../../../../spinner/Spinner";
import axios from 'axios';
export const ListaPaises = () => {
    // const [pais, setPais] = useState('');
    const [DataCovid, setData] = useState([]);
    const [nombrePais, setNombrePais] = useState([]);
    const [statusSpinner, setStatusSpinner] = useState(false);
    useEffect(() => {
        axios.get('https://api.covid19api.com/total/country/' + "mx").then(res => {
            setData(res.data.filter(data => data.Date >= "2022-11-01"));
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
            setData(res.data.filter(data => data.Date >= "2022-11-01"));
            setStatusSpinner(true);
            // console.log(DataCovid)
        })

    }
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

                    {statusSpinner? <ConfiguracionGrafica DataCovid={DataCovid}/>: <Spinner/>}
                </div>

                : <Spinner/>

            }

        </>
    )
}