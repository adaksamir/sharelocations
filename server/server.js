const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var db = require('./db');

var AuthController = require('./auth/AuthController');
var UserController = require('./user/UserController');
var LocationController = require('./location/LocationController');

const PORT = 3001;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use('/api/auth', AuthController);
app.use('/api/user', UserController);
app.use('/api/maps', LocationController);

app.get('/', (req, res) => {
    res.send('Hello Rrom server');
});

app.listen(PORT, () => {
    console.log('Server is running on port : ' + PORT);
});