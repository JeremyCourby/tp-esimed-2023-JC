const { DataTypes } = require('sequelize');
const { sequelize } = require('../models/sqlite.db');
exports.User = sequelize.define('User', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    isAdmin : {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
});
