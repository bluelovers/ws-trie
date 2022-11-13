import { UString as t } from "uni-string";

const r = 0x200d, n = "‍";

function isString(t, r = "string") {
  if ("string" != typeof t || "" === t) throw throwMsg(r, typeof t);
  return t;
}

function split(r, n = {}) {
  var i;
  null !== (i = n) && void 0 !== i || (n = {}), n.toLowerCase && (r = r.toLowerCase());
  const e = t.split(r, "");
  let o = e.length;
  for (;o > 0; ) {
    const t = o - 1, r = e[t];
    if (r.length > 2 && r.includes("‍")) {
      const n = r.split(/(\u200d)/);
      e.splice(t, 1, ...n);
    }
    o = t;
  }
  return e;
}

function objectCopy(t) {
  return void 0 === t ? {} : JSON.parse(JSON.stringify(t));
}

function stringify(t, r = 2) {
  return void 0 === t ? "" : JSON.stringify(t, null, r);
}

function throwMsg(t, r) {
  return `Expected ${t}, received ${r}`;
}

function zwjTrim(t) {
  return t.replace(/^[\u200d\s]+|[\u200d\s]+$/, "");
}

function zwjTrimStart(t) {
  return t.replace(/^[\u200d\s]+/, "");
}

function zwjTrimEnd(t) {
  return t.replace(/[\u200d\s]+$/, "");
}

export { r as ZWJ, n as ZWJ_STR, isString, objectCopy, split, stringify, throwMsg, zwjTrim, zwjTrimEnd, zwjTrimStart };
//# sourceMappingURL=index.esm.mjs.map
