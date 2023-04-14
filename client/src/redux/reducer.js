import { GET_ALL_GAMES, ADD_GAME, FILTER_BY_GENRE, FILTER_BY_ORIGIN, ORDER_BY_RATING, ORDER_BY_NAME } from "./actions";

const initialState = {
    videogames: [],
    filteredVideogames: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_GAMES:
            return {
                ...state,
                videogames: [...state.videogames, ...action.payload]
            }

        case ADD_GAME:
            return {
                ...state,
                videogames: [...state.videogames, action.payload]
            }

        case FILTER_BY_GENRE:
            // buscar cómo acceder a las tablas intermedias en la BDD!!!! -> info obtenida desde las actions
            const filteredByGenre = state.videogames.filter(game => game.gender === action.payload)
            return {
                ...state,
                filteredVideogames: [...filteredByGenre]
            }
        case FILTER_BY_ORIGIN:
            let filteredByOrigin = []
            if (action.payload === 'base de datos') filteredByOrigin = state.videogames.filter(game => game.id < 10)
            if (action.payload === 'created by user') filteredByOrigin = state.videogames.filter(game => game.id > 10)
            return {
                ...state,
                filteredVideogames: [...filteredByOrigin]
            }
        case ORDER_BY_RATING:
            return {
                ...state,
                filteredVideogames:
                    action.payload === 'Ascendente'
                        ? state.videogames.sort((a, b) => a.id - b.id)
                        : state.videogames.sort((a, b) => b.id - a.id)
            }
        case ORDER_BY_NAME:
            // buscar cómo ordenar alfabéticamente los objetos -> será así?
            return {
                ...state,
                filteredVideogames:
                    action.payload === 'Ascendente'
                        ? state.videogames.sort((a, b) => a.name - b.name)
                        : state.videogames.sort((a, b) => b.name - a.name)
            }
    }
}