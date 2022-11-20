import './App.css';
import {Home} from './components/Home';
import {FormPersonaje} from './components/forms/FormPersonaje';
import {FormHobbie} from './components/forms/FormHobbie';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Error} from './components/Error';
import { Game } from "./components/Game";

function App() {
  return(
    <>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Home/>}/>
          <Route path='/jugar' element={<Game/>}/>
          <Route path='/crear-nuevo-personaje' element={<FormPersonaje/>}/>
          <Route path='/crear-hobbie' element={<FormHobbie/>}/>
          <Route path='*' element={<Error/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
