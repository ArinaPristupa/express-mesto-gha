const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const router = require('express').Router();
const { errors } = require('celebrate');

const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { validationCreateUser, validationLogin } = require('./middlewares/validation');
const handleError = require('./middlewares/handleError');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(auth);
app.use('/', router.all('*', (req, res) => res.status(404).send({
  message: '404: Ошибка! Данные не найдены!',
})));

app.use(errors());
app.use(helmet());
app.use(handleError);

app.post('/signup', validationCreateUser, createUser);
app.post('/signin', validationLogin, login);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.listen(3000);
