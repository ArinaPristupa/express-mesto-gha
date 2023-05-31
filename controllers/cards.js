const Card = require('../models/card');
const { error } = require('../utils/errors');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch((err) => error(err, res));
};

module.exports.createCard = (req, res) => {
  const { _id } = req.user;

  const { name, link } = req.body;

  Card.create({ name, link, owner: _id })
    .then((card) => res.send(card))
    .catch((err) => error(err, res));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Карточка или пользователь с указанным _id не найдена.' });
      }
      return res.status(200).send(card);
    })
    .catch((err) => error(err, res));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Карточка или пользователь с указанным _id не найдена.' });
      }

      return res.status(200).send(card);
    })
    .catch((err) => error(err, res));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'карточка или пользователь с указанным _id не найдена.' });
      }

      return res.status(200).send(card);
    })
    .catch((err) => error(err, res));
};
