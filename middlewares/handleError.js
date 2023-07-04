const ERROR_BAD_REQUEST = 400;
const ERROR_INTERNAL_SERVER = 500;

const mongoose = require('mongoose');

module.exports = (err, req, res, next) => {
  const { statusCode = ERROR_INTERNAL_SERVER, message } = err;

  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(ERROR_BAD_REQUEST).send({
      message: 'Переданы неверные данные',
    });
  }
  if (err instanceof mongoose.Error.CastError) {
    return res.status(ERROR_BAD_REQUEST).send({
      message: 'Переданы неверный ID',
    });
  }

  res.status(statusCode).send(statusCode === 500 ? { message: 'На сервере произошла ошибка' } : { message });

  return next();
};
