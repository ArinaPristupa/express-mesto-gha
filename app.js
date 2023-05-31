const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('express').Router();

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '6474ce2a1f17a2f77882040e', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('/', router.all('*', (req, res) => res.status(404).send({
  message: '404: Ошибка! Данные не найдены!',
})));

app.listen(3000);
