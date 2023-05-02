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
                allVideogames: [...state.allVideogames, ...action.payload] // ojo! dónde quiero que ponga los datos? 
            }

        case GET_ALL_GENRES:
            return {
                ...state,
                genres: [...action.payload]
            }

        case GET_GAMES_BY_NAME:
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
            const filteredByGenre = [];
            state.allVideogames.map((game) => {
                if (typeof game.id === 'string') {
                    game.genres.forEach((gen) => {
                        if (gen.name === action.payload) {
                            filteredByGenre.push(game)
                        }
                    })
                }
                else {
                    game.genres.forEach((gen) => {
                        if (gen === action.payload) {
                            filteredByGenre.push(game)
                        }
                    })
                }
            })
            return {
                ...state,
                videogames: [...filteredByGenre]
            }

        case FILTER_BY_ORIGIN:
            let filteredByOrigin = []
            if (action.payload === 'Api') filteredByOrigin = state.allVideogames.filter(game => typeof game.id === 'number')
            if (action.payload === 'User') filteredByOrigin = state.allVideogames.filter(game => typeof game.id === 'string')
            if (action.payload === 'selectOrigin') filteredByOrigin = state.allVideogames
            return {
                ...state,
                videogames: filteredByOrigin
            }
        case ORDER_BY_RATING:
            return {
                ...state,
                videogames:
                    action.payload === 'ascRating'
                        ? state.videogames.toSorted((a, b) => a.rating - b.rating)
                        : state.videogames.toSorted((a, b) => b.rating - a.rating)
            }
        case ORDER_BY_NAME:
            return {
                ...state,
                videogames:
                    action.payload === 'ascName'
                        ? state.allVideogames.sort((a, b) => a.name.localeCompare(b.name))
                        : state.allVideogames.sort((a, b) => b.name.localeCompare(a.name))
            }
        default: return {
            ...state
        };
    }
};

export default rootReducer;