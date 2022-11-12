'use strict';

var arrayHyperUnique = require('array-hyper-unique');
var equals = require('deep-eql');

function allPos(words, positions) {
  let i = 0;
  const ks = Object.keys(positions);
  const len = words.length;
  let j = 0;
  const ret = {};
  while (i < len) {
    if (positions[i]) {
      var _j, _i;
      ret[_j = j] || (ret[_j] = []);
      if (j !== i) {
        ret[j].push(words.slice(j, i));
      }
      ret[_i = i] || (ret[_i] = []);
      ret[i] = positions[i].slice();
      ret[i].forEach(function (w) {
        let i4;
        let i2;
        let i3;
        for (i2 = 1; i2 < w.length; i2++) {
          i3 = i + i2;
          if (positions[i3]) {
            var _i2;
            const s = w.slice(0, i2);
            i4 = i3 - 1;
            ret[_i2 = i4] || (ret[_i2] = []);
            ret[i4].push(s);
          }
        }
        ks.forEach(function (i5) {
          if (i5 > i3) {
            var _i3;
            const s = words.slice(i3, i5);
            ret[_i3 = i3] || (ret[_i3] = []);
            ret[i3].push(s);
          }
          if (i5 > i) {
            var _i4;
            const s = words.slice(i, i5);
            ret[_i4 = i] || (ret[_i4] = []);
            ret[i].push(s);
          }
        });
      });
      j = i + 1;
    }
    i++;
  }
  if (j !== i) {
    var _j2;
    const s = words.slice(j);
    ret[_j2 = j] || (ret[_j2] = []);
    ret[j].push(s);
  }
  for (const i in ret) {
    ret[i] = arrayHyperUnique.array_unique(ret[i]);
    ret[i].sort();
  }
  return ret;
}
function allPosMax(words, positions, limit = 5) {
  let ret = allPos(words, positions);
  let _do = true;
  let i = 0;
  let ret2;
  limit = Number(limit);
  limit = limit > 0 ? limit : 5;
  while (_do && limit > i++) {
    ret2 = allPos(words, ret);
    _do = !equals(ret, ret2);
    ret = ret2;
  }
  return ret;
}
function validPos(positions) {
  return Object.keys(positions).every(function (v) {
    return v.toString() === Number(v).toString() && positions[v] && Array.isArray(positions[v]);
  });
}
function triePosList(words, positions) {
  return allPos(words, positions);
}
{
  Object.defineProperty(triePosList, "__esModule", {
    value: true
  });
  Object.defineProperty(triePosList, 'triePosList', {
    value: triePosList
  });
  Object.defineProperty(triePosList, 'default', {
    value: triePosList
  });
  Object.defineProperty(triePosList, 'allPos', {
    value: allPos
  });
  Object.defineProperty(triePosList, 'allPosMax', {
    value: allPosMax
  });
  Object.defineProperty(triePosList, 'validPos', {
    value: validPos
  });
}

module.exports = triePosList;
//# sourceMappingURL=index.cjs.development.cjs.map
