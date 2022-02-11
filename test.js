const { rikroyDate } = require('./main.js');
const lib = require('./main.js')

const a = new rikroyDate(new Date());

const b = new rikroyDate();

console.log(a.getTimezone())

b.setTimezone('Pacific/Midway')
b.setTimezone(b.data.timezone.Asia.Seoul)
b.setTimezone(b.data.timezone.America.Denver)

a.setTimezone(a.data.timezone.Asia.Seoul)

console.log(lib.getNowDateString());

console.log(a.format('yyyyMMddhhmmss'));

a.meridiemFormat = ['오전', '오후']
console.log(a.format('yy년 [a] M월 d일 a [day] a h시 m분 s초 [test]'))
console.log(a.format('yy년 M월 d일 ddd a h시 m분 s초'))
console.log(a.format('[cccc] yy년 [a] M월 d일 [day] a h시 m분 s초 [test]'))


console.log(a.difference(new Date(), 'S'))


let adate = new Date(2022, 1, 9, 17, 0, 5)
console.log(a.difference(adate, 'm'))


console.log(new Date())
for(let i=0; i<10000; i++) {
  let test = new rikroyDate(new Date());
  test.format('yyyyMMddhhmmssSSS')
  test.getTimezone()
}
console.log(new Date())

console.log(a.format('yyyyMMdd[]hhmmss'))