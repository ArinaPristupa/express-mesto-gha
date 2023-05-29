const mongoose = require('mongoose');

const ERROR_BAD_REQUEST = 400;
const ERROR_NOT_FOUND = 404;
const ERROR_INTERNAL_SERVER = 500;

const errorDate = (req, res) => res.status(ERROR_NOT_FOUND).send({
  message: 'Переданы некорректные данные при создании карточки',
});

const error = (err, res) => {
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(ERROR_BAD_REQUEST).send({
      message: 'Переданы неверные данные',
    });
  }
  if (err instanceof mongoose.Error.CastError) {
    return res.status(ERROR_BAD_REQUEST).send({
      message: 'Переданы неверные данные',
    });
  }
  if (err instanceof mongoose.Error.DocumentNotFoundError) {
    return res.status(ERROR_INTERNAL_SERVER).orFail().send({
      message: 'Карточка или пользователь с указанным _id не найдена.',
    });
  }
  return res.status(ERROR_INTERNAL_SERVER).orFail().send({
    message: 'Ошибка по умолчанию',
  });
};

module.exports = {
  error,
  errorDate,
};
