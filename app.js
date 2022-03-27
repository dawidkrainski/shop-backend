const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors");

// instancja expresa
const app = express();

// włączam cors
app.use(cors());
// ładuję zmienne środowiskowe
require('dotenv').config();

// łączę się z bazą
mongoose.connect(
  `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.re8z6.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
);

// parsuję część body
app.use(bodyParser.json());

// logger
app.use(morgan('combined'));

// import routów
const productRoutes = require('./api/routes/products');
const userRoutes = require('./api/routes/users');

// routy
app.use('/products', productRoutes);
app.use('/users', userRoutes);

app.use((req, res, next) => {
  res.status(200).json({ wiadomosc: 'wszystko śmiga' });
});

module.exports = app;
