/* eslint-disable camelcase */
/* eslint-disable no-mixed-operators */
/* eslint-disable radix */
export default {
  // 格式化${startTime}距现在的已过时间
  formatPassTime(startTime:any) {
    const currentTime = Date.parse(`${new Date()}`);
    const time = currentTime - startTime;
    const day = parseInt(`${time / (1000 * 60 * 60 * 24)}`);
    const hour = parseInt(`${time / (1000 * 60 * 60)}`);
    const min = parseInt(`${time / (1000 * 60)}`);
    const month = parseInt(`${day / 30}`);
    const year = parseInt(`${month / 12}`);
    if (year) return `${year}年前`;
    if (month) return `${month}个月前`;
    if (day) return `${day}天前`;
    if (hour) return `${hour}小时前`;
    if (min) return `${min}分钟前`;
    return '刚刚';
  },
  // 格式化现在距${endTime}的剩余时间
  formatRemainTime(endTime:any) {
    const startDate = new Date(); // 开始时间
    const endDate = new Date(endTime); // 结束时间
    const t = endDate.getTime() - startDate.getTime(); // 时间差
    let d = 0;
    let h = 0;
    let m = 0;
    let s = 0;
    if (t >= 0) {
      d = Math.floor(t / 1000 / 3600 / 24);
      h = Math.floor(t / 1000 / 60 / 60 % 24);
      m = Math.floor(t / 1000 / 60 % 60);
      s = Math.floor(t / 1000 % 60);
    }
    return `${d}天 ${h}小时 ${m}分钟 ${s}秒`;
  },
  // 是否为闰年
  isLeapYear(year:number) {
    if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
      return true;
    }
    return false;
  },
  /**
   * @desc   判断是否为同一天
   * @param  {Date} date1
   * @param  {Date} date2 可选／默认值：当天
   * @return {Boolean}
   */
  isSameDay(date1:Date, date2:Date):any {
    if (!date2) {
      // eslint-disable-next-line no-param-reassign
      date2 = new Date();
    }
    const date1_year = date1.getFullYear();
    const date1_month = date1.getMonth() + 1;
    const date1_date = date1.getDate();
    const date2_year = date2.getFullYear();
    const date2_month = date2.getMonth() + 1;
    const date2_date = date2.getDate();
    return date1_date === date2_date && date1_month === date2_month && date1_year === date2_year;
  },
  // 获取指定日期月份的总天数
  monthDays(time:any) {
    // eslint-disable-next-line no-param-reassign
    time = new Date(time);
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    return new Date(year, month, 0).getDate();
  },
  /**
 * @desc ${startTime - endTime}的剩余时间,startTime大于endTime时，均返回0
 * @param { Date | String } startTime
 * @param { Date | String } endTime
 * @returns { Object } { d, h, m, s } 天 时 分 秒
 */
  timeLeft(startTime:any, endTime:any):any {
    if (!startTime || !endTime) {
      return;
    }
    let startDate;
    let endDate;
    if (startTime instanceof Date) {
      startDate = startTime;
    } else {
      startDate = new Date(startTime.replace(/-/g, '/')); // 开始时间
    }
    if (endTime instanceof Date) {
      endDate = endTime;
    } else {
      endDate = new Date(endTime.replace(/-/g, '/')); // 结束时间
    }
    const t = endDate.getTime() - startDate.getTime();
    let d = 0;
    let h = 0;
    let m = 0;
    let s = 0;
    if (t >= 0) {
      d = Math.floor(t / 1000 / 3600 / 24);
      h = Math.floor(t / 1000 / 60 / 60 % 24);
      m = Math.floor(t / 1000 / 60 % 60);
      s = Math.floor(t / 1000 % 60);
    }
    // eslint-disable-next-line consistent-return
    return {
      d, h, m, s,
    };
  },
};
