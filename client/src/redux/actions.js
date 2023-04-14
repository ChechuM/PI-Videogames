
export const GET_ALL_GAMES = 'GET_ALL_GAMES'
export const ADD_GAME = 'ADD_GAME'
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE'
export const FILTER_BY_ORIGIN = 'FILTER_BY_ORIGIN'
export const ORDER_BY_RATING = 'ORDER_BY_RATING'
export const ORDER_BY_NAME = 'ORDER_BY_NAME'

export const getAllGames = () => {
    fetch('http://localhost:3001/videogames')
        .then((response) => response.json())
        .then((data) => {
            return {
                type: GET_ALL_GAMES,
                payload: data
            }
        })
}

export const addGame = (game) => {
    return {
        type: ADD_GAME,
        payload: game
    }
}

export const filterByGenre = (genre) => {
    // debería obtener aquí las tablas intermedias y trabajar desde aquí!!!!
    return {
        type: FILTER_BY_GENRE,
        payload: genre
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
