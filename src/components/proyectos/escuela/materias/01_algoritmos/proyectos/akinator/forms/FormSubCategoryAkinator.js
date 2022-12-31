import axios from "axios";
import { useState, useEffect } from "react";
import { getUserID } from '../../../../../../../services/getUserID';
import { urlApi } from "../../../../../../../../global";
import { urlAlgoritmos } from "../../../../../../../../Router/escuela/materias/algoritmos/urlAlgoritmos";
import { Link } from "react-router-dom";
export const FormSubCategoryAkinator = () => {
    const [categories, setCategories] = useState([]);
    const [status, setStatus] = useState(false);
    const [subCategory, setSubCategory] = useState({})
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getID();
        } else {
            localStorage.clear();
            window.location.href = "/login";
        }
    }, [])
    const getID = () => {
        // VALIDAMOS QUE EL USUARIO ESTE ACTIVO PARA CREAR UNA NUEVA CATEGORIA
        getUserID().then(res => {
            if (res.status === 200) {
                getCategories();
            } else if (res.status === 401) {
                localStorage.clear();
                window.location.href = '/login'
            };
        }).catch(err => console.log(err));

    };
    const getCategories = () => {
        axios.get(urlApi + '/get-categories').then(res => {
            if (res.data.data) {
                setCategories(res.data.data);
            } else {
                console.log("Erroorrrrrrr")
            }
        }).catch(err => console.log(err))
    }
    const handleChange = (evt) => {
        setSubCategory({
            ...subCategory,
            [evt.target.name]: evt.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (localStorage.getItem('token')) {
            axios.post(urlApi + '/save-sub-category', subCategory, { headers: { 'Authorization': localStorage.getItem('token') } }).then(res => {
                console.log(res)
                if (res.status === 200) setStatus(true)
                if (res.status === 401) {
                    localStorage.clear();
                    window.location.href = '/login'
                }
            }).catch(err => console.log(err))
        } else {
            localStorage.clear();
            window.location.href = '/login'
        }

    }
    return (
        <>
            <div className="container">
                <h1 className="text-center">Crear nueva sub categoria</h1>

                <div className="form-container">
                    <div className="form-group">
                        <form onSubmit={handleSubmit}>
                            <div className="select-container">
                                <label>Selecciona la Categoria:</label>
                                <select className="form-select" name="categoryID" onChange={(e) => handleChange(e)} required >
                                    <option></option>
                                    {categories.map(category => (
                                        <option value={category.categoryID} key={category.categoryID}>
                                            {category.name}
                                        </option>
                                    ))
                                    }
                                </select>
                            </div>
                            <div className="form-group mt-2">
                                <input className="form-control" type="text" placeholder="escribe la subcategoria" name="name" onChange={(e) => handleChange(e)} required />
                            </div>
                            {status ? <div className='alert alert-success text-center mt-4'>
                                <span>Guardado correctamente <Link to={urlAlgoritmos + "/akinator/crear-nuevo-personaje"}>¡CREA TU PERSONAJE AHORA MISMO!</Link></span>
                            </div> : ''}

                            <div className="mt-2 d-flex justify-content-end ">
                                <input type="submit" value="Guardar sub categoria" className="btn btn-success " />
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </>
    )
}