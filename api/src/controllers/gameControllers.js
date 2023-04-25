const { Videogame, Genre } = require('../db.js');
const { Games_Genres } = require('../db.js')
const { Op } = require("sequelize");


const getGames = async () => {
    const games = await Videogame.findAll({ include: Genre });
    // { include: [{ model: Genres.name, as: gens }] }
    console.log('this is getGames, en el findAll de gameControllers', games)
    if (games) return games;
    else throw new Error('There are no Videogames on the DataBase yet. Try creating one')
};

const getGameById = async (id) => {
    const game = await Videogame.findOne({
        where: { id: id }
        , include: [{ model: Genre }]
    });
    // const game = await Videogame.findByPk(id, { include: [{ model: Genres }] });
    // { include: [{ model: Genres.name, as: gens }] }
    console.log('this is the game that is returned in getGameById en gameControllers:', game)
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
    console.log('this is findGameByName in gameControllers', results)
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