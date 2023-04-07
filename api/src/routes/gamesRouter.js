const { Router } = require('express');
const gamesRouter = Router();
const { getGames, getGameById, findGame, createGame } = require('../controllers/gameControllers');
const axios = require('axios');
const {
    API_KEY
} = process.env;


// DONE! = Debería devolver un objeto con la información sobre el juego pedido por ID
// DONE! = Tiene que incluir los datos de los géneros
// DONE! = Tanto para juegos en la BDD como los de la Api
gamesRouter.get('/:idVideogame', async (req, res) => {
    const { idVideogame } = req.params;
    if (idVideogame.length > 10) {
        const juegoBDD = await getGameById(idVideogame);
        if (juegoBDD) res.status(200).json(juegoBDD);
        else res.status(400).json({ error: error.message });
    }
    else
        try {
            await axios('https://api.rawg.io/api/games?key=' + API_KEY)
                .then((response) => {
                    let results = response.data.results;
                    results.forEach((game) => {
                        if (game.id.toString() === idVideogame) {
                            let platArr = game.platforms;
                            let plataformas = [];
                            platArr.forEach((plat) => {
                                let name = plat.platform.name;
                                plataformas.push(name);
                            })
                            let platString = plataformas.join(', ')
                            let genreArr = game.genres;
                            let genresApi = [];
                            genreArr.forEach((gen) => {
                                let name = gen.name;
                                genresApi.push(name);
                            })
                            let genString = genresApi.join(', ')
                            let wanted = {
                                id: game.id,
                                name: game.name,
                                description: `${game.name} is a game played in ${plataformas.length} different platforms with a rating of ${game.rating}`,
                                platforms: platString,
                                image: game.background_image,
                                launch: game.released,
                                rating: game.rating,
                                genres: genString
                            }
                            return res.status(200).json(wanted);
                        }
                    })
                })
        }
        catch (error) {
            res.status(400).json({ error: error.message })
        }
});

// DONE! = Debería traer los juegos de la Api y los de la BDD -> en un array
gamesRouter.get('/', async (req, res) => {
    let gamesTotal = [];
    try {
        let gamesBDD = await getGames(); // ojo, viene un montón de info extra con el método getGames();
        gamesTotal = [...gamesTotal, gamesBDD];
        gamesTotal = gamesTotal[0];
        await axios('https://api.rawg.io/api/games?key=' + API_KEY)
            .then((response) => {
                let results = response.data.results;
                return results;
            })
            .then((results) => {
                let gamesApi = [];
                results.forEach((game) => {
                    let platArr = game.platforms;
                    let plataformas = [];
                    platArr.forEach((plat) => {
                        let name = plat.platform.name;
                        plataformas.push(name);
                    })
                    let platString = plataformas.join(', ')
                    let genreArr = game.genres;
                    let genresApi = [];
                    genreArr.forEach((gen) => {
                        let name = gen.name;
                        genresApi.push(name);
                    })
                    let genString = genresApi.join(', ')
                    let juegoApi = {
                        id: game.id,
                        name: game.name,
                        description: `${game.name} is a game played in ${plataformas.length} different platforms with a rating of ${game.rating}`,
                        platforms: platString,
                        image: game.background_image,
                        launch: game.released,
                        rating: game.rating,
                        genres: genString
                    }
                    gamesApi.push(juegoApi);
                })
                let union = gamesTotal.concat(gamesApi);
                return res.status(200).json(union)
            })
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
});

// Busca los primeros 15 juegos que tengan la palabra recibida por query 
// Busca independientemente de mayúsculas o minúsculas
// Busca en la Api y en BDD
// Si no existe el videojuego, debe mostrar un mensaje adecuado
gamesRouter.get('/name', async (req, res) => {
    const { name } = req.query;
    if (name) games = await findGame(name);
    else games = await getGames();
})

// DONE! = Creando un nuevo juevo en la BDD relacionado con al menos un género asociado
// DONE! = Información recibida por body
gamesRouter.post('/', async (req, res) => {
    try {
        const { name, description, platforms, image, launch, rating, genre } = req.body;
        const newGame = await createGame(name, description, platforms, image, launch, rating, genre);
        res.status(200).json(newGame);
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
});

module.exports = {
    gamesRouter
};


// gamesRouter.post('/', async (req, res) => {
//     try {
//         await axios('https://api.rawg.io/api/games?key=' + API_KEY)
//             .then((response) => {
//                 let results = response.data.results;
//                 return results;
//             })
//             .then(async (results) => {
//                 results.forEach(async (game) => {
//                     let { name, released: launch, background_image: image, rating, platforms: plataformas } = game;
//                     let noPlat = plataformas.length;
//                     let platforms = `Can be played in ${noPlat} different platforms`;
//                     let description = `${name} is a game played in ${noPlat} different platforms with a rating of ${rating}`
//                     return await createGame(name, description, platforms, image, launch, rating)
//                 });
//             })
//         res.status(200).json('Videogames guardados en la BDD');
//     }
//     catch (error) {
//         res.status(400).json({ error: error.message })
//     }
// });

// gamesRouter.get('/muestraid', async (req, res) => {
//     try {
//         await axios('https://api.rawg.io/api/games?key=' + API_KEY)
//             .then((response) => {
//                 let results = response.data.results;
//                 return results;
//             })
//             .then(async (response) => {
//                 let ids = [];
//                 response.forEach(async (game) => {
//                     let { id } = game;
//                     ids.push(id);
//                     console.log('this is game id:', id)
//                 })
//                 res.status(200).json(ids);
//             })
//     }
//     catch (error) {
//         res.status(400).json({ error: error.message })
//     }
// })