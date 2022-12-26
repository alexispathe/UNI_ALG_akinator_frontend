import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components/header/Header';
import { Home } from './components/Home/Home';
import { Error } from './components/Error/Error';


//******************RUTAS Y COMPONENTES DEL JUEGO AKINATOR*********** */
import { akinatorRoutes } from './Router/escuela/materias/algoritmos/proyectos/akinatorRoutes';

/******************RUTAS Y COMPONENTES DE LOS CASOS COVID*********** */
import { covidRoutes } from './Router/escuela/materias/algoritmos/proyectos/covidRoutes';

/******************RUTAS Y COMPONENTES DE LOS EJERCICIOS DE ALGORITMOS*********** */
import { EjerciciosRoutes } from './Router/escuela/materias/algoritmos/ejercicios/ejerciciosRoutes';
/******************FIN COMPONENTES DE LOS EJERCICIOS DE ALGORITMOS*********** */

/******************RUTAS DEL USUARIO *********************/
import { userRoutes } from './Router/user/userRoutes';
/*****************FIN***********************/

const btnHome = () => {
  window.location.href = "/"
}
function App() {
  return (
    <>

      <BrowserRouter>
        <Header btnHome={btnHome} />
        <Routes>
          <Route path='/' element={<Home />} />
          {/* RUTAS AKINATOR */}
          {akinatorRoutes.map((route, i) => (<Route key={i} path={route.path} element={route.element} btnHome={btnHome} />))}

          {/*RUTAS CASOS COVID  */}
          {covidRoutes.map((route, i) => (<Route key={i} path={route.path} element={route.element} />))}

          {/* RUTAS PARA EJERCICIOS ALGORITMOS */}
          {EjerciciosRoutes.map((route, i) => (<Route key={i} path={route.path} element={route.element} />))}
          {/* RUTAS DEL USUARIO */}
          {userRoutes.map((route, i) => (<Route key={i} element={route.element} path={route.path} />))}
          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
