## Rikroy Date Lib

on  2022.02.09



###### example
const {rikroyDate} = require('@recross/date');

let rd= new rikroyDate(new Date());

rd.format('yyyyMMddhhmmss');



##### how to use escape

'yyyy [escape] MM' => '2022 escape 02'

can use square brackets

do not use double escape
like 'yyyy [es[ca]pe] MM' => has bug, reutrn '2022 es[cape] 02'

---

###### format token

example : rd.format('yyyyMMdd')

| Token | Discription              | Output |
| ----- | ------------------------ | ------ |
| yyyy  | full year                | 2022   |
| yy    | year last 2 character    | 22     |
| MM    | month                    | 02     |
| M     | month                    | 2      |
| dd    | date                     | 03     |
| d     | date                     | 3      |
| ddd   | week of day(short)       | Mon    |
| dddd  | week of day(full)        | Monday |
| a     | meridiem                 | am     |
| HH    | 24 hours                 | 14     |
| H     | 24hours                  | 7      |
| hh    | 12 hours                 | 02     |
| h     | 12hours                  | 2      |
| mm    | minutes                  | 08     |
| m     | minutes                  | 8      |
| ss    | second                   | 03     |
| s     | second                   | 3      |
| SSS   | millisecond(max leng:3)  | 260    |



---

###### get time difference

example : rd.difference(new Date(), 'm') <- comparison date object and token

| Token | Discription |
| ----- | ----------- |
| d     | day         |
| h     | hours       |
| m     | minutes     |
| s     | second      |
| S     | millisecond |