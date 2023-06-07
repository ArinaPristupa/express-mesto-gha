const Card = require('../models/card');
const { error, statusOk } = require('../utils/errors');
const { NotFoundError } = require('../utils/error/NotFoundError');
const { ForbiddenError } = require('../utils/error/ForbiddenError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch((err) => error(err, next));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })

    .then((card) => res.status(201).send(card))
    .catch((err) => error(err, next));
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .orFail(new NotFoundError('Переданы неверные данные'))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        return next(new ForbiddenError('Отказано в доступе! Данная карточка не принадлежит пользователю!'));
      }
      return Card.deleteOne(card)
        .then(() => res.status(200).send({ message: 'Карточка успешно удаленна!' }));
    })
    .catch((err) => error(err, next));
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail()
    .then((card) => statusOk(card, res))
    .catch((err) => error(err, next));
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail()
    .then((card) => statusOk(card, res))
    .catch((err) => error(err, next));
};
