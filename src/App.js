import './App.css';
//******************COMPONENTES DEL JUEGO AKINATOR*********** */
import { Home } from './components/akinator/Home';
import { FormPersonaje } from './components/akinator/forms/FormPersonaje';
import { FormHobbie } from './components/akinator/forms/FormHobbie';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Game } from "./components/akinator/Game";
//******************FIN DE LOS COMPONENTES DEL JUEGO AKINATOR*********** */

/******************COMPONENTES DEL CASOS COVID*********** */
import { ListaPaises } from './components/covid/ListaPaises';
/******************FIN COMPONENTES CASOS COVID*********** */
/******************COMPONENTES DE LOS EJERCICIOS DE ALGORITMOS*********** */
import { ExerciseSection } from './components/ejerciciosAlgoritmos/ExerciseSection';
/******************FIN COMPONENTES DE LOS EJERCICIOS DE ALGORITMOS*********** */


import { Error } from './components/akinator/Error';

const btnHome = () => {
  window.location.href = "/"
}
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          {/* RUTAS AKINATOR */}
          <Route path='/jugar' element={<Game btnHome={btnHome} />} />
          <Route path='/crear-nuevo-personaje' element={<FormPersonaje btnHome={btnHome} />} />
          <Route path='/crear-hobbie' element={<FormHobbie btnHome={btnHome} />} />
          {/*RUTAS CASOS COVID  */}
          <Route path='/casos-covid' element={<ListaPaises btnHome={btnHome} />} />

          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
