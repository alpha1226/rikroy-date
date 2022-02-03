const lib = require('./main.js')

const a = new lib('20220203', 'YYYYMMDD');

console.log(a.getNowDateString());