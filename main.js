// all of timezone data
const TIMEZONE_DATA = require('./tzFullString.json')

/*
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
*/

// reference date in this lib
let _reference_date

// timezone offset in this lib, default: country's timezone
let _timezoneOffset = (new Date().getTimezoneOffset()) * -60000

class rikroyDate {
  // data
  data = {
    timezone: require('./tz.json')
  }
  // timezone string
  timezone

  // meridiem format
  meridiemFormat = ['am', 'pm']

  // day of week short format
  dayOfWeekShortFormat = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', ]
  // day of week long format
  dayOfWeekLongFormat = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Staurday']

  /**
   * @constructorz
   * @param {Date||number} date reference date or time
   */
  constructor(date) {
    if(!date) {
      _reference_date = new Date() 
    } else if(typeof date === typeof new Date()) {
      _reference_date = date
    } else if (Math.floor(date)) {
      _reference_date = new Date(Math.floor(date))
    } else {
      throw 'invalid of date'
    }
  }

  /**
   * set timezone
   * @param {string} tmz  timezone as string(ex: Asia/Seoul) or use rikroyDate.data.timezone
   */
  setTimezone(tmz) {
    for(let tz of TIMEZONE_DATA) {
      if(tz.timezone === tmz) {
        _timezoneOffset = tz.offset * 3600000
        this.timezone = tz.timezone
        break
      }
   }
  }

  /**
   * get timezone
   * @returns {object} get timezone object ex: {timezone: Asia/Seoul, offset: 9} or just offset {offset: 9}
   */
  getTimezone() {
    return this.timezone ? {timezone: this.timezone, offset: _timezoneOffset/3600000} : {offset: _timezoneOffset/3600000}
  }

