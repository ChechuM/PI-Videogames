const { Router } = require('express');
const gamesRouter = Router();
const { getGames, getGameById, findGame, createGame } = require('../controllers/gameControllers');
const axios = require('axios');
const {
    API_KEY
} = process.env;

gamesRouter.post('/', async (req, res) => {
    try {
        await axios('https://api.rawg.io/api/games?key=' + API_KEY)
            .then((response) => {
                let results = response.data.results;
                return results;
            })
            .then(async (results) => {
                results.forEach(async (game) => {
                    let { name, released: launch, background_image: image, rating, platforms: plataformas } = game;
                    let noPlat = plataformas.length;
                    let platforms = `Can be played in ${noPlat} different platforms`;
                    let description = `${name} is a game played in ${noPlat} different platforms with a rating of ${rating}`
                    return await createGame(name, description, platforms, image, launch, rating)
                });
            })
        res.status(200).json('Videogames guardados en la BDD');
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
})

gamesRouter.get('/:idVideogame', async (req, res) => {
    const { id } = req.params;
    try {
        const juego = await getGameById(id);
        res.status(200).json(juego);
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
});

gamesRouter.get('/', async (req, res) => {
    const { name } = req.query;
    let games;
    try {
        if (name) games = await findGame(name);
        else games = await getGames();
        res.status(200).json(games)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
});

gamesRouter.post('/newGame', async (req, res) => {
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
}