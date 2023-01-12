const { users } = require('./db');
const uuid = require('uuid');
const md5 = require('md5');
const {User} = require('../models/user.model')

exports.getUsers = async() => {return await User.findAll();}

exports.getUserByFirstName = async(searchFirstName) => {
  const userfind = await User.findAll({
    where:{
      firstName: searchFirstName
    }
  });
  return userfind[0];
};

exports.createUser = async (body) => {
  const hashedPassword = md5(body.password);
  const user = body;
  user.password = hashedPassword;

  await User.create(user);
};

exports.updateUser = (id, data) => {
  const foundUser = users.find((user) => user.id == id);

  if (!foundUser) {
    throw new Error('User not found');
  }

  foundUser.firstName = data.firstName || foundUser.firstName;
  foundUser.lastName = data.lastName || foundUser.lastName;
  foundUser.password = data.password ? md5(data.password) : foundUser.password;
};

exports.deleteUser = (id) => {
  const userIndex = users.findIndex((user) => user.id == id);

  if (userIndex === -1) {
    throw new Error('User not foud');
  }

  users.splice(userIndex, 1);
}