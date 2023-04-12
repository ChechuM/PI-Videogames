// * SearchBar: un input de búsqueda para encontrar videojuegos por nombre

import './SearchBar.css';
import { useState } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function SearchBar(props) {

    const [input, setInput] = useState(0);

    const handleSearch = (event) => {
        let { value } = event.target;
        setInput(value);
    };

    return (
        <div className='barra'>
            <input type='search' className="input" value={input.id} onChange={handleSearch} placeholder=' Search your game by name' /><span> </span>
            <Icon icon={faMagnifyingGlass} onClick={() => props.onSearch(input)} className='add' />
        </div>
    )
}