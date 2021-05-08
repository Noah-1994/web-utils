/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
export default {
  /**
   *
   * @desc   url参数转对象
   * @param  {String} url  default: window.location.href
   * @return {Object}
   */
  parseQueryString(url:string):any {
    // eslint-disable-next-line no-param-reassign
    url = !url ? window.location.href : url;
    if (url.indexOf('?') === -1) {
      return {};
    }
    let search:any = url[0] === '?' ? url.substr(1) : url.substring(url.lastIndexOf('?') + 1);
    if (search === '') {
      return {};
    }
    search = search.split('&');
    const query:any = {};
    for (let i = 0; i < search.length; i++) {
      const pair = search[i].split('=');
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
  },
  /**
   *
   * @desc   对象序列化
   * @param  {Object} obj
   * @return {String}
   */
  stringfyQueryString(obj:Record<string, any>) {
    if (!obj) return '';
    const pairs = [];
    for (const key in obj) {
      const value = obj[key];
      if (value instanceof Array) {
        for (let i = 0; i < value.length; ++i) {
          pairs.push(`${encodeURIComponent(`${key}[${i}]`)}=${encodeURIComponent(value[i])}`);
        }
        // eslint-disable-next-line no-continue
        continue;
      }
      pairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
    }
    return pairs.join('&');
  },
};
