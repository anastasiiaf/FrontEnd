var express = require('express'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  bodyParser = require('body-parser'),
  localStrategy = require('passport-local'),
  passportLocalMongoose = require('passport-local-mongoose'),
  User = require('./models/user');
const { serializeUser, deserializeUser } = require('passport');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
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

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); //  encode data and taking data back to session
passport.deserializeUser(User.deserializeUser()); // reading session and taking data from it end decode it

//ROUTES

app.get('/', function (req, res) {
  res.render('home');
});

app.get('/secret', isLoggedIn, function (req, res) {
  res.render('secret');
});

// AUTH ROUTES
// show sign up form
app.get('/register', function (req, res) {
  res.render('register');
});

// handle user sign up
app.post('/register', function (req, res) {
  // second arg (password) in register is hashed and saved to db
  User.register(new User({ username: req.body.username }), req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      res.render('register');
    }
    //logging in user
    passport.authenticate('local')(req, res, function () {
      res.redirect('/secret');
    });
  });
});

// LOG IN ROUTES
app.get('/login', function (req, res) {
  res.render('login');
});

app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: '/login',
  }),
  function (req, res) {},
);

app.get('/logout', function (req, res) {
  req.logOut(); // destroys user data in the session
  res.redirect('/');
});

// middleware function checking if user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

app.listen(3000, process.env.IP, function () {
  console.log('Server started!');
});
