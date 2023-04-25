import './App.css';
import { React } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
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

  return (
    <div className="App">
      {location.pathname !== '/' && <Nav />}
      <Routes>
        <Route exact path='/videogames/newgame' element={<Create />} />
        <Route exact path='/videogames/:idVideogame' element={<Detail />} />
        <Route exact path='/videogames' element={<Home />} />
        <Route exact path='/' element={<Landing getStarted={getStarted} />} />
        <Route exact path='/genres' element={<Genres />} />
      </Routes >
    </div>
  );
}

export default App;
