/* eslint-disable func-names */
const requestAnimFrame = (function () {
  return window.requestAnimationFrame
      || window.webkitRequestAnimationFrame
      || (window as any).mozRequestAnimationFrame
      || function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };
}());

const dom = {
  // 判断元素是否有某个class
  hasClass(ele:HTMLElement, cls:string):boolean {
    return (new RegExp(`(\\s|^)${cls}(\\s|$)`)).test(ele.className);
  },

  // 为元素添加class
  addClass(ele:HTMLElement, cls:string):void {
    if (!this.hasClass(ele, cls)) {
      // eslint-disable-next-line no-param-reassign
      ele.className += ` ${cls}`;
    }
  },

  // 为元素移除class
  removeClass(ele:HTMLElement, cls:string):void {
    if (this.hasClass(ele, cls)) {
      const reg = new RegExp(`(\\s|^)${cls}(\\s|$)`);
      // eslint-disable-next-line no-param-reassign
      ele.className = ele.className.replace(reg, ' ');
    }
  },

  // 获取滚动条距顶部的距离
  getScrollTop():number {
    return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
  },

  // 设置滚动条距顶部的距离
  setScrollTop(value:number):number {
    window.scrollTo(0, value);
    return value;
  },

  // 获取一个元素的距离文档(document)的位置
  offset(ele:HTMLElement):{left: number, top: number} {
    const pos = {
      left: 0,
      top: 0,
    };
    while (ele) {
      pos.left += ele.offsetLeft;
      pos.top += ele.offsetTop;
      // eslint-disable-next-line no-param-reassign
      ele = (ele.offsetParent as HTMLElement);
    }
    return pos;
  },

  /**
   * H5软键盘缩回、弹起回调
   * 当软件键盘弹起会改变当前 window.innerHeight，监听这个值变化
   * downCb 当软键盘弹起后，缩回的回调
   * upCb 当软键盘弹起的回调
   */
  windowResize(downCb:Function, upCb:Function):void {
    const clientHeight = window.innerHeight;
    // eslint-disable-next-line no-param-reassign
    downCb = typeof downCb === 'function' ? downCb : () => {};
    // eslint-disable-next-line no-param-reassign
    upCb = typeof upCb === 'function' ? upCb : () => {};
    window.addEventListener('resize', () => {
      const height = window.innerHeight;
      if (height === clientHeight) {
        downCb();
      }
      if (height < clientHeight) {
        upCb();
      }
    });
  },

  // 在${duration}时间内，滚动条平滑滚动到${to}指定位置
  scrollTo(to:number, duration:number):void {
    if (duration < 0) {
      this.setScrollTop(to);
      return;
    }
    const diff = to - this.getScrollTop();
    if (diff === 0) return;
    // eslint-disable-next-line no-mixed-operators
    const step = diff / duration * 10;
    requestAnimFrame(
      () => {
        if (Math.abs(step) > Math.abs(diff)) {
          this.setScrollTop(this.getScrollTop() + diff);
          return;
        }
        this.setScrollTop(this.getScrollTop() + step);
        if ((diff > 0 && this.getScrollTop() >= to) || (diff < 0 && this.getScrollTop() <= to)) {
          return;
        }
        this.scrollTo(to, duration - 16);
      },
    );
  },
};

export default dom;
