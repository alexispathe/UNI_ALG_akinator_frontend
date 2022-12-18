import { useState } from "react";
import axios from "axios";
import { urlApi } from "../../../../../../../../global";
import { Link } from "react-router-dom";
import { urlAlgoritmos } from "../../../../../../../../Router/escuela/materias/algoritmos/urlAlgoritmos";
export const FormCategoryAkinator = () => {
    const [status, setStatus] = useState(false);
    const [category,setCategory] = useState({name:''});
    const handleSubmit =(e)=>{
        e.preventDefault();
        document.querySelector('input[type="submit"]').disabled = true;
      
        // console.log(category);
        axios.post(urlApi+'/save-category',category).then(res=>{
            if(res) { 
                e.target.name.value = ""
                setStatus(true);
            }else{
                setStatus(false)
            }
        }).catch(err=>console.log(err))

    }
    return (
        <>
            <div className="container">
                <h1>Crear nueva categoria</h1>
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input className="form-control" type="text" name="name" placeholder="Escribe la nueva categoria " onChange={(e)=> setCategory({name: e.target.value})}/>
                        </div>
                        {status ? <div className='alert alert-success text-center mt-4'>
                            <span>Guardado correctamente <Link to={urlAlgoritmos+"/akinator/crear-sub-categoria"}>¡CREAR SUB CATEGORIAS!</Link></span>
                        </div> : ''}

                        <div className="mt-2 d-flex justify-content-end ">
                            <input type="submit" value="Guardar categoria" className="btn btn-success " />
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}