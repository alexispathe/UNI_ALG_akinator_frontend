import { useEffect, useState } from 'react';
import { Spinner } from '../../../../../../../spinner/Spinner';
// import { hobbies } from '../../../../../../../../database/users';
import { Link } from 'react-router-dom';
import { urlAlgoritmos } from '../../../../../../../../Router/escuela/materias/algoritmos/urlAlgoritmos';
import { urlApi } from '../../../../../../../../global';
import axios from 'axios';
export const FormPersonaje = () => {
    const [arrayHobbies, setArryHobbies] = useState([]);
    const [hobbiesData, setHobbiesData] = useState([]);
    const [name, setName] = useState("");
    const [status, setStatus] = useState(false);
    const [statusSpinner, setStatusSpinner] = useState(true);
    const btnDisabled = document.querySelector('input[type="submit"]'); //llamamos al boton de submit para desactivarlo o activarlo dependiendo el caso
    // AQUI LLAMAMOS A LOS HOBBIES GUARDADOS EN LA BASE DE DATOS
    useEffect(() => {
        axios.get(urlApi + 'hobbies').then(hobbie => {
            setArryHobbies([...hobbie.data.data]);
            setStatusSpinner(false);

        })
            .catch(err => console.log("Ocurrio un error al devolver los datos"));
        // console.log(hobbiess);
        // setArryHobbies()
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(btnDisabled)
        btnDisabled.disabled = true;
        const data = {
            name,
            hobbies: hobbiesData
        }
        // Guardado los datos al servidor

        axios.post(urlApi + '/save-personaje', data)
            .then(data => {
                // console.log("Datos ", data)
                data ? setStatus(true) : setStatus(false);
            });

    }
    const handleChange = (e) => {

        if (e.target.name === "name") {
            setName(e.target.value)
        }
        if (e.target.name === "hobbies") {
            // Aqui hacemos la validacion de que este siendo seleccionado alguna casilla del checbox
            if (e.target.checked) {
                setHobbiesData([...hobbiesData, e.target.value])
                // console.log(hobbiesData)
            } else {
                setHobbiesData([...hobbiesData.filter(hobbie => hobbie !== e.target.value)])
                // console.log(hobbiesData)
            }
        }
    }

    return (
        <>
          
            {
                statusSpinner ?
                    <Spinner/>
                :
                <div className="container">
                <h1 className="text-center">Crea tu personaje</h1>
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <h2 className="text-primary">Nombre: </h2>
                            <input type="text" className="form-control" name="name" required onChange={(e) => handleChange(e)} placeholder="Escribe tu nombre" />
                        </div>
                        <h1 className="text-primary">Pasatiempos:</h1>
                        {/* Contenedor donde almacena todos los checkbox */}
                        <div className="row m-auto ">
                            {arrayHobbies.map((hobbies) => (
                                <div className="form-check col col-xl-3 col-lg-3 col-sm-4 col-12" key={hobbies.idHobbie}>
                                    <label className="form-check-label">{hobbies.name}</label>
                                    <input type="checkbox" className="form-check-input" name='hobbies' onChange={(e) => handleChange(e)} value={hobbies.idHobbie} />
                                </div>
                            ))

                            }
                        </div>

                        {status ?
                            <div className='alert alert-success text-center'>
                                <span>Personaje guardado correctamente <Link to={urlAlgoritmos+"/akinator/jugar"}>Jugar ahora</Link></span>
                            </div>
                            : ''
                        }
                        <div className="from-control d-flex justify-content-end ">
                            <input type="submit" value="Guardar personaje" className="btn btn-success mt-4" />
                        </div>

                    </form>
                    <div className=''>
                        <Link to={urlAlgoritmos+"/akinator/crear-hobbie"}>Agregar un pasatiempo</Link>
                    </div>
                </div>
            </div>
            
            }



            
        </>
    )
}