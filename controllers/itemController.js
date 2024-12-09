const Item = require('../models/itemModel');
const fs = require('fs');
const path = require('path');

// Create Item
exports.createItem = async (req, res) => {
    const { type, name, quantity, priceBuy, priceSell, description } = req.body;
    const imagePath = req.file ? '/images/' + req.file.filename : null; // Get the image path if it exists

    try {
        const newItem = await Item.create({
            type,
            name,
            quantity,
            priceBuy,
            priceSell,
            description,
            image_url: imagePath
        });

        await newItem.save();

        res.redirect('/dashboard');  // Redirect after successful creation
    } catch (err) {
        res.status(500).json({ error: err.message });  // Handle any errors
    }
};

// Update Item
exports.updateItem = async (req, res) => {
    const { id } = req.params;  // The ID of the item to update from the URL
    const { type, name, quantity, priceBuy, priceSell, description } = req.body;
    const imagePath = req.file ? '/images/' + req.file.filename : null; // Get the image path if it exists

    try {
        const item = await Item.findByPk(id);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        await item.update({
            type,
            name,
            quantity,
            priceBuy,
            priceSell,
            description,
            image_url: imagePath || item.image_url // If no new image, keep the old one
        });
        res.redirect('/inventory');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Get Item by ID
exports.getItemById = async (req, res) => {
    const { id } = req.params;

    try {
        const item = await Item.findByPk(id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete Item
exports.deleteItem = async (req, res) => {
    const { id } = req.params;

    try {
        const item = await Item.findByPk(id);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Delete the image from the server if it exists
        const imagePath = item.image_url;

        if (imagePath) {
            const filePath = path.join(__dirname,  '..','public', imagePath);
            try {
                await fs.promises.unlink(filePath); // Use promises with fs.unlink
                console.log(`Image deleted: ${filePath}`);
            } catch (err) {
                console.error("Error deleting image:", err);
            }
        }

        // Delete the item from the database
        await item.destroy();

        res.redirect('/inventory');
    } catch (err) {
        console.error("Error in delete operation:", err);
        res.status(500).json({ error: err.message });
    }
};

// Get Homepage (used in your case to show all items)
exports.getHomepage = async (req, res) => {
    try {
        const items = await Item.findAll();
        res.render('homepage', { items });
    } catch (err) {
        console.error('Error fetching items:', err.message);
        res.render('homepage', { items: [] }); // Render an empty array if there's an error
    }
};




