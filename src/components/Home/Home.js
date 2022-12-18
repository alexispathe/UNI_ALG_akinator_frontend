import { Link } from 'react-router-dom';
import '../../Styles/home/Home.css';
export const Home = () => {
  return (
    <div className="home-container">
      <div className='home'>

        <div className='btn-container'>
          <div className='b-btn'>
            <div className='title-container'>
              <h1>¡BIENVENIDO!</h1>
            </div>
            <div className='btn-link-container'>
              <Link to="proyectos-uaq/materia/algoritmos/akinator/jugar" className='btn btn-primary'>Comenzar Juego</Link>
            </div>
            <div className='btn-link-container'>
              <Link to="proyectos-uaq/materia/algoritmos/akinator/crear-categoria" className='btn btn-success'>Crear categoria</Link>
            </div>
            <div className='btn-link-container'>
              <Link to="proyectos-uaq/materia/algoritmos/akinator/crear-sub-categoria" className='btn btn-success'>Crear sub categoria</Link>
            </div>
            <div className='btn-link-container'>
              <Link to="proyectos-uaq/materia/algoritmos/akinator/crear-nuevo-personaje" className='btn btn-warning'>Crear tu personaje</Link>
            </div>
            <div className='btn-link-container'>
              <Link to="proyectos-uaq/materia/algoritmos/covid/casos-covid" className='btn btn-danger'>Casos COVID 19</Link>
            </div>
            <div className='btn-link-container'>
              <Link to="proyectos-uaq/materia/algoritmos/ejercicios" className='btn btn-success'>Ejercicios</Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );


};