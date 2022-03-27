const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const auth = require("../middleware/auth");

const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null,new Date().toISOString().replace(":","_").replace(":","_") + file.originalname);
    }
})

function fileFilter(req, file, cb){
    if(file.mimetype === "image/jpeg" || file.mimetype === "iamge/png"){
        cb(null,true);
    } else {
        cb(new Error('zły format pliku'),false);
    }
}

const upload = multer({
    storage : storage,
    limits: {fileSize: 5*1024*1024},
    fileFilter: fileFilter,
});

// importuję model
const Product = require('../models/product');

router.get('/', (req, res, next) => {
  Product.find()
    .then((result) => {
      res.status(200).json({
        wiadomosc: 'Lista wszystkich produktów',
        info: result,
      });
    })
    .catch((err) => res.status(500).json({ wiadomosc: err }));
});

router.post('/',upload.single('productImage'), auth, (req, res, next) => {
    console.log(req.file);
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });

  product
    .save()
    .then((result) => {
      res.status(201).json({
        wiadomosc: 'Dodanie nowego produktu',
        info: result,
      });
    })
    .catch((err) => res.status(500).json({ wiadomosc: err }));
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;

  Product.findById(id)
    .then((result) => {
      res.status(200).json({
        wiadomosc: 'Szczegóły produktu o nr ' + id,
        info: result,
      });
    })
    .catch((err) => res.status(500).json({ wiadomosc: err }));
});

router.put('/:id', (req, res, next) => {
  const id = req.params.id;

  Product.findByIdAndUpdate(id, { name: req.body.name, price: req.body.price })
    .then((result) => {
      res.status(200).json({ wiadomosc: 'Zmiana produktu o nr ' + id });
    })
    .catch((err) => res.status(500).json({ wiadomosc: err }));
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;

  Product.findByIdAndDelete(id)
    .then((result) => {
      res.status(200).json({
        wiadomosc: 'Usunięcie produktu ' + result.name,
      });
    })
    .catch((err) => res.status(500).json({ wiadomosc: err }));
});

module.exports = router;
