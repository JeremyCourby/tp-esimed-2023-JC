const express = require('express');
const { TimeoutError } = require('sequelize');
const router = express.Router();
const userRepository = require('../models/user-repository');
const { User } = require('../models/user.model.js');

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
    throw new Error('User not found');
  }
  res.send(foundUser);
});

router.post('/', async(req, res) => {
  const existingUser = await userRepository.getUserByFirstName(req.body.firstName);

  if (existingUser) {
    throw new Error('Unable to create the user');
  }

  userRepository.createUser(req.body);
  res.status(201).end();
});

router.put('/:id', (req, res) => {
  userRepository.updateUser(req.params.id, req.body);
  res.status(204).end();
});

router.delete('/:id', (req, res) => {
  userRepository.deleteUser(req.params.id);
  res.status(204).end();
});

exports.initializeRoutes = () => router;