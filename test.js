const lib = require('./main.js')

const a = new lib.rikroyDate(new Date());

const b = new lib.rikroyDate();

b.initDate(2022,2,4,16,30,29,28,'Pacific/Midway')

b.setTimezone('Pacific/Midway')

console.log(b.timezoneOffset.Asia.Seoul)

console.log(lib.getNowDateString());

console.log(a.format('yyyyMMdd'));

console.log(a.format('yy년 M월 d일'))

console.log(a.formatTimezone('yyyy년 MM월 dd일', a.timezoneOffset.Asia.Seoul))

console.log(a.date.toLocaleString(), a.date.getHours(), a.date.getMinutes())