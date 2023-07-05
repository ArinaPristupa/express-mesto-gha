const { celebrate, Joi } = require('celebrate');

const valUrl = /^https?:\/\/(?:w{3}\.)?(?:[a-z0-9]+[a-z0-9-]*\.)+[a-z]{2,}(?::[0-9]+)?(?:\/\S*)?#?$/i;

module.exports.validationCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().pattern(valUrl),
  }),
});

module.exports.validationCardId = celebrate({
  params: Joi.object()
    .keys({
      cardId: Joi.string().required().hex().length(24),
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
      avatar: Joi.string().pattern(valUrl),
      password: Joi.string().required(),
    }),
});

module.exports.validationUserId = celebrate({
  params: Joi.object()
    .keys({
      userId: Joi.string()
        .required()
        .hex()
        .length(24),
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
      avatar: Joi.string()
        .required()
        .pattern(valUrl),
    }),
});
