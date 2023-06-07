const isURL = require('validator/lib/isURL');
const { celebrate, Joi } = require('celebrate');

const { BadRequestError } = require('../utils/error/BadRequestError');

const validationUrl = (url) => {
  const validate = isURL(url);
  if (validate) {
    return url;
  }
  throw new BadRequestError('Некорректный URL адрес');
};

const validationId = (schema = 'cardId') => celebrate({
  params: Joi.object().keys({
    [schema]: Joi.string().required().hex().length(24),
  }),
});

module.exports.validationLogin = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
});

module.exports.validationCreateUser = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      email: Joi.string().required().email(),
      avatar: Joi.string().custom(validationUrl),
      password: Joi.string().required(),
    }),
});

module.exports.validationUserId = celebrate({
  params: Joi.object()
    .keys({
      userId: Joi.string().required().custom(validationId),
    }),
});

module.exports.validationUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(2)
      .max(30),
    about: Joi.string()
      .required()
      .min(2)
      .max(30),
  }),
});

module.exports.validationUpdateAvatar = celebrate({
  body: Joi.object()
    .keys({
      avatar: Joi.string().required().custom(validationUrl),
    }),
});

module.exports.validationCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().custom(validationUrl),
  }),
});

module.exports.validationCardId = celebrate({
  params: Joi.object()
    .keys({
      cardId: Joi.string().required().custom(validationId),
    }),
});
