const Item = require('../models/itemModel');
const fs = require('fs');
const path = require('path');

// Create Item
exports.createItem = async (req, res) => {
    const { type, name, quantity, priceBuy, priceSell, description } = req.body;
    const imageBuffer = req.file ? req.file.buffer : null; // Get the image as binary data

    try {
        const newItem = await Item.create({
            type,
            name,
            quantity,
            priceBuy,
            priceSell,
            description,
            image_data: imageBuffer, // Save image as binary data
        });

        res.redirect('/dashboard'); // Redirect after successful creation
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update Item
exports.updateItem = async (req, res) => {
    const { id } = req.params;
    const { type, name, quantity, priceBuy, priceSell, description } = req.body;
    const imageBuffer = req.file ? req.file.buffer : null; // Get the image as binary data

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
            image_data: imageBuffer || item.image_data, // Update only if new image is provided
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

exports.serveImage = async (req, res) => {
    const { id } = req.params;

    try {
        const item = await Item.findByPk(id);
        if (!item || !item.image_data) {
            return res.status(404).send('Image not found');
        }

        res.contentType('image/jpeg'); // Set content type to match the image type
        res.send(item.image_data); // Send the binary image data
    } catch (err) {
        res.status(500).send(err.message);
    }
};




