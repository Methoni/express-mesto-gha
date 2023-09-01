const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getUserById,
  // createUser,
  editUserData,
  editUserAvatar,
  getMyUser,
} = require('../controllers/users');

router.get('/', getUsers);
// router.get('/:userId', getUserById);

router.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().length(24).hex().required(),
    }),
  }),
  getUserById,
);

// router.post('/', createUser);
// router.patch('/me', editUserData);

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  editUserData,
);

// router.patch('/me/avatar', editUserAvatar);

router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().pattern(
        /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/,
      ),
    }),
  }),
  editUserAvatar,
);

router.get('/me', getMyUser);

module.exports = router;
