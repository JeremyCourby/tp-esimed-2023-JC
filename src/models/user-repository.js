const { users } = require('./db');
const uuid = require('uuid');
const {User} = require('../models/user.model')
const bcrypt = require('bcryptjs');

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
  const user = body
  const salt = bcrypt.genSaltSync(12);
  const hashedPassword = bcrypt.hashSync(body.password, salt);
  user.id = uuid.v4();
  user.password = hashedPassword;

  await User.create(user);
};

exports.updateUser = async(id, data) => {
  const foundUser = await User.findOne({ where: { id } });

  if (!foundUser) {
    throw new Error('User not found');
  }

  const salt = bcrypt.genSaltSync(12)
  await User.update({
    firstName: data.firstName || foundUser.firstName,
    lastName: data.lastName || foundUser.lastName,
    password: data.password ? bcrypt.hashSync(data.password, salt) : foundUser.password,
  }, { where: { id } });
};

exports.deleteUser = async (id) => {
  await User.destroy({ where: { id } });
}