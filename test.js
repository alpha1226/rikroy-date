const lib = require('./main.js')

const a = new lib.rikroyDate(new Date());

const b = new lib.rikroyDate();

console.log(a.getTimezone())

b.setTimezone('Pacific/Midway')
b.setTimezone(b.data.timezone.Asia.Seoul)
b.setTimezone(b.data.timezone.America.Denver)

a.setTimezone(a.timezone.Asia.Seoul)

console.log(lib.getNowDateString());

console.log(a.format('yyyyMMddhhmmss'));

a.meridiemFormat = ['오전', '오후']
console.log(a.format('yy년 [a] M월 d일 a [day] a h시 m분 s초 [test]'))
console.log(a.format('yy년 M월 d일 ddd a h시 m분 s초'))
console.log(a.format('[cccc] yy년 [a] M월 d일 [day] a h시 m분 s초 [test]'))

console.log(a.date.toLocaleString(), a.date.getHours(), a.date.getMinutes())

console.log(a.difference(new Date(), 'S'))


let adate = new Date(2022, 1, 9, 17, 0, 5)
console.log(a.difference(adate, 'm'))
