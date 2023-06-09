import axios from "axios";

export const GET_ALL_GAMES = 'GET_ALL_GAMES'
export const GET_ALL_GENRES = 'GET_ALL_GENRES'
export const GET_GAMES_BY_NAME = 'GET_GAMES_BY_NAME'
export const ADD_GAME = 'ADD_GAME'
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE'
export const FILTER_BY_ORIGIN = 'FILTER_BY_ORIGIN'
export const ORDER_BY_RATING = 'ORDER_BY_RATING'
export const ORDER_BY_NAME = 'ORDER_BY_NAME'

export const getAllGames = () => {
    return async function (dispatch) {
        let response = await axios.get('http://localhost:3001/videogames')
        return dispatch(
            {
                type: GET_ALL_GAMES,
                payload: response.data
            }
        )
    }
}

export const getAllGenres = () => {
    return async function (dispatch) {
        let response = await axios.get('http://localhost:3001/genres')
        return dispatch(
            {
                type: GET_ALL_GENRES,
                payload: response.data
            }
        )
    }
}

export const getGamesByName = (game) => {
    return async function (dispatch) {
        let response = await axios.get(`http://localhost:3001/videogames/name?name=${game}`)
        return dispatch(
            {
                type: GET_GAMES_BY_NAME,
                payload: response.data
            }
        )
    }
}

export const addGame = (game) => {
    return async function (dispatch) {
        await axios.post('http://localhost:3001/videogames', { game }) // se envía así porque es un post y envía un JSON!!!
            .then((response) => {
                return dispatch({
                    type: ADD_GAME,
                    payload: response
                })
            })
            .catch((err) => console.log(err));
    }
}

export const filterByGenre = (genre) => {
    return {
        type: FILTER_BY_GENRE,
        payload: genre,
    }
}

export const filterByOrigin = (origin) => {
    return {
        type: FILTER_BY_ORIGIN,
        payload: origin
    }
}

export const orderByRating = (order) => {
    return {
        type: ORDER_BY_RATING,
        payload: order
    }
}

export const orderByName = (order) => {
    return {
        type: ORDER_BY_NAME,
        payload: order
    }
}
