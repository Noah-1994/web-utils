import timeUtils from './time';
import urlUtils from './url';
import moneyUtils from './money';

const common = {
  ...timeUtils,
  ...urlUtils,
  ...moneyUtils,
  // 判断`obj`是否为空
  isEmptyObject(obj:Object) {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) { return false; }
    return !Object.keys(obj).length;
  },
  // 判断两个数组是否相等
  isArrayEqual(arr1:Array<any>, arr2:Array<any>):boolean {
    if (arr1 === arr2) return true;
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; ++i) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  },
  // 随机生成颜色
  randomColor() {
    // eslint-disable-next-line no-bitwise
    return `#${(`00000${(Math.random() * 0x1000000 << 0).toString(16)}`).slice(-6)}`;
  },
  // 生成指定范围[min, max]的随机数
  randomNum(min:number, max:number) {
    // eslint-disable-next-line no-param-reassign
    min = Math.ceil(min);
    // eslint-disable-next-line no-param-reassign
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  // 判断是否为16进制颜色，rgb 或 rgba
  isColor(str:string) {
    // eslint-disable-next-line max-len
    return /^(#([0-9a-fA-F]{3}){1,2}|[rR][gG][Bb](\((\s*(2[0-4]\d|25[0-5]|[01]?\d{1,2})\s*,){2}\s*(2[0-4]\d|25[0-5]|[01]?\d{1,2})\s*\)|[Aa]\((\s*(2[0-4]\d|25[0-5]|[01]?\d{1,2})\s*,){3}\s*([01]|0\.\d+)\s*\)))$/.test(str);
  },
  // 判断是否为邮箱地址
  isEmail(str:string) {
    return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
  },
  // 判断是否为身份证号
  isIdCard(str:string) {
    return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str);
  },
  // 判断是否为手机号
  isPhoneNum(str:string) {
    // eslint-disable-next-line no-useless-escape
    return /^(\+?0?86\-?)?1[3456789]\d{9}$/.test(str);
  },
  // 判断是否为URL地址
  isUrl(str:string) {
    // eslint-disable-next-line no-useless-escape
    return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str);
  },
  // 判断浏览器是否支持webP格式图片
  isSupportWebP() {
    return !![].map && document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;
  },
};

export default common;
