const { Router } = require('express');
const genreRouter = Router();
const { saveGenres, getGenres } = require('../controllers/genreControllers');
const axios = require('axios');
const {
    API_KEY
} = process.env;

genreRouter.post('/', async (req, res) => {
    try {
        await axios('https://api.rawg.io/api/genres?key=' + API_KEY)
            .then((response) => {
                let results = response.data.results;
                return results;
            })
            .then((results) => {
                results.forEach(async genre => {
                    let { id, name } = genre;
                    return await saveGenres(id, name);
                });
                return results;
            })
        res.status(200).json('Géneros guardados en la BDD');
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
});

genreRouter.get('/', async (req, res) => {
    try {
        let genres = await getGenres();
        res.status(200).json(genres)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
})

module.exports = {
    genreRouter
}