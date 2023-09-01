// const { HTTP_STATUS_OK, HTTP_STATUS_CREATED } = require('http2').constants;
const { HTTP_STATUS_CREATED } = require('http2').constants;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const User = require('../models/user');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ users }))
    // .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        // res
        //   .status(404)
        //   .send({ message: 'Пользователь по указанному _id не найден' });
        next(
          new NotFoundError(
            `Пользователь по указанному _id: ${req.params.userId} не найден`,
          ),
        );
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        // res.status(400).send({ message: 'Передан некорректный _id' });
        next(
          new BadRequestError(`Передан некорректный _id: ${req.params.userId}`),
        );
      } else {
        // res.status(500).send({ message: 'На сервере произошла ошибка' });
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    // User.create({ name, about, avatar })
    // .then((user) => res.status(201).send(user))
    // .then((user) => res.status(HTTP_STATUS_CREATED).send(user))
    .then((user) => res.status(HTTP_STATUS_CREATED).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      // _id: user._id,
      email: user.email,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(
          new ConflictError(
            `Пользователь с таким email ${email} уже зарегистрирован`,
          ),
        );
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
        // res.status(400).send({ message: err.message });
      } else {
        // res.status(500).send({ message: 'На сервере произошла ошибка' });
        next(err);
      }
    });
};

module.exports.editUserData = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        // res
        //   .status(404)
        //   .send({ message: 'Пользователь по указанному _id не найден' });
        next(
          new NotFoundError(
            `Пользователь по указанному _id: ${req.params.userId} не найден`,
          ),
        );
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        // res.status(400).send({ message: err.message });
        next(new BadRequestError(err.message));
      } else {
        // res.status(500).send({ message: 'На сервере произошла ошибка' });
        next(err);
      }
    });
};

module.exports.editUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        // res
        //   .status(404)
        //   .send({ message: 'Пользователь по указанному _id не найден' });
        next(
          new NotFoundError(
            `Пользователь по указанному _id: ${req.params.userId} не найден`,
          ),
        );
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        // res.status(400).send({ message: err.message });
        next(new BadRequestError(err.message));
      } else {
        // res.status(500).send({ message: 'На сервере произошла ошибка' });
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', {
        expiresIn: '7d',
      });
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
};
