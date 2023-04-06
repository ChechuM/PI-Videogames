const { Router } = require('express');
const platformRouter = Router();
const { savePlatforms, getPlatforms } = require('../controllers/platControllers');
const axios = require('axios');
const {
    API_KEY
} = process.env;

platformRouter.post('/', async (req, res) => {
    try {
        await axios('https://api.rawg.io/api/platforms?key=' + API_KEY)
            .then((response) => {
                let results = response.data.results;
                return results;
            })
            .then((results) => {
                results.forEach(async plat => {
                    let { id, name } = plat;
                    return await savePlatforms(id, name);
                });
            })
        res.status(200).json('Plataformas guardadas en la BDD');
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
});

platformRouter.get('/', async (req, res) => {
    try {
        let platforms = await getPlatforms();
        res.status(200).json(platforms);
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
});


module.exports = {
    platformRouter
};