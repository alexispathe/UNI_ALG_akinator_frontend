import { useState, useEffect } from "react";
import axios from "axios";
import { getUserID } from '../../../../../../../services/getUserID';
import { urlApi } from "../../../../../../../../global";
import { Link } from "react-router-dom";
import { urlAlgoritmos } from "../../../../../../../../Router/escuela/materias/algoritmos/urlAlgoritmos";
export const FormCategoryAkinator = () => {
    const [status, setStatus] = useState(false);
    const [category, setCategory] = useState({});
    const [characteristics1, setCharacteristics1] = useState({});
    const [characteristics2, setCharacteristics2] = useState({});
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getID();
        } else {
            localStorage.clear();
            window.location.href = "/login";
        }
    }, []);
    const getID = () => {
        // VALIDAMOS QUE EL USUARIO ESTE ACTIVO PARA CREAR UNA NUEVA CATEGORIA
        getUserID().then(res => {
            if (res.status === 401) {
                localStorage.clear();
                window.location.href = '/login'
            };
        }).catch(err => console.log(err));

    };
    const handleChange = (data) => {
        if (data.target.name === "name") setCategory({ name: data.target.value })
        else if (data.target.name === "characteristics1") setCharacteristics1({ name: data.target.value })
        else if (data.target.name === "characteristics2") setCharacteristics2({ name: data.target.value })




    }
    const saveCategory = (e) => {
        if (localStorage.getItem('token')) {
            // document.querySelector('input[type="submit"]').disabled = true;
            axios.post(urlApi + '/save-category', category, { headers: { 'Authorization': localStorage.getItem('token') } }).then(res => {
                if (res) {
                    // e.target.name.value = ""
                    console.log(res)
                    if(res.status === 200) saveCharacteristics(res.data.data.categoryID);
                    if(res.status ===401){
                        localStorage.clear();
                        window.location.href = "/login";
                    }
                    
                    setStatus(true);
                } else {
                    setStatus(false)
                }
            }).catch(err => console.log(err))
        } else {
            localStorage.clear();
            window.location.href = "/login";
        }

    };
    const saveCharacteristics = (categoryID) => {
        // Estrucuramos el objeto para mandarlo correctamente como esta configurado en el model del servidor
        const characteristics = { categoryID, "characteristics": [characteristics1, characteristics2] }
        axios.post(urlApi + '/save-category-characteristics', characteristics,{ headers: { 'Authorization': localStorage.getItem('token') }}).catch(err => console.log(err))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        saveCategory(e);

        // console.log(characteristics)


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