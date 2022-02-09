const timezone = require('./tzFullString.json')
const format = {
  fullYear: 'yyyy',
  halfYear: 'yy',
  fullMonth: 'MM',
  halfMonth: 'M',
  fullDate: 'dd',
  halfDate: 'd',
  fullMeridiem: 'a',
  full24Hours: 'HH',
  half24Hours: 'H',
  full12Hours: 'hh',
  half12Hours: 'h',
  fullMinutes: 'mm',
  halfMinutes: 'm',
  fullSecond: 'ss',
  halfSecond: 's',
  milliSecond: 'S',
  offsetFromUTC: 'Z'
}


class rikroyDate {
  timezone = require('./tz.json')

  _timezoneOffset = (new Date().getTimezoneOffset()) * 60 * 1000 * -1

  meridiemFormat = ['am', 'pm']
  dayWeekShortFormat = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', ]
  dayWeekLongFormat = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Staurday']


  /*
  format {
    yyyy: '2022',
    yy: '22', // last 2 char
    MM: '02', or '10'
    M: '2', or '10'
    dd: '03' , or '13'
    d: '3', or '13'    
    ddd: 'Mon', 'Tue'...
    dddd: 'Monday', 'Tuesday'...
    a: 'am' or 'pm'  (not use on 'HH' or 'H')
    HH: '00' or '15' (0 ~ 23) - hours
    H: '4' or '16'   (0 ~ 23) - hours
    hh: '06' or '11' (0 ~ 11) - hours
    h: '5' or '11'   (0 ~ 11) - hours
    mm: '07' or '30' (0 ~ 59) - minutes
    m: '7' or '59'   (0 ~ 59) - minutes
    ss: '01' or '30' (0 ~ 59) - second
    s: '1' or '30'   (0 ~ 59) - second
    Z: '+12:00'      (offset form UTC)
  }
  */

  constructor(date) {
    if(typeof date === typeof new Date() || !date) {
      this.date = date
    } else {
      throw 'invalid of date';
    }
  }

  initDate(year, month, date, hours, minutes, second, milliSecond, timezone) {
    this.date = new Date(year, month, date, hours, minutes, second, milliSecond)
  }
  
  

  setTimezone(tmz) {
    for(let tz of timezone) {
      if(tz.timezone === tmz) {
        this._timezoneOffset = tz.offset * 60 * 60 * 1000
        break
      }
    }
  }

  setMeridiemFormat(am, pm) {
    this.meridiemFormat = [am, pm]
  }

  format(formatStr){
    let _date = new Date(this.date.getTime() + this._timezoneOffset)
    
    let normal = [formatStr]
    let escape = []

    let i = 0;
    while(true){
      if(normal[i].indexOf('[') === -1) break;

      normal[i+1] = normal[i].substring(normal[i].indexOf(']')+1)
      
      escape.push(normal[i].substring(normal[i].indexOf('['), normal[i].indexOf(']')+1))

      normal[i] = normal[i].substring(0, normal[i].indexOf('['))

      i++
    }
    
    for(let i=0; i<normal.length;i++) {
      normal[i] = setYear(_date, normal[i])
      normal[i] = setMonth(_date, normal[i])
      normal[i] = setDay(_date, normal[i], this.dayWeekLongFormat, this.dayWeekShortFormat)
      normal[i] = setDate(_date, normal[i])
      normal[i] = setHours(_date, normal[i])
      normal[i] = setMinute(_date, normal[i])
      normal[i] = setSecond(_date, normal[i])
      normal[i] = setMeridiem(_date, normal[i], this.meridiemFormat)
    }

    formatStr = ''

    while(true){
      if(!normal.length && !escape.length) break;

      if(normal[0] != null) {
        formatStr += normal[0]
        normal.shift()
      }
      if(escape[0] != null) {
        formatStr += escape[0].substring(1, escape[0].length-1)
        escape.shift()
      }
    }

    return formatStr
  }


  /**
   * 
   * @param {*} comparisonDate 
   * @param {*} token
   * 
   * @token d: day, h: hours, m: minutes, s: second, S: milliseconds 
   */
  difference(comparisonDate, token) {
    console.log(this.date, comparisonDate, token)

    let timeDifference = this.date.getTime() - comparisonDate.getTime()
    
    switch(token) {
      case 'd': return Math.round(timeDifference / 1000 / 60 / 60 / 24)
      case 'h': return Math.round(timeDifference / 1000 / 60 / 60)
      case 'm': return Math.round(timeDifference / 1000 / 60)
      case 's': return Math.round(timeDifference / 1000)
      case 'S': return Math.round(timeDifference)
      default: throw 'invalid token'
    }
  }
}

function setYear(date, formatStr) {
  if(formatStr.indexOf('yyyy') >= 0) {
    formatStr = formatStr.replace('yyyy', date.getUTCFullYear())
  } else if(formatStr.indexOf('yy') >= 0) {
    formatStr = formatStr.replace('yy', date.getUTCFullYear().toString().substring(2,4))
  }
  return formatStr
}

function setMonth(date, formatStr) {
  let month = date.getUTCMonth() + 1
  if(formatStr.indexOf('MM') >= 0) {
    formatStr = formatStr.replace('MM', (month >= 10 ? month : '0' + month))
  } else if (formatStr.indexOf('M') >= 0) {
    formatStr = formatStr.replace('M', month)
  }
  return formatStr;
}

