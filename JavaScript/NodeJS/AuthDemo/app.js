var express = require('express'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  bodyParser = require('body-parser'),
  localStrategy = require('passport-local'),
  passportLocalMongoose = require('passport-local-mongoose'),
  User = require('./models/user');
const { serializeUser, deserializeUser } = require('passport');

var app = express();
app.set('view engine', 'ejs');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(
  'mongodb+srv://Anastasiia:250591Rada@cluster0-v3ypj.mongodb.net/authdemo?retryWrites=true&w=majority',
);
app.use(
  require('express-session')({
    secret: 'I have no secrets..... :(',
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser()); //  encode data and taking data back to session
passport.deserializeUser(User.deserializeUser()); // reading session and taking data from it end decode it

app.get('/', function (req, res) {
  res.render('home');
});

app.get('/secret', function (req, res) {
  res.render('secret');
});

app.listen(3000, process.env.IP, function () {
  console.log('Server started!');
});
