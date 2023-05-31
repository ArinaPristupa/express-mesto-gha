const User = require('../models/user');
const { error, statusOk } = require('../utils/errors');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send(user))
    .catch((err) => error(err, res));
};

module.exports.getUserId = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((card) => statusOk(card, res))
    .catch((err) => error(err, res));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => error(err, res));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, {
    name,
    about,
  }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => error(err, res));
};

module.exports.updateAvatar = (req, res) => {
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
    .catch((err) => error(err, res));
};
