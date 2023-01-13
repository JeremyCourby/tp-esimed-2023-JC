const express = require('express');
const router = express.Router();
const userRepository = require('../models/user-repository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

router.post('/login',body('firstName'), body('password'), async(req, res) => {
    if(!req.body.firstName || !req.body.password)
    {
        res.status(400).send('Il manque le firstname ou le password.')
    } else {
        const firstName = req.body.firstName
        const password = req.body.password
        const firstNameUser = await userRepository.getUserByFirstName(firstName)
        console.log(firstNameUser)
        console.log(password)
        console.log(firstNameUser.password)
        if(!firstNameUser || !bcrypt.compareSync(password, firstNameUser.password)){
            res.status(400).send("Login ou mot de passe incorrect")
        }else{
            const token = jwt.sign({ id: firstNameUser.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN});
            console.log(process.env.JWT_SECRET)
            res.status(200).json({ token });
        }
    }
});

exports.initializeRoutes = () => router;