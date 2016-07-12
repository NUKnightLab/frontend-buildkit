var first = require('first.js');
var second = require('second.js');

var bookTemplate = require('../templates/example.hbs');

console.log(bookTemplate({
  username: "Alan"
}))
