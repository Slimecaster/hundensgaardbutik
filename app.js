const session = require("express-session");
const express = require('express');
const bodyParser = require('body-parser');
const itemRoutes = require('./routes/itemRoutes');
const userRoutes = require('./routes/userRoutes');
const path=require('path');
const port = process.env.PORT || 3000;

app = express();
app.use(express.json()); // For parsing application/json


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: "hemmeligNøgle",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === "production" }
}));


app.use('/',itemRoutes)
app.use('/', userRoutes)

//Middleware
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Serveren kører på http://localhost:${port}`);
});