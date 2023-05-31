const Card = require('../models/card');
const { error, statusOk } = require('../utils/errors');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch((err) => error(err, res));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })

    .then((card) => statusOk(card, res))
    .catch((err) => error(err, res));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail()
    .then((card) => statusOk(card, res))
    .catch((err) => error(err, res));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail()
    .then((card) => statusOk(card, res))
    .catch((err) => error(err, res));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail()
    .then((card) => statusOk(card, res))
    .catch((err) => error(err, res));
};
