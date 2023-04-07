const { Videogame } = require('../db.js');

const getGames = async () => {
    const games = await Videogame.findAll();
    if (games) return games;
    else throw new Error('There are no Videogames on the DataBase yet. Try creating one')
};

const getGameById = async (id) => {
    const game = await Videogame.findByPk(id);
    if (game) return game;
    else throw new Error(`The Videogame with id ${id} does not exist on the DataBase`);
};

const findGame = async (name) => {
    const results = await Videogame.findAll({ where: { name: name } });
    if (results) return results;
    else throw new Error(`The Videogame called ${name} does not exist on the DataBase`);
};

const createGame = async (name, description, platforms, image, launch, rating, genre) => {
    const newGame = await Videogame.create({ name, description, platforms, image, launch, rating, genre });
    return newGame;
};

module.exports = {
    getGames,
    getGameById,
    findGame,
    createGame
};