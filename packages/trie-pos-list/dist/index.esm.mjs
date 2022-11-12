import { array_unique as r } from "array-hyper-unique";

import t from "deep-eql";

function allPos(t, o) {
  let s = 0;
  const e = Object.keys(o), i = t.length;
  let n = 0;
  const l = {};
  for (;s < i; ) {
    var a, c;
    o[s] && (l[a = n] || (l[a] = []), n !== s && l[n].push(t.slice(n, s)), l[c = s] || (l[c] = []), 
    l[s] = o[s].slice(), l[s].forEach((function(r) {
      let i, n, a;
      for (n = 1; n < r.length; n++) if (a = s + n, o[a]) {
        var c;
        const t = r.slice(0, n);
        i = a - 1, l[c = i] || (l[c] = []), l[i].push(t);
      }
      e.forEach((function(r) {
        if (r > a) {
          var o;
          const s = t.slice(a, r);
          l[o = a] || (l[o] = []), l[a].push(s);
        }
        if (r > s) {
          var e;
          const o = t.slice(s, r);
          l[e = s] || (l[e] = []), l[s].push(o);
        }
      }));
    })), n = s + 1), s++;
  }
  if (n !== s) {
    var u;
    const r = t.slice(n);
    l[u = n] || (l[u] = []), l[n].push(r);
  }
  for (const t in l) l[t] = r(l[t]), l[t].sort();
  return l;
}

function allPosMax(r, o, s = 5) {
  let e, i = allPos(r, o), n = !0, l = 0;
  for (s = (s = Number(s)) > 0 ? s : 5; n && s > l++; ) e = allPos(r, i), n = !t(i, e), 
  i = e;
  return i;
}

function validPos(r) {
  return Object.keys(r).every((function(t) {
    return t.toString() === Number(t).toString() && r[t] && Array.isArray(r[t]);
  }));
}

function triePosList(r, t) {
  return allPos(r, t);
}

export { allPos, allPosMax, triePosList as default, triePosList, validPos };
//# sourceMappingURL=index.esm.mjs.map
