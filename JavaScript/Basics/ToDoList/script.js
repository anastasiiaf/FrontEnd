var todos = ['buy groceries', 'clean room', 'call home'];
window.setTimeout(function () {
  var answer = prompt('What would you like to do?');
  while (answer !== 'quit') {
    if (answer === 'list') {
      listToDos();
    } else if (answer === 'new') {
      addToDo();
    } else if (answer === 'delete') {
      deleteToDo();
    }
    answer = prompt('What would you like to do?');
  }

  console.log('You quit the app!');
}, 1000);

function listToDos() {
  console.log('**********');
  todos.forEach(function (todo, i) {
    console.log(i + ': ' + todo);
  });
  console.log('**********');
}

function addToDo() {
  var newToDo = prompt('Enter new ToDo');
  todos.push(newToDo);
  console.log('Added ToDo');
}

function deleteToDo() {
  var index = prompt('Enter index of ToDo to delete');
  todos.splice(index, 1);
  console.log('Deleted ToDo');
}
