const { Platform } = require('../db.js');

const savePlatforms = async (id, name) => {
    const platform = await Platform.create({ id, name });
    return platform;
};

const getPlatforms = async () => {
    const results = await Platform.findAll();
    return results;
};

// const findByPlatforms = async (name) => {
//     const results = await Platform.findAll({ where: { name: name } });
//     return results;
// };

module.exports = {
    savePlatforms,
    getPlatforms
    //findByPlatforms
};
