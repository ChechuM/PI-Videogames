const { Videogame } = require('../db.js');
const { randomUUID } = require('crypto');

const getGames = async () => {
    const games = await Videogame.findAll();
    return games;
};

const getGameById = async (id) => {
    const game = await Videogame.findByPk(id);
    return game;
};

const findGame = async (name) => {
    const results = await Videogame.findAll({ where: { name: name } });
    return results;
};


const createGame = async (name, description, platforms, image, launch, rating, genre) => {
    let id = randomUUID();
    const newGame = await Videogame.create({ id, name, description, platforms, image, launch, rating, genre });
    return newGame;
}

module.exports = {
    getGames,
    getGameById,
    findGame,
    createGame
}