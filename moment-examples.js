var moment = require('moment');
var now = moment();

console.log(now.format());

console.log(now.format('X'));   //time in seconds (String)
console.log(now.format('x'));   // time in milliseconds (String)
console.log(now.valueOf());   // time in milliseconds (Number)

var timestamp = 1474498476535;
var timestampmoment = moment.utc(timestamp);
console.log(timestampmoment.format());
console.log(timestampmoment.local().format('h:mm a'));

// now.subtract(1, "year")
// console.log(now.format());
//
// now.add(1, "year")
// console.log(now.format());
//
// console.log(now.format('MMM Do YYYY, h:mm a'));
