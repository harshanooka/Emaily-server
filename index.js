const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
require('./models/User');
require('./services/passportService');

const app = express();
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.cookieSecret]
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongoDevURI);

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
