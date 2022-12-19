import axios from "axios";
import { useState, useEffect } from "react";
import { urlApi } from "../../../../../../../../global";
import { urlAlgoritmos } from "../../../../../../../../Router/escuela/materias/algoritmos/urlAlgoritmos";
import { Link } from "react-router-dom";
export const FormSubCategoryAkinator = () => {
    const [categories, setCategories] = useState([]);
    const [status, setStatus] = useState(false);
    const [subCategory, setSubCategory] = useState({})
    useEffect(() => {
        getCategories();
    },)
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
        [evt.target.name] : evt.target.value
       })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(subCategory)
        axios.post(urlApi+'/save-sub-category',subCategory).then(res=>{
            if(res.data.data) setStatus(true)
        }).catch(err=> console.log(err))
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
                                <select className="form-select" name="categoryID" onChange={(e)=> handleChange(e)} required >
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
                                <input className="form-control" type="text" placeholder="escribe la subcategoria" name="name" onChange={(e)=> handleChange(e)} required/>
                            </div>
                            {status ? <div className='alert alert-success text-center mt-4'>
                            <span>Guardado correctamente <Link to={urlAlgoritmos+"/akinator/crear-nuevo-personaje"}>¡CREA TU PERSONAJE AHORA MISMO!</Link></span>
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