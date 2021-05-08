/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-self-compare */
/* eslint-disable no-use-before-define */
export function clone(obj:any) {
  if (typeof obj === 'function') {
    return obj;
  }
  const result:any = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    // include prototype properties
    const value = obj[key];
    const type = {}.toString.call(value).slice(8, -1);
    if (type === 'Array' || type === 'Object') {
      result[key] = clone(value);
    } else if (type === 'Date') {
      result[key] = new Date(value.getTime());
    } else if (type === 'RegExp') {
      result[key] = RegExp(value.source, getRegExpFlags(value));
    } else {
      result[key] = value;
    }
  }
  return result;
}

function getRegExpFlags(regExp:any) {
  if (typeof regExp.source.flags === 'string') {
    return regExp.source.flags;
  }
  const flags = [];
  regExp.global && flags.push('g');
  regExp.ignoreCase && flags.push('i');
  regExp.multiline && flags.push('m');
  regExp.sticky && flags.push('y');
  regExp.unicode && flags.push('u');
  return flags.join('');
}

export function compare(value1:any, value2:any) {
  if (value1 === value2) {
    return true;
  }
  if (value1 !== value1 && value2 !== value2) {
    return true;
  }
  if ({}.toString.call(value1) !== {}.toString.call(value2)) {
    return false;
  }
  if (value1 !== Object(value1)) {
    // non equal primitives
    return false;
  }
  if (!value1) {
    return false;
  }
  if (Array.isArray(value1)) {
    return compareArrays(value1, value2);
  }
  if ({}.toString.call(value1) === '[object Object]') {
    return compareObjects(value1, value2);
  }
  return compareNativeSubtypes(value1, value2);
}

function compareNativeSubtypes(value1:any, value2:any) {
  // e.g. Function, RegExp, Date
  return value1.toString() === value2.toString();
}

function compareArrays(value1:any, value2:any) {
  const len = value1.length;
  if (len !== value2.length) {
    return false;
  }
  let alike = true;
  for (let i = 0; i < len; i++) {
    if (!compare(value1[i], value2[i])) {
      alike = false;
      break;
    }
  }
  return alike;
}

function compareObjects(value1:any, value2:any) {
  const keys1 = Object.keys(value1).sort();
  const keys2 = Object.keys(value2).sort();
  const len = keys1.length;
  if (len !== keys2.length) {
    return false;
  }
  for (let i = 0; i < len; i++) {
    const key1 = keys1[i];
    const key2 = keys2[i];
    if (!(key1 === key2 && compare(value1[key1], value2[key2]))) {
      return false;
    }
  }
  return true;
}

export function flush(collection:any) {
  let result: any;
  let len: number;
  let i: number;
  if (!collection) {
    return undefined;
  }
  if (Array.isArray(collection)) {
    result = [];
    len = collection.length;
    for (i = 0; i < len; i++) {
      const elem = collection[i];
      if (elem != null) {
        result.push(elem);
      }
    }
    return result;
  }
  if (typeof collection === 'object') {
    result = {};
    const keys = Object.keys(collection);
    len = keys.length;
    for (i = 0; i < len; i++) {
      const key = keys[i];
      const value = collection[key];
      if (value != null) {
        result[key] = value;
      }
    }
    return result;
  }
  return undefined;
}

export default {
  clone,
  compare,
  flush,
};
