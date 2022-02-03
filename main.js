class rikroyDate {
  date;
  locale = 'UTC';

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

  constructor(date, format, locale) {
    console.log(date, format, locale)

    if(typeof date === typeof new Date()) {
      this.date = date
    } else {
      console.log('get date as string')
      console.log(format, locale)
      console.log(format.indexOf('yyyy'))
    }
  }

  

  /** 
   * get date
   * @summary get date(YYYYMMDD) as full string(8)
   * @author rikroy
   * @since 2022.01.03
   * @returns {string(8)} YYYYMMDD
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
  }

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
  }

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
  }

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

module.exports = rikroyDate