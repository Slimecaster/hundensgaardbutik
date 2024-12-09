const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create a new Sequelize instance
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, null, {
    host: process.env.DB_HOST,
    dialect: 'mysql', // Use 'mysql' or 'mssql' if you were using SQL Server
    logging: false, // Disable Sequelize logging; set to true to enable
});

// Test the connection
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

module.exports = sequelize;
