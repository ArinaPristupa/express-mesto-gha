const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { error, statusOk } = require('../utils/errors');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send(user))
    .catch((err) => error(err, next));
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => statusOk(user, res))
    .catch((err) => error(err, next));
};

module.exports.getUserId = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail()
    .then((card) => statusOk(card, res))
    .catch((err) => error(err, next));
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => error(err, next));
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcryptjs.hash(password, 10)
    .then((hash) => {
      User
        .create({
          name,
          about,
          avatar,
          email,
          password: hash,
        })
        .then(() => res.status(201)
          .send(
            {
              data: {
                name,
                about,
                avatar,
                email,
              },
            },
          ))
        .catch((err) => error(err, next));
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, {
    name,
    about,
  }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => error(err, next));
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    {
      avatar,
    },
    {
      new: true, runValidators: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => error(err, next));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'JWT-token', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};
