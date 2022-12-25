import { useState, useEffect } from "react";
import axios from "axios";
import { urlApi } from "../../../global";
export const Profile = () => {
    const [data, setData] = useState({});
    const [status, setSatatus] = useState(false);
    useEffect(() => {
        getUserData();
    }, []);
    // DEVOLVEMOS LOS DATOS DEL USUARIOS ALMACENADOS EN LA BASE DE DATOS
    const getUserData = async () => {
        try {
            const userData = await axios.get(urlApi + 'get-user-information', {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            if (userData) setData(...userData.data)
            else window.location.href = '/';
        } catch (err) {
            console.log(err)
        }
    }
    // TRAEMOS LOS DATOS DEL FORMULARIO PARA GUARDARLOS EN EL STATE 
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    };
    // HACEMOS LA FUNCION PARA ENVIAR LOS DATOS GURADADOS EN EL STATE AL SERVIDOR 
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (localStorage.getItem('token')) {
                const updatedInformation = await axios.put(urlApi + 'update-information', data, {
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    }
                })
                if (updatedInformation.status === 200) { setSatatus(true) }
                else {
                    localStorage.clear();
                    window.location.href = '/';
                }
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <div className="container">
                <h1 className="text-center">Bienvenido</h1>
                <div className="perfil-container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group row mt-2">
                            <label htmlFor="staticName" className="col-sm-2 col-form-label">Nombre:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" name="name" value={data.name} onChange={(e) => handleChange(e)} placeholder="Escribe tu nombre" />
                            </div>
                        </div>
                        <div className="form-group row mt-2">
                            <label htmlFor="staticLastName" className="col-sm-2 col-form-label">Apellidos:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" name="lastName" value={data.lastName} onChange={(e) => handleChange(e)} placeholder="Escribe tus apellidos" />
                            </div>
                        </div>
                        <div className="form-group row mt-2">
                            <label htmlFor="inputUser" className="col-sm-2 col-form-label">Usuario:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" name="userName" value={data.userName} onChange={(e) => handleChange(e)} placeholder="Escribe tu usuario" />
                            </div>
                        </div>
                        {/* <div className="form-group row mt-2">
                                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Fecha de nacimiento:</label>
                                <div className="col-sm-10">
                                    <input type="date" className="form-control" name="birthDay" value={data.birthDay} onChange={(e)=> handleChange(e)} />
                                </div>
                            </div> */}
                        <div className="form-group row mt-2">
                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Telefono:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" name="phone" value={data.phone} onChange={(e) => handleChange(e)} placeholder="Escribe tu numero de telefono" />
                            </div>
                        </div>
                        <div className="form-group row mt-2">
                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Pais:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" name="country" value={data.country} onChange={(e) => handleChange(e)} placeholder="Escribe tu pais" />
                            </div>
                        </div>
                        <div className="form-group row mt-2">
                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Dirección:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" name="address" value={data.address} onChange={(e) => handleChange(e)} placeholder="Escribe tu direccion" />
                            </div>
                        </div>
                        {status ? <div className='alert alert-success text-center mt-4'><span>Datos actualizados correctamente</span></div> : ''}
                        <div className="w-100 mt-2">
                            <input type="submit" className="btn btn-primary " style={{ "float": "right" }} value="Actualizar" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}