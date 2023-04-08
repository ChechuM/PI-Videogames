const { Videogame } = require('../db.js');
const { Op } = require("sequelize");

const getGames = async () => {
    const games = await Videogame.findAll();
    if (games) return games;
    else throw new Error('There are no Videogames on the DataBase yet. Try creating one')
};

const getGameById = async (id) => {
    const game = await Videogame.findByPk(id);
    if (game) return game;
    else return (`The Videogame with id ${id} does not exist on the DataBase`);
};

const findGameByName = async (name) => {
    const results = await Videogame.findAll({
        limit: 15,
        where: {
            name: { [Op.iLike]: `%${name}%` }
        }
    });
    if (results.length > 0) return results;
    else return (`The Videogame called ${name} does not exist on the DataBase`);
};

const createGame = async (name, description, platforms, image, launch, rating, genre) => {
    const newGame = await Videogame.create({ name, description, platforms, image, launch, rating, genre });
    return newGame;
};

module.exports = {
    getGames,
    getGameById,
    findGameByName,
    createGame
};