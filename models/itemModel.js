const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db');  // Your database connection

const Item = sequelize.define('Item', {
    type:{
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
    image_url: {
        type: DataTypes.STRING,  // Store the image path in this column
    },
}, {
    tableName: 'item', // Specify the correct table name
    freezeTableName: true, // Prevent Sequelize from pluralizing the table name
    timestamps: false, // Disable the creation of createdAt and updatedAt fields
});

// Sync model with the database (useful for development)
sequelize.sync({ alter: true }).then(() => {
    console.log('Table created or synced');
});

module.exports = Item;