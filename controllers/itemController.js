const Item = require('../models/itemModel');
const connection = require('../database/db.js');

// Create Animal
exports.creatItem = (req, res) => {
    const { name, quantity, priceBuy, priceSell, description } = req.body;
    const query = 'INSERT INTO item (name, quantity, priceBuy, priceSell, description) VALUES (?, ?, ?, ?,?)';
    connection.execute(query, [name, quantity, priceBuy, priceSell, description], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Item created successfully'});
    });
};

// Update Item
exports.updateItem = (req, res) => {
    const { id } = req.params;  // The ID of the item to update from the URL
    const { name, quantity, priceBuy, priceSell, description } = req.body;  // The updated data

    const query = `
        UPDATE item 
        SET name = ?, quantity = ?, priceBuy = ?, priceSell = ?, description = ? 
        WHERE id = ?
    `;
    connection.execute(query, [name, quantity, priceBuy, priceSell, description, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Item updated successfully' });
    });
};


// Get All items
exports.getAllItems = (req, res) => {
    const query = 'SELECT * FROM item';
    connection.execute(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Get Animal by ID
exports.getItemById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM item WHERE id = ?';

    connection.execute(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'item not found' });
        }
        res.json(results[0]);
    });
};

// controllers/itemController.js

// Delete Item
exports.deleteItem = (req, res) => {
    const { id } = req.params;  // The ID of the item to delete from the URL

    const query = 'DELETE FROM item WHERE id = ?';
    connection.execute(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Item deleted successfully' });
    });
};

exports.getHomepage = (req, res) => {
    res.render("homepage");
};