function setDate(date, formatStr) {
  let _date = date.getUTCDate()
  if(formatStr.indexOf('dd') >= 0) {
    formatStr = formatStr.replace('dd', (_date >= 10 ? _date : '0' + _date))
  } else if (formatStr.indexOf('d') >= 0) {
    formatStr = formatStr.replace('d', _date)
  }
  return formatStr;
}

function setHours(date, formatStr) {
  let _hours = date.getUTCHours()
  if(formatStr.indexOf('HH') >= 0) {
    formatStr = formatStr.replace('HH', (_hours >= 10 ? _hours : '0' + _hours))
  } else if(formatStr.indexOf('hh') >= 0) {
    formatStr = formatStr.replace('hh', ((_hours % 12) >= 10 ? _hours % 12 : '0' + (_hours % 12)))
  } else if(formatStr.indexOf('H') >= 0) {
    formatStr = formatStr.replace('H', _hours);
  } else if(formatStr.indexOf('h') >= 0) {
    formatStr = formatStr.replace('h', _hours % 12)
  }
  return formatStr;
}

function setMinute(date, formatStr) {
  let _minutes = date.getUTCMinutes();
  if(formatStr.indexOf('mm') >= 0) {
    formatStr = formatStr.replace('mm', (_minutes >= 10 ? _minutes : '0' + _minutes))
  } else if(formatStr.indexOf('m') >= 0) {
    formatStr = formatStr.replace('m', _minutes)
  }
  return formatStr
}

function setSecond(date, formatStr) {
  let _second = date.getUTCSeconds();

  if(formatStr.indexOf('ss') >= 0) {
    formatStr = formatStr.replace('ss', (_second >= 10 ? _second : '0'+ _second))
  } else if(formatStr.indexOf('s') >= 0) {
    formatStr = formatStr.replace('s', _second)
  }
  return formatStr
}

function setMeridiem(date, formatStr, meridiemFormat) {
  let _meridiem = date.getUTCHours() < 12

  if(formatStr.indexOf('a') >= 0) {
    formatStr = formatStr.replace('a', _meridiem <= 12 ? meridiemFormat[0] : meridiemFormat[1])
  }
  return formatStr
}

function setDay(date, formatStr, longDay, shortDay) {
  let _day = date.getUTCDay()

  if(formatStr.indexOf('dddd') >= 0) {
    formatStr = formatStr.replace('dddd', longDay[_day])
  } else if (formatStr.indexOf('ddd') >= 0) {
    formatStr = formatStr.replace('ddd', shortDay[_day])
  }

  return formatStr
}

module.exports = {
  rikroyDate,


//--------  OLD -----------

  /** 
   * get date
   * @summary get date(YYYYMMDD) as full string(8)
   * @author rikroy
   * @since 2022.01.03
   * @returns {string(8)} YYYYMMDD
   * 
   * @summary 
   */
   getNowDateString() {
    let now = new Date();
    let dateString =
      now.getFullYear() +
      '' +
      (now.getMonth() >= 9 ? (now.getMonth() + 1) : '0' + (now.getMonth() + 1)) +
      '' +
      (now.getDate() >= 10 ? now.getDate() : '0' + now.getDate());
    return dateString
  },

  /** 
   * get datetime
   * @summary get datetime(YYYYMMDDHHMMSS) as full string(14)
   * @author rikroy
   * @since 2022.01.03
   * @returns {string(14) YYYYMMDDHHMMSS
   */
  getNowDateTimeString() {
    let now = new Date();
    let dateString =
      now.getFullYear() +
      '' +
      (now.getMonth() >= 9 ? now.getMonth() + 1 : '0' + (now.getMonth() + 1)) +
      '' +
      (now.getDate() >= 10 ? now.getDate() : '0' + now.getDate()) +
      (now.getHours() >= 10 ? now.getHours() : '0' + now.getHours()) +
      (now.getMinutes() >= 10 ? now.getMinutes() : '0' + now.getMinutes()) +
      (now.getSeconds() >= 10 ? now.getSeconds() : '0' + now.getSeconds());

    return dateString;
  },

  /**
   * get Date(YYYYMMDD) from input object
   * @author rikroy
   * @since 2022.01.03
   * @param {Date} date
   * @returns {string(8)} YYYYMMDD
   * @throws unvalid date object
   */
  getDateString(date) {
    if(date instanceof Date){
      let dateString =
      date.getFullYear() +
      '' +
      (date.getMonth() >= 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) +
      '' +
      (date.getDate() >= 10 ? date.getDate() : '0' + date.getDate());
      return dateString;
    } else {
      throw 'unvalid date object'
    }
  },

  /**
   * get DateTime(YYYYMMDDHHMMSS) from input object
   * @author rikroy
   * @since 2022.01.03
   * @param {Date} date 
   * @returns {string(14)} YYYYMMDDHHMMSS
   * @throws unvalid date object
   */
  getDateTimeString(date) {
    if(date instanceof Date){
      let dateString =
        date.getFullYear() + '' +
        (date.getMonth() >= 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) + '' +
        (date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()) +
        (date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()) +
        (date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()) +
        (date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds());

      return dateString;
    } else {
      throw 'unvalid date object'
    }
  }
}
