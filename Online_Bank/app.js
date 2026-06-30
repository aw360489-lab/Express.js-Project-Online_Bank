const express = require('express');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const flash = require('connect-flash');

const app = express();

// MongoDB Allas
// SRV connection string: mongodb+srv://aw360489_db_user:5rqIeqIGTTD4nly2@cluster0.m1xm148.mongodb.net/db1?
// Local mongoDB: mongodb://127.0.0.1:27017/bank

mongoose.connect('mongodb://aw360489_db_user:5rqIeqIGTTD4nly2@ac-vvrstsr-shard-00-00.m1xm148.mongodb.net:27017,ac-vvrstsr-shard-00-01.m1xm148.mongodb.net:27017,ac-vvrstsr-shard-00-02.m1xm148.mongodb.net:27017/db1?ssl=true&replicaSet=atlas-hgxgkq-shard-0&authSource=admin')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err))

// Introduce passport
require('./config/passport')();

// middleware
app.use(express.urlencoded({ extended: true }));

// view engine
app.set('view engine', 'pug');

// session
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

// flash
app.use(flash());

// passport
app.use(passport.initialize());
app.use(passport.session());

// global variable（for all Pug）
app.use((req, res, next) => {
  res.locals.user = req.user;
  
  // Pass old input to new page
  const messages = req.flash();
  res.locals.messages = messages;
  res.locals.old = messages.oldInput ? messages.oldInput[0] : {};

  next();
});

// routes
const authRoutes = require('./routes/authRoutes');
const accountRoutes = require('./routes/accountRoutes');
const adminRoutes = require('./routes/adminRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

app.use('/', authRoutes);
app.use('/', accountRoutes);
app.use('/', transactionRoutes);
app.use('/', adminRoutes);

// dashboard（protected）
const accountController = require('./controllers/accountController');
const { ensureAuth } = require('./middleware/authMiddleware');

app.get('/dashboard', ensureAuth, accountController.getAccounts);

// start
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});