var family = {
  husband: {
    name: 'John',
    surname: 'Willis',
    sayHi: function () {
      return 'Hi ' + this.name + ' ' + this.surname;
    },
  },
  wife: {
    name: 'Mary',
    sayHi: function () {
      return 'Hi ' + this.name + ' ' + this.surname;
    },
  },
};

console.log(family.husband.sayHi());
console.log(family.wife.sayHi());

console.log(family.husband.sayHi());
//this in wife object refers to husband
console.log(family.wife.sayHi.call(family.husband));

//borrowing sayHi from husband
console.log(family.husband.sayHi.call(family.wife));
