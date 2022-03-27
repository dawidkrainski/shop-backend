const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

//importuję model
const Order = require('../models/order');


router.get("/", (req, res, next) => {
    Order.find()
        .then(result =>{
            res.status(200).json({wiadomosc: 'Lista wszystkich zamówień',
                info: result})
        })
        .catch(err => res.status((500).json({wiadomosc: err})));

})

router.post("/", (req, res, next) => {
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        productId: req.body.productId,
        quantity: req.body.quantity,
    });

    order.save()
        .then(result => {
            res.status(201).json({
                wiadomosc: 'Dodanie nowego zamowienia',
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
