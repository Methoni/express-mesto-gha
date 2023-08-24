const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Необходимо заполнить поле'],
      minlength: [2, 'Минимальное количество символов - 2'],
      maxlength: [30, 'Максимальное количество символов - 30'],
    },
    link: {
      type: String,
      required: [true, 'Необходимо заполнить поле'],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true],
      // ref: 'user',
    },
    likes: {
      type: mongoose.Schema.Types.ObjectId,
      // ref: 'user',
      // default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('card', cardSchema);
