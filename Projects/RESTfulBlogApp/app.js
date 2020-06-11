var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(
  'mongodb+srv://Anastasiia:250591Rada@cluster0-v3ypj.mongodb.net/blog?retryWrites=true&w=majority',
);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

var blogSchema = new mongoose.Schema({
  title: String,
  image: { type: String, default: 'Put image here' },
  body: String,
  created: { type: Date, default: Date.now },
});

var Blog = mongoose.model('Blog', blogSchema);

/* Blog.create({
  title: 'Learning routes',
  image: 'https://unsplash.com/photos/BQ6oryriY9c',
  body: 'Learning routes',
}); */
app.get('/', function (req, res) {
  res.redirect('/blogs');
});

// INDEX ROUTE
app.get('/blogs', function (req, res) {
  Blog.find({}, function (err, blogs) {
    if (err) {
      console.log('ERROR');
    } else {
      res.render('index', { blogs: blogs });
    }
  });
});

// NEW ROUTE
app.get('/blogs/new', function (req, res) {
  res.render('new');
});

// CREATE ROUTE
app.post('/blogs', function (req, res) {
  Blog.create(req.body.blog, function (err, newBlog) {
    if (err) {
      console.log(err);
      res.render('new');
    } else {
      res.redirect('/blogs');
    }
  });
});

app.listen(3000, process.env.IP, function () {
  console.log('Blog server has started!');
});
