import { useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { urlApi } from '../../global';
import axios from 'axios';
export const FormHobbie = ({ btnHome }) => {
    const [status, setStatus] = useState(false);
    const [name, setName] = useState([]);
    const handleSubmit = (e) => {
        e.preventDefault();
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
            <div onClick={btnHome} className="home-icon">
                <AiOutlineHome />
            </div>
            <div className="container">
                <h1 className="text-center">Crear nuevo pasatiempos</h1>
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <h2 className="text-primary">Nombre: </h2>
                            <input type="text" className="form-control" name="name" required onChange={(e) => handleChange(e)} require="true" placeholder="Escribe el nombre del pasatiempo"  />
                        </div>
                        {status ? <div className='alert alert-success text-center'>
                            <span>Hobbie Guardado correctamente <Link to="/jugar">Jugar ahora</Link></span>
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