import './Form.css';
import { React, useState } from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';

export default function Form(props) {
    const genres = useSelector(store => store.genres);
    const { input, handleInputChange, checkingSelect, descripcion } = props;

    const handleSubmit = () => {

    }
    return (
        <div className='formDiv'>
            <form onSubmit={handleSubmit}>
                <label>Name: </label>
                <input
                    name='name'
                    placeholder='Name of the game...'
                    type='text'
                    onChange={handleInputChange}
                    value={input.name}>
                </input>
                <hr />
                <label>Image: </label>
                <input
                    name='image'
                    placeholder='Cool image of the game...'
                    type='text'
                    onChange={handleInputChange}
                    value={input.image} >
                </input>
                <hr />
                <label>Platforms: </label>
                <input
                    name='platforms'
                    placeholder='Platforms where the game can be played...'
                    type='text'
                    onChange={handleInputChange}
                    value={input.platforms}>
                </input>
                <hr />
                <label>Launch: </label>
                <input
                    name='launch'
                    placeholder='02-04-2023'
                    type='text'
                    onChange={handleInputChange}
                    value={input.launch}>
                </input>
                <hr />
                <label>Rating: </label>
                <input
                    name='rating'
                    placeholder='Set initial rating (from 0-5)'
                    type='text'
                    onChange={handleInputChange}
                    value={input.rating}>
                </input>
                <hr />
                <label>Genres: </label>
                <Select
                    name='genre'
                    options={genres.map(gen => ({ label: gen.name, value: gen.name }))}
                    isMulti
                    onChange={checkingSelect}>
                </Select>
                <hr />
                <label>Description: </label>
                <label>{input.description}</label>
                <hr />
                <button className='newGame'><Icon icon={faSquarePlus} /></button>
            </form>
        </div >
    )
}
