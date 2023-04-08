const { Router } = require('express');
const gamesRouter = Router();
const { getGames, getGameById, findGameByName, createGame } = require('../controllers/gameControllers');
const axios = require('axios');
const {
    API_KEY
} = process.env;
const apiGames = 'https://api.rawg./api/games?key=' + API_KEY;

let objGame = (game) => {
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
    let genString = genresApi.join(', ')
    let wanted = {
        id: game.id,
        name: game.name,
        description: `${game.name} is a game played in ${plataformas.length} different platforms with a rating of ${game.rating}`,
        platforms: platString,
        image: game.background_image,
        launch: game.released,
        rating: game.rating,
        genres: genString
    }
    return wanted;
}

// Busca los primeros 15 juegos que tengan la palabra recibida por query 
// Busca independientemente de mayúsculas o minúsculas
// Busca en la Api y en BDD
// Si no existe el videojuego, debe mostrar un mensaje adecuado
gamesRouter.get('/name', async (req, res) => {
    const { name } = req.query;
    searchName = name.toLowerCase();
    let gamesName = [];
    if (searchName) gamesName = await findGameByName(searchName);
    if (gamesName.length < 15) {
        try {
            await axios(apiGames)
                .then((response) => {
                    let results = response.data.results;
                    results.forEach((game) => {
                        if (gamesName.length >= 15) return gamesName;
                        else {
                            let gameName = game.id.toLowerCase();
                            if (gameName.includes(searchName)) {
                                let wanted = objGame(searchName);
                                gamesName.push(wanted);
                            }
                        }
                    })
                    return gamesName;
                })
            res.status(200).json(gamesName)
        }
        catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
    else return res.status(200).json(gamesName)
    // else games = await getGames();

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
            await axios(apiGames)
                .then((response) => {
                    let results = response.data.results;
                    let wanted = results.find((game) => {
                        if (game.id.toString() === idVideogame) {
                            return objGame(game);
                        }
                    })
                    if (wanted) return res.status(200).json(wanted)
                    else {
                        let notFound = `The Videogame with id ${idVideogame} does not exist yet. Try and create one yourself!`;
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
};