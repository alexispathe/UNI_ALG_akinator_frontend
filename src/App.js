import './App.css';
import {Home} from './components/akinator/Home';
import {FormPersonaje} from './components/akinator/forms/FormPersonaje';
import {FormHobbie} from './components/akinator/forms/FormHobbie';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Error} from './components/akinator/Error';
import { Game } from "./components/akinator/Game";

const btnHome = () => {
  window.location.href = "/"
}
function App() {
  return(
    <>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Home/>}/>
          <Route path='/jugar' element={<Game btnHome={btnHome}/>}/>
          <Route path='/crear-nuevo-personaje' element={<FormPersonaje btnHome={btnHome}/>}/>
          <Route path='/crear-hobbie' element={<FormHobbie btnHome={btnHome}/>}/>
          <Route path='*' element={<Error/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
