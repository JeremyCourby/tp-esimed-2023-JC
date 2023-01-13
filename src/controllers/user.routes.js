const express = require('express');
const { TimeoutError } = require('sequelize');
const router = express.Router();
const userRepository = require('../models/user-repository');
const { User } = require('../models/user.model.js');
const { body, validationResult } = require('express-validator');

router.get('/test-sqlite', async (req, res) => {

  const jane = await User.create({
    firstName : 'jérémy',
    lastName: 'Crb',
    password: 'password'
  });
  
  const users = await User.findAll();
    
  res.send(users)
});

router.get('/', async(req, res) => {
  res.send(await userRepository.getUsers());
});

router.get('/:firstName', async (req, res) => {
  const foundUser = await userRepository.getUserByFirstName(req.params.firstName);

  if (!foundUser) {
    res.status(500).send('User not found');
    return;
  }

  res.send(foundUser);
});

router.post('/',body('firstName').not().isEmpty().isAlphanumeric().isLength({ min: 5 }),body('lastName').not().isEmpty().isAlphanumeric().isLength({ min: 5 }), body('password').not().isEmpty().isAlphanumeric().isLength({ min: 5 }), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const existingUser = await userRepository.getUserByFirstName(req.body.firstName);
  if (existingUser) {
    throw new Error('Unable to create the user');
  }
  
  await userRepository.createUser(req.body);
  res.status(201).end();
});

router.put('/:id', async (req, res) => {
  await userRepository.updateUser(req.params.id, req.body).catch((err) => res.status(500).send(err.message));
  res.status(204).end();
});

router.delete('/:id', async (req, res) => {
  await userRepository.deleteUser(req.params.id);
  res.status(204).end();
});

exports.initializeRoutes = () => router;