const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Необходимо заполнить поле'],
      minlength: [2, 'Минимальное количество символов - 2'],
      maxlength: [30, 'Максимальное количество символов - 30'],
    },
    about: {
      type: String,
      required: [true, 'Необходимо заполнить поле'],
      minlength: [2, 'Минимальное количество символов - 2'],
      maxlength: [30, 'Максимальное количество символов - 30'],
    },
    // avatar: {
    //   type: String,
    //   required: [true, 'Необходимо заполнить поле'],
    // },
    avatar: {
      type: String,
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Некорректный URL',
      },
      required: [true, 'Необходимо заполнить поле'],
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('user', userSchema);
