const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const keys = require('./config/keys').get(process.env.NODE_ENV);

const errorHandler = require('./middleware/errorHandler');

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);

require('./services/passportStrategies');

mongoose.connect(keys.mongoURL);

app.use(bodyParser.json());
app.use(cookieParser());

app.use(passport.initialize());

require('./routes/authRoutes')(app);
require('./routes/userRoutes')(app);
require('./routes/eventRoutes')(app);
require('./routes/socketRoutes')(server);

if (
  process.env.NODE_ENV === 'production' ||
  process.env.NODE_ENV === 'integration'
) {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '../../client', 'build', 'index.html')
    );
  });
}

app.use(errorHandler);

server.listen(PORT, () => {
  console.log(`Server up on ${PORT}`);
});
