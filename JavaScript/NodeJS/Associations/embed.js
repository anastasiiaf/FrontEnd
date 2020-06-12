var mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(
  'mongodb+srv://Anastasiia:250591Rada@cluster0-v3ypj.mongodb.net/data?retryWrites=true&w=majority',
);

var userSchema = new mongoose.Schema({
  email: String,
  name: String,
});
var User = mongoose.model('User', userSchema);

var postSchema = new mongoose.Schema({
  title: String,
  content: String,
});
var postModel = mongoose.model('Post', postSchema);

var newUser = new User({
  email: 'joan@yahoo.com',
  name: 'Joan Willis',
});

newUser.save(function (err, user) {
  if (err) {
    console.log(err);
  } else {
    console.log(user);
  }
});
