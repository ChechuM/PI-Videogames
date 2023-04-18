// * SearchBar: un input de búsqueda para encontrar videojuegos por nombre

import './SearchBar.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faFilterCircleXmark, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import * as actions from '../../redux/actions';
import { useDispatch } from 'react-redux';

export default function SearchBar(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [input, setInput] = useState(0);

    const handleSearch = (event) => {
        let { value } = event.target;
        setInput(value);
    };

    const onSearch = (name) => {
        if (!name) return;
        fetch(`http://localhost:3001/videogames/name?name=${name}`)
            .then((response) => { return response.json() })
            .then((response) => {
                dispatch(actions.getGamesByName(response))
            })
    }

    const backToAll = () => {
        dispatch(actions.getAllGames())
    }

    return (
        <div className='barra'>
            <button className='newGame' onClick={() => { navigate('/videogames/newgame') }}><Icon icon={faSquarePlus} /></button> <span> </span>
            <input type='search' className="input" value={input.id} onChange={handleSearch} placeholder=' Search your game by name' /><span> </span>
            <button className='onSearch'><Icon icon={faMagnifyingGlass} onClick={() => onSearch(input)} className='add' /></button>
            <button className='noFilter'><Icon icon={faFilterCircleXmark} onClick={() => backToAll()} /></button>
        </div>
    )
}