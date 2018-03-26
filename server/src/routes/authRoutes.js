const passport = require('passport');
const keys = require('../config/keys').get(process.env.NODE_ENV);
const auth = require('../middleware/auth');

module.exports = app => {
  app.get('/api/auth', auth, (req, res) => {
    res.json({
      id: req.user._id,
      displayName: req.user.displayName,
      avatarUrl: req.user.avatarUrl
    });
  });

  // Logout
  app.get('/api/logout', auth, async (req, res) => {
    const user = req.user;

    req.logout(); // clear cookie['user'] with passport

    try {
      await user.deleteToken();
      res.clearCookie(keys.cookieKey);
      res.redirect('/');
    } catch (err) {
      res.status(400).json({
        errors: {
          route: {
            msg: err.message
          }
        }
      });
    }
  });

  // Facebook auth route
  app.get(
    '/auth/facebook',
    passport.authenticate('facebook', {
      scope: ['public_profile', 'email']
    })
  );

  app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook'),
    (req, res) => {
      const token = req.user.token;
      res.cookie(keys.cookieKey, token).redirect('/dashboard');
    }
  );

  // Google auth route
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      const token = req.user.token;
      res.cookie(keys.cookieKey, token).redirect('/dashboard');
    }
  );
};
