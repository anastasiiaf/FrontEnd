var mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(
  'mongodb+srv://Anastasiia:250591Rada@cluster0-v3ypj.mongodb.net/data?retryWrites=true&w=majority',
);
//mongoose.connect('mongodb://localhost/cat_app');

var catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  temperament: String,
});

// pattern for cats; "Cat" - should be singular - model creates a collection and set its name in plural
var Cat = mongoose.model('Cat', catSchema);

/*
// creating entry in 2 steps:
// 1. create new instance
var george = new Cat({
  name: 'Marta',
  age: 3,
  temperament: 'friendly',
});

// save to DB
// cat in callback func is what came back from DB
// george is what we have in js and trying to save to DB
george.save(function (err, cat) {
  if (err) {
    console.log('smth went wrong');
  } else {
    console.log('entry added to DB');
    console.log(cat);
  }
}); */

//create and save new entry
Cat.create(
  {
    name: 'Mittens',
    age: 15,
    temperament: 'quiet',
  },
  function (err, cat) {
    if (err) {
      console.log('smth went wrong');
      console.log(err);
    } else {
      console.log('entry added to DB');
      console.log(cat);
    }
  },
);

Cat.find({}, function (err, cats) {
  if (err) {
    console.log('smth went wrong');
    console.log(err);
  } else {
    console.log('We have: ');
    console.log(cats);
  }
});
