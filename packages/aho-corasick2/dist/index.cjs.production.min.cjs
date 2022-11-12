"use strict";

class Trie {
  next={};
  is_word=null;
  value=null;
  data=[];
  add(t, e, i) {
    let n, r;
    return n = t.charAt(0), r = this.next[n], r || (r = this.next[n] = new Trie, r.value = i ? i.substr(0, i.length - t.length + 1) : n), 
    t.length > 1 ? r.add(t.substring(1), e, i || t) : (r.data.push(e), r.is_word = !0);
  }
  explore_fail_link(t) {
    let e, i, n, r, s;
    for (n = this, i = r = 0, s = t.length; 0 <= s ? r < s : r > s; i = 0 <= s ? ++r : --r) if (e = t.charAt(i), 
    n = n.next[e], !n) return null;
    return n;
  }
  each_node(t) {
    let e, i, n, r;
    for (i in n = this.next, n) e = n[i], t(this, e);
    for (i in r = this.next, r) e = r[i], e.each_node(t);
    return this;
  }
}

class AhoCorasick {
  trie=new Trie;
  add(t, e) {
    return this.trie.add(t, e);
  }
  build_fail(t) {
    let e, i, n, r, s, o, a;
    if ((t = t || this.trie).fail = null, t.value) for (n = r = 1, s = t.value.length; 1 <= s ? r < s : r > s; n = 1 <= s ? ++r : --r) if (i = this.trie.explore_fail_link(t.value.substring(n)), 
    i) {
      t.fail = i;
      break;
    }
    for (e in o = t.next, o) a = o[e], this.build_fail(a);
    return this;
  }
  foreach_match(t, e, i) {
    let n;
    for (;t; ) t.is_word && (n = e - t.value.length, i(t.value, t.data, n, t)), t = t.fail;
    return this;
  }
  search(t, e) {
    const i = {
      matches: {},
      positions: {},
      count: {},
      data: {}
    };
    let n, r, s, o, a, l;
    for (n = e ? function(...t) {
      const [n, r, s, o] = t;
      i.matches[n] = i.matches[n] || [], i.matches[n].push(s), i.positions[s] = i.positions[s] || [], 
      i.positions[s].push(n), null == i.count[n] && (i.count[n] = 0), i.count[n]++, i.data[n] = o.data, 
      e.call(i, ...t);
    } : function(...t) {
      const [e, n, r, s] = t;
      i.matches[e] = i.matches[e] || [], i.matches[e].push(r), i.positions[r] = i.positions[r] || [], 
      i.positions[r].push(e), null == i.count[e] && (i.count[e] = 0), i.count[e]++, i.data[e] = s.data;
    }, s = this.trie, o = a = 0, l = t.length; 0 <= l ? a < l : a > l; o = 0 <= l ? ++a : --a) {
      for (r = t.charAt(o); s && !s.next[r]; ) s = s.fail;
      s || (s = this.trie), s.next[r] && (s = s.next[r], this.foreach_match(s, o + 1, n));
    }
    return i;
  }
  to_dot() {
    let t, e, i, n, r;
    return t = [ "digraph Trie {" ], r = function(t) {
      return t && t.value ? `"${t.value}"` : '""';
    }, i = function(t) {
      if (t) return t.charAt(t.length - 1);
    }, n = function(n, s) {
      let o, a, l, u, h;
      if (l = i(s.value), u = [ `label = "${l}"` ], s.is_word) for (o in a = {
        style: "filled",
        color: "skyblue"
      }, a) h = a[o], u.push(`${o} = "${h}"`);
      return t.push(`${r(n)} -> ${r(s)};`), t.push(`${r(s)} [ ${u.join(",")} ];`), e(n, s);
    }, e = function(e, i) {
      let n;
      return [e, i] = [ i, i.fail ], n = i ? "dashed" : "dotted", t.push(`${r(e)} -> ${r(i)} [ style = "${n}" ];`);
    }, this.trie.each_node(n), t.push("}"), t.join("\n");
  }
}

Object.defineProperty(AhoCorasick, "__esModule", {
  value: !0
}), Object.defineProperty(AhoCorasick, "AhoCorasick", {
  value: AhoCorasick
}), Object.defineProperty(AhoCorasick, "default", {
  value: AhoCorasick
}), Object.defineProperty(AhoCorasick, "Trie", {
  value: Trie
}), module.exports = AhoCorasick;
//# sourceMappingURL=index.cjs.production.min.cjs.map
