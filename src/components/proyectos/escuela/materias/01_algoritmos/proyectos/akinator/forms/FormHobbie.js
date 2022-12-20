import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { urlApi } from '../../../../../../../../global';
import { urlAlgoritmos } from '../../../../../../../../Router/escuela/materias/algoritmos/urlAlgoritmos';
import { Spinner } from '../../../../../../../spinner/Spinner';
import axios from 'axios';
export const FormHobbie = () => {
    const [status, setStatus] = useState(false);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [statusSpinner, setStatusSpinner] = useState(true);
    const [hobbie, setHobbie] = useState({});
    useEffect(() => {
        getCategories();
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault();
        // document.querySelector('input[type="submit"]').disabled = true;
        // Guardado los datos al servidor
        axios.post(urlApi + 'save-hobbies/', hobbie)
            .then(data => {
                if (data) {
                    e.target.name.value = "";
                    setStatus(true)
                } else {
                    setStatus(false);
                }
            })
            .catch(err => {
                console.log(err)
            })

    }
    const getCategories = () => {
        axios.get(urlApi + '/get-categories').then(res => {
            if (res.data.data && res.data.data.length >=1) {
                setCategories(res.data.data);
                setStatusSpinner(false);
            } else {
                console.log("Erroorrrrrrr")
            }
        }).catch(err => console.log(err))
    }
    const getSubCategories = (category) => {
        axios.get(urlApi + 'get-sub-categories/' + category).then(res => {
            res.data.data && res.data.data.length >=1? setSubCategories([...res.data.data]): setSubCategories([]);
        })
            .catch(err => console.log(err));

    }

    const handleChange = (e) => {
        if (e.target.name === "categoryID") getSubCategories(e.target.value)
        setHobbie({
            ...hobbie,
            [e.target.name]: e.target.value
        })
        // setName(e.target.value);
    }

    return (
        <>

            <div className="container">
                <form onSubmit={handleSubmit}>
                    <h1 className="text-center">Crear nuevo pasatiempos</h1>
                    {categories.length >= 1 ?
                        <div className="select-container">
                            <h1 className="text-primary">Selecciona la categoria:</h1>
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
                        : <Spinner />

                    }
                    {subCategories.length >= 1 && categories.length >= 1 ?
                        <div className="select-container">
                            <h1 className="text-primary">Selecciona una sub categoria:</h1>
                            <select className="form-select" name="subCategoryID" onChange={(e) => handleChange(e)} required >
                                <option></option>
                                {subCategories.map(subCategory => (
                                    <option value={subCategory.subCategoryID} key={subCategory.subCategoryID}>
                                        {subCategory.name}
                                    </option>
                                ))
                                }
                            </select>
                        </div>
                        : ''

                    }
                    {subCategories.length >= 1 && categories.length >= 1 ?
                        <div className="form-container">

                            <div className="form-group">
                                <h2 className="text-primary">Nombre: </h2>
                                <input type="text" className="form-control" name="name" required onChange={(e) => handleChange(e)} require="true" placeholder="Escribe el nombre del pasatiempo" />
                            </div>
                            {status ? <div className='alert alert-success text-center mt-4'>
                                <span>Guardado correctamente <Link to={urlAlgoritmos + "/akinator/crear-nuevo-personaje"}>¡CREA TU PERSONAJE AHORA MISMO!</Link></span>
                            </div> : ''}


                            <div className="mt-2 d-flex justify-content-end ">
                                <input type="submit" value="Guardar pasatiempo" className="btn btn-success " />
                            </div>

                        </div> : ''}
                </form>


            </div>
        </>
    )
}