import { useState, useEffect } from "react"
import { ConfiguracionGrafica } from "./ConfiguracionGraficas";
import axios from 'axios';
export const ListaPaises = () => {
    const [pais, setPais] = useState('');
    const [DataCovid, setData] = useState([]);
    const [nombrePais, setNombrePais] = useState([]);
    useEffect(() => {
        axios.get('https://api.covid19api.com/total/country/' + "mx").then(res => {
            setData(res.data.filter(data => data.Date >= "2022-11-01"));
        })

        axios.get('https://api.covid19api.com/countries').then(res => {
            setNombrePais(res.data);
        })
    }, []);
    const handleChange = (option) => {
        // setPais(option.target.value)
        console.log(option.target.value)
        axios.get('https://api.covid19api.com/total/country/' + option.target.value).then(res => {
            setData(res.data.filter(data => data.Date >= "2022-11-01"));
            console.log(DataCovid)
        })

    }
    return (
        <>
            {DataCovid.length >= 1 ?
                <div className="container">
                    <form>
                        <div className="form-group">
                            <select className="form-select" onChange={(value) => handleChange(value)}>
                                {/* <option value="mx" selected>México</option> */}
                                {nombrePais.map(nombre => (
                                    // console.log(nombre.ISO2)
                                    <option value={nombre.ISO2} key={nombre.ISO2}>{nombre.Country}</option>
                                ))}
                            </select>
                        </div>
                    </form>
                    <ConfiguracionGrafica DataCovid={DataCovid}/>
                </div>

                : "No hay datos"

            }

        </>
    )
}