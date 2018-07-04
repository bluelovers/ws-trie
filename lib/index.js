"use strict";
/**
 * Created by user on 2018/7/4/004.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const array_hyper_unique_1 = require("array-hyper-unique");
const equals = require("deep-eql");
function allPos(words, positions) {
    let i = 0;
    let ks = Object.keys(positions);
    let len = words.length;
    let j = 0;
    let ret = {};
    while (i < len) {
        if (positions[i]) {
            ret[j] = ret[j] || [];
            if (j != i) {
                ret[j].push(words.slice(j, i));
            }
            ret[i] = ret[i] || [];
            ret[i] = positions[i].slice();
            ret[i].forEach(function (w) {
                let i4;
                let i2;
                let i3;
                for (i2 = 1; i2 < w.length; i2++) {
                    i3 = i + i2;
                    if (positions[i3]) {
                        let s = w.slice(0, i2);
                        i4 = i3 - 1;
                        ret[i4] = ret[i4] || [];
                        ret[i4].push(s);
                    }
                }
                ks.forEach(function (i5) {
                    if (i5 > i3) {
                        let s = words.slice(i3, i5);
                        ret[i3] = ret[i3] || [];
                        ret[i3].push(s);
                    }
                    if (i5 > i) {
                        let s = words.slice(i, i5);
                        ret[i] = ret[i] || [];
                        ret[i].push(s);
                    }
                });
            });
            j = i + 1;
        }
        i++;
    }
    if (j != i) {
        let s = words.slice(j);
        ret[j] = ret[j] || [];
        ret[j].push(s);
    }
    for (let i in ret) {
        ret[i] = array_hyper_unique_1.array_unique(ret[i]);
        ret[i].sort();
    }
    return ret;
}
exports.allPos = allPos;
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
exports.allPosMax = allPosMax;
function validPos(positions) {
    return Object.keys(positions)
        .every(function (v) {
        return (v.toString() === Number(v).toString()
            && positions[v]
            && Array.isArray(positions[v]));
    });
}
exports.validPos = validPos;
function triePosList(words, positions) {
    return allPos(words, positions);
}
exports.triePosList = triePosList;
exports.default = triePosList;
exports = Object.assign(triePosList, exports);
