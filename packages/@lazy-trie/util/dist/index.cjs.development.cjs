'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var uniString = require('uni-string');

const ZWJ = 0x200d;
const ZWJ_STR = '\u200d';
function isString(word, msg = 'string') {
  if (typeof word !== 'string' || word === '') {
    throw throwMsg(msg, typeof word);
  }
  return word;
}
function split(str, options = {}) {
  var _options;
  (_options = options) !== null && _options !== void 0 ? _options : options = {};
  if (options.toLowerCase) {
    str = str.toLowerCase();
  }
  const arr = uniString.UString.split(str, '');
  let i = arr.length;
  while (i > 0) {
    const j = i - 1;
    const cur = arr[j];
    if (cur.length > 2 && cur.includes('‍')) {
      const a = cur.split(/(\u200d)/);
      arr.splice(j, 1, ...a);
    }
    i = j;
  }
  return arr;
}
function objectCopy(obj) {
  if (typeof obj === 'undefined') {
    return {};
  }
  return JSON.parse(JSON.stringify(obj));
}
function stringify(obj, spacer = 2) {
  if (typeof obj === 'undefined') {
    return '';
  }
  return JSON.stringify(obj, null, spacer);
}
function throwMsg(expected, received) {
  return `Expected ${expected}, received ${received}`;
}
function zwjTrim(s) {
  return s.replace(/^[\u200d\s]+|[\u200d\s]+$/, '');
}
function zwjTrimStart(s) {
  return s.replace(/^[\u200d\s]+/, '');
}
function zwjTrimEnd(s) {
  return s.replace(/[\u200d\s]+$/, '');
}

exports.ZWJ = ZWJ;
exports.ZWJ_STR = ZWJ_STR;
exports.isString = isString;
exports.objectCopy = objectCopy;
exports.split = split;
exports.stringify = stringify;
exports.throwMsg = throwMsg;
exports.zwjTrim = zwjTrim;
exports.zwjTrimEnd = zwjTrimEnd;
exports.zwjTrimStart = zwjTrimStart;
//# sourceMappingURL=index.cjs.development.cjs.map
