import { useState } from "react";
import axios from "axios";
import { urlApi } from "../../../../../../../../global";
import { Link } from "react-router-dom";
import { urlAlgoritmos } from "../../../../../../../../Router/escuela/materias/algoritmos/urlAlgoritmos";
export const FormCategoryAkinator = () => {
    const [status, setStatus] = useState(false);
    const [category, setCategory] = useState({});
    const [characteristics1, setCharacteristics1] = useState({});
    const [characteristics2, setCharacteristics2] = useState({});


    const handleChange = (data) => {
        if (data.target.name === "name") {
            setCategory({ name: data.target.value })
        }
        else if (data.target.name === "characteristics1") {
            setCharacteristics1({ name: data.target.value })
        } else if (data.target.name === "characteristics2") {
            setCharacteristics2({ name: data.target.value })
        }
    }
    const saveCategory = (e) => {
        document.querySelector('input[type="submit"]').disabled = true;
        axios.post(urlApi+'/save-category',category).then(res=>{
            if(res) { 
                // e.target.name.value = ""
                saveCharacteristics(res.data.data.categoryID);
                setStatus(true);
            }else{
                setStatus(false)
            }
        }).catch(err=>console.log(err))
    };
    const saveCharacteristics = (categoryID) => {
        setCharacteristics1({...characteristics1, categoryID })
        setCharacteristics2({...characteristics2, categoryID })
        axios.post(urlApi+'/save-category-characteristics',characteristics1).catch(err=>console.log(err))
        axios.post(urlApi+'/save-category-characteristics',characteristics2).catch(err=>console.log(err))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        saveCategory(e);
    }
    return (
        <>
            <div className="container">
                <h1 className="text-center">Crear nueva categoria</h1>
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input className="form-control" type="text" name="name" placeholder="Escribe la nueva categoria " onChange={(e) => handleChange(e)} required />
                        </div>
                        <div className="form-group mt-2">
                            <input className="form-control" type="text" name="characteristics1" placeholder="Una caracteristica de la categoria" onChange={(e) => handleChange(e)} required />
                        </div>
                        <div className="form-group mt-2">
                            <input className="form-control" type="text" name="characteristics2" placeholder="Una caracteristica de la categoria" onChange={(e) => handleChange(e)} required />
                        </div>
                        {status ? <div className='alert alert-success text-center mt-4'>
                            <span>Guardado correctamente <Link to={urlAlgoritmos + "/akinator/crear-sub-categoria"}>¡CREAR SUB CATEGORIAS!</Link></span>
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