var movieDB = [
  { title: 'Vacation', rating: 5, watched: true },
  { title: 'Green book', rating: 5, watched: true },
  { title: 'Annabel', rating: 3, watched: true },
  { title: 'Shining', rating: 4, watched: false },
  { title: 'Police academy 6', rating: 3, watched: false },
];
window.setTimeout(function () {
  var input = prompt('What do you want to do?');

  while (input !== 'quit') {
    if (input === 'new') {
      addMovie();
    } else if (input === 'list') {
      listMovies();
    } else if (input === 'list2') {
      print(movieDB);
    } else if (input === 'list3') {
      movieDB.print();
    } else if (input === 'delete') {
      deleteMovie();
    }
    input = prompt('What do you want to do?');
  }
}, 500);

function addMovie() {
  var newTitle = prompt('Enter title');
  var status = prompt('Have you watched it? Enter false or true');
  var newRating = prompt('Enter rating');
  movieDB.push({ title: newTitle, rating: newRating, watched: status });
  console.log('New movie added');
}

function listMovies() {
  console.log('-------------');
  createString();
  console.log('-------------');
}

function createString() {
  for (var i = 0; i <= movieDB.length - 1; i++) {
    var result = i + ': You have ';
    if (movieDB[i].watched === true) {
      result += 'watched ' + '"' + movieDB[i].title + '" ';
    } else {
      result += 'not watched ' + '"' + movieDB[i].title + '" ';
    }
    result += 'with rating ' + movieDB[i].rating;
    console.log(result);
  }
}

function print(arr) {
  console.log('-------------');
  arr.forEach(function (el, j) {
    var result = j + ': You have ';
    if (movieDB[j].watched === true) {
      result += 'watched ' + '"' + movieDB[j].title + '" ';
    } else {
      result += 'not watched ' + '"' + movieDB[j].title + '" ';
    }
    result += 'with rating ' + movieDB[j].rating;
    console.log(result);
  });
  console.log('-------------');
}

movieDB.print = function () {
  console.log('-------------');
  this.forEach(function (el, j) {
    var result = j + ': You have ';
    if (movieDB[j].watched === true) {
      result += 'watched ' + '"' + movieDB[j].title + '" ';
    } else {
      result += 'not watched ' + '"' + movieDB[j].title + '" ';
    }
    result += 'with rating ' + movieDB[j].rating;
    console.log(result);
  });
  console.log('-------------');
};

function deleteMovie() {
  var index = prompt('Enter index to delete movie');
  movieDB.splice(index, 1);
  console.log('Movie deleted');
}
