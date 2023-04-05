const { Router } = require('express');
const gamesRouter = Router();
const { getGames, getGameById, findGame, createGame } = require('../controllers/gameControllers');

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

gamesRouter.post('/', async (req, res) => {
    try {
        const { name, description, platforms, image, launch, rating, genre } = req.body;
        const newGame = await createGame(name, description, platforms, image, launch, rating, genre);
        res.status(200).json(newGame);
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
})

module.exports = {
    gamesRouter
}