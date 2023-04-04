const { Game } = require('../models/Videogame');

const getGames = async () => {
    const games = await Game.findAll();
    return games;
};

const getGameById = async (id) => {
    const game = await Game.findByPk(id);
    return game;
};

const findGame = async (name) => {
    const results = await Game.findAll({ where: { name: { name } } });
    return results;
};

const createGame = async (name, description, platforms, image, launch, rating, genre) => {
    const newGame = await Game.create({name, description, platforms, image, launch, rating, genre});
    return newGame;
}

module.exports = {
    getGames,
    getGameById,
    findGame,
    createGame
}