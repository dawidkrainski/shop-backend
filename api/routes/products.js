const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

//importuję model
const Product = require('../models/product');


router.get("/", (req, res, next) => {
    Product.find()
        .then(result =>{
            res.status(200).json({wiadomosc: 'Lista wszystkicg produktow',
            info: result})
    })
        .catch(err => res.status((500).json({wiadomosc: err})));

})

router.post("/", (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
    });

    product.save()
        .then(result => {
            res.status(201).json({
                wiadomosc: 'Dodanie nowego produktu',
                info: result,
            });
        })
        .catch(err => res.status((500).json({wiadomosc: err})));


})

router.get("/:id", (req, res, next) =>{
    const id = req.params.id;

    Product.findById(id)
        .then(result =>{
            res.status(200).json({
                wiadomosc:'szczegóły produktu o nr '+ id,
                info: result,
            })
                .catch(err => res.status((500).json({wiadomosc: err})));
        })

})
router.put("/:id", (req, res, next) =>{
    const id = req.params.id;

    Product.findByIdAndUpdate(id, { name: req.body.name, price: req.body.price})
        .then(result =>{
            res.status(200).json({
                wiadomosc:'zmiana produktu '+ result.name,
            })
        })
        .catch(err => res.status((500).json({wiadomosc: err})));


})
router.delete("/:id", (req, res, next) =>{
    const id = req.params.id;

    Product.findByIdAndDelete(id)
        .then(result =>{
            res.status(200).json({wiadomosc:'poprawne usunięcie produktu  '+ result.name})
        })
        .catch(err => res.status((500).json({wiadomosc: err})));


})


module.exports = router;
