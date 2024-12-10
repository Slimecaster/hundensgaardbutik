const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db'); // Your database connection

const Item = sequelize.define('Item', {
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    priceBuy: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    priceSell: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
    image_data: {
        type: DataTypes.BLOB('long'), // Store image as binary data
        allowNull: true,
    },
}, {
    tableName: 'item', // Specify the correct table name
    freezeTableName: true, // Prevent Sequelize from pluralizing the table name
    timestamps: false, // Disable createdAt and updatedAt
});

// Sync model with the database
sequelize.sync({ alter: true }).then(() => {
    console.log('Table created or synced');
});

module.exports = Item;
