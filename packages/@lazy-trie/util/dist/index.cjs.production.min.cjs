"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var t = require("uni-string");

function throwMsg(t, r) {
  return `Expected ${t}, received ${r}`;
}

exports.ZWJ = 0x200d, exports.ZWJ_STR = "‍", exports.isString = function isString(t, r = "string") {
  if ("string" != typeof t || "" === t) throw throwMsg(r, typeof t);
  return t;
}, exports.objectCopy = function objectCopy(t) {
  return void 0 === t ? {} : JSON.parse(JSON.stringify(t));
}, exports.split = function split(r, e = {}) {
  var i;
  null !== (i = e) && void 0 !== i || (e = {}), e.toLowerCase && (r = r.toLowerCase());
  const n = t.UString.split(r, "");
  let o = n.length;
  for (;o > 0; ) {
    const t = o - 1, r = n[t];
    if (r.length > 2 && r.includes("‍")) {
      const e = r.split(/(\u200d)/);
      n.splice(t, 1, ...e);
    }
    o = t;
  }
  return n;
}, exports.stringify = function stringify(t, r = 2) {
  return void 0 === t ? "" : JSON.stringify(t, null, r);
}, exports.throwMsg = throwMsg, exports.zwjTrim = function zwjTrim(t) {
  return t.replace(/^[\u200d\s]+|[\u200d\s]+$/, "");
}, exports.zwjTrimEnd = function zwjTrimEnd(t) {
  return t.replace(/[\u200d\s]+$/, "");
}, exports.zwjTrimStart = function zwjTrimStart(t) {
  return t.replace(/^[\u200d\s]+/, "");
};
//# sourceMappingURL=index.cjs.production.min.cjs.map
