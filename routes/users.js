const usersRouter = require('express').Router();

const {
  getUsers,
  getUserId,
  createUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUserId);

usersRouter.post('/', createUser);

usersRouter.patch('/me', updateUser);
usersRouter.patch('/me/avatar', updateAvatar);

module.exports = usersRouter;
