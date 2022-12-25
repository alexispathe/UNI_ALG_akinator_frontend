import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { urlApi } from '../../global';
export const Login = () => {
    const [data, setData] = useState({});
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(urlApi + 'login-user', data).then(res => {
            if (res) {
                localStorage.setItem('token', res.data);
                if (localStorage.getItem('token')) {
                    window.location.href ='/perfil'
                }
            }
        }).catch(err => console.log(err))
    }
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }
    return (
        <>
            <div className="container">
                <div className="login-container">
                    <h1 className="text-center">Iniciar sesion</h1>
                    <div className="login">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group row mt-2">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Correo:</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" name="email" onChange={(e) => handleChange(e)} placeholder="Escribe tu correo" required/>
                                </div>
                            </div>
                            <div className="form-group row mt-2">
                                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Contraseña:</label>
                                <div className="col-sm-10">
                                    <input type="password" className="form-control" name="password" onChange={(e) => handleChange(e)} placeholder="Escribe tu contraseña" required/>
                                </div>
                            </div>
                            <div className="w-100 mt-2">
                                <Link to="/crear-cuenta" className="btn btn-link " style={{ "float": "left" }} value="Registrar">Crear cuenta</Link>

                                <input type="submit" className="btn btn-primary " style={{ "float": "right" }} value="login" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
};