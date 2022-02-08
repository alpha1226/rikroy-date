const lib = require('./main.js')

const a = new lib.rikroyDate(new Date());

const b = new lib.rikroyDate();

console.log(a.getTimezone())

b.setTimezone('Pacific/Midway')
b.setTimezone(b.data.timezone.Asia.Seoul)
b.setTimezone(b.data.timezone.America.Denver)

console.log(lib.getNowDateString());

console.log(a.format('yyyyMMddhhmmss'));

a.meridiemFormat = ['오전', '오후']
console.log(a.format('yy년 [a] M월 d일 a [day] a h시 m분 s초 [test]'))
console.log(a.format('yy년 M월 d일 ddd a h시 m분 s초'))
console.log(a.format('[cccc] yy년 [a] M월 d일 [day] a h시 m분 s초 [test]'))

console.log(a.formatTimezone('yyyy년 MM월 dd일', a.data.timezone.Asia.Seoul))


a.setTimezone(a.data.timezone.America.Chicago)

console.log(a.format('yyyy년 MM월 dd일 a hh시 mm분 ss.SSS초'))

b.setTimezone(b.data.timezone.Asia.Seoul)

console.log(b.format('yyyy MM dd a hh mm ss SSS'))

console.log(a.getTimezone())

console.log(a.meridiemFormat)

const c = new lib.rikroyDate(1645303644417)

console.log(c.format('yyyyMMddhhmmss'))

console.log(c._reference_date)