import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { urlApi } from '../../global';
export const Login = () => {
    const [data, setData] = useState({});
    const [loginStatus, setLoginStatus] = useState(false);
    useEffect(() => {
        localStorage.getItem('token') ? window.location.href = '/perfil' : localStorage.clear();
    }, [])
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const user = await axios.post(urlApi + 'login-user', data);
            if (user.data.status === 404) setLoginStatus(true); //cuando no coencida el correo o contraseña
            if (user.data.status !== 404) {
                localStorage.setItem('token', user.data);
                if (localStorage.getItem('token')) {
                    window.location.href = '/perfil'
                }
            }
        } catch (err) {
            console.log(err)
        }
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
                                    <input type="text" className="form-control" name="email" onChange={(e) => handleChange(e)} placeholder="Escribe tu correo" required />
                                </div>
                            </div>
                            <div className="form-group row mt-2">
                                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Contraseña:</label>
                                <div className="col-sm-10">
                                    <input type="password" className="form-control" name="password" onChange={(e) => handleChange(e)} placeholder="Escribe tu contraseña" required />
                                </div>
                            </div>
                            {loginStatus ? <div className='alert alert-danger text-center mt-4'>
                                    <span>Correo o contraseña invalido </span>
                                </div> : ''}
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