  /**
   * get date as format
   * @param {string} formatStr formatted string like 'yyyy년 MM월 dd일', 'yyyy.MM.dd hh:mm:ss' 
   * @returns string
   */
  format(formatStr){
    let _date = new Date(_reference_date.getTime() + _timezoneOffset)
    
    let normal = [formatStr]
    let escape = []

    let i = 0
    while(true){
      if(normal[i].indexOf('[') === -1) break

      normal[i+1] = normal[i].substring(normal[i].indexOf(']')+1)
      
      escape.push(normal[i].substring(normal[i].indexOf('['), normal[i].indexOf(']')+1))

      normal[i] = normal[i].substring(0, normal[i].indexOf('['))

      i++
    }
    
    for(let i=0; i<normal.length;i++) {
      normal[i] = setYearOnStringFormat(_date, normal[i])
      normal[i] = setMonthOnStringFormat(_date, normal[i])
      normal[i] = setDayOnStringFormat(_date, normal[i], this.dayOfWeekLongFormat, this.dayOfWeekShortFormat)
      normal[i] = setDateOnStringFormat(_date, normal[i])
      normal[i] = setHoursOnStringFormat(_date, normal[i])
      normal[i] = setMinuteOnStringFormat(_date, normal[i])
      normal[i] = setSecondOnStringFormat(_date, normal[i])
      normal[i] = setMeridiemOnStringFormat(_date, normal[i], this.meridiemFormat)
      normal[i] = setMilliSecondOnStringFormat(_date, normal[i])
    }

    formatStr = ''

    while(true){
      if(!normal.length && !escape.length) break

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
    let timeDifference = _reference_date.getTime() - comparisonDate.getTime()
    
    switch(token) {
      case 'd': return Math.round(timeDifference / 86400000)
      case 'h': return Math.round(timeDifference / 3600000)
      case 'm': return Math.round(timeDifference / 60000)
      case 's': return Math.round(timeDifference / 1000)
      case 'S': return Math.round(timeDifference)
      default: throw 'invalid token'
    }
  }
}

function setYearOnStringFormat(date, formatStr) {
  if(formatStr.indexOf('yyyy') >= 0) {
    formatStr = formatStr.replace('yyyy', date.getUTCFullYear())
  } else if(formatStr.indexOf('yy') >= 0) {
    formatStr = formatStr.replace('yy', date.getUTCFullYear().toString().substring(2,4))
  }
  return formatStr
}

function setMonthOnStringFormat(date, formatStr) {
  let month = date.getUTCMonth() + 1
  if(formatStr.indexOf('MM') >= 0) {
    formatStr = formatStr.replace('MM', (month >= 10 ? month : '0' + month))
  } else if (formatStr.indexOf('M') >= 0) {
    formatStr = formatStr.replace('M', month)
  }
  return formatStr
}

function setDateOnStringFormat(date, formatStr) {
  let _date = date.getUTCDate()
  if(formatStr.indexOf('dd') >= 0) {
    formatStr = formatStr.replace('dd', (_date >= 10 ? _date : '0' + _date))
  } else if (formatStr.indexOf('d') >= 0) {
    formatStr = formatStr.replace('d', _date)
  }
  return formatStr
}

function setHoursOnStringFormat(date, formatStr) {
  let _hours = date.getUTCHours()
  if(formatStr.indexOf('HH') >= 0) {
    formatStr = formatStr.replace('HH', (_hours >= 10 ? _hours : '0' + _hours))
  } else if(formatStr.indexOf('hh') >= 0) {
    formatStr = formatStr.replace('hh', ((_hours % 12) >= 10 ? _hours % 12 : '0' + (_hours % 12)))
  } else if(formatStr.indexOf('H') >= 0) {
    formatStr = formatStr.replace('H', _hours)
  } else if(formatStr.indexOf('h') >= 0) {
    formatStr = formatStr.replace('h', _hours % 12)
  }
  return formatStr
}

function setMinuteOnStringFormat(date, formatStr) {
  let _minutes = date.getUTCMinutes()
  if(formatStr.indexOf('mm') >= 0) {
    formatStr = formatStr.replace('mm', (_minutes >= 10 ? _minutes : '0' + _minutes))
  } else if(formatStr.indexOf('m') >= 0) {
    formatStr = formatStr.replace('m', _minutes)
  }
  return formatStr
}

function setSecondOnStringFormat(date, formatStr) {
  let _second = date.getUTCSeconds()

  if(formatStr.indexOf('ss') >= 0) {
    formatStr = formatStr.replace('ss', (_second >= 10 ? _second : '0'+ _second))
  } else if(formatStr.indexOf('s') >= 0) {
    formatStr = formatStr.replace('s', _second)
  }
  return formatStr
}

function setMeridiemOnStringFormat(date, formatStr, meridiemFormat) {
  let _meridiem = date.getUTCHours() < 12

  if(formatStr.indexOf('a') >= 0) {
    formatStr = formatStr.replace('a', _meridiem <= 12 ? meridiemFormat[0] : meridiemFormat[1])
  }
  return formatStr
}

function setDayOnStringFormat(date, formatStr, longDay, shortDay) {
  let _day = date.getUTCDay()

  if(formatStr.indexOf('dddd') >= 0) {
    formatStr = formatStr.replace('dddd', longDay[_day])
  } else if (formatStr.indexOf('ddd') >= 0) {
    formatStr = formatStr.replace('ddd', shortDay[_day])
  }

  return formatStr
}

function setMilliSecondOnStringFormat(date, formatStr){
  let _millisecond= date.getUTCMilliseconds().toString().split('')

  if(formatStr.indexOf('S') >= 0) {
    let index = 0
    let sIndex = formatStr.indexOf('S')
    while(true) {
      if(index > 3 || formatStr[sIndex + index] !== 'S') break

      formatStr = formatStr.substring(0, sIndex+index).concat(_millisecond[index] ? _millisecond[index] : '0', formatStr.substring(sIndex+index+1, formatStr.length))

      index++
    }
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
    let now = new Date()
    let dateString =
      now.getFullYear() +
      '' +
      (now.getMonth() >= 9 ? (now.getMonth() + 1) : '0' + (now.getMonth() + 1)) +
      '' +
      (now.getDate() >= 10 ? now.getDate() : '0' + now.getDate())
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
    let now = new Date()
    let dateString =
      now.getFullYear() +
      '' +
      (now.getMonth() >= 9 ? now.getMonth() + 1 : '0' + (now.getMonth() + 1)) +
      '' +
      (now.getDate() >= 10 ? now.getDate() : '0' + now.getDate()) +
      (now.getHours() >= 10 ? now.getHours() : '0' + now.getHours()) +
      (now.getMinutes() >= 10 ? now.getMinutes() : '0' + now.getMinutes()) +
      (now.getSeconds() >= 10 ? now.getSeconds() : '0' + now.getSeconds())

    return dateString
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
      (date.getDate() >= 10 ? date.getDate() : '0' + date.getDate())
      return dateString
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
        (date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds())

      return dateString
    } else {
      throw 'unvalid date object'
    }
  }
}
