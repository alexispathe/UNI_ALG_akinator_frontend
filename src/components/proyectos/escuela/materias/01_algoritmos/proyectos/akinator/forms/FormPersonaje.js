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
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [name, setName] = useState("");
    const [categoryID,setCategoryID] = useState('');
    const [subCategoryID, setSubCategoryID] = useState('');
    const [status, setStatus] = useState(false);
    const [statusSpinner, setStatusSpinner] = useState(true);

    const btnDisabled = document.querySelector('input[type="submit"]'); //llamamos al boton de submit para desactivarlo o activarlo dependiendo el caso
    // AQUI LLAMAMOS A LOS HOBBIES GUARDADOS EN LA BASE DE DATOS
    useEffect(() => {
        getCategories();

    }, []);
    const getCategories = () => {
        axios.get(urlApi + '/get-categories').then(res => {
            if (res.data.data) {
                setCategories(res.data.data);
                setStatusSpinner(false);
            } else {
                console.log("Erroorrrrrrr")
            }
        }).catch(err => console.log(err))
    }
    const getSubCategories = (category) => {
        axios.get(urlApi + 'get-sub-categories/' + category).then(res => {
            setSubCategories([...res.data.data]);
        })
            .catch(err => console.log(err));

    }
    const getHobbies = (subCategory) => {
        console.log(urlApi + 'get-category-hobbies/' + subCategory)
        axios.get(urlApi + 'get-category-hobbies/' + subCategory).then(hobbie => {
            setArryHobbies([...hobbie.data.data]);



        })
            .catch(err => console.log(err));
        // console.log(hobbiess);
        // setArryHobbies()
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(btnDisabled)
        btnDisabled.disabled = true;
        const data = {
            name,
            hobbies: hobbiesData,
            categoryID,
            subCategoryID
        }
        // Guardado los datos al servidor

        axios.post(urlApi + '/save-personaje', data)
            .then(data => {
                // console.log("Datos ", data)
                data ? setStatus(true) : setStatus(false);
            });

    }
    const handleChange = (e) => {
        if (e.target.name === "categoryID") {
            setCategoryID(e.target.value);
            getSubCategories(e.target.value);
        }
        if (e.target.name === "subCategoryID") {
            setSubCategoryID(e.target.value);
            getHobbies(e.target.value);
            
        }
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
                    <Spinner />
                    :
                    <div className="container">
                        <h1 className="text-center">Crea tu personaje</h1>
                        <div className="form-container">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <h2 className="text-primary">Nombre: </h2>
                                    <input type="text" className="form-control" name="name" required onChange={(e) => handleChange(e)} placeholder="Escribe tu nombre" />
                                </div>
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
                                {/* Contenedor donde almacena todos los checkbox */}
                                {arrayHobbies.length >= 1 && subCategories.length >=1?
                                    <div>
                                        <h1 className="text-primary">Pasatiempos:</h1>
                                        <div className="row m-auto ">
                                            {arrayHobbies.map((hobbies) => (
                                                <div className="form-check col col-xl-3 col-lg-3 col-sm-4 col-12" key={hobbies.idHobbie}>
                                                    <label className="form-check-label">{hobbies.name}</label>
                                                    <input type="checkbox" className="form-check-input" name='hobbies' onChange={(e) => handleChange(e)} value={hobbies.idHobbie} />
                                                </div>
                                            ))
                                            }
                                        </div>
                                    </div>

                                    : ''
                                }
                                {status ?
                                    <div className='alert alert-success text-center'>
                                        <span>Personaje guardado correctamente <Link to={urlAlgoritmos + "/akinator/jugar"}>Jugar ahora</Link></span>
                                    </div>
                                    : ''
                                }
                                <div className="from-control d-flex justify-content-end ">
                                    <input type="submit" value="Guardar personaje" className="btn btn-success mt-4" />
                                </div>

                            </form>
                            <div className=''>
                                <Link to={urlAlgoritmos + "/akinator/crear-hobbie"}>Agregar un pasatiempo</Link>
                            </div>
                        </div>
                    </div>

            }




        </>
    )
}