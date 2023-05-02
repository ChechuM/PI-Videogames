const { Videogame, Genre } = require('../db.js');
const { Games_Genres } = require('../db.js')
const { Op } = require("sequelize");


const getGames = async () => {
    const games = await Videogame.findAll({ include: Genre });
    if (games) return games;
    else throw new Error('There are no Videogames on the DataBase yet. Try creating one')
};

const getGameById = async (id) => {
    const game = await Videogame.findOne({
        where: { id: id }
        , include: [{ model: Genre }]
    });
    if (game) return game;
    else return (`The Videogame with id ${id} does not exist on the DataBase`);
};

const findGameByName = async (name) => {
    const results = await Videogame.findAll({ include: Genre }, {
        limit: 15,
        where: {
            name: { [Op.iLike]: `%${name}%` }
        }
    });
    if (results.length > 0) return results;
    else return (`The Videogame called ${name} does not exist on the DataBase`);
};

const createGame = async (name, description, platforms, image, launch, rating, gens) => {
    const newGame = await Videogame.create({ name, description, platforms, image, launch, rating });
    gens.forEach(async genre => {
        await newGame.addGenres(genre.id, { through: Games_Genres })
    });
    return newGame;
};

module.exports = {
    getGames,
    getGameById,
    findGameByName,
    createGame
};