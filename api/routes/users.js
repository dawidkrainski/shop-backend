const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require("../models/user");

// zakładanie konta
router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash,
        });
        user
            .save()
            .then((user) => res.status(201).json({ info: 'Utworzono nowego usera' }))
            .catch((err) => res.status(500).json({ info: err }));
    });
});

//logowanie
router.post("/login",(req, res, post)=>{
    // sprawdzić czy jest user o podanym mailu  - wuciągnać hasło
    // weryfikacja hasła z hashem
    User.findOne({email: req.body.email})
        .then(user => {
            if(!user){
                return res.status(403).json({info: "Błąd autoryzacji"})
            }
            bcrypt.compare(req.body.password, user.password).then( (result) => {
                if (!result){
                  return res.status(403).json({info: "Błęd autoryzacji"});
                }
                // tworzę JWT
                const token = jwt.sign({email: user.email,id: user._id}, process.env.JWT_KEY,{expiresIn: '1h'});
               return  res.status(200).json({
                   info: "Zalogowano poprawnie",
                   token: token});
            });
        })
        .catch((err) => res.status(500).json({ info: err }));
})

module.exports = router;
