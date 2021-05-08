/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable prefer-rest-params */
// 防抖函数
export function debounce(fn:Function, wait:number, callFirst:boolean):Function {
  let timeout: any;
  return function () {
    if (!wait) {
      return fn.apply(this, arguments);
    }
    const context = this;
    const args = arguments;
    const callNow = callFirst && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      if (!callNow) {
        return fn.apply(context, args);
      }
    }, wait);

    if (callNow) {
      return fn.apply(this, arguments);
    }
  };
}
// 截流函数
export function throttle(fn:Function, interval:number, callFirst:boolean):Function {
  let wait = false;
  let callNow = false;
  return function () {
    callNow = callFirst && !wait;
    const context = this;
    const args = arguments;
    if (!wait) {
      wait = true;
      setTimeout(() => {
        wait = false;
        if (!callFirst) {
          return fn.apply(context, args);
        }
      }, interval);
    }
    if (callNow) {
      callNow = false;
      return fn.apply(this, arguments);
    }
  };
}
// 函数只执行一次
export function once(fn:any) {
  let called: boolean;
  let value: any;
  if (typeof fn !== 'function') {
    throw new Error(`expected a function but got ${fn}`);
  }
  return function wrap() {
    if (called) {
      return value;
    }
    called = true;
    value = fn.apply(this, arguments);
    fn = undefined;
    return value;
  };
}
// 柯里化
export function curry(fn:Function, arity:number) {
  return function curried() {
    if (arity == null) {
      arity = fn.length;
    }
    const args = [].slice.call(arguments);
    if (args.length >= arity) {
      return fn.apply(this, args);
    }
    return function () {
      return curried.apply(this, (args.concat([].slice.call(arguments)) as []));
    };
  };
}
// 组合
export function compose(/* fn1, fn2, fn3, etc */) {
  if (!arguments.length) {
    throw new Error(
      'expected at least one (and probably more) function arguments',
    );
  }
  const fns = arguments;

  return function () {
    let result = fns[0].apply(this, arguments);
    const len = fns.length;
    for (let i = 1; i < len; i++) {
      result = fns[i].call(this, result);
    }
    return result;
  };
}

export default {
  debounce,
  throttle,
  once,
  curry,
  compose,
};
