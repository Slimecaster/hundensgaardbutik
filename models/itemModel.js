// models/animalModel.js

// Instead of using a class, define the schema as an object.
const itemTable = {
    ID: Number,
    name: String,
    quantity: Number,
    priceBuy: Number,
    priceSell: Number,
    description: String,
};

module.exports = itemTable;
