"use strict";

var e = require("array-hyper-unique"), t = require("deep-eql");

function allPos(t, r) {
  let s = 0;
  const i = Object.keys(r), o = t.length;
  let l = 0;
  const n = {};
  for (;s < o; ) {
    var u, a;
    r[s] && (n[u = l] || (n[u] = []), l !== s && n[l].push(t.slice(l, s)), n[a = s] || (n[a] = []), 
    n[s] = r[s].slice(), n[s].forEach((function(e) {
      let o, l, u;
      for (l = 1; l < e.length; l++) if (u = s + l, r[u]) {
        var a;
        const t = e.slice(0, l);
        o = u - 1, n[a = o] || (n[a] = []), n[o].push(t);
      }
      i.forEach((function(e) {
        if (e > u) {
          var r;
          const s = t.slice(u, e);
          n[r = u] || (n[r] = []), n[u].push(s);
        }
        if (e > s) {
          var i;
          const r = t.slice(s, e);
          n[i = s] || (n[i] = []), n[s].push(r);
        }
      }));
    })), l = s + 1), s++;
  }
  if (l !== s) {
    var c;
    const e = t.slice(l);
    n[c = l] || (n[c] = []), n[l].push(e);
  }
  for (const t in n) n[t] = e.array_unique(n[t]), n[t].sort();
  return n;
}

function triePosList(e, t) {
  return allPos(e, t);
}

Object.defineProperty(triePosList, "__esModule", {
  value: !0
}), Object.defineProperty(triePosList, "triePosList", {
  value: triePosList
}), Object.defineProperty(triePosList, "default", {
  value: triePosList
}), Object.defineProperty(triePosList, "allPos", {
  value: allPos
}), Object.defineProperty(triePosList, "allPosMax", {
  value: function allPosMax(e, r, s = 5) {
    let i, o = allPos(e, r), l = !0, n = 0;
    for (s = (s = Number(s)) > 0 ? s : 5; l && s > n++; ) i = allPos(e, o), l = !t(o, i), 
    o = i;
    return o;
  }
}), Object.defineProperty(triePosList, "validPos", {
  value: function validPos(e) {
    return Object.keys(e).every((function(t) {
      return t.toString() === Number(t).toString() && e[t] && Array.isArray(e[t]);
    }));
  }
}), module.exports = triePosList;
//# sourceMappingURL=index.cjs.production.min.cjs.map
