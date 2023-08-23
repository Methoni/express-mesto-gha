const mongoose = require('mongoose');

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
    avatar: {
      type: String,
      required: [true, 'Необходимо заполнить поле'],
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('user', userSchema);
