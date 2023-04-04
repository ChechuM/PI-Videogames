const { Router } = require('express');
const { getGames, getGameById, findGame, createGame } = require('../controllers/gameControllers')

const { getGenres } = require('../controllers/genreControllers')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// Games
// Debe obtener los primeros 15 videojuegos que se encuentren con la palabra recibida por query
// Debe poder buscarlo independientemente de mayúsculas o minúsculas
// Si no existe el videojuego, debe mostrar un mensaje adecuado
// Debe buscar tanto los de la API como los de la base de datos

router.get('/games', async (req, res) => {
    const { name } = req.query;
    let games;
    try {
        if (name) games = await findGame(game);
        else games = await getGames();
        res.status(200).json(games)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
});


// Debe funcionar tanto para los videojuegos de la API como para los de la base de datos. (???)
router.get('/games/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const juego = await getGameById(id);
        res.status(200).json(juego);
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
});


router.post('/games', async (req, res) => {
    try {
        const { id, name, description, platforms, image, launch, rating, genre } = req.body;
        const newGame = await createGame(id, name, description, platforms, image, launch, rating, genre);
        res.status(200).json(newGame);
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// Genres

router.get('/genres', async (req, res) => {
    const { genre } = req.query;
    let genres;
    try {
        if (genre) genres = await findGenre(genre);
        else genres = await getGenres();
        res.status(200).json(genres);
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
});

module.exports = router;
