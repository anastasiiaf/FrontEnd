var family = {
  husband: {
    name: 'John',
    surname: 'Willis',
    sayHi: function () {
      return 'Hi ' + this.name + ' ' + this.surname;
    },
    averAge: function (a, b) {
      return this.name + ' says ' + (a + b) / 2;
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

//explicit binding: CALL in function
console.log('===================================');
console.log(family.husband.sayHi());
//this in wife object refers to husband
console.log(family.wife.sayHi.call(family.husband));
//borrowing sayHi from husband
console.log(family.husband.sayHi.call(family.wife));

//explicit binding: APPLY in function
console.log('===================================');
console.log(family.husband.averAge(30, 35));
console.log(family.husband.averAge.call(family.wife, 30, 35));
console.log(family.husband.averAge.apply(family.wife, [30, 35]));

//explicit binding: BIND in function
console.log('===================================');
var resultWife = family.husband.averAge.bind(family.wife, 30, 35);
console.log(resultWife());
var resultWife2 = family.husband.averAge.bind(family.wife, 30);
console.log(resultWife2(35));
