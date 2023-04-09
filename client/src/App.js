import './App.css';
import { React } from 'react';
import { Route, Routes } from 'react-router-dom';
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';
import Genres from './components/Genres/Genres';
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';

function App() {
  return (
    <div className="App">
      <h1>Henry Videogames</h1>
      <Routes>
        <Route exact path='/videogames/newgame' element={<Form />} />
        <Route exact path='/videogames/:idVideogame' element={<Detail />} />
        <Route exact path='/videogames' element={<Home />} />
        <Route exact path='/' element={<Landing />} />
        <Route exact path='/genres' element={<Genres />} />
      </Routes >
    </div>
  );
}

export default App;
