import '../../Styles/user/user.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { urlApi } from '../../global';
import axios from 'axios';
export const Register = () => {
    const [data, setData] = useState({});
    const [status, setStatus] = useState(false);
    const [duplicate, setDuplicate] = useState(false);
    useEffect(() => {
        localStorage.getItem('token') ? window.location.href = '/perfil' : localStorage.clear();
    }, []);
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const register = await axios.post(urlApi + '/register-user', data);
            if (register.data.code === "ER_DUP_ENTRY") {
                setDuplicate(true);
                setStatus(false)
            }
            else if (register.data.code !== "ER_DUP_ENTRY") {
                setStatus(true);
                setDuplicate(false)
            }
        } catch (err) {
            console.log(err)
        };

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
                                    <input type="password" className="form-control" name="password" onChange={(e) => handleChange(e)} placeholder="Escribe tu contraseña" min="3" required />
                                </div>
                            </div>
                            {status ? <div className='alert alert-success text-center mt-4'>
                                <span>Cuenta creada correctamente <Link to="/login">Iniciar sesion</Link></span>
                            </div> : ''}
                            {duplicate ? <div className='alert alert-danger text-center mt-4'>
                                <span>El correo ya se encuentra registrado</span>
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