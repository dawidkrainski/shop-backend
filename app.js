const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



// instancja expresa
const app = express();

// ładuje zmienne środowiskowe
require('dotenv').config();

// łączenie z bazą danych
mongoose.connect(`mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.bc4fl.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`);

//parsuję część body
app.use(bodyParser.json());

//logger
app.use(morgan("combined"));


//import routów
const productRoutes = require("./api/routes/products");


//routy
app.use("/products", productRoutes);

app.use((req, res, next) => {
    res.status(200).json({wiadomosc: 'Działa poprawnie'});
})

// po nowemu  export default  app; - 16.0 node.js

module.exports = app;
