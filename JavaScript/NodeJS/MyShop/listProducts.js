var faker = require('faker');
faker.locale = 'tr';

for (var i = 0; i < 10; i++) {
  var product = faker.fake(
    '{{commerce.productAdjective}} {{commerce.productMaterial}} {{commerce.product}}',
  );
  var price = faker.fake('{{finance.currencySymbol}}{{commerce.price}}');
  console.log(product + ' - ' + price);
}
