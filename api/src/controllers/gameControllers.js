const { Videogame } = require('../db.js');
const { randomUUID } = require('crypto');

const getGames = async () => {
    const games = await Videogame.findAll();
    if (games) return games;
    else throw new Error('El Videojuego no existe en la BDD')
};

const getGameById = async (id) => {
    const game = await Videogame.findByPk(id);
    if (game) return game;
    else throw new Error(`El Videojuego con id ${id} no existe en la BDD`);
};

const findGame = async (name) => {
    const results = await Videogame.findAll({ where: { name: name } });
    if (results) return results;
    else throw new Error(`El Videojuego llamado ${name} no existe en la BDD`);
};

const createGame = async (name, description, platforms, image, launch, rating, genre) => {
    let id = randomUUID();
    const newGame = await Videogame.create({ id, name, description, platforms, image, launch, rating, genre });
    return newGame;
};

module.exports = {
    getGames,
    getGameById,
    findGame,
    createGame
}