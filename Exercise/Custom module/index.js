const myfunc = require("./AvgModule")
let a = 10;
let b = 20;
let c = 30;
const avg = myfunc.avg(a, b, c);
console.log(`The average of ${a},${b},${c} is ${avg}`);
console.log(myfunc.result);