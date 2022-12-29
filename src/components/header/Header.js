import { AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import '../../Styles/header/Header.css';
import { BiLogOut } from 'react-icons/bi';
import { useEffect, useState } from "react";
import { urlApi } from "../../global";
import axios from "axios";
export const Header = ({ btnHome }) => {
    const [login, setLogin] = useState(false);
    const [profilePicture, setProfilePicture] = useState('');
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            getProfilePicture(token);
        }
    }, []);
    const getProfilePicture = async (token) => {
        // Estamos devolviendo la imagen de perfil del usuario
        try {
            const getPicture = await axios.get(urlApi + 'get-profile-picture', {
                headers: {
                    'Authorization': token
                }
            });
            if(getPicture.data.status === 401){
                //Error al verificar el token
                localStorage.clear();
                window.location.href = '/';
            }else if(getPicture.data.status !== 401){
                // Si no hay problemas con el token se ejecuta esto
                const [data] = getPicture.data;
                if (data) {
                    setProfilePicture(`${urlApi}get-image/${data.profilePicture}`);
                    setLogin(true);
    
                }
            }
           
        } catch (err) {
            console.log(err)
        }
    }
    const logout = () => {
        localStorage.clear();
        window.location.href = "/";
    }
    return (
        <>
            <div className="header-container">
                <div className="header-left-container">
                    <div onClick={btnHome} className="home-icon">
                        <AiOutlineHome />
                    </div>
                </div>

                <div className="header-right-container">
                    {
                        !login ?
                            <div className="header-btn-login-container">
                                <div className="btn-login-container">
                                    <Link to="/login">Iniciar Sesion</Link>
                                </div>
                                <div className="btn-login-container">
                                    <Link to="/crear-cuenta">Crear cuenta</Link>
                                </div>
                            </div>
                            :
                            <div >

                                <div className="btn-profile-icon-container">
                                    <div className="btn-profile-icon">
                                        <Link to="/perfil">
                                            <img src={profilePicture} alt="imagen del perfil" />
                                        </Link>
                                    </div>

                                </div>
                                <div className="btn-logout-icon-container">
                                    <BiLogOut onClick={logout} />
                                </div>
                            </div>

                    }
                </div>
            </div>
        </>
    )
}