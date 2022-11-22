console.log("bvdsbkdskjvv")

var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("1234", salt);

console.log(bcrypt.compareSync("1234", hash))
console.log(bcrypt.compareSync("5678", hash)) // false