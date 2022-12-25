import '../../Styles/user/user.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { urlApi } from '../../global';
import axios from 'axios';
export const Register = () => {
    const [data, setData] = useState({});
    const [status, setStatus] = useState(false)
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(urlApi + '/register-user', data).then(res => {
            if (res) {
                setStatus(true);

            }
        }).catch(err => console.log(err));

    }
    return (
        <>
            <div className="container">
                <div className="register-container">
                    <h1 className="text-center">Crear cuenta</h1>
                    <div className="register">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group row mt-2">
                                <label htmlFor="staticName" className="col-sm-2 col-form-label">Nombre:</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" name="name" onChange={(e) => handleChange(e)} placeholder="Escribe tu nombre" required />
                                </div>
                            </div>
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
                            {status ? <div className='alert alert-success text-center mt-4'>
                                <span>Cuenta creada correctamente <Link to="/login">Iniciar sesion</Link></span>
                            </div> : ''}
                            <div className="w-100 mt-2">
                                <Link to="/login" className="btn btn-link " style={{ "float": "left" }} value="Registrar">Iniciar sesion</Link>
                                <input type="submit" className="btn btn-primary " style={{ "float": "right" }} value="Registrar" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
};