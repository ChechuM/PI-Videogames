const { Router } = require('express');
const genreRouter = Router();
const { saveGenres, getGenres } = require('../controllers/genreControllers');
const axios = require('axios');
const {
    API_KEY
} = process.env;

let postGenres = async () => {
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
            })
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
};

genreRouter.get('/', async (req, res) => {
    try {
        let genres = await getGenres();
        if (genres.length === 0) {
            genres = await postGenres();
            genres = await getGenres();
            return res.status(200).json(genres)
        }
        res.status(200).json(genres)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
});

module.exports = {
    genreRouter
};