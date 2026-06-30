const router = require('express').Router();
const passport = require('passport');
const authController = require('../controllers/authController');

const { validate } = require('../middleware/validationMiddleware');
const { registerSchema, loginSchema } = require('../validators/userValidator');
const { ensureAuth } = require('../middleware/authMiddleware');

router.get('/register', (req, res) => {
  res.render('auth/register');
});

router.post('/register',
  validate(registerSchema),    // Joi: input validation
  authController.register
);

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.post('/login',
  validate(loginSchema),     // Joi: input validation

  // Save input
  (req, res, next) => {
    req.flash('oldInput', { username: req.body.username });
    next();
  },

  passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
  }),
  (req, res) => {
    if (req.user.isAdmin) {
      return res.redirect('/admin');
    }
    res.redirect('/dashboard');
  }
);

router.get('/profile', ensureAuth, authController.showProfile);

router.post('/profile',
  ensureAuth,
  authController.updateProfile
);

router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/login');
  });
});

module.exports = router;