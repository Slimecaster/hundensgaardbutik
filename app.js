const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/itemRoutes');
const path=require('path');

app = express();
app.use(express.json()); // For parsing application/json


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/',routes)

//Middleware
app.use(express.static(path.join(__dirname, 'public')));

//app.listen(3000, () => console.log('Server running on http://localhost:3000'));
app.listen(3000,() => console.log(`Server running on http://localhost:3000`));