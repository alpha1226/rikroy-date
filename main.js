module.exports = {
  /** get date
   * @summary get date(YYYYMMDD) as full string(8)
   * @author rikroy
   * @since 2022.01.03
   * @returns YYYYMMDD
   */
  getNowDateString() {
    let now = new Date();
    let dateString =
      now.getFullYear() +
      '' +
      (now.getMonth() >= 9 ? now.getMonth() + 1 : '0' + now.getMonth() + 1) +
      '' +
      (now.getDate() >= 10 ? now.getDate() : '0' + now.getDate());
    return dateString;
  },

  /** get datetime
   * @summary get datetime(YYYYMMDDHHMMSS) as full string(14)
   * @author rikroy
   * @since 2022.01.03
   * @returns YYYYMMDDHHMMSS
   */
  getNowDateTimeString() {
    let now = new Date();
    let dateString =
      now.getFullYear() +
      '' +
      (now.getMonth() >= 9 ? now.getMonth() + 1 : '0' + now.getMonth() + 1) +
      '' +
      (now.getDate() >= 10 ? now.getDate() : '0' + now.getDate()) +
      (now.getHours() >= 10 ? now.getHours() : '0' + now.getHours()) +
      (now.getMinutes() >= 10 ? now.getMinutes() : '0' + now.getMinutes()) +
      (now.getSeconds() >= 10 ? now.getSeconds() : '0' + now.getSeconds());

    return dateString;
  },
}

