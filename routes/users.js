const usersRouter = require('express').Router();

const {
  getUsers,
  getUserId,
  getUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

const {
  validationUserId,
  validationUpdateUser,
  validationUpdateAvatar,
} = require('../middlewares/validation');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getUser);

usersRouter.get('/:userId', validationUserId, getUserId);

usersRouter.patch('/me', validationUpdateUser, updateUser);
usersRouter.patch('/me/avatar', validationUpdateAvatar, updateAvatar);

module.exports = usersRouter;
