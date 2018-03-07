require('dotenv').config();

const config = {
  production: {
    mongoURL: process.env.PROD_MONGO_URI,
    tokenSecret: process.env.PROD_TOKEN_SECRET,
    cookieKey: process.env.PROD_COOKIE_KEY,
    facebookClientId: process.env.PROD_FACEBOOK_CLIENT_ID,
    facebookClientSecret: process.env.PROD_FACEBOOK_CLIENT_SECRET,
    googleClientId: process.env.PROD_GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.PROD_GOOGLE_CLIENT_SECRET
  },
  integration: {
    mongoURL: process.env.PRE_MONGO_URI,
    tokenSecret: process.env.PRE_TOKEN_SECRET,
    cookieKey: process.env.PRE_COOKIE_KEY,
    facebookClientId: process.env.PRE_FACEBOOK_CLIENT_ID,
    facebookClientSecret: process.env.PRE_FACEBOOK_CLIENT_SECRET,
    googleClientId: process.env.PRE_GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.PRE_GOOGLE_CLIENT_SECRET
  },
  default: {
    mongoURL: process.env.DEV_MONGO_URI,
    tokenSecret: process.env.DEV_TOKEN_SECRET,
    cookieKey: process.env.DEV_COOKIE_KEY,
    facebookClientId: process.env.DEV_FACEBOOK_CLIENT_ID,
    facebookClientSecret: process.env.DEV_FACEBOOK_CLIENT_SECRET,
    googleClientId: process.env.DEV_GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.DEV_GOOGLE_CLIENT_SECRET
  }
};

exports.get = function get(env) {
  return config[env] || config.default;
};
