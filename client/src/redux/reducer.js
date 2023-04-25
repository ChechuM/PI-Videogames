import { GET_ALL_GAMES, GET_ALL_GENRES, GET_GAMES_BY_NAME, ADD_GAME, FILTER_BY_GENRE, FILTER_BY_ORIGIN, ORDER_BY_RATING, ORDER_BY_NAME } from "./actions";

const initialState = {
    allVideogames: [],
    videogames: [],
    genres: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_GAMES:
            return {
                ...state,
                videogames: [...action.payload],
                allVideogames: [...state.allVideogames, ...action.payload]
            }

        case GET_ALL_GENRES:
            return {
                ...state,
                genres: [...action.payload]
            }

        case GET_GAMES_BY_NAME: // no tiene que buscarlo del state! tiene que ir a la BDD y a la Api
            return {
                ...state,
                videogames: [...action.payload]
            }

        case ADD_GAME:
            return {
                ...state,
                videogames: [...state.videogames, action.payload],
                allVideogames: [...state.allVideogames, action.payload]
            }

        case FILTER_BY_GENRE:
            // buscar cómo acceder a las tablas intermedias en la BDD!!!! -> info obtenida desde las actions
            const filteredByGenre = state.videogames.filter(game => game.gender === action.payload)
            return {
                ...state,
                videogames: [...filteredByGenre]
            }
        case FILTER_BY_ORIGIN:
            let filteredByOrigin = []
            if (action.payload === 'base de datos') filteredByOrigin = state.allVideogames.filter(game => game.id < 10)
            if (action.payload === 'created by user') filteredByOrigin = state.allVideogames.filter(game => game.id > 10)
            return {
                ...state,
                videogames: [...filteredByOrigin]
            }
        case ORDER_BY_RATING:
            return {
                ...state,
                videogames:
                    action.payload === 'Ascendente'
                        ? state.allVideogames.sort((a, b) => a.id - b.id)
                        : state.allVideogames.sort((a, b) => b.id - a.id)
            }
        case ORDER_BY_NAME:
            // buscar cómo ordenar alfabéticamente los objetos -> será así?
            return {
                ...state,
                videogames:
                    action.payload === 'Ascendente'
                        ? state.allVideogames.sort((a, b) => a.name.localeCompare(b.name))
                        : state.allVideogames.sort((a, b) => b.name.localeCompare(a.name))
            }
        default: return {
            ...state
        };
    }
};

export default rootReducer;