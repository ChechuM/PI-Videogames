const { Router } = require('express');
const gamesRouter = Router();
const { getGames, getGameById, findGameByName, createGame } = require('../controllers/gameControllers');
const axios = require('axios');
const {
    API_KEY
} = process.env;
const cantGames = "&page_size=200";
const laKey = '?key=' + API_KEY;
const apiGames = 'https://api.rawg.io/api/games' + laKey + cantGames;

const objGame = (game) => {
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
    let wanted = {
        id: game.id,
        name: game.name,
        platforms: platString,
        image: game.background_image,
        launch: game.released,
        rating: game.rating,
        genres: genresApi
    }
    return wanted;
}

// DONE! = Busca los primeros 15 juegos que tengan la palabra recibida por query 
// DONE! = Busca independientemente de mayúsculas o minúsculas
// DONE! = Busca en la Api y en BDD
// DONE! = Si no existe el videojuego, debe mostrar un mensaje adecuado
gamesRouter.get('/name', async (req, res) => {
    const { name } = req.query;
    let searchName = name.toLowerCase()
    let BDDName = await findGameByName(searchName);
    try {
        await axios(`https://api.rawg.io/api/games${laKey}&search=${name}`)
            .then((response) => {
                let results = response.data.results;
                let sortApiName = results.map((game) => {
                    let gens = game.genres.map(g => g.name);
                    let wanted = {
                        id: game.id,
                        name: game.name,
                        image: game.background_image,
                        genres: gens.join(', '),
                        rating: game.rating
                    }
                    return wanted;
                });
                return sortApiName;
            })
            .then(async (sortApiName) => {
                let totalGameName = BDDName.concat(sortApiName)
                return res.status(200).json(totalGameName)
            })
            .then((totalGameName) => {
                if (totalGameName.length === 0) {
                    let notFound = `The Videogame called ${name} does not exist... yet`
                    res.status(200).json(notFound)
                }
                if (totalGameName.length >= 15) res.status(200).json(totalGameName.slice(0, 15))
            })
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
});


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
            await axios(`https://api.rawg.io/api/games/${idVideogame}${laKey}`)
                .then((response) => {
                    let results = response.data;
                    let plat = results.parent_platforms.map(p => p.platform.name);
                    let gens = results.genres.map(g => g.name);
                    let game = {
                        id: results.id,
                        name: results.name,
                        description: results.description_raw,
                        image: results.background_image,
                        rating: results.rating,
                        launch: results.released,
                        platforms: plat.join(', '),
                        gens: gens.join(', ')
                    }
                    if (game) return res.status(200).json(game)
                    else {
                        let notFound = `The Videogame with id ${idVideogame} does not exist... yet`;
                        return res.status(200).json(notFound)
                    }
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
        await axios(apiGames)
            .then((response) => {
                let results = response.data.results;
                return results;
            })
            .then((results) => {
                let gamesApi = [];
                results.forEach((game) => {
                    let wanted = objGame(game);
                    gamesApi.push(wanted)
                })
                let union = gamesTotal.concat(gamesApi);
                return res.status(200).json(union)
            })
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
});

// DONE! = Creando un nuevo juevo en la BDD relacionado con al menos un género asociado
// DONE! = Información recibida por body
gamesRouter.post('/', async (req, res) => {
    try {
        const { name, description, platforms, image, launch, rating, gens } = req.body.game;
        const newGame = await createGame(name, description, platforms, image, launch, rating, gens);
        res.status(200).json(newGame);
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
});

module.exports = {
    gamesRouter
};