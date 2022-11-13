"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var e = require("string-natural-compare2"), t = require("jsesc"), r = require("@lazy-trie/types");

function _to_regex(e, t, r) {
  let n = "";
  return e.length > 0 ? 1 === e.length ? n += e[0] : e.every((function(e) {
    return 1 === e.length;
  })) ? n += "[" + e.join("") + "]" : n += "(?:" + e.join("|") + ")" : t.length > 0 && (n += t[0]), 
  r && n && (1 === n.length ? n += "?" : n = "(?:" + n + ")?"), n;
}

function _quotemeta(e) {
  let r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
  if (!_is_phrase_valid(e)) return e;
  let n = e.replace(/([\t\n\f\r\\\$\(\)\*\+\-\.\?\[\]\^\{\|\}])/g, "\\$1");
  if (!r.disableEscaped) {
    const e = Object.assign({
      es6: !0
    }, r.jsescOptions);
    n = n.replace(/[^\x20-\x7E]+/gu, (function(r) {
      return t(r, e);
    }));
  }
  return n;
}

function _is_phrase_valid(e) {
  return "string" == typeof e && e.length > 0;
}

function isDefaultEndpoint(e, t, n) {
  return t === r.END_WORD;
}

function trieToRegExp(e, t, r) {
  var n, o;
  "object" == typeof t && ([t, r] = [ r, t ]), r = r || {}, t = null !== (n = null !== (o = t) && void 0 !== o ? o : r.flags) && void 0 !== n ? n : "u";
  const i = trieToRegExpSource(e, r);
  return r.createRegExp ? r.createRegExp(i, t) : new RegExp(i, t);
}

function trieToRegExpSource(t) {
  var r, n, o;
  let i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
  const u = null !== (r = i.getKeys) && void 0 !== r ? r : function(e) {
    return Object.keys(e);
  }, l = null !== (n = i.isEndpoint) && void 0 !== n ? n : isDefaultEndpoint, s = null !== (o = i.toRegexString) && void 0 !== o ? o : _to_regex, c = [].push;
  function _walk_trie(r, n, o) {
    const a = u(r, n, t), g = [], p = [];
    let f = !1;
    return a.forEach((function(e) {
      if (l(r[e], e, r)) return void (f = !0);
      const t = _quotemeta(e, i) + _walk_trie(r[e], e);
      c.call(a.length > 1 ? g : p, t);
    })), g.sort((function(t, r) {
      return r.length - t.length || e.naturalCompare(t, r);
    })), s(g, p, f);
  }
  return _walk_trie(t, void 0);
}

exports.default = trieToRegExp, exports.trieToRegExp = trieToRegExp, exports.trieToRegExpSource = trieToRegExpSource;
//# sourceMappingURL=index.cjs.production.min.cjs.map
