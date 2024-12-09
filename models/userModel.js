const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db');  // Your database connection

const User = sequelize.define('user', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,  // Change to STRING for hashed password
        allowNull: false,        // Make sure password is required
    },
    role: {
        type: DataTypes.STRING,  // Change to STRING if using string roles (e.g., 'admin', 'user')
        allowNull: false,
        defaultValue: 'user',    // Default to 'user' role (or set to another default value)
    },
}, {
    tableName: 'user',         // Specify the correct table name
    freezeTableName: true,     // Prevent Sequelize from pluralizing the table name
    timestamps: false,         // Disable the creation of createdAt and updatedAt fields
});

// Sync model with the database (useful for development)
sequelize.sync({ alter: true }).then(() => {
    console.log('Table created or synced');
});

module.exports = User;
