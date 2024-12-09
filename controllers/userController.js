const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const Item = require("../models/itemModel");

exports.CreateUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Hash the password
        const passwordHash = await bcrypt.hash(password, 15);

        // Create and save the new user using Sequelize's create method
        const newUser = await User.create({
            username,
            password: passwordHash,  // Save the hashed password
        });

        await newUser.save();


        res.render("login");
    } catch (error) {
        console.error("Fejl under oprettelse af bruger:", error);
        res.status(500).send("Der opstod en fejl. Prøv igen senere.");
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({
            where: { username: username }
        });
        if (user && (await bcrypt.compare(password, user.password))) {
            req.session.userId = user.id;
            req.session.username = user.username;
            req.session.role = user.role;

            return res.redirect("/dashboard");
        }
        res.status(401).send("Forkert brugernavn eller adgangskode.");
    } catch (error) {
        console.error("Fejl under login:", error);
        res.status(500).send("Noget gik galt. Prøv igen senere.");
    }
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
};

exports.getLogin = (req, res) => {
    res.render("login");
};

exports.getCreateItem = (req, res) => {
    res.render("createItem");
};

exports.getDashboard = (req, res) => {
    res.render("dashboard");
}

// Get All items
exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.findAll();
        res.render('inventory', { items });
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
        res.render('updateItem', { item: item });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

