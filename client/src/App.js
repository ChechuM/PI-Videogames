import './App.css';
import { React } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Detail from './components/Detail/Detail';
import Create from './components/Create/Create';
import Genres from './components/Genres/Genres';
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';
import Nav from './components/Nav/Nav';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const getStarted = () => {
    navigate('/videogames');
  }

  const onSearch = (name) => {
    console.log('this is name en fcion onSearch:', name)
    axios(`http:localhost:3001/videogames/name?name=${name}`)
      .then((response) => {
        //response es un array de objetos -> tengo que hacer que cambie el estado del componente Home para luego sean éstos los objetos que se rendericen
        console.log('esta es la respuesta del back al pedido de la fcion onSearch:', response)
      })
  }


  return (
    <div className="App">
      {location.pathname !== '/' && <Nav />}
      <Routes>
        <Route exact path='/videogames/newgame' element={<Create />} />
        <Route exact path='/videogames/:idVideogame' element={<Detail />} />
        <Route exact path='/videogames' element={<Home onSearch={onSearch} />} />
        <Route exact path='/' element={<Landing getStarted={getStarted} />} />
        <Route exact path='/genres' element={<Genres />} />
      </Routes >
    </div>
  );
}

export default App;
