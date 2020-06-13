var mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(
  'mongodb+srv://Anastasiia:250591Rada@cluster0-v3ypj.mongodb.net/data?retryWrites=true&w=majority',
);
var postSchema = new mongoose.Schema({
  title: String,
  content: String,
});
var Post = mongoose.model('Post', postSchema);

var userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [postSchema],
});
var User = mongoose.model('User', userSchema);

var newUser = new User({
  email: 'henry@yahoo.com',
  name: 'Henry Willis',
});

newUser.posts.push({
  title: 'Groceries at Brugata',
  content: 'did not find mushrooms...',
});

newUser.save(function (err, user) {
  if (err) {
    console.log(err);
  } else {
    console.log(user);
  }
});

/* var newPost = new Post({
  title: 'Apples in Lamber market',
  content: 'the are delicious',
});

newPost.save(function (err, user) {
  if (err) {
    console.log(err);
  } else {
    console.log(user);
  }
}); */

User.findOne({ name: 'Henry Willis' }, function (err, user) {
  if (err) {
    console.log(err);
  } else {
    // push new post
    user.posts.push({
      title: 'Meat at Grønland',
      content: 'big variety, low prices',
    });
    // save to db; user in callback will have a new post
    user.save(function (err, user) {
      if (err) {
        console.log(err);
      } else {
        console.log(user);
      }
    });
  }
});
