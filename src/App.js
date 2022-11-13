import './App.css';
import {Home} from './components/Home';
import {Form} from './components/Form';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Error} from './components/Error';
function App() {
  return(
    <>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Home/>}/>
          <Route path='/crear-nuevo-personaje' element={<Form/>}/>
          <Route path='*' element={<Error/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
