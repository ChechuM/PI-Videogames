const { Genre } = require('../models/Genre');

const getGenres = async () => {
    const genres = await Genre.findAll();
    return genres;
};

const findGenres = async (name) => {
    const results = await Genre.findAll({ where: { name: { name } } });
    return results;
};

// cómo hago para que en una primera instancia, cuando la base de datos este vacía, deberás guardar todos los géneros que encuentres en la API.

module.exports = {
    getGenres,
    findGenres
};