const timezone = require('./tz.json')
const format = {
  year: {
    fullYear: 'yyyy',
    halfYear: 'yy'
  },
  month: {
    fullMonth: 'MM',
    halfMonth: 'M'
  },
  date: {
    fullDate: 'dd',
    halfDate: 'd'
  },
  meridiem: {
    fullMeridiem: 'a'
  },
  hours: {
    full24Hours: 'HH',
    half24Hours: 'H',
    full12Hours: 'hh',
    half12Hours: 'h'
  },
  minutes: {
    fullMinutes: 'mm',
    halfMinutes: 'm'
  },
  second: {
    fullSecond: 'ss',
    halfSecond: 's'
  },
  milliSecond: 'S',
  offsetFromUTC: 'Z'
}

class rikroyDate {
  timezoneOffset = require('./tz.json')

  /*
  format {
    yyyy: '2022',
    yy: '22', // last 2 char
    MM: '02', or '10'
    M: '2', or '10'
    dd: '03' , or '13'
    d: '3', or '13'    
    a: 'am' or 'pm'  (not use on 'HH' or 'H')
    HH: '00' or '15' (0 ~ 23) - hours
    H: '4' or '16'   (0 ~ 23) - hours
    hh: '06' or '11' (0 ~ 11) - hours
    h: '5' or '11'   (0 ~ 11) - hours
    mm: '07' or '30' (0 ~ 59) - minutes
    m: '7' or '59'   (0 ~ 59) - minutes
    ss: '01' or '30' (0 ~ 59) - second
    s: '1' or '30'   (0 ~ 59) - second
    SSSSS...:        (0 ~ 99999999...) - second
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
    console.log(timezone)
  }

  format(formatStr){
    console.log(this.date, formatStr)
    formatStr = setYear(this.date, formatStr)
    formatStr = setMonth(this.date, formatStr)
    formatStr = setDate(this.date, formatStr)
    console.log(formatStr)
  }

  formatTimezone(formatStr, timezone) {
    console.log(this.date, formatStr, timezone)
  }
}

function setYear(date, formatStr) {
  if(formatStr.indexOf('yyyy') >= 0) {
    formatStr = formatStr.replace('yyyy', date.getFullYear());
  } else if(formatStr.indexOf('yy') >= 0) {
    formatStr = formatStr.replace('yy', date.getFullYear().toString().substring(2,4))
  }
  return formatStr
}

function setMonth(date, formatStr) {
  let month = date.getMonth() + 1
  if(formatStr.indexOf('MM') >= 0) {
    formatStr = formatStr.replace('MM', (month >= 10 ? month : '0' + month))
  } else if (formatStr.indexOf('M') >= 0) {
    formatStr = formatStr.replace('M', month)
  }
  return formatStr;
}

function setDate(date, formatStr) {
  let _date = date.getDate()
  if(formatStr.indexOf('dd') >= 0) {
    formatStr = formatStr.replace('dd', (_date >= 10 ? _date : '0' + _date))
  } else if (formatStr.indexOf('d') >= 0) {
    formatStr = formatStr.replace('d', _date)
  }
  return formatStr;
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
    return dateString;
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