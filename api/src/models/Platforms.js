const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('platform', {
        id: {
            type: DataTypes.INTEGER,
            autoincrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}