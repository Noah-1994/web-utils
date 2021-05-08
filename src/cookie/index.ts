/* eslint-disable no-useless-escape */
const cookie = {
  // 根据name读取cookie
  getItem(name:string):string|null {
    return decodeURIComponent(document.cookie.replace(new RegExp(`(?:(?:^|.*;)\\s*${encodeURIComponent(name).replace(/[-.+*]/g, '\\$&')}\\s*\\=\\s*([^;]*).*$)|^.*$`), '$1')) || null;
  },

  // 设置cookie
  setItem(name:string, value:string, expires?:number|string|Date, path?:string, domain?:string, secure?:boolean):boolean {
    if (!name || /^(?:expires|max\-age|path|domain|secure)$/i.test(name)) { return false; }
    let sExpires = '';
    if (expires) {
      // eslint-disable-next-line default-case
      switch (expires.constructor) {
        case Number:
          sExpires = expires === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : `; max-age=${expires}`;
          break;
        case String:
          sExpires = `; expires=${expires}`;
          break;
        case Date:
          sExpires = `; expires=${(expires as Date).toUTCString()}`;
          break;
      }
    }
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}${sExpires}${domain ? `; domain=${domain}` : ''}${path ? `; path=${path}` : ''}${secure ? '; secure' : ''}`;
    return true;
  },

  // 删除cookie
  removeItem(name:string, path?:string, domain?:string):boolean {
    if (!name || !this.hasItem(name)) { return false; }
    document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT${domain ? `; domain=${domain}` : ''}${path ? `; path=${path}` : ''}`;
    return true;
  },

  // 判断存在name的cookie
  hasItem(name:string):boolean {
    return (new RegExp(`(?:^|;\\s*)${encodeURIComponent(name).replace(/[-.+*]/g, '\\$&')}\\s*\\=`)).test(document.cookie);
  },

  // 返回所有cookie的key
  keys():Array<string> {
    const aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/);
    for (let nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    return aKeys;
  },
};

export default cookie;
