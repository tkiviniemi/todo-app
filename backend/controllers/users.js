const { v4 } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
require('dotenv').config();

const users = require('../models/users');

const signUpUser = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(4).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const { name, email, password } = req.body;
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return res.status(500).send('Could not create user, try again');
  }

  const newUser = {
    id: v4(),
    name,
    email,
    password: hashedPassword,
  };

  try {
    const exists = await users.findByEmail(email);
    if (exists.length > 0) {
      return res.status(422).send('Could not create user');
    }
    const result = await users.create(newUser);
    if (!result) {
      return res.status(500).send('Something went wrong creating the user');
    }

    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
      },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      id: newUser.id,
      email: newUser.email,
      token: token,
    });
  } catch (err) {
    return res.status(500).send('Signup failed, please try again');
  }
};

const loginUser = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const { email, password } = req.body;
  let identifiedUser;
  try {
    const result = await users.findByEmail(email);
    if (!result[0]) {
      return res
        .status(401)
        .send('Could not identify user, credetials might be wrong');
    }

    identifiedUser = result[0];
  } catch (err) {
    console.log(err);
    return res.status(500).send('Something went wrong with login in the user');
  }
  console.log(identifiedUser);
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, identifiedUser.password);
  } catch (err) {
    console.log(err);
    return res.status(500).send('Could not log you in , check your credetials');
  }
  if (!isValidPassword) {
    return es
      .status(401)
      .send('Could not identify user, credetials might be wrong');
  }
  let token;
  try {
    token = jwt.sign(
      {
        id: identifiedUser.id,
        email: identifiedUser.email,
      },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );
  } catch (err) {
    return res.status(500).send('Something went wrong with login in the user');
  }
  res.status(201).json({
    id: identifiedUser.id,
    email: identifiedUser.email,
    token: token,
  });
};

const getUsers = async (req, res) => {
  try {
    const response = await users.findAll();
    if (response) {
      res.send(response);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong');
  }
};

module.exports = {
  signUpUser,
  loginUser,
  getUsers,
};
