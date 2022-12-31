import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { urlApi } from '../../../../../../../../global';
import { urlAlgoritmos } from '../../../../../../../../Router/escuela/materias/algoritmos/urlAlgoritmos';
import { Spinner } from '../../../../../../../spinner/Spinner';
import { getUserID } from '../../../../../../../services/getUserID';
import axios from 'axios';
export const FormHobbie = () => {
    const [status, setStatus] = useState(false);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [statusSpinner, setStatusSpinner] = useState(true);
    const [hobbie, setHobbie] = useState({});
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // document.querySelector('input[type="submit"]').disabled = true;
        // Guardado los datos al servidor 
        if (localStorage.getItem('token')) {
            axios.post(urlApi + 'save-hobbies/', hobbie, { headers: { 'Authorization': localStorage.getItem('token') } })
                .then(data => {
                    // console.log(data);
                    if (data.status === 200) {
                        e.target.name.value = "";
                        setStatus(true)
                    } else if (data.status === 404) {
                        localStorage.clear();
                        window.location.href = '/login'
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        } else {

            localStorage.clear();
            window.location.href = '/login'
        }


    }
    const getCategories = () => {
        axios.get(urlApi + '/get-categories').then(res => {
            if (res.data.data && res.data.data.length >= 1) {
                setCategories(res.data.data);
                setStatusSpinner(false);
            } else {
                console.log("Erroorrrrrrr")
            }
        }).catch(err => console.log(err))
    }
    const getSubCategories = (category) => {
        axios.get(urlApi + 'get-sub-categories/' + category).then(res => {
            res.data.data && res.data.data.length >= 1 ? setSubCategories([...res.data.data]) : setSubCategories([]);
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