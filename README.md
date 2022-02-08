## Rikroy Date Lib

on  2022.02.07



###### example

const {rikroyDate} = require('@recross/date');

let dateLib = new rikroyDate(new Date());

dateLib.format('yyyyMMddhhmmss');




###### how to use escape

'yyyy [escape] MM' => '2022 escape 02'

can use square brackets



---



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

