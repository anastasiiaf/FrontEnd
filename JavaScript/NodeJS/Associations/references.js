var mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(
  'mongodb+srv://Anastasiia:250591Rada@cluster0-v3ypj.mongodb.net/data_2?retryWrites=true&w=majority',
);
var postSchema = new mongoose.Schema({
  title: String,
  content: String,
});
var Post = mongoose.model('Post', postSchema);

var userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
});
var User = mongoose.model('User', userSchema);

/* User.create({
  email: 'bob@yahoo.com',
  name: 'Bob Willis',
}); */

/* Post.create(
  {
    title: 'My comment 3',
    content: 'good day!!!!',
  },
  function (err, post) {
    User.findOne(
      {
        email: 'bob@yahoo.com',
      },
      function (err, foundUser) {
        if (err) {
          console.log(err);
        } else {
          foundUser.posts.push(post);
          foundUser.save(function (err, data) {
            if (err) {
              console.log(err);
            } else {
              console.log(data);
            }
          });
        }
      },
    );
  },
);
 */

User.findOne({ email: 'bob@yahoo.com' })
  .populate('posts')
  .exec(function (err, user) {
    if (err) {
      console.log(err);
    } else {
      console.log(user);
    }
  });
