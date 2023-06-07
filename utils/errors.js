const OK = 200;
const ERROR_BAD_REQUEST = 400;
// const ERROR_UNAUTHORIZED = 401;
const ERROR_NOT_FOUND = 404;
const ERROR_CONFLICTING_REQUEST = 409;
const ERROR_INTERNAL_SERVER = 500;

const mongoose = require('mongoose');

const statusOk = (req, res) => {
  if (!req) {
    return res.status(ERROR_NOT_FOUND).send({
      message: 'По указанному _id нет данных',
    });
  }
  return res.status(OK).send(req);
};

const errorDate = (req, res) => res.status(ERROR_NOT_FOUND).send({
  message: 'Переданы некорректные данные при создании карточки',
});

const error = (err, req, res, next) => {
  const { statusCode = ERROR_INTERNAL_SERVER, message } = err;

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
  if (err.code === 11000) {
    return res.status(ERROR_CONFLICTING_REQUEST).send({
      message: 'Пользователь с таким email уже существует',
    });
  }

  res.status(statusCode).send(statusCode === 500 ? err : { message });

  return next();
};

const handleError = (err, req, res, next) => {
  const { statusCode = ERROR_INTERNAL_SERVER, message } = err;
  res.status(statusCode)
    .send({
      message: statusCode === ERROR_INTERNAL_SERVER ? message : 'На сервере произошла ошибка',
    });
  next();
};

module.exports = {
  error,
  errorDate,
  statusOk,
  handleError,
};

// const error = (err, res) => {
//   if (err instanceof mongoose.Error.ValidationError) {
//     return res.status(ERROR_BAD_REQUEST).send({
//       message: 'Переданы неверные данные',
//     });
//   }
//   if (err instanceof mongoose.Error.CastError) {
//     return res.status(ERROR_BAD_REQUEST).send({
//       message: 'Переданы неверные данные',
//     });
//   }
//   if (err instanceof mongoose.Error.DocumentNotFoundError) {
//     return res.status(ERROR_NOT_FOUND).send({
//       message: 'Карточка или пользователь с указанным _id не найдена.',
//     });
//   }
//   return res.status(ERROR_INTERNAL_SERVER).send({
//     message: 'Ошибка по умолчанию',
//   });
// };
