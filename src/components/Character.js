import '../Styles/Character.css';
import { Link } from 'react-router-dom';
export const Character = ({ name }) => {
    const reload = () => {
        window.location.href = '/jugar'
    }
    return (
        <>
            <div className="character-container">
                <div className="character">
                    <h1>Tu personaje es {name} </h1>
                    <div className='d-flex justify-content-center c'>
                        <div className='m-2'>
                            <button onClick={reload} className="btn btn-primary">Reiniciar Juego</button>
                        </div>
                        <div className='m-2'>
                            <Link className="btn btn-warning " to="/">Regresar al inicio</Link>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}