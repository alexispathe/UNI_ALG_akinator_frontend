import { useState } from 'react';
import { Link } from 'react-router-dom';
import { urlApi } from '../../../../../../../../global';
import { urlAlgoritmos } from '../../../../../../../../Router/escuela/materias/algoritmos/urlAlgoritmos';
import axios from 'axios';
export const FormHobbie = () => {
    const [status, setStatus] = useState(false);
    const [name, setName] = useState([]);
    const handleSubmit = (e) => {
        e.preventDefault();
        document.querySelector('input[type="submit"]').disabled = true;
        const data = {
            name
        }
        // Guardado los datos al servidor
        axios.post(urlApi+'save-hobbies/',data)
        .then(data=>{
            if(data){
                e.target.name.value = "";
                setStatus(true)
                // console.log(data)
            }else{
                setStatus(false);
            }
        })
        .catch(err=>{
            alert("Ocurrio un error")
        })

    }
    const handleChange = (e) => {
        setName(e.target.value);
    }

    return (
        <>
            
            <div className="container">
                <h1 className="text-center">Crear nuevo pasatiempos</h1>
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <h2 className="text-primary">Nombre: </h2>
                            <input type="text" className="form-control" name="name" required onChange={(e) => handleChange(e)} require="true" placeholder="Escribe el nombre del pasatiempo"  />
                        </div>
                        {status ? <div className='alert alert-success text-center mt-4'>
                            <span>Guardado correctamente <Link to={urlAlgoritmos+"/akinator/crear-nuevo-personaje"}>¡CREA TU PERSONAJE AHORA MISMO!</Link></span>
                        </div> : ''}


                        <div className="mt-2 d-flex justify-content-end ">
                            <input type="submit" value="Guardar pasatiempo" className="btn btn-success " />
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}