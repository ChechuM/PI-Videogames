const { Genre } = require('../db.js');

const saveGenres = async (id, name) => {
    const genres = await Genre.create({ id, name });
    return genres;
};

const getGenres = async () => {
    const results = await Genre.findAll();
    return results;
}

// const findByGenre = async (name) => {
//     const results = await Genre.findAll({ where: { name: name } });
//     return results;
// };

module.exports = {
    saveGenres,
    getGenres
    //findByGenre
};