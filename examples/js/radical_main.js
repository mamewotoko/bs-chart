(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var Curry = require("./curry.js");
var Caml_obj = require("./caml_obj.js");
var Caml_array = require("./caml_array.js");
var Caml_exceptions = require("./caml_exceptions.js");
var Caml_js_exceptions = require("./caml_js_exceptions.js");

var make_float = Caml_array.caml_make_float_vect;

var Floatarray = {};

function init(l, f) {
  if (l === 0) {
    return [];
  }
  if (l < 0) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Array.init",
          Error: new Error()
        };
  }
  var res = Caml_array.caml_make_vect(l, Curry._1(f, 0));
  for(var i = 1; i < l; ++i){
    res[i] = Curry._1(f, i);
  }
  return res;
}

function make_matrix(sx, sy, init) {
  var res = Caml_array.caml_make_vect(sx, []);
  for(var x = 0; x < sx; ++x){
    res[x] = Caml_array.caml_make_vect(sy, init);
  }
  return res;
}

function copy(a) {
  var l = a.length;
  if (l === 0) {
    return [];
  } else {
    return Caml_array.caml_array_sub(a, 0, l);
  }
}

function append(a1, a2) {
  var l1 = a1.length;
  if (l1 === 0) {
    return copy(a2);
  } else if (a2.length === 0) {
    return Caml_array.caml_array_sub(a1, 0, l1);
  } else {
    return a1.concat(a2);
  }
}

function sub(a, ofs, len) {
  if (ofs < 0 || len < 0 || ofs > (a.length - len | 0)) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Array.sub",
          Error: new Error()
        };
  }
  return Caml_array.caml_array_sub(a, ofs, len);
}

function fill(a, ofs, len, v) {
  if (ofs < 0 || len < 0 || ofs > (a.length - len | 0)) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Array.fill",
          Error: new Error()
        };
  }
  for(var i = ofs ,i_finish = ofs + len | 0; i < i_finish; ++i){
    a[i] = v;
  }
  
}

function blit(a1, ofs1, a2, ofs2, len) {
  if (len < 0 || ofs1 < 0 || ofs1 > (a1.length - len | 0) || ofs2 < 0 || ofs2 > (a2.length - len | 0)) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Array.blit",
          Error: new Error()
        };
  }
  return Caml_array.caml_array_blit(a1, ofs1, a2, ofs2, len);
}

function iter(f, a) {
  for(var i = 0 ,i_finish = a.length; i < i_finish; ++i){
    Curry._1(f, a[i]);
  }
  
}

function iter2(f, a, b) {
  if (a.length !== b.length) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Array.iter2: arrays must have the same length",
          Error: new Error()
        };
  }
  for(var i = 0 ,i_finish = a.length; i < i_finish; ++i){
    Curry._2(f, a[i], b[i]);
  }
  
}

function map(f, a) {
  var l = a.length;
  if (l === 0) {
    return [];
  }
  var r = Caml_array.caml_make_vect(l, Curry._1(f, a[0]));
  for(var i = 1; i < l; ++i){
    r[i] = Curry._1(f, a[i]);
  }
  return r;
}

function map2(f, a, b) {
  var la = a.length;
  var lb = b.length;
  if (la !== lb) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Array.map2: arrays must have the same length",
          Error: new Error()
        };
  }
  if (la === 0) {
    return [];
  }
  var r = Caml_array.caml_make_vect(la, Curry._2(f, a[0], b[0]));
  for(var i = 1; i < la; ++i){
    r[i] = Curry._2(f, a[i], b[i]);
  }
  return r;
}

function iteri(f, a) {
  for(var i = 0 ,i_finish = a.length; i < i_finish; ++i){
    Curry._2(f, i, a[i]);
  }
  
}

function mapi(f, a) {
  var l = a.length;
  if (l === 0) {
    return [];
  }
  var r = Caml_array.caml_make_vect(l, Curry._2(f, 0, a[0]));
  for(var i = 1; i < l; ++i){
    r[i] = Curry._2(f, i, a[i]);
  }
  return r;
}

function to_list(a) {
  var _i = a.length - 1 | 0;
  var _res = /* [] */0;
  while(true) {
    var res = _res;
    var i = _i;
    if (i < 0) {
      return res;
    }
    _res = {
      hd: a[i],
      tl: res
    };
    _i = i - 1 | 0;
    continue ;
  };
}

function list_length(_accu, _param) {
  while(true) {
    var param = _param;
    var accu = _accu;
    if (!param) {
      return accu;
    }
    _param = param.tl;
    _accu = accu + 1 | 0;
    continue ;
  };
}

function of_list(l) {
  if (!l) {
    return [];
  }
  var a = Caml_array.caml_make_vect(list_length(0, l), l.hd);
  var _i = 1;
  var _param = l.tl;
  while(true) {
    var param = _param;
    var i = _i;
    if (!param) {
      return a;
    }
    a[i] = param.hd;
    _param = param.tl;
    _i = i + 1 | 0;
    continue ;
  };
}

function fold_left(f, x, a) {
  var r = x;
  for(var i = 0 ,i_finish = a.length; i < i_finish; ++i){
    r = Curry._2(f, r, a[i]);
  }
  return r;
}

function fold_right(f, a, x) {
  var r = x;
  for(var i = a.length - 1 | 0; i >= 0; --i){
    r = Curry._2(f, a[i], r);
  }
  return r;
}

function exists(p, a) {
  var n = a.length;
  var _i = 0;
  while(true) {
    var i = _i;
    if (i === n) {
      return false;
    }
    if (Curry._1(p, a[i])) {
      return true;
    }
    _i = i + 1 | 0;
    continue ;
  };
}

function for_all(p, a) {
  var n = a.length;
  var _i = 0;
  while(true) {
    var i = _i;
    if (i === n) {
      return true;
    }
    if (!Curry._1(p, a[i])) {
      return false;
    }
    _i = i + 1 | 0;
    continue ;
  };
}

function mem(x, a) {
  var n = a.length;
  var _i = 0;
  while(true) {
    var i = _i;
    if (i === n) {
      return false;
    }
    if (Caml_obj.caml_equal(a[i], x)) {
      return true;
    }
    _i = i + 1 | 0;
    continue ;
  };
}

function memq(x, a) {
  var n = a.length;
  var _i = 0;
  while(true) {
    var i = _i;
    if (i === n) {
      return false;
    }
    if (x === a[i]) {
      return true;
    }
    _i = i + 1 | 0;
    continue ;
  };
}

var Bottom = /* @__PURE__ */Caml_exceptions.create("Array.Bottom");

function sort(cmp, a) {
  var maxson = function (l, i) {
    var i31 = ((i + i | 0) + i | 0) + 1 | 0;
    var x = i31;
    if ((i31 + 2 | 0) < l) {
      if (Curry._2(cmp, Caml_array.get(a, i31), Caml_array.get(a, i31 + 1 | 0)) < 0) {
        x = i31 + 1 | 0;
      }
      if (Curry._2(cmp, Caml_array.get(a, x), Caml_array.get(a, i31 + 2 | 0)) < 0) {
        x = i31 + 2 | 0;
      }
      return x;
    }
    if ((i31 + 1 | 0) < l && Curry._2(cmp, Caml_array.get(a, i31), Caml_array.get(a, i31 + 1 | 0)) < 0) {
      return i31 + 1 | 0;
    }
    if (i31 < l) {
      return i31;
    }
    throw {
          RE_EXN_ID: Bottom,
          _1: i,
          Error: new Error()
        };
  };
  var trickle = function (l, i, e) {
    try {
      var _i = i;
      while(true) {
        var i$1 = _i;
        var j = maxson(l, i$1);
        if (Curry._2(cmp, Caml_array.get(a, j), e) <= 0) {
          return Caml_array.set(a, i$1, e);
        }
        Caml_array.set(a, i$1, Caml_array.get(a, j));
        _i = j;
        continue ;
      };
    }
    catch (raw_i){
      var i$2 = Caml_js_exceptions.internalToOCamlException(raw_i);
      if (i$2.RE_EXN_ID === Bottom) {
        return Caml_array.set(a, i$2._1, e);
      }
      throw i$2;
    }
  };
  var bubble = function (l, i) {
    try {
      var _i = i;
      while(true) {
        var i$1 = _i;
        var j = maxson(l, i$1);
        Caml_array.set(a, i$1, Caml_array.get(a, j));
        _i = j;
        continue ;
      };
    }
    catch (raw_i){
      var i$2 = Caml_js_exceptions.internalToOCamlException(raw_i);
      if (i$2.RE_EXN_ID === Bottom) {
        return i$2._1;
      }
      throw i$2;
    }
  };
  var trickleup = function (_i, e) {
    while(true) {
      var i = _i;
      var father = (i - 1 | 0) / 3 | 0;
      if (i === father) {
        throw {
              RE_EXN_ID: "Assert_failure",
              _1: [
                "array.ml",
                238,
                4
              ],
              Error: new Error()
            };
      }
      if (Curry._2(cmp, Caml_array.get(a, father), e) >= 0) {
        return Caml_array.set(a, i, e);
      }
      Caml_array.set(a, i, Caml_array.get(a, father));
      if (father <= 0) {
        return Caml_array.set(a, 0, e);
      }
      _i = father;
      continue ;
    };
  };
  var l = a.length;
  for(var i = ((l + 1 | 0) / 3 | 0) - 1 | 0; i >= 0; --i){
    trickle(l, i, Caml_array.get(a, i));
  }
  for(var i$1 = l - 1 | 0; i$1 >= 2; --i$1){
    var e = Caml_array.get(a, i$1);
    Caml_array.set(a, i$1, Caml_array.get(a, 0));
    trickleup(bubble(i$1, 0), e);
  }
  if (l <= 1) {
    return ;
  }
  var e$1 = Caml_array.get(a, 1);
  Caml_array.set(a, 1, Caml_array.get(a, 0));
  return Caml_array.set(a, 0, e$1);
}

function stable_sort(cmp, a) {
  var merge = function (src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs) {
    var src1r = src1ofs + src1len | 0;
    var src2r = src2ofs + src2len | 0;
    var _i1 = src1ofs;
    var _s1 = Caml_array.get(a, src1ofs);
    var _i2 = src2ofs;
    var _s2 = Caml_array.get(src2, src2ofs);
    var _d = dstofs;
    while(true) {
      var d = _d;
      var s2 = _s2;
      var i2 = _i2;
      var s1 = _s1;
      var i1 = _i1;
      if (Curry._2(cmp, s1, s2) <= 0) {
        Caml_array.set(dst, d, s1);
        var i1$1 = i1 + 1 | 0;
        if (i1$1 >= src1r) {
          return blit(src2, i2, dst, d + 1 | 0, src2r - i2 | 0);
        }
        _d = d + 1 | 0;
        _s1 = Caml_array.get(a, i1$1);
        _i1 = i1$1;
        continue ;
      }
      Caml_array.set(dst, d, s2);
      var i2$1 = i2 + 1 | 0;
      if (i2$1 >= src2r) {
        return blit(a, i1, dst, d + 1 | 0, src1r - i1 | 0);
      }
      _d = d + 1 | 0;
      _s2 = Caml_array.get(src2, i2$1);
      _i2 = i2$1;
      continue ;
    };
  };
  var isortto = function (srcofs, dst, dstofs, len) {
    for(var i = 0; i < len; ++i){
      var e = Caml_array.get(a, srcofs + i | 0);
      var j = (dstofs + i | 0) - 1 | 0;
      while(j >= dstofs && Curry._2(cmp, Caml_array.get(dst, j), e) > 0) {
        Caml_array.set(dst, j + 1 | 0, Caml_array.get(dst, j));
        j = j - 1 | 0;
      };
      Caml_array.set(dst, j + 1 | 0, e);
    }
    
  };
  var sortto = function (srcofs, dst, dstofs, len) {
    if (len <= 5) {
      return isortto(srcofs, dst, dstofs, len);
    }
    var l1 = len / 2 | 0;
    var l2 = len - l1 | 0;
    sortto(srcofs + l1 | 0, dst, dstofs + l1 | 0, l2);
    sortto(srcofs, a, srcofs + l2 | 0, l1);
    return merge(srcofs + l2 | 0, l1, dst, dstofs + l1 | 0, l2, dst, dstofs);
  };
  var l = a.length;
  if (l <= 5) {
    return isortto(0, a, 0, l);
  }
  var l1 = l / 2 | 0;
  var l2 = l - l1 | 0;
  var t = Caml_array.caml_make_vect(l2, Caml_array.get(a, 0));
  sortto(l1, t, 0, l2);
  sortto(0, a, l2, l1);
  return merge(l2, l1, t, 0, l2, a, 0);
}

var create_matrix = make_matrix;

var concat = Caml_array.caml_array_concat;

var fast_sort = stable_sort;

exports.make_float = make_float;
exports.init = init;
exports.make_matrix = make_matrix;
exports.create_matrix = create_matrix;
exports.append = append;
exports.concat = concat;
exports.sub = sub;
exports.copy = copy;
exports.fill = fill;
exports.blit = blit;
exports.to_list = to_list;
exports.of_list = of_list;
exports.iter = iter;
exports.iteri = iteri;
exports.map = map;
exports.mapi = mapi;
exports.fold_left = fold_left;
exports.fold_right = fold_right;
exports.iter2 = iter2;
exports.map2 = map2;
exports.for_all = for_all;
exports.exists = exists;
exports.mem = mem;
exports.memq = memq;
exports.sort = sort;
exports.stable_sort = stable_sort;
exports.fast_sort = fast_sort;
exports.Floatarray = Floatarray;
/* No side effect */

},{"./caml_array.js":2,"./caml_exceptions.js":4,"./caml_js_exceptions.js":9,"./caml_obj.js":10,"./curry.js":15}],2:[function(require,module,exports){
'use strict';


function caml_array_sub(x, offset, len) {
  var result = new Array(len);
  var j = 0;
  var i = offset;
  while(j < len) {
    result[j] = x[i];
    j = j + 1 | 0;
    i = i + 1 | 0;
  };
  return result;
}

function len(_acc, _l) {
  while(true) {
    var l = _l;
    var acc = _acc;
    if (!l) {
      return acc;
    }
    _l = l.tl;
    _acc = l.hd.length + acc | 0;
    continue ;
  };
}

function fill(arr, _i, _l) {
  while(true) {
    var l = _l;
    var i = _i;
    if (!l) {
      return ;
    }
    var x = l.hd;
    var l$1 = x.length;
    var k = i;
    var j = 0;
    while(j < l$1) {
      arr[k] = x[j];
      k = k + 1 | 0;
      j = j + 1 | 0;
    };
    _l = l.tl;
    _i = k;
    continue ;
  };
}

function caml_array_concat(l) {
  var v = len(0, l);
  var result = new Array(v);
  fill(result, 0, l);
  return result;
}

function set(xs, index, newval) {
  if (index < 0 || index >= xs.length) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "index out of bounds",
          Error: new Error()
        };
  }
  xs[index] = newval;
  
}

function get(xs, index) {
  if (index < 0 || index >= xs.length) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "index out of bounds",
          Error: new Error()
        };
  }
  return xs[index];
}

function caml_make_vect(len, init) {
  var b = new Array(len);
  for(var i = 0; i < len; ++i){
    b[i] = init;
  }
  return b;
}

function caml_make_float_vect(len) {
  var b = new Array(len);
  for(var i = 0; i < len; ++i){
    b[i] = 0;
  }
  return b;
}

function caml_array_blit(a1, i1, a2, i2, len) {
  if (i2 <= i1) {
    for(var j = 0; j < len; ++j){
      a2[j + i2 | 0] = a1[j + i1 | 0];
    }
    return ;
  }
  for(var j$1 = len - 1 | 0; j$1 >= 0; --j$1){
    a2[j$1 + i2 | 0] = a1[j$1 + i1 | 0];
  }
  
}

function caml_array_dup(prim) {
  return prim.slice(0);
}

exports.caml_array_dup = caml_array_dup;
exports.caml_array_sub = caml_array_sub;
exports.caml_array_concat = caml_array_concat;
exports.caml_make_vect = caml_make_vect;
exports.caml_make_float_vect = caml_make_float_vect;
exports.caml_array_blit = caml_array_blit;
exports.get = get;
exports.set = set;
/* No side effect */

},{}],3:[function(require,module,exports){
'use strict';


function set(s, i, ch) {
  if (i < 0 || i >= s.length) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "index out of bounds",
          Error: new Error()
        };
  }
  s[i] = ch;
  
}

function get(s, i) {
  if (i < 0 || i >= s.length) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "index out of bounds",
          Error: new Error()
        };
  }
  return s[i];
}

function caml_fill_bytes(s, i, l, c) {
  if (l <= 0) {
    return ;
  }
  for(var k = i ,k_finish = l + i | 0; k < k_finish; ++k){
    s[k] = c;
  }
  
}

function caml_create_bytes(len) {
  if (len < 0) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "String.create",
          Error: new Error()
        };
  }
  var result = new Array(len);
  for(var i = 0; i < len; ++i){
    result[i] = /* '\000' */0;
  }
  return result;
}

function caml_blit_bytes(s1, i1, s2, i2, len) {
  if (len <= 0) {
    return ;
  }
  if (s1 === s2) {
    if (i1 < i2) {
      var range_a = (s1.length - i2 | 0) - 1 | 0;
      var range_b = len - 1 | 0;
      var range = range_a > range_b ? range_b : range_a;
      for(var j = range; j >= 0; --j){
        s1[i2 + j | 0] = s1[i1 + j | 0];
      }
      return ;
    }
    if (i1 <= i2) {
      return ;
    }
    var range_a$1 = (s1.length - i1 | 0) - 1 | 0;
    var range_b$1 = len - 1 | 0;
    var range$1 = range_a$1 > range_b$1 ? range_b$1 : range_a$1;
    for(var k = 0; k <= range$1; ++k){
      s1[i2 + k | 0] = s1[i1 + k | 0];
    }
    return ;
  }
  var off1 = s1.length - i1 | 0;
  if (len <= off1) {
    for(var i = 0; i < len; ++i){
      s2[i2 + i | 0] = s1[i1 + i | 0];
    }
    return ;
  }
  for(var i$1 = 0; i$1 < off1; ++i$1){
    s2[i2 + i$1 | 0] = s1[i1 + i$1 | 0];
  }
  for(var i$2 = off1; i$2 < len; ++i$2){
    s2[i2 + i$2 | 0] = /* '\000' */0;
  }
  
}

function bytes_to_string(a) {
  var i = 0;
  var len = a.length;
  var s = "";
  var s_len = len;
  if (i === 0 && len <= 4096 && len === a.length) {
    return String.fromCharCode.apply(null, a);
  }
  var offset = 0;
  while(s_len > 0) {
    var next = s_len < 1024 ? s_len : 1024;
    var tmp_bytes = new Array(next);
    for(var k = 0; k < next; ++k){
      tmp_bytes[k] = a[k + offset | 0];
    }
    s = s + String.fromCharCode.apply(null, tmp_bytes);
    s_len = s_len - next | 0;
    offset = offset + next | 0;
  };
  return s;
}

function caml_blit_string(s1, i1, s2, i2, len) {
  if (len <= 0) {
    return ;
  }
  var off1 = s1.length - i1 | 0;
  if (len <= off1) {
    for(var i = 0; i < len; ++i){
      s2[i2 + i | 0] = s1.charCodeAt(i1 + i | 0);
    }
    return ;
  }
  for(var i$1 = 0; i$1 < off1; ++i$1){
    s2[i2 + i$1 | 0] = s1.charCodeAt(i1 + i$1 | 0);
  }
  for(var i$2 = off1; i$2 < len; ++i$2){
    s2[i2 + i$2 | 0] = /* '\000' */0;
  }
  
}

function bytes_of_string(s) {
  var len = s.length;
  var res = new Array(len);
  for(var i = 0; i < len; ++i){
    res[i] = s.charCodeAt(i);
  }
  return res;
}

function caml_bytes_compare_aux(s1, s2, _off, len, def) {
  while(true) {
    var off = _off;
    if (off >= len) {
      return def;
    }
    var a = s1[off];
    var b = s2[off];
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    _off = off + 1 | 0;
    continue ;
  };
}

function caml_bytes_compare(s1, s2) {
  var len1 = s1.length;
  var len2 = s2.length;
  if (len1 === len2) {
    return caml_bytes_compare_aux(s1, s2, 0, len1, 0);
  } else if (len1 < len2) {
    return caml_bytes_compare_aux(s1, s2, 0, len1, -1);
  } else {
    return caml_bytes_compare_aux(s1, s2, 0, len2, 1);
  }
}

function caml_bytes_equal(s1, s2) {
  var len1 = s1.length;
  var len2 = s2.length;
  if (len1 === len2) {
    var _off = 0;
    while(true) {
      var off = _off;
      if (off === len1) {
        return true;
      }
      var a = s1[off];
      var b = s2[off];
      if (a !== b) {
        return false;
      }
      _off = off + 1 | 0;
      continue ;
    };
  } else {
    return false;
  }
}

function caml_bytes_greaterthan(s1, s2) {
  return caml_bytes_compare(s1, s2) > 0;
}

function caml_bytes_greaterequal(s1, s2) {
  return caml_bytes_compare(s1, s2) >= 0;
}

function caml_bytes_lessthan(s1, s2) {
  return caml_bytes_compare(s1, s2) < 0;
}

function caml_bytes_lessequal(s1, s2) {
  return caml_bytes_compare(s1, s2) <= 0;
}

exports.caml_create_bytes = caml_create_bytes;
exports.caml_fill_bytes = caml_fill_bytes;
exports.get = get;
exports.set = set;
exports.bytes_to_string = bytes_to_string;
exports.caml_blit_bytes = caml_blit_bytes;
exports.caml_blit_string = caml_blit_string;
exports.bytes_of_string = bytes_of_string;
exports.caml_bytes_compare = caml_bytes_compare;
exports.caml_bytes_greaterthan = caml_bytes_greaterthan;
exports.caml_bytes_greaterequal = caml_bytes_greaterequal;
exports.caml_bytes_lessthan = caml_bytes_lessthan;
exports.caml_bytes_lessequal = caml_bytes_lessequal;
exports.caml_bytes_equal = caml_bytes_equal;
/* No side effect */

},{}],4:[function(require,module,exports){
'use strict';


var id = {
  contents: 0
};

function create(str) {
  id.contents = id.contents + 1 | 0;
  return str + ("/" + id.contents);
}

function caml_is_extension(e) {
  if (e == null) {
    return false;
  } else {
    return typeof e.RE_EXN_ID === "string";
  }
}

function caml_exn_slot_name(x) {
  return x.RE_EXN_ID;
}

exports.id = id;
exports.create = create;
exports.caml_is_extension = caml_is_extension;
exports.caml_exn_slot_name = caml_exn_slot_name;
/* No side effect */

},{}],5:[function(require,module,exports){
(function (global){(function (){
'use strict';


var getGlobalThis = (function(){
  if (typeof globalThis !== 'undefined') return globalThis;
	if (typeof self !== 'undefined') return self;
	if (typeof window !== 'undefined') return window;
	if (typeof global !== 'undefined') return global;
	if (typeof this !== 'undefined') return this;
	throw new Error('Unable to locate global `this`');
});

var resolve = (function(s){
  var myGlobal = getGlobalThis();
  if (myGlobal[s] === undefined){
    throw new Error(s + " not polyfilled by BuckleScript yet\n")
  }
  return myGlobal[s]
});

var register = (function(s,fn){
  var myGlobal = getGlobalThis();
  myGlobal[s] = fn 
  return 0
});

exports.getGlobalThis = getGlobalThis;
exports.resolve = resolve;
exports.register = register;
/* No side effect */

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],6:[function(require,module,exports){
'use strict';

var Caml_int64 = require("./caml_int64.js");

function parse_digit(c) {
  if (c >= 65) {
    if (c >= 97) {
      if (c >= 123) {
        return -1;
      } else {
        return c - 87 | 0;
      }
    } else if (c >= 91) {
      return -1;
    } else {
      return c - 55 | 0;
    }
  } else if (c > 57 || c < 48) {
    return -1;
  } else {
    return c - /* '0' */48 | 0;
  }
}

function int_of_string_base(param) {
  switch (param) {
    case /* Oct */0 :
        return 8;
    case /* Hex */1 :
        return 16;
    case /* Dec */2 :
        return 10;
    case /* Bin */3 :
        return 2;
    
  }
}

function parse_sign_and_base(s) {
  var sign = 1;
  var base = /* Dec */2;
  var i = 0;
  var match = s.charCodeAt(i);
  switch (match) {
    case 43 :
        i = i + 1 | 0;
        break;
    case 44 :
        break;
    case 45 :
        sign = -1;
        i = i + 1 | 0;
        break;
    default:
      
  }
  if (s[i] === "0") {
    var match$1 = s.charCodeAt(i + 1 | 0);
    if (match$1 >= 89) {
      if (match$1 >= 111) {
        if (match$1 < 121) {
          switch (match$1) {
            case 111 :
                base = /* Oct */0;
                i = i + 2 | 0;
                break;
            case 117 :
                i = i + 2 | 0;
                break;
            case 112 :
            case 113 :
            case 114 :
            case 115 :
            case 116 :
            case 118 :
            case 119 :
                break;
            case 120 :
                base = /* Hex */1;
                i = i + 2 | 0;
                break;
            
          }
        }
        
      } else if (match$1 === 98) {
        base = /* Bin */3;
        i = i + 2 | 0;
      }
      
    } else if (match$1 !== 66) {
      if (match$1 >= 79) {
        switch (match$1) {
          case 79 :
              base = /* Oct */0;
              i = i + 2 | 0;
              break;
          case 85 :
              i = i + 2 | 0;
              break;
          case 80 :
          case 81 :
          case 82 :
          case 83 :
          case 84 :
          case 86 :
          case 87 :
              break;
          case 88 :
              base = /* Hex */1;
              i = i + 2 | 0;
              break;
          
        }
      }
      
    } else {
      base = /* Bin */3;
      i = i + 2 | 0;
    }
  }
  return [
          i,
          sign,
          base
        ];
}

function caml_int_of_string(s) {
  var match = parse_sign_and_base(s);
  var i = match[0];
  var base = int_of_string_base(match[2]);
  var threshold = 4294967295;
  var len = s.length;
  var c = i < len ? s.charCodeAt(i) : /* '\000' */0;
  var d = parse_digit(c);
  if (d < 0 || d >= base) {
    throw {
          RE_EXN_ID: "Failure",
          _1: "int_of_string",
          Error: new Error()
        };
  }
  var aux = function (_acc, _k) {
    while(true) {
      var k = _k;
      var acc = _acc;
      if (k === len) {
        return acc;
      }
      var a = s.charCodeAt(k);
      if (a === /* '_' */95) {
        _k = k + 1 | 0;
        continue ;
      }
      var v = parse_digit(a);
      if (v < 0 || v >= base) {
        throw {
              RE_EXN_ID: "Failure",
              _1: "int_of_string",
              Error: new Error()
            };
      }
      var acc$1 = base * acc + v;
      if (acc$1 > threshold) {
        throw {
              RE_EXN_ID: "Failure",
              _1: "int_of_string",
              Error: new Error()
            };
      }
      _k = k + 1 | 0;
      _acc = acc$1;
      continue ;
    };
  };
  var res = match[1] * aux(d, i + 1 | 0);
  var or_res = res | 0;
  if (base === 10 && res !== or_res) {
    throw {
          RE_EXN_ID: "Failure",
          _1: "int_of_string",
          Error: new Error()
        };
  }
  return or_res;
}

function caml_int64_of_string(s) {
  var match = parse_sign_and_base(s);
  var hbase = match[2];
  var i = match[0];
  var base = Caml_int64.of_int32(int_of_string_base(hbase));
  var sign = Caml_int64.of_int32(match[1]);
  var threshold;
  switch (hbase) {
    case /* Oct */0 :
        threshold = /* @__PURE__ */Caml_int64.mk(-1, 536870911);
        break;
    case /* Hex */1 :
        threshold = /* @__PURE__ */Caml_int64.mk(-1, 268435455);
        break;
    case /* Dec */2 :
        threshold = /* @__PURE__ */Caml_int64.mk(-1717986919, 429496729);
        break;
    case /* Bin */3 :
        threshold = Caml_int64.max_int;
        break;
    
  }
  var len = s.length;
  var c = i < len ? s.charCodeAt(i) : /* '\000' */0;
  var d = Caml_int64.of_int32(parse_digit(c));
  if (Caml_int64.lt(d, Caml_int64.zero) || Caml_int64.ge(d, base)) {
    throw {
          RE_EXN_ID: "Failure",
          _1: "int64_of_string",
          Error: new Error()
        };
  }
  var aux = function (_acc, _k) {
    while(true) {
      var k = _k;
      var acc = _acc;
      if (k === len) {
        return acc;
      }
      var a = s.charCodeAt(k);
      if (a === /* '_' */95) {
        _k = k + 1 | 0;
        continue ;
      }
      var v = Caml_int64.of_int32(parse_digit(a));
      if (Caml_int64.lt(v, Caml_int64.zero) || Caml_int64.ge(v, base) || Caml_int64.gt(acc, threshold)) {
        throw {
              RE_EXN_ID: "Failure",
              _1: "int64_of_string",
              Error: new Error()
            };
      }
      var acc$1 = Caml_int64.add(Caml_int64.mul(base, acc), v);
      _k = k + 1 | 0;
      _acc = acc$1;
      continue ;
    };
  };
  var res = Caml_int64.mul(sign, aux(d, i + 1 | 0));
  var or_res = Caml_int64.or_(res, Caml_int64.zero);
  if (Caml_int64.eq(base, /* @__PURE__ */Caml_int64.mk(10, 0)) && Caml_int64.neq(res, or_res)) {
    throw {
          RE_EXN_ID: "Failure",
          _1: "int64_of_string",
          Error: new Error()
        };
  }
  return or_res;
}

function int_of_base(param) {
  switch (param) {
    case /* Oct */0 :
        return 8;
    case /* Hex */1 :
        return 16;
    case /* Dec */2 :
        return 10;
    
  }
}

function lowercase(c) {
  if (c >= /* 'A' */65 && c <= /* 'Z' */90 || c >= /* '\192' */192 && c <= /* '\214' */214 || c >= /* '\216' */216 && c <= /* '\222' */222) {
    return c + 32 | 0;
  } else {
    return c;
  }
}

function parse_format(fmt) {
  var len = fmt.length;
  if (len > 31) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "format_int: format too long",
          Error: new Error()
        };
  }
  var f = {
    justify: "+",
    signstyle: "-",
    filter: " ",
    alternate: false,
    base: /* Dec */2,
    signedconv: false,
    width: 0,
    uppercase: false,
    sign: 1,
    prec: -1,
    conv: "f"
  };
  var _i = 0;
  while(true) {
    var i = _i;
    if (i >= len) {
      return f;
    }
    var c = fmt.charCodeAt(i);
    var exit = 0;
    if (c >= 69) {
      if (c >= 88) {
        if (c >= 121) {
          exit = 1;
        } else {
          switch (c) {
            case 88 :
                f.base = /* Hex */1;
                f.uppercase = true;
                _i = i + 1 | 0;
                continue ;
            case 101 :
            case 102 :
            case 103 :
                exit = 5;
                break;
            case 100 :
            case 105 :
                exit = 4;
                break;
            case 111 :
                f.base = /* Oct */0;
                _i = i + 1 | 0;
                continue ;
            case 117 :
                f.base = /* Dec */2;
                _i = i + 1 | 0;
                continue ;
            case 89 :
            case 90 :
            case 91 :
            case 92 :
            case 93 :
            case 94 :
            case 95 :
            case 96 :
            case 97 :
            case 98 :
            case 99 :
            case 104 :
            case 106 :
            case 107 :
            case 108 :
            case 109 :
            case 110 :
            case 112 :
            case 113 :
            case 114 :
            case 115 :
            case 116 :
            case 118 :
            case 119 :
                exit = 1;
                break;
            case 120 :
                f.base = /* Hex */1;
                _i = i + 1 | 0;
                continue ;
            
          }
        }
      } else if (c >= 72) {
        exit = 1;
      } else {
        f.signedconv = true;
        f.uppercase = true;
        f.conv = String.fromCharCode(lowercase(c));
        _i = i + 1 | 0;
        continue ;
      }
    } else {
      switch (c) {
        case 35 :
            f.alternate = true;
            _i = i + 1 | 0;
            continue ;
        case 32 :
        case 43 :
            exit = 2;
            break;
        case 45 :
            f.justify = "-";
            _i = i + 1 | 0;
            continue ;
        case 46 :
            f.prec = 0;
            var j = i + 1 | 0;
            while((function(j){
                return function () {
                  var w = fmt.charCodeAt(j) - /* '0' */48 | 0;
                  return w >= 0 && w <= 9;
                }
                }(j))()) {
              f.prec = (Math.imul(f.prec, 10) + fmt.charCodeAt(j) | 0) - /* '0' */48 | 0;
              j = j + 1 | 0;
            };
            _i = j;
            continue ;
        case 33 :
        case 34 :
        case 36 :
        case 37 :
        case 38 :
        case 39 :
        case 40 :
        case 41 :
        case 42 :
        case 44 :
        case 47 :
            exit = 1;
            break;
        case 48 :
            f.filter = "0";
            _i = i + 1 | 0;
            continue ;
        case 49 :
        case 50 :
        case 51 :
        case 52 :
        case 53 :
        case 54 :
        case 55 :
        case 56 :
        case 57 :
            exit = 3;
            break;
        default:
          exit = 1;
      }
    }
    switch (exit) {
      case 1 :
          _i = i + 1 | 0;
          continue ;
      case 2 :
          f.signstyle = String.fromCharCode(c);
          _i = i + 1 | 0;
          continue ;
      case 3 :
          f.width = 0;
          var j$1 = i;
          while((function(j$1){
              return function () {
                var w = fmt.charCodeAt(j$1) - /* '0' */48 | 0;
                return w >= 0 && w <= 9;
              }
              }(j$1))()) {
            f.width = (Math.imul(f.width, 10) + fmt.charCodeAt(j$1) | 0) - /* '0' */48 | 0;
            j$1 = j$1 + 1 | 0;
          };
          _i = j$1;
          continue ;
      case 4 :
          f.signedconv = true;
          f.base = /* Dec */2;
          _i = i + 1 | 0;
          continue ;
      case 5 :
          f.signedconv = true;
          f.conv = String.fromCharCode(c);
          _i = i + 1 | 0;
          continue ;
      
    }
  };
}

function finish_formatting(config, rawbuffer) {
  var justify = config.justify;
  var signstyle = config.signstyle;
  var filter = config.filter;
  var alternate = config.alternate;
  var base = config.base;
  var signedconv = config.signedconv;
  var width = config.width;
  var uppercase = config.uppercase;
  var sign = config.sign;
  var len = rawbuffer.length;
  if (signedconv && (sign < 0 || signstyle !== "-")) {
    len = len + 1 | 0;
  }
  if (alternate) {
    if (base === /* Oct */0) {
      len = len + 1 | 0;
    } else if (base === /* Hex */1) {
      len = len + 2 | 0;
    }
    
  }
  var buffer = "";
  if (justify === "+" && filter === " ") {
    for(var _for = len; _for < width; ++_for){
      buffer = buffer + filter;
    }
  }
  if (signedconv) {
    if (sign < 0) {
      buffer = buffer + "-";
    } else if (signstyle !== "-") {
      buffer = buffer + signstyle;
    }
    
  }
  if (alternate && base === /* Oct */0) {
    buffer = buffer + "0";
  }
  if (alternate && base === /* Hex */1) {
    buffer = buffer + "0x";
  }
  if (justify === "+" && filter === "0") {
    for(var _for$1 = len; _for$1 < width; ++_for$1){
      buffer = buffer + filter;
    }
  }
  buffer = uppercase ? buffer + rawbuffer.toUpperCase() : buffer + rawbuffer;
  if (justify === "-") {
    for(var _for$2 = len; _for$2 < width; ++_for$2){
      buffer = buffer + " ";
    }
  }
  return buffer;
}

function caml_format_int(fmt, i) {
  if (fmt === "%d") {
    return String(i);
  }
  var f = parse_format(fmt);
  var i$1 = i < 0 ? (
      f.signedconv ? (f.sign = -1, (-i >>> 0)) : (i >>> 0)
    ) : i;
  var s = i$1.toString(int_of_base(f.base));
  if (f.prec >= 0) {
    f.filter = " ";
    var n = f.prec - s.length | 0;
    if (n > 0) {
      s = "0".repeat(n) + s;
    }
    
  }
  return finish_formatting(f, s);
}

function dec_of_pos_int64(x) {
  if (!Caml_int64.lt(x, Caml_int64.zero)) {
    return Caml_int64.to_string(x);
  }
  var wbase = /* @__PURE__ */Caml_int64.mk(10, 0);
  var y = Caml_int64.discard_sign(x);
  var match = Caml_int64.div_mod(y, wbase);
  var match$1 = Caml_int64.div_mod(Caml_int64.add(/* @__PURE__ */Caml_int64.mk(8, 0), match[1]), wbase);
  var quotient = Caml_int64.add(Caml_int64.add(/* @__PURE__ */Caml_int64.mk(-858993460, 214748364), match[0]), match$1[0]);
  return Caml_int64.to_string(quotient) + "0123456789"[Caml_int64.to_int32(match$1[1])];
}

function oct_of_int64(x) {
  var s = "";
  var wbase = /* @__PURE__ */Caml_int64.mk(8, 0);
  var cvtbl = "01234567";
  if (Caml_int64.lt(x, Caml_int64.zero)) {
    var y = Caml_int64.discard_sign(x);
    var match = Caml_int64.div_mod(y, wbase);
    var quotient = Caml_int64.add(/* @__PURE__ */Caml_int64.mk(0, 268435456), match[0]);
    var modulus = match[1];
    s = cvtbl[Caml_int64.to_int32(modulus)] + s;
    while(Caml_int64.neq(quotient, Caml_int64.zero)) {
      var match$1 = Caml_int64.div_mod(quotient, wbase);
      quotient = match$1[0];
      modulus = match$1[1];
      s = cvtbl[Caml_int64.to_int32(modulus)] + s;
    };
  } else {
    var match$2 = Caml_int64.div_mod(x, wbase);
    var quotient$1 = match$2[0];
    var modulus$1 = match$2[1];
    s = cvtbl[Caml_int64.to_int32(modulus$1)] + s;
    while(Caml_int64.neq(quotient$1, Caml_int64.zero)) {
      var match$3 = Caml_int64.div_mod(quotient$1, wbase);
      quotient$1 = match$3[0];
      modulus$1 = match$3[1];
      s = cvtbl[Caml_int64.to_int32(modulus$1)] + s;
    };
  }
  return s;
}

function caml_int64_format(fmt, x) {
  if (fmt === "%d") {
    return Caml_int64.to_string(x);
  }
  var f = parse_format(fmt);
  var x$1 = f.signedconv && Caml_int64.lt(x, Caml_int64.zero) ? (f.sign = -1, Caml_int64.neg(x)) : x;
  var match = f.base;
  var s;
  switch (match) {
    case /* Oct */0 :
        s = oct_of_int64(x$1);
        break;
    case /* Hex */1 :
        s = Caml_int64.to_hex(x$1);
        break;
    case /* Dec */2 :
        s = dec_of_pos_int64(x$1);
        break;
    
  }
  var fill_s;
  if (f.prec >= 0) {
    f.filter = " ";
    var n = f.prec - s.length | 0;
    fill_s = n > 0 ? "0".repeat(n) + s : s;
  } else {
    fill_s = s;
  }
  return finish_formatting(f, fill_s);
}

function caml_format_float(fmt, x) {
  var f = parse_format(fmt);
  var prec = f.prec < 0 ? 6 : f.prec;
  var x$1 = x < 0 ? (f.sign = -1, -x) : x;
  var s = "";
  if (isNaN(x$1)) {
    s = "nan";
    f.filter = " ";
  } else if (isFinite(x$1)) {
    var match = f.conv;
    switch (match) {
      case "e" :
          s = x$1.toExponential(prec);
          var i = s.length;
          if (s[i - 3 | 0] === "e") {
            s = s.slice(0, i - 1 | 0) + ("0" + s.slice(i - 1 | 0));
          }
          break;
      case "f" :
          s = x$1.toFixed(prec);
          break;
      case "g" :
          var prec$1 = prec !== 0 ? prec : 1;
          s = x$1.toExponential(prec$1 - 1 | 0);
          var j = s.indexOf("e");
          var exp = Number(s.slice(j + 1 | 0)) | 0;
          if (exp < -4 || x$1 >= 1e21 || x$1.toFixed().length > prec$1) {
            var i$1 = j - 1 | 0;
            while(s[i$1] === "0") {
              i$1 = i$1 - 1 | 0;
            };
            if (s[i$1] === ".") {
              i$1 = i$1 - 1 | 0;
            }
            s = s.slice(0, i$1 + 1 | 0) + s.slice(j);
            var i$2 = s.length;
            if (s[i$2 - 3 | 0] === "e") {
              s = s.slice(0, i$2 - 1 | 0) + ("0" + s.slice(i$2 - 1 | 0));
            }
            
          } else {
            var p = prec$1;
            if (exp < 0) {
              p = p - (exp + 1 | 0) | 0;
              s = x$1.toFixed(p);
            } else {
              while((function () {
                      s = x$1.toFixed(p);
                      return s.length > (prec$1 + 1 | 0);
                    })()) {
                p = p - 1 | 0;
              };
            }
            if (p !== 0) {
              var k = s.length - 1 | 0;
              while(s[k] === "0") {
                k = k - 1 | 0;
              };
              if (s[k] === ".") {
                k = k - 1 | 0;
              }
              s = s.slice(0, k + 1 | 0);
            }
            
          }
          break;
      default:
        
    }
  } else {
    s = "inf";
    f.filter = " ";
  }
  return finish_formatting(f, s);
}

var caml_hexstring_of_float = (function(x,prec,style){
  if (!isFinite(x)) {
    if (isNaN(x)) return "nan";
    return x > 0 ? "infinity":"-infinity";
  }
  var sign = (x==0 && 1/x == -Infinity)?1:(x>=0)?0:1;
  if(sign) x = -x;
  var exp = 0;
  if (x == 0) { }
  else if (x < 1) {
    while (x < 1 && exp > -1022)  { x *= 2; exp-- }
  } else {
    while (x >= 2) { x /= 2; exp++ }
  }
  var exp_sign = exp < 0 ? '' : '+';
  var sign_str = '';
  if (sign) sign_str = '-'
  else {
    switch(style){
    case 43 /* '+' */: sign_str = '+'; break;
    case 32 /* ' ' */: sign_str = ' '; break;
    default: break;
    }
  }
  if (prec >= 0 && prec < 13) {
    /* If a precision is given, and is small, round mantissa accordingly */
      var cst = Math.pow(2,prec * 4);
      x = Math.round(x * cst) / cst;
  }
  var x_str = x.toString(16);
  if(prec >= 0){
      var idx = x_str.indexOf('.');
    if(idx<0) {
      x_str += '.' +  '0'.repeat(prec);
    }
    else {
      var size = idx+1+prec;
      if(x_str.length < size)
        x_str += '0'.repeat(size - x_str.length);
      else
        x_str = x_str.substr(0,size);
    }
  }
  return  (sign_str + '0x' + x_str + 'p' + exp_sign + exp.toString(10));
});

var float_of_string = (function(s,exn){

    var res = +s;
    if ((s.length > 0) && (res === res))
        return res;
    s = s.replace(/_/g, "");
    res = +s;
    if (((s.length > 0) && (res === res)) || /^[+-]?nan$/i.test(s)) {
        return res;
    };
    var m = /^ *([+-]?)0x([0-9a-f]+)\.?([0-9a-f]*)p([+-]?[0-9]+)/i.exec(s);
    //            1        2             3           4
    if(m){
        var m3 = m[3].replace(/0+$/,'');
        var mantissa = parseInt(m[1] + m[2] + m3, 16);
        var exponent = (m[4]|0) - 4*m3.length;
        res = mantissa * Math.pow(2, exponent);
        return res;
    }
    if (/^\+?inf(inity)?$/i.test(s))
        return Infinity;
    if (/^-inf(inity)?$/i.test(s))
        return -Infinity;
    throw exn;
});

function caml_float_of_string(s) {
  return float_of_string(s, {
              RE_EXN_ID: "Failure",
              _1: "float_of_string"
            });
}

var caml_nativeint_format = caml_format_int;

var caml_int32_format = caml_format_int;

var caml_int32_of_string = caml_int_of_string;

var caml_nativeint_of_string = caml_int_of_string;

exports.caml_format_float = caml_format_float;
exports.caml_hexstring_of_float = caml_hexstring_of_float;
exports.caml_format_int = caml_format_int;
exports.caml_nativeint_format = caml_nativeint_format;
exports.caml_int32_format = caml_int32_format;
exports.caml_float_of_string = caml_float_of_string;
exports.caml_int64_format = caml_int64_format;
exports.caml_int_of_string = caml_int_of_string;
exports.caml_int32_of_string = caml_int32_of_string;
exports.caml_int64_of_string = caml_int64_of_string;
exports.caml_nativeint_of_string = caml_nativeint_of_string;
/* No side effect */

},{"./caml_int64.js":7}],7:[function(require,module,exports){
'use strict';


function mk(lo, hi) {
  return [
          hi,
          (lo >>> 0)
        ];
}

var min_int = [
  -2147483648,
  0
];

var max_int = [
  2147483647,
  4294967295
];

var one = [
  0,
  1
];

var zero = [
  0,
  0
];

var neg_one = [
  -1,
  4294967295
];

function neg_signed(x) {
  return (x & -2147483648) !== 0;
}

function non_neg_signed(x) {
  return (x & -2147483648) === 0;
}

function succ(param) {
  var x_lo = param[1];
  var x_hi = param[0];
  var lo = x_lo + 1 | 0;
  return [
          x_hi + (
            lo === 0 ? 1 : 0
          ) | 0,
          (lo >>> 0)
        ];
}

function neg(param) {
  var other_lo = (param[1] ^ -1) + 1 | 0;
  return [
          (param[0] ^ -1) + (
            other_lo === 0 ? 1 : 0
          ) | 0,
          (other_lo >>> 0)
        ];
}

function add_aux(param, y_lo, y_hi) {
  var x_lo = param[1];
  var lo = x_lo + y_lo | 0;
  var overflow = neg_signed(x_lo) && (neg_signed(y_lo) || non_neg_signed(lo)) || neg_signed(y_lo) && non_neg_signed(lo) ? 1 : 0;
  return [
          param[0] + y_hi + overflow | 0,
          (lo >>> 0)
        ];
}

function add(self, param) {
  return add_aux(self, param[1], param[0]);
}

function eq(x, y) {
  if (x[0] === y[0]) {
    return x[1] === y[1];
  } else {
    return false;
  }
}

function equal_null(x, y) {
  if (y !== null) {
    return eq(x, y);
  } else {
    return false;
  }
}

function equal_undefined(x, y) {
  if (y !== undefined) {
    return eq(x, y);
  } else {
    return false;
  }
}

function equal_nullable(x, y) {
  if (y == null) {
    return false;
  } else {
    return eq(x, y);
  }
}

function sub_aux(x, lo, hi) {
  var y_lo = ((lo ^ -1) + 1 >>> 0);
  var y_hi = (hi ^ -1) + (
    y_lo === 0 ? 1 : 0
  ) | 0;
  return add_aux(x, y_lo, y_hi);
}

function sub(self, param) {
  return sub_aux(self, param[1], param[0]);
}

function lsl_(x, numBits) {
  if (numBits === 0) {
    return x;
  }
  var lo = x[1];
  if (numBits >= 32) {
    return [
            (lo << (numBits - 32 | 0)),
            0
          ];
  } else {
    return [
            (lo >>> (32 - numBits | 0)) | (x[0] << numBits),
            ((lo << numBits) >>> 0)
          ];
  }
}

function lsr_(x, numBits) {
  if (numBits === 0) {
    return x;
  }
  var hi = x[0];
  var offset = numBits - 32 | 0;
  if (offset === 0) {
    return [
            0,
            (hi >>> 0)
          ];
  } else if (offset > 0) {
    return [
            0,
            (hi >>> offset)
          ];
  } else {
    return [
            (hi >>> numBits),
            (((hi << (-offset | 0)) | (x[1] >>> numBits)) >>> 0)
          ];
  }
}

function asr_(x, numBits) {
  if (numBits === 0) {
    return x;
  }
  var hi = x[0];
  if (numBits < 32) {
    return [
            (hi >> numBits),
            (((hi << (32 - numBits | 0)) | (x[1] >>> numBits)) >>> 0)
          ];
  } else {
    return [
            hi >= 0 ? 0 : -1,
            ((hi >> (numBits - 32 | 0)) >>> 0)
          ];
  }
}

function is_zero(param) {
  if (param[0] !== 0) {
    return false;
  } else {
    return param[1] === 0;
  }
}

function mul(_this, _other) {
  while(true) {
    var other = _other;
    var $$this = _this;
    var lo;
    var this_hi = $$this[0];
    var exit = 0;
    var exit$1 = 0;
    var exit$2 = 0;
    if (this_hi !== 0) {
      exit$2 = 4;
    } else {
      if ($$this[1] === 0) {
        return zero;
      }
      exit$2 = 4;
    }
    if (exit$2 === 4) {
      if (other[0] !== 0) {
        exit$1 = 3;
      } else {
        if (other[1] === 0) {
          return zero;
        }
        exit$1 = 3;
      }
    }
    if (exit$1 === 3) {
      if (this_hi !== -2147483648 || $$this[1] !== 0) {
        exit = 2;
      } else {
        lo = other[1];
      }
    }
    if (exit === 2) {
      var other_hi = other[0];
      var lo$1 = $$this[1];
      var exit$3 = 0;
      if (other_hi !== -2147483648 || other[1] !== 0) {
        exit$3 = 3;
      } else {
        lo = lo$1;
      }
      if (exit$3 === 3) {
        var other_lo = other[1];
        if (this_hi < 0) {
          if (other_hi >= 0) {
            return neg(mul(neg($$this), other));
          }
          _other = neg(other);
          _this = neg($$this);
          continue ;
        }
        if (other_hi < 0) {
          return neg(mul($$this, neg(other)));
        }
        var a48 = (this_hi >>> 16);
        var a32 = this_hi & 65535;
        var a16 = (lo$1 >>> 16);
        var a00 = lo$1 & 65535;
        var b48 = (other_hi >>> 16);
        var b32 = other_hi & 65535;
        var b16 = (other_lo >>> 16);
        var b00 = other_lo & 65535;
        var c48 = 0;
        var c32 = 0;
        var c16 = 0;
        var c00 = a00 * b00;
        c16 = (c00 >>> 16) + a16 * b00;
        c32 = (c16 >>> 16);
        c16 = (c16 & 65535) + a00 * b16;
        c32 = c32 + (c16 >>> 16) + a32 * b00;
        c48 = (c32 >>> 16);
        c32 = (c32 & 65535) + a16 * b16;
        c48 = c48 + (c32 >>> 16);
        c32 = (c32 & 65535) + a00 * b32;
        c48 = c48 + (c32 >>> 16);
        c32 = c32 & 65535;
        c48 = c48 + (a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48) & 65535;
        return [
                c32 | (c48 << 16),
                ((c00 & 65535 | ((c16 & 65535) << 16)) >>> 0)
              ];
      }
      
    }
    if ((lo & 1) === 0) {
      return zero;
    } else {
      return min_int;
    }
  };
}

function xor(param, param$1) {
  return [
          param[0] ^ param$1[0],
          ((param[1] ^ param$1[1]) >>> 0)
        ];
}

function or_(param, param$1) {
  return [
          param[0] | param$1[0],
          ((param[1] | param$1[1]) >>> 0)
        ];
}

function and_(param, param$1) {
  return [
          param[0] & param$1[0],
          ((param[1] & param$1[1]) >>> 0)
        ];
}

function ge(param, param$1) {
  var other_hi = param$1[0];
  var hi = param[0];
  if (hi > other_hi) {
    return true;
  } else if (hi < other_hi) {
    return false;
  } else {
    return param[1] >= param$1[1];
  }
}

function neq(x, y) {
  return !eq(x, y);
}

function lt(x, y) {
  return !ge(x, y);
}

function gt(x, y) {
  if (x[0] > y[0]) {
    return true;
  } else if (x[0] < y[0]) {
    return false;
  } else {
    return x[1] > y[1];
  }
}

function le(x, y) {
  return !gt(x, y);
}

function min(x, y) {
  if (ge(x, y)) {
    return y;
  } else {
    return x;
  }
}

function max(x, y) {
  if (gt(x, y)) {
    return x;
  } else {
    return y;
  }
}

function to_float(param) {
  return param[0] * 0x100000000 + param[1];
}

function of_float(x) {
  if (isNaN(x) || !isFinite(x)) {
    return zero;
  }
  if (x <= -9.22337203685477581e+18) {
    return min_int;
  }
  if (x + 1 >= 9.22337203685477581e+18) {
    return max_int;
  }
  if (x < 0) {
    return neg(of_float(-x));
  }
  var hi = x / 4294967296 | 0;
  var lo = x % 4294967296 | 0;
  return [
          hi,
          (lo >>> 0)
        ];
}

function isSafeInteger(param) {
  var hi = param[0];
  var top11Bits = (hi >> 21);
  if (top11Bits === 0) {
    return true;
  } else if (top11Bits === -1) {
    return !(param[1] === 0 && hi === -2097152);
  } else {
    return false;
  }
}

function to_string(self) {
  if (isSafeInteger(self)) {
    return String(to_float(self));
  }
  if (self[0] < 0) {
    if (eq(self, min_int)) {
      return "-9223372036854775808";
    } else {
      return "-" + to_string(neg(self));
    }
  }
  var approx_div1 = of_float(Math.floor(to_float(self) / 10));
  var lo = approx_div1[1];
  var hi = approx_div1[0];
  var match = sub_aux(sub_aux(self, (lo << 3), (lo >>> 29) | (hi << 3)), (lo << 1), (lo >>> 31) | (hi << 1));
  var rem_lo = match[1];
  var rem_hi = match[0];
  if (rem_lo === 0 && rem_hi === 0) {
    return to_string(approx_div1) + "0";
  }
  if (rem_hi < 0) {
    var rem_lo$1 = ((rem_lo ^ -1) + 1 >>> 0);
    var delta = Math.ceil(rem_lo$1 / 10);
    var remainder = 10 * delta - rem_lo$1;
    return to_string(sub_aux(approx_div1, delta | 0, 0)) + String(remainder | 0);
  }
  var delta$1 = Math.floor(rem_lo / 10);
  var remainder$1 = rem_lo - 10 * delta$1;
  return to_string(add_aux(approx_div1, delta$1 | 0, 0)) + String(remainder$1 | 0);
}

function div(_self, _other) {
  while(true) {
    var other = _other;
    var self = _self;
    var self_hi = self[0];
    var exit = 0;
    var exit$1 = 0;
    if (other[0] !== 0 || other[1] !== 0) {
      exit$1 = 2;
    } else {
      throw {
            RE_EXN_ID: "Division_by_zero",
            Error: new Error()
          };
    }
    if (exit$1 === 2) {
      if (self_hi !== -2147483648) {
        if (self_hi !== 0) {
          exit = 1;
        } else {
          if (self[1] === 0) {
            return zero;
          }
          exit = 1;
        }
      } else if (self[1] !== 0) {
        exit = 1;
      } else {
        if (eq(other, one) || eq(other, neg_one)) {
          return self;
        }
        if (eq(other, min_int)) {
          return one;
        }
        var half_this = asr_(self, 1);
        var approx = lsl_(div(half_this, other), 1);
        var exit$2 = 0;
        if (approx[0] !== 0) {
          exit$2 = 3;
        } else {
          if (approx[1] === 0) {
            if (other[0] < 0) {
              return one;
            } else {
              return neg(one);
            }
          }
          exit$2 = 3;
        }
        if (exit$2 === 3) {
          var rem = sub(self, mul(other, approx));
          return add(approx, div(rem, other));
        }
        
      }
    }
    if (exit === 1) {
      var other_hi = other[0];
      var exit$3 = 0;
      if (other_hi !== -2147483648) {
        exit$3 = 2;
      } else {
        if (other[1] === 0) {
          return zero;
        }
        exit$3 = 2;
      }
      if (exit$3 === 2) {
        if (self_hi < 0) {
          if (other_hi >= 0) {
            return neg(div(neg(self), other));
          }
          _other = neg(other);
          _self = neg(self);
          continue ;
        }
        if (other_hi < 0) {
          return neg(div(self, neg(other)));
        }
        var res = zero;
        var rem$1 = self;
        while(ge(rem$1, other)) {
          var b = Math.floor(to_float(rem$1) / to_float(other));
          var approx$1 = 1 > b ? 1 : b;
          var log2 = Math.ceil(Math.log(approx$1) / Math.LN2);
          var delta = log2 <= 48 ? 1 : Math.pow(2, log2 - 48);
          var approxRes = of_float(approx$1);
          var approxRem = mul(approxRes, other);
          while(approxRem[0] < 0 || gt(approxRem, rem$1)) {
            approx$1 = approx$1 - delta;
            approxRes = of_float(approx$1);
            approxRem = mul(approxRes, other);
          };
          if (is_zero(approxRes)) {
            approxRes = one;
          }
          res = add(res, approxRes);
          rem$1 = sub(rem$1, approxRem);
        };
        return res;
      }
      
    }
    
  };
}

function mod_(self, other) {
  return sub(self, mul(div(self, other), other));
}

function div_mod(self, other) {
  var quotient = div(self, other);
  return [
          quotient,
          sub(self, mul(quotient, other))
        ];
}

function compare(self, other) {
  var y = other[0];
  var x = self[0];
  var v = x < y ? -1 : (
      x === y ? 0 : 1
    );
  if (v !== 0) {
    return v;
  }
  var y$1 = other[1];
  var x$1 = self[1];
  if (x$1 < y$1) {
    return -1;
  } else if (x$1 === y$1) {
    return 0;
  } else {
    return 1;
  }
}

function of_int32(lo) {
  return [
          lo < 0 ? -1 : 0,
          (lo >>> 0)
        ];
}

function to_int32(x) {
  return x[1] | 0;
}

function to_hex(x) {
  var x_lo = x[1];
  var x_hi = x[0];
  var aux = function (v) {
    return (v >>> 0).toString(16);
  };
  if (x_hi === 0 && x_lo === 0) {
    return "0";
  }
  if (x_lo === 0) {
    return aux(x_hi) + "00000000";
  }
  if (x_hi === 0) {
    return aux(x_lo);
  }
  var lo = aux(x_lo);
  var pad = 8 - lo.length | 0;
  if (pad <= 0) {
    return aux(x_hi) + lo;
  } else {
    return aux(x_hi) + ("0".repeat(pad) + lo);
  }
}

function discard_sign(x) {
  return [
          2147483647 & x[0],
          x[1]
        ];
}

function float_of_bits(x) {
  return (function(lo,hi){ return (new Float64Array(new Int32Array([lo,hi]).buffer))[0]})(x[1], x[0]);
}

function bits_of_float(x) {
  var match = (function(x){return new Int32Array(new Float64Array([x]).buffer)})(x);
  return [
          match[1],
          (match[0] >>> 0)
        ];
}

exports.mk = mk;
exports.succ = succ;
exports.min_int = min_int;
exports.max_int = max_int;
exports.one = one;
exports.zero = zero;
exports.neg_one = neg_one;
exports.of_int32 = of_int32;
exports.to_int32 = to_int32;
exports.add = add;
exports.neg = neg;
exports.sub = sub;
exports.lsl_ = lsl_;
exports.lsr_ = lsr_;
exports.asr_ = asr_;
exports.is_zero = is_zero;
exports.mul = mul;
exports.xor = xor;
exports.or_ = or_;
exports.and_ = and_;
exports.ge = ge;
exports.eq = eq;
exports.neq = neq;
exports.lt = lt;
exports.gt = gt;
exports.le = le;
exports.equal_null = equal_null;
exports.equal_undefined = equal_undefined;
exports.equal_nullable = equal_nullable;
exports.min = min;
exports.max = max;
exports.to_float = to_float;
exports.of_float = of_float;
exports.div = div;
exports.mod_ = mod_;
exports.compare = compare;
exports.float_of_bits = float_of_bits;
exports.bits_of_float = bits_of_float;
exports.div_mod = div_mod;
exports.to_hex = to_hex;
exports.discard_sign = discard_sign;
exports.to_string = to_string;
/* No side effect */

},{}],8:[function(require,module,exports){
(function (process){(function (){
'use strict';


var stdout = {
  buffer: "",
  output: (function (param, s) {
      var v = s.length - 1 | 0;
      if (((typeof process !== "undefined") && process.stdout && process.stdout.write)) {
        return process.stdout.write(s);
      } else {
        if (s[v] === "\n") {
          console.log(s.slice(0, v));
        } else {
          console.log(s);
        }
        return ;
      }
    })
};

var stderr = {
  buffer: "",
  output: (function (param, s) {
      var v = s.length - 1 | 0;
      if (s[v] === "\n") {
        console.log(s.slice(0, v));
      } else {
        console.log(s);
      }
      
    })
};

function caml_ml_flush(oc) {
  if (oc.buffer !== "") {
    oc.output(oc, oc.buffer);
    oc.buffer = "";
    return ;
  }
  
}

function caml_ml_output(oc, str, offset, len) {
  var str$1 = offset === 0 && len === str.length ? str : str.slice(offset, len);
  if (((typeof process !== "undefined") && process.stdout && process.stdout.write) && oc === stdout) {
    return process.stdout.write(str$1);
  }
  var id = str$1.lastIndexOf("\n");
  if (id < 0) {
    oc.buffer = oc.buffer + str$1;
  } else {
    oc.buffer = oc.buffer + str$1.slice(0, id + 1 | 0);
    caml_ml_flush(oc);
    oc.buffer = oc.buffer + str$1.slice(id + 1 | 0);
  }
  
}

function caml_ml_output_char(oc, $$char) {
  return caml_ml_output(oc, String.fromCharCode($$char), 0, 1);
}

function caml_ml_out_channels_list(param) {
  return {
          hd: stdout,
          tl: {
            hd: stderr,
            tl: /* [] */0
          }
        };
}

var stdin;

exports.stdin = stdin;
exports.stdout = stdout;
exports.stderr = stderr;
exports.caml_ml_flush = caml_ml_flush;
exports.caml_ml_output = caml_ml_output;
exports.caml_ml_output_char = caml_ml_output_char;
exports.caml_ml_out_channels_list = caml_ml_out_channels_list;
/* No side effect */

}).call(this)}).call(this,require('_process'))
},{"_process":18}],9:[function(require,module,exports){
'use strict';

var Caml_option = require("./caml_option.js");
var Caml_exceptions = require("./caml_exceptions.js");

var $$Error = /* @__PURE__ */Caml_exceptions.create("Caml_js_exceptions.Error");

function internalToOCamlException(e) {
  if (Caml_exceptions.caml_is_extension(e)) {
    return e;
  } else {
    return {
            RE_EXN_ID: $$Error,
            _1: e
          };
  }
}

function caml_as_js_exn(exn) {
  if (exn.RE_EXN_ID === $$Error) {
    return Caml_option.some(exn._1);
  }
  
}

exports.$$Error = $$Error;
exports.internalToOCamlException = internalToOCamlException;
exports.caml_as_js_exn = caml_as_js_exn;
/* No side effect */

},{"./caml_exceptions.js":4,"./caml_option.js":11}],10:[function(require,module,exports){
'use strict';

var Caml_primitive = require("./caml_primitive.js");

var for_in = (function(o,foo){
        for (var x in o) { foo(x) }});

var caml_obj_dup = (function(x){
  if(Array.isArray(x)){
    var len = x.length  
    var v = new Array(len)
    for(var i = 0 ; i < len ; ++i){
      v[i] = x[i]
    }
    if(x.TAG !== undefined){
      v.TAG = x.TAG // TODO this can be removed eventually
    }  
    return v 
  } 
  return Object.assign({},x)    
});

var update_dummy = (function(x,y){
  var k  
  if(Array.isArray(y)){
    for(k = 0; k < y.length ; ++k){
      x[k] = y[k]
    }
    if(y.TAG !== undefined){
      x.TAG = y.TAG
    }
  } else {
    for (var k in y){
      x[k] = y[k]
    }
  }
});

function caml_compare(a, b) {
  if (a === b) {
    return 0;
  }
  var a_type = typeof a;
  var b_type = typeof b;
  switch (a_type) {
    case "boolean" :
        if (b_type === "boolean") {
          return Caml_primitive.caml_bool_compare(a, b);
        }
        break;
    case "function" :
        if (b_type === "function") {
          throw {
                RE_EXN_ID: "Invalid_argument",
                _1: "compare: functional value",
                Error: new Error()
              };
        }
        break;
    case "number" :
        if (b_type === "number") {
          return Caml_primitive.caml_int_compare(a, b);
        }
        break;
    case "string" :
        if (b_type === "string") {
          return Caml_primitive.caml_string_compare(a, b);
        } else {
          return 1;
        }
    case "undefined" :
        return -1;
    default:
      
  }
  switch (b_type) {
    case "string" :
        return -1;
    case "undefined" :
        return 1;
    default:
      if (a_type === "boolean") {
        return 1;
      }
      if (b_type === "boolean") {
        return -1;
      }
      if (a_type === "function") {
        return 1;
      }
      if (b_type === "function") {
        return -1;
      }
      if (a_type === "number") {
        if (b === null || b.BS_PRIVATE_NESTED_SOME_NONE !== undefined) {
          return 1;
        } else {
          return -1;
        }
      }
      if (b_type === "number") {
        if (a === null || a.BS_PRIVATE_NESTED_SOME_NONE !== undefined) {
          return -1;
        } else {
          return 1;
        }
      }
      if (a === null) {
        if (b.BS_PRIVATE_NESTED_SOME_NONE !== undefined) {
          return 1;
        } else {
          return -1;
        }
      }
      if (b === null) {
        if (a.BS_PRIVATE_NESTED_SOME_NONE !== undefined) {
          return -1;
        } else {
          return 1;
        }
      }
      if (a.BS_PRIVATE_NESTED_SOME_NONE !== undefined) {
        if (b.BS_PRIVATE_NESTED_SOME_NONE !== undefined) {
          return aux_obj_compare(a, b);
        } else {
          return -1;
        }
      }
      var tag_a = a.TAG | 0;
      var tag_b = b.TAG | 0;
      if (tag_a === 248) {
        return Caml_primitive.caml_int_compare(a[1], b[1]);
      }
      if (tag_a === 251) {
        throw {
              RE_EXN_ID: "Invalid_argument",
              _1: "equal: abstract value",
              Error: new Error()
            };
      }
      if (tag_a !== tag_b) {
        if (tag_a < tag_b) {
          return -1;
        } else {
          return 1;
        }
      }
      var len_a = a.length | 0;
      var len_b = b.length | 0;
      if (len_a === len_b) {
        if (Array.isArray(a)) {
          var _i = 0;
          while(true) {
            var i = _i;
            if (i === len_a) {
              return 0;
            }
            var res = caml_compare(a[i], b[i]);
            if (res !== 0) {
              return res;
            }
            _i = i + 1 | 0;
            continue ;
          };
        } else if ((a instanceof Date && b instanceof Date)) {
          return (a - b);
        } else {
          return aux_obj_compare(a, b);
        }
      } else if (len_a < len_b) {
        var _i$1 = 0;
        while(true) {
          var i$1 = _i$1;
          if (i$1 === len_a) {
            return -1;
          }
          var res$1 = caml_compare(a[i$1], b[i$1]);
          if (res$1 !== 0) {
            return res$1;
          }
          _i$1 = i$1 + 1 | 0;
          continue ;
        };
      } else {
        var _i$2 = 0;
        while(true) {
          var i$2 = _i$2;
          if (i$2 === len_b) {
            return 1;
          }
          var res$2 = caml_compare(a[i$2], b[i$2]);
          if (res$2 !== 0) {
            return res$2;
          }
          _i$2 = i$2 + 1 | 0;
          continue ;
        };
      }
  }
}

function aux_obj_compare(a, b) {
  var min_key_lhs = {
    contents: undefined
  };
  var min_key_rhs = {
    contents: undefined
  };
  var do_key = function (param, key) {
    var min_key = param[2];
    var b = param[1];
    if (!(!b.hasOwnProperty(key) || caml_compare(param[0][key], b[key]) > 0)) {
      return ;
    }
    var mk = min_key.contents;
    if (mk !== undefined && key >= mk) {
      return ;
    } else {
      min_key.contents = key;
      return ;
    }
  };
  var partial_arg = [
    a,
    b,
    min_key_rhs
  ];
  var do_key_a = function (param) {
    return do_key(partial_arg, param);
  };
  var partial_arg$1 = [
    b,
    a,
    min_key_lhs
  ];
  var do_key_b = function (param) {
    return do_key(partial_arg$1, param);
  };
  for_in(a, do_key_a);
  for_in(b, do_key_b);
  var match = min_key_lhs.contents;
  var match$1 = min_key_rhs.contents;
  if (match !== undefined) {
    if (match$1 !== undefined) {
      return Caml_primitive.caml_string_compare(match, match$1);
    } else {
      return -1;
    }
  } else if (match$1 !== undefined) {
    return 1;
  } else {
    return 0;
  }
}

function caml_equal(a, b) {
  if (a === b) {
    return true;
  }
  var a_type = typeof a;
  if (a_type === "string" || a_type === "number" || a_type === "boolean" || a_type === "undefined" || a === null) {
    return false;
  }
  var b_type = typeof b;
  if (a_type === "function" || b_type === "function") {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "equal: functional value",
          Error: new Error()
        };
  }
  if (b_type === "number" || b_type === "undefined" || b === null) {
    return false;
  }
  var tag_a = a.TAG | 0;
  var tag_b = b.TAG | 0;
  if (tag_a === 248) {
    return a[1] === b[1];
  }
  if (tag_a === 251) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "equal: abstract value",
          Error: new Error()
        };
  }
  if (tag_a !== tag_b) {
    return false;
  }
  var len_a = a.length | 0;
  var len_b = b.length | 0;
  if (len_a === len_b) {
    if (Array.isArray(a)) {
      var _i = 0;
      while(true) {
        var i = _i;
        if (i === len_a) {
          return true;
        }
        if (!caml_equal(a[i], b[i])) {
          return false;
        }
        _i = i + 1 | 0;
        continue ;
      };
    } else if ((a instanceof Date && b instanceof Date)) {
      return !(a > b || a < b);
    } else {
      var result = {
        contents: true
      };
      var do_key_a = function (key) {
        if (!b.hasOwnProperty(key)) {
          result.contents = false;
          return ;
        }
        
      };
      var do_key_b = function (key) {
        if (!a.hasOwnProperty(key) || !caml_equal(b[key], a[key])) {
          result.contents = false;
          return ;
        }
        
      };
      for_in(a, do_key_a);
      if (result.contents) {
        for_in(b, do_key_b);
      }
      return result.contents;
    }
  } else {
    return false;
  }
}

function caml_equal_null(x, y) {
  if (y !== null) {
    return caml_equal(x, y);
  } else {
    return x === y;
  }
}

function caml_equal_undefined(x, y) {
  if (y !== undefined) {
    return caml_equal(x, y);
  } else {
    return x === y;
  }
}

function caml_equal_nullable(x, y) {
  if (y == null) {
    return x === y;
  } else {
    return caml_equal(x, y);
  }
}

function caml_notequal(a, b) {
  return !caml_equal(a, b);
}

function caml_greaterequal(a, b) {
  return caml_compare(a, b) >= 0;
}

function caml_greaterthan(a, b) {
  return caml_compare(a, b) > 0;
}

function caml_lessequal(a, b) {
  return caml_compare(a, b) <= 0;
}

function caml_lessthan(a, b) {
  return caml_compare(a, b) < 0;
}

function caml_min(x, y) {
  if (caml_compare(x, y) <= 0) {
    return x;
  } else {
    return y;
  }
}

function caml_max(x, y) {
  if (caml_compare(x, y) >= 0) {
    return x;
  } else {
    return y;
  }
}

exports.caml_obj_dup = caml_obj_dup;
exports.update_dummy = update_dummy;
exports.caml_compare = caml_compare;
exports.caml_equal = caml_equal;
exports.caml_equal_null = caml_equal_null;
exports.caml_equal_undefined = caml_equal_undefined;
exports.caml_equal_nullable = caml_equal_nullable;
exports.caml_notequal = caml_notequal;
exports.caml_greaterequal = caml_greaterequal;
exports.caml_greaterthan = caml_greaterthan;
exports.caml_lessthan = caml_lessthan;
exports.caml_lessequal = caml_lessequal;
exports.caml_min = caml_min;
exports.caml_max = caml_max;
/* No side effect */

},{"./caml_primitive.js":12}],11:[function(require,module,exports){
'use strict';


function isNested(x) {
  return x.BS_PRIVATE_NESTED_SOME_NONE !== undefined;
}

function some(x) {
  if (x === undefined) {
    return {
            BS_PRIVATE_NESTED_SOME_NONE: 0
          };
  } else if (x !== null && x.BS_PRIVATE_NESTED_SOME_NONE !== undefined) {
    return {
            BS_PRIVATE_NESTED_SOME_NONE: x.BS_PRIVATE_NESTED_SOME_NONE + 1 | 0
          };
  } else {
    return x;
  }
}

function nullable_to_opt(x) {
  if (x == null) {
    return ;
  } else {
    return some(x);
  }
}

function undefined_to_opt(x) {
  if (x === undefined) {
    return ;
  } else {
    return some(x);
  }
}

function null_to_opt(x) {
  if (x === null) {
    return ;
  } else {
    return some(x);
  }
}

function valFromOption(x) {
  if (!(x !== null && x.BS_PRIVATE_NESTED_SOME_NONE !== undefined)) {
    return x;
  }
  var depth = x.BS_PRIVATE_NESTED_SOME_NONE;
  if (depth === 0) {
    return ;
  } else {
    return {
            BS_PRIVATE_NESTED_SOME_NONE: depth - 1 | 0
          };
  }
}

function option_get(x) {
  if (x === undefined) {
    return ;
  } else {
    return valFromOption(x);
  }
}

function option_unwrap(x) {
  if (x !== undefined) {
    return x.VAL;
  } else {
    return x;
  }
}

exports.nullable_to_opt = nullable_to_opt;
exports.undefined_to_opt = undefined_to_opt;
exports.null_to_opt = null_to_opt;
exports.valFromOption = valFromOption;
exports.some = some;
exports.isNested = isNested;
exports.option_get = option_get;
exports.option_unwrap = option_unwrap;
/* No side effect */

},{}],12:[function(require,module,exports){
'use strict';


function caml_int_compare(x, y) {
  if (x < y) {
    return -1;
  } else if (x === y) {
    return 0;
  } else {
    return 1;
  }
}

function caml_bool_compare(x, y) {
  if (x) {
    if (y) {
      return 0;
    } else {
      return 1;
    }
  } else if (y) {
    return -1;
  } else {
    return 0;
  }
}

function caml_float_compare(x, y) {
  if (x === y) {
    return 0;
  } else if (x < y) {
    return -1;
  } else if (x > y || x === x) {
    return 1;
  } else if (y === y) {
    return -1;
  } else {
    return 0;
  }
}

function caml_string_compare(s1, s2) {
  if (s1 === s2) {
    return 0;
  } else if (s1 < s2) {
    return -1;
  } else {
    return 1;
  }
}

function caml_bool_min(x, y) {
  if (x) {
    return y;
  } else {
    return x;
  }
}

function caml_int_min(x, y) {
  if (x < y) {
    return x;
  } else {
    return y;
  }
}

function caml_float_min(x, y) {
  if (x < y) {
    return x;
  } else {
    return y;
  }
}

function caml_string_min(x, y) {
  if (x < y) {
    return x;
  } else {
    return y;
  }
}

function caml_int32_min(x, y) {
  if (x < y) {
    return x;
  } else {
    return y;
  }
}

function caml_bool_max(x, y) {
  if (x) {
    return x;
  } else {
    return y;
  }
}

function caml_int_max(x, y) {
  if (x > y) {
    return x;
  } else {
    return y;
  }
}

function caml_float_max(x, y) {
  if (x > y) {
    return x;
  } else {
    return y;
  }
}

function caml_string_max(x, y) {
  if (x > y) {
    return x;
  } else {
    return y;
  }
}

function caml_int32_max(x, y) {
  if (x > y) {
    return x;
  } else {
    return y;
  }
}

var caml_int32_compare = caml_int_compare;

exports.caml_int_compare = caml_int_compare;
exports.caml_bool_compare = caml_bool_compare;
exports.caml_float_compare = caml_float_compare;
exports.caml_string_compare = caml_string_compare;
exports.caml_int32_compare = caml_int32_compare;
exports.caml_bool_min = caml_bool_min;
exports.caml_int_min = caml_int_min;
exports.caml_float_min = caml_float_min;
exports.caml_string_min = caml_string_min;
exports.caml_int32_min = caml_int32_min;
exports.caml_bool_max = caml_bool_max;
exports.caml_int_max = caml_int_max;
exports.caml_float_max = caml_float_max;
exports.caml_string_max = caml_string_max;
exports.caml_int32_max = caml_int32_max;
/* No side effect */

},{}],13:[function(require,module,exports){
'use strict';


function get(s, i) {
  if (i >= s.length || i < 0) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "index out of bounds",
          Error: new Error()
        };
  }
  return s.charCodeAt(i);
}

function make(n, ch) {
  return String.fromCharCode(ch).repeat(n);
}

exports.get = get;
exports.make = make;
/* No side effect */

},{}],14:[function(require,module,exports){
(function (process){(function (){
'use strict';


function caml_sys_getenv(s) {
  if (typeof process === "undefined" || process.env === undefined) {
    throw {
          RE_EXN_ID: "Not_found",
          Error: new Error()
        };
  }
  var x = process.env[s];
  if (x !== undefined) {
    return x;
  }
  throw {
        RE_EXN_ID: "Not_found",
        Error: new Error()
      };
}

var os_type = (function(_){
  if(typeof process !== 'undefined' && process.platform === 'win32'){
        return "Win32"    
  }
  else {
    return "Unix"
  }
});

function caml_sys_time(param) {
  if (typeof process === "undefined" || process.uptime === undefined) {
    return -1;
  } else {
    return process.uptime();
  }
}

function caml_sys_system_command(_cmd) {
  return 127;
}

var caml_sys_getcwd = (function(param){
    if (typeof process === "undefined" || process.cwd === undefined){
      return "/"  
    }
    return process.cwd()
  });

function caml_sys_get_argv(param) {
  if (typeof process === "undefined") {
    return [
            "",
            [""]
          ];
  }
  var argv = process.argv;
  if (argv == null) {
    return [
            "",
            [""]
          ];
  } else {
    return [
            argv[0],
            argv
          ];
  }
}

function caml_sys_exit(exit_code) {
  if (typeof process !== "undefined") {
    return process.exit(exit_code);
  }
  
}

function caml_sys_is_directory(_s) {
  throw {
        RE_EXN_ID: "Failure",
        _1: "caml_sys_is_directory not implemented",
        Error: new Error()
      };
}

function caml_sys_file_exists(_s) {
  throw {
        RE_EXN_ID: "Failure",
        _1: "caml_sys_file_exists not implemented",
        Error: new Error()
      };
}

exports.caml_sys_getenv = caml_sys_getenv;
exports.caml_sys_time = caml_sys_time;
exports.os_type = os_type;
exports.caml_sys_system_command = caml_sys_system_command;
exports.caml_sys_getcwd = caml_sys_getcwd;
exports.caml_sys_get_argv = caml_sys_get_argv;
exports.caml_sys_exit = caml_sys_exit;
exports.caml_sys_is_directory = caml_sys_is_directory;
exports.caml_sys_file_exists = caml_sys_file_exists;
/* No side effect */

}).call(this)}).call(this,require('_process'))
},{"_process":18}],15:[function(require,module,exports){
'use strict';

var Caml_array = require("./caml_array.js");

function app(_f, _args) {
  while(true) {
    var args = _args;
    var f = _f;
    var init_arity = f.length;
    var arity = init_arity === 0 ? 1 : init_arity;
    var len = args.length;
    var d = arity - len | 0;
    if (d === 0) {
      return f.apply(null, args);
    }
    if (d >= 0) {
      return (function(f,args){
      return function (x) {
        return app(f, args.concat([x]));
      }
      }(f,args));
    }
    _args = Caml_array.caml_array_sub(args, arity, -d | 0);
    _f = f.apply(null, Caml_array.caml_array_sub(args, 0, arity));
    continue ;
  };
}

function _1(o, a0) {
  var arity = o.length;
  if (arity === 1) {
    return o(a0);
  } else {
    switch (arity) {
      case 1 :
          return o(a0);
      case 2 :
          return function (param) {
            return o(a0, param);
          };
      case 3 :
          return function (param, param$1) {
            return o(a0, param, param$1);
          };
      case 4 :
          return function (param, param$1, param$2) {
            return o(a0, param, param$1, param$2);
          };
      case 5 :
          return function (param, param$1, param$2, param$3) {
            return o(a0, param, param$1, param$2, param$3);
          };
      case 6 :
          return function (param, param$1, param$2, param$3, param$4) {
            return o(a0, param, param$1, param$2, param$3, param$4);
          };
      case 7 :
          return function (param, param$1, param$2, param$3, param$4, param$5) {
            return o(a0, param, param$1, param$2, param$3, param$4, param$5);
          };
      default:
        return app(o, [a0]);
    }
  }
}

function __1(o) {
  var arity = o.length;
  if (arity === 1) {
    return o;
  } else {
    return function (a0) {
      return _1(o, a0);
    };
  }
}

function _2(o, a0, a1) {
  var arity = o.length;
  if (arity === 2) {
    return o(a0, a1);
  } else {
    switch (arity) {
      case 1 :
          return app(o(a0), [a1]);
      case 2 :
          return o(a0, a1);
      case 3 :
          return function (param) {
            return o(a0, a1, param);
          };
      case 4 :
          return function (param, param$1) {
            return o(a0, a1, param, param$1);
          };
      case 5 :
          return function (param, param$1, param$2) {
            return o(a0, a1, param, param$1, param$2);
          };
      case 6 :
          return function (param, param$1, param$2, param$3) {
            return o(a0, a1, param, param$1, param$2, param$3);
          };
      case 7 :
          return function (param, param$1, param$2, param$3, param$4) {
            return o(a0, a1, param, param$1, param$2, param$3, param$4);
          };
      default:
        return app(o, [
                    a0,
                    a1
                  ]);
    }
  }
}

function __2(o) {
  var arity = o.length;
  if (arity === 2) {
    return o;
  } else {
    return function (a0, a1) {
      return _2(o, a0, a1);
    };
  }
}

function _3(o, a0, a1, a2) {
  var arity = o.length;
  if (arity === 3) {
    return o(a0, a1, a2);
  } else {
    switch (arity) {
      case 1 :
          return app(o(a0), [
                      a1,
                      a2
                    ]);
      case 2 :
          return app(o(a0, a1), [a2]);
      case 3 :
          return o(a0, a1, a2);
      case 4 :
          return function (param) {
            return o(a0, a1, a2, param);
          };
      case 5 :
          return function (param, param$1) {
            return o(a0, a1, a2, param, param$1);
          };
      case 6 :
          return function (param, param$1, param$2) {
            return o(a0, a1, a2, param, param$1, param$2);
          };
      case 7 :
          return function (param, param$1, param$2, param$3) {
            return o(a0, a1, a2, param, param$1, param$2, param$3);
          };
      default:
        return app(o, [
                    a0,
                    a1,
                    a2
                  ]);
    }
  }
}

function __3(o) {
  var arity = o.length;
  if (arity === 3) {
    return o;
  } else {
    return function (a0, a1, a2) {
      return _3(o, a0, a1, a2);
    };
  }
}

function _4(o, a0, a1, a2, a3) {
  var arity = o.length;
  if (arity === 4) {
    return o(a0, a1, a2, a3);
  } else {
    switch (arity) {
      case 1 :
          return app(o(a0), [
                      a1,
                      a2,
                      a3
                    ]);
      case 2 :
          return app(o(a0, a1), [
                      a2,
                      a3
                    ]);
      case 3 :
          return app(o(a0, a1, a2), [a3]);
      case 4 :
          return o(a0, a1, a2, a3);
      case 5 :
          return function (param) {
            return o(a0, a1, a2, a3, param);
          };
      case 6 :
          return function (param, param$1) {
            return o(a0, a1, a2, a3, param, param$1);
          };
      case 7 :
          return function (param, param$1, param$2) {
            return o(a0, a1, a2, a3, param, param$1, param$2);
          };
      default:
        return app(o, [
                    a0,
                    a1,
                    a2,
                    a3
                  ]);
    }
  }
}

function __4(o) {
  var arity = o.length;
  if (arity === 4) {
    return o;
  } else {
    return function (a0, a1, a2, a3) {
      return _4(o, a0, a1, a2, a3);
    };
  }
}

function _5(o, a0, a1, a2, a3, a4) {
  var arity = o.length;
  if (arity === 5) {
    return o(a0, a1, a2, a3, a4);
  } else {
    switch (arity) {
      case 1 :
          return app(o(a0), [
                      a1,
                      a2,
                      a3,
                      a4
                    ]);
      case 2 :
          return app(o(a0, a1), [
                      a2,
                      a3,
                      a4
                    ]);
      case 3 :
          return app(o(a0, a1, a2), [
                      a3,
                      a4
                    ]);
      case 4 :
          return app(o(a0, a1, a2, a3), [a4]);
      case 5 :
          return o(a0, a1, a2, a3, a4);
      case 6 :
          return function (param) {
            return o(a0, a1, a2, a3, a4, param);
          };
      case 7 :
          return function (param, param$1) {
            return o(a0, a1, a2, a3, a4, param, param$1);
          };
      default:
        return app(o, [
                    a0,
                    a1,
                    a2,
                    a3,
                    a4
                  ]);
    }
  }
}

function __5(o) {
  var arity = o.length;
  if (arity === 5) {
    return o;
  } else {
    return function (a0, a1, a2, a3, a4) {
      return _5(o, a0, a1, a2, a3, a4);
    };
  }
}

function _6(o, a0, a1, a2, a3, a4, a5) {
  var arity = o.length;
  if (arity === 6) {
    return o(a0, a1, a2, a3, a4, a5);
  } else {
    switch (arity) {
      case 1 :
          return app(o(a0), [
                      a1,
                      a2,
                      a3,
                      a4,
                      a5
                    ]);
      case 2 :
          return app(o(a0, a1), [
                      a2,
                      a3,
                      a4,
                      a5
                    ]);
      case 3 :
          return app(o(a0, a1, a2), [
                      a3,
                      a4,
                      a5
                    ]);
      case 4 :
          return app(o(a0, a1, a2, a3), [
                      a4,
                      a5
                    ]);
      case 5 :
          return app(o(a0, a1, a2, a3, a4), [a5]);
      case 6 :
          return o(a0, a1, a2, a3, a4, a5);
      case 7 :
          return function (param) {
            return o(a0, a1, a2, a3, a4, a5, param);
          };
      default:
        return app(o, [
                    a0,
                    a1,
                    a2,
                    a3,
                    a4,
                    a5
                  ]);
    }
  }
}

function __6(o) {
  var arity = o.length;
  if (arity === 6) {
    return o;
  } else {
    return function (a0, a1, a2, a3, a4, a5) {
      return _6(o, a0, a1, a2, a3, a4, a5);
    };
  }
}

function _7(o, a0, a1, a2, a3, a4, a5, a6) {
  var arity = o.length;
  if (arity === 7) {
    return o(a0, a1, a2, a3, a4, a5, a6);
  } else {
    switch (arity) {
      case 1 :
          return app(o(a0), [
                      a1,
                      a2,
                      a3,
                      a4,
                      a5,
                      a6
                    ]);
      case 2 :
          return app(o(a0, a1), [
                      a2,
                      a3,
                      a4,
                      a5,
                      a6
                    ]);
      case 3 :
          return app(o(a0, a1, a2), [
                      a3,
                      a4,
                      a5,
                      a6
                    ]);
      case 4 :
          return app(o(a0, a1, a2, a3), [
                      a4,
                      a5,
                      a6
                    ]);
      case 5 :
          return app(o(a0, a1, a2, a3, a4), [
                      a5,
                      a6
                    ]);
      case 6 :
          return app(o(a0, a1, a2, a3, a4, a5), [a6]);
      case 7 :
          return o(a0, a1, a2, a3, a4, a5, a6);
      default:
        return app(o, [
                    a0,
                    a1,
                    a2,
                    a3,
                    a4,
                    a5,
                    a6
                  ]);
    }
  }
}

function __7(o) {
  var arity = o.length;
  if (arity === 7) {
    return o;
  } else {
    return function (a0, a1, a2, a3, a4, a5, a6) {
      return _7(o, a0, a1, a2, a3, a4, a5, a6);
    };
  }
}

function _8(o, a0, a1, a2, a3, a4, a5, a6, a7) {
  var arity = o.length;
  if (arity === 8) {
    return o(a0, a1, a2, a3, a4, a5, a6, a7);
  } else {
    switch (arity) {
      case 1 :
          return app(o(a0), [
                      a1,
                      a2,
                      a3,
                      a4,
                      a5,
                      a6,
                      a7
                    ]);
      case 2 :
          return app(o(a0, a1), [
                      a2,
                      a3,
                      a4,
                      a5,
                      a6,
                      a7
                    ]);
      case 3 :
          return app(o(a0, a1, a2), [
                      a3,
                      a4,
                      a5,
                      a6,
                      a7
                    ]);
      case 4 :
          return app(o(a0, a1, a2, a3), [
                      a4,
                      a5,
                      a6,
                      a7
                    ]);
      case 5 :
          return app(o(a0, a1, a2, a3, a4), [
                      a5,
                      a6,
                      a7
                    ]);
      case 6 :
          return app(o(a0, a1, a2, a3, a4, a5), [
                      a6,
                      a7
                    ]);
      case 7 :
          return app(o(a0, a1, a2, a3, a4, a5, a6), [a7]);
      default:
        return app(o, [
                    a0,
                    a1,
                    a2,
                    a3,
                    a4,
                    a5,
                    a6,
                    a7
                  ]);
    }
  }
}

function __8(o) {
  var arity = o.length;
  if (arity === 8) {
    return o;
  } else {
    return function (a0, a1, a2, a3, a4, a5, a6, a7) {
      return _8(o, a0, a1, a2, a3, a4, a5, a6, a7);
    };
  }
}

exports.app = app;
exports._1 = _1;
exports.__1 = __1;
exports._2 = _2;
exports.__2 = __2;
exports._3 = _3;
exports.__3 = __3;
exports._4 = _4;
exports.__4 = __4;
exports._5 = _5;
exports.__5 = __5;
exports._6 = _6;
exports.__6 = __6;
exports._7 = _7;
exports.__7 = __7;
exports._8 = _8;
exports.__8 = __8;
/* No side effect */

},{"./caml_array.js":2}],16:[function(require,module,exports){
'use strict';

var Curry = require("./curry.js");
var Caml_obj = require("./caml_obj.js");
var Pervasives = require("./pervasives.js");
var Caml_option = require("./caml_option.js");

function length(l) {
  var _len = 0;
  var _param = l;
  while(true) {
    var param = _param;
    var len = _len;
    if (!param) {
      return len;
    }
    _param = param.tl;
    _len = len + 1 | 0;
    continue ;
  };
}

function cons(a, l) {
  return {
          hd: a,
          tl: l
        };
}

function hd(param) {
  if (param) {
    return param.hd;
  }
  throw {
        RE_EXN_ID: "Failure",
        _1: "hd",
        Error: new Error()
      };
}

function tl(param) {
  if (param) {
    return param.tl;
  }
  throw {
        RE_EXN_ID: "Failure",
        _1: "tl",
        Error: new Error()
      };
}

function nth(l, n) {
  if (n < 0) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "List.nth",
          Error: new Error()
        };
  }
  var _l = l;
  var _n = n;
  while(true) {
    var n$1 = _n;
    var l$1 = _l;
    if (l$1) {
      if (n$1 === 0) {
        return l$1.hd;
      }
      _n = n$1 - 1 | 0;
      _l = l$1.tl;
      continue ;
    }
    throw {
          RE_EXN_ID: "Failure",
          _1: "nth",
          Error: new Error()
        };
  };
}

function nth_opt(l, n) {
  if (n < 0) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "List.nth",
          Error: new Error()
        };
  }
  var _l = l;
  var _n = n;
  while(true) {
    var n$1 = _n;
    var l$1 = _l;
    if (!l$1) {
      return ;
    }
    if (n$1 === 0) {
      return Caml_option.some(l$1.hd);
    }
    _n = n$1 - 1 | 0;
    _l = l$1.tl;
    continue ;
  };
}

function rev_append(_l1, _l2) {
  while(true) {
    var l2 = _l2;
    var l1 = _l1;
    if (!l1) {
      return l2;
    }
    _l2 = {
      hd: l1.hd,
      tl: l2
    };
    _l1 = l1.tl;
    continue ;
  };
}

function rev(l) {
  return rev_append(l, /* [] */0);
}

function init_tailrec_aux(_acc, _i, n, f) {
  while(true) {
    var i = _i;
    var acc = _acc;
    if (i >= n) {
      return acc;
    }
    _i = i + 1 | 0;
    _acc = {
      hd: Curry._1(f, i),
      tl: acc
    };
    continue ;
  };
}

function init_aux(i, n, f) {
  if (i >= n) {
    return /* [] */0;
  }
  var r = Curry._1(f, i);
  return {
          hd: r,
          tl: init_aux(i + 1 | 0, n, f)
        };
}

function init(len, f) {
  if (len < 0) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "List.init",
          Error: new Error()
        };
  }
  if (len > 10000) {
    return rev_append(init_tailrec_aux(/* [] */0, 0, len, f), /* [] */0);
  } else {
    return init_aux(0, len, f);
  }
}

function flatten(param) {
  if (param) {
    return Pervasives.$at(param.hd, flatten(param.tl));
  } else {
    return /* [] */0;
  }
}

function map(f, param) {
  if (!param) {
    return /* [] */0;
  }
  var r = Curry._1(f, param.hd);
  return {
          hd: r,
          tl: map(f, param.tl)
        };
}

function mapi(i, f, param) {
  if (!param) {
    return /* [] */0;
  }
  var r = Curry._2(f, i, param.hd);
  return {
          hd: r,
          tl: mapi(i + 1 | 0, f, param.tl)
        };
}

function mapi$1(f, l) {
  return mapi(0, f, l);
}

function rev_map(f, l) {
  var _accu = /* [] */0;
  var _param = l;
  while(true) {
    var param = _param;
    var accu = _accu;
    if (!param) {
      return accu;
    }
    _param = param.tl;
    _accu = {
      hd: Curry._1(f, param.hd),
      tl: accu
    };
    continue ;
  };
}

function iter(f, _param) {
  while(true) {
    var param = _param;
    if (!param) {
      return ;
    }
    Curry._1(f, param.hd);
    _param = param.tl;
    continue ;
  };
}

function iteri(f, l) {
  var _i = 0;
  var _param = l;
  while(true) {
    var param = _param;
    var i = _i;
    if (!param) {
      return ;
    }
    Curry._2(f, i, param.hd);
    _param = param.tl;
    _i = i + 1 | 0;
    continue ;
  };
}

function fold_left(f, _accu, _l) {
  while(true) {
    var l = _l;
    var accu = _accu;
    if (!l) {
      return accu;
    }
    _l = l.tl;
    _accu = Curry._2(f, accu, l.hd);
    continue ;
  };
}

function fold_right(f, l, accu) {
  if (l) {
    return Curry._2(f, l.hd, fold_right(f, l.tl, accu));
  } else {
    return accu;
  }
}

function map2(f, l1, l2) {
  if (l1) {
    if (l2) {
      var r = Curry._2(f, l1.hd, l2.hd);
      return {
              hd: r,
              tl: map2(f, l1.tl, l2.tl)
            };
    }
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "List.map2",
          Error: new Error()
        };
  }
  if (!l2) {
    return /* [] */0;
  }
  throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "List.map2",
        Error: new Error()
      };
}

function rev_map2(f, l1, l2) {
  var _accu = /* [] */0;
  var _l1 = l1;
  var _l2 = l2;
  while(true) {
    var l2$1 = _l2;
    var l1$1 = _l1;
    var accu = _accu;
    if (l1$1) {
      if (l2$1) {
        _l2 = l2$1.tl;
        _l1 = l1$1.tl;
        _accu = {
          hd: Curry._2(f, l1$1.hd, l2$1.hd),
          tl: accu
        };
        continue ;
      }
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "List.rev_map2",
            Error: new Error()
          };
    }
    if (l2$1) {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "List.rev_map2",
            Error: new Error()
          };
    }
    return accu;
  };
}

function iter2(f, _l1, _l2) {
  while(true) {
    var l2 = _l2;
    var l1 = _l1;
    if (l1) {
      if (l2) {
        Curry._2(f, l1.hd, l2.hd);
        _l2 = l2.tl;
        _l1 = l1.tl;
        continue ;
      }
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "List.iter2",
            Error: new Error()
          };
    }
    if (!l2) {
      return ;
    }
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "List.iter2",
          Error: new Error()
        };
  };
}

function fold_left2(f, _accu, _l1, _l2) {
  while(true) {
    var l2 = _l2;
    var l1 = _l1;
    var accu = _accu;
    if (l1) {
      if (l2) {
        _l2 = l2.tl;
        _l1 = l1.tl;
        _accu = Curry._3(f, accu, l1.hd, l2.hd);
        continue ;
      }
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "List.fold_left2",
            Error: new Error()
          };
    }
    if (l2) {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "List.fold_left2",
            Error: new Error()
          };
    }
    return accu;
  };
}

function fold_right2(f, l1, l2, accu) {
  if (l1) {
    if (l2) {
      return Curry._3(f, l1.hd, l2.hd, fold_right2(f, l1.tl, l2.tl, accu));
    }
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "List.fold_right2",
          Error: new Error()
        };
  }
  if (l2) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "List.fold_right2",
          Error: new Error()
        };
  }
  return accu;
}

function for_all(p, _param) {
  while(true) {
    var param = _param;
    if (!param) {
      return true;
    }
    if (!Curry._1(p, param.hd)) {
      return false;
    }
    _param = param.tl;
    continue ;
  };
}

function exists(p, _param) {
  while(true) {
    var param = _param;
    if (!param) {
      return false;
    }
    if (Curry._1(p, param.hd)) {
      return true;
    }
    _param = param.tl;
    continue ;
  };
}

function for_all2(p, _l1, _l2) {
  while(true) {
    var l2 = _l2;
    var l1 = _l1;
    if (l1) {
      if (l2) {
        if (!Curry._2(p, l1.hd, l2.hd)) {
          return false;
        }
        _l2 = l2.tl;
        _l1 = l1.tl;
        continue ;
      }
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "List.for_all2",
            Error: new Error()
          };
    }
    if (!l2) {
      return true;
    }
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "List.for_all2",
          Error: new Error()
        };
  };
}

function exists2(p, _l1, _l2) {
  while(true) {
    var l2 = _l2;
    var l1 = _l1;
    if (l1) {
      if (l2) {
        if (Curry._2(p, l1.hd, l2.hd)) {
          return true;
        }
        _l2 = l2.tl;
        _l1 = l1.tl;
        continue ;
      }
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "List.exists2",
            Error: new Error()
          };
    }
    if (!l2) {
      return false;
    }
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "List.exists2",
          Error: new Error()
        };
  };
}

function mem(x, _param) {
  while(true) {
    var param = _param;
    if (!param) {
      return false;
    }
    if (Caml_obj.caml_equal(param.hd, x)) {
      return true;
    }
    _param = param.tl;
    continue ;
  };
}

function memq(x, _param) {
  while(true) {
    var param = _param;
    if (!param) {
      return false;
    }
    if (param.hd === x) {
      return true;
    }
    _param = param.tl;
    continue ;
  };
}

function assoc(x, _param) {
  while(true) {
    var param = _param;
    if (param) {
      var match = param.hd;
      if (Caml_obj.caml_equal(match[0], x)) {
        return match[1];
      }
      _param = param.tl;
      continue ;
    }
    throw {
          RE_EXN_ID: "Not_found",
          Error: new Error()
        };
  };
}

function assoc_opt(x, _param) {
  while(true) {
    var param = _param;
    if (!param) {
      return ;
    }
    var match = param.hd;
    if (Caml_obj.caml_equal(match[0], x)) {
      return Caml_option.some(match[1]);
    }
    _param = param.tl;
    continue ;
  };
}

function assq(x, _param) {
  while(true) {
    var param = _param;
    if (param) {
      var match = param.hd;
      if (match[0] === x) {
        return match[1];
      }
      _param = param.tl;
      continue ;
    }
    throw {
          RE_EXN_ID: "Not_found",
          Error: new Error()
        };
  };
}

function assq_opt(x, _param) {
  while(true) {
    var param = _param;
    if (!param) {
      return ;
    }
    var match = param.hd;
    if (match[0] === x) {
      return Caml_option.some(match[1]);
    }
    _param = param.tl;
    continue ;
  };
}

function mem_assoc(x, _param) {
  while(true) {
    var param = _param;
    if (!param) {
      return false;
    }
    if (Caml_obj.caml_equal(param.hd[0], x)) {
      return true;
    }
    _param = param.tl;
    continue ;
  };
}

function mem_assq(x, _param) {
  while(true) {
    var param = _param;
    if (!param) {
      return false;
    }
    if (param.hd[0] === x) {
      return true;
    }
    _param = param.tl;
    continue ;
  };
}

function remove_assoc(x, param) {
  if (!param) {
    return /* [] */0;
  }
  var l = param.tl;
  var pair = param.hd;
  if (Caml_obj.caml_equal(pair[0], x)) {
    return l;
  } else {
    return {
            hd: pair,
            tl: remove_assoc(x, l)
          };
  }
}

function remove_assq(x, param) {
  if (!param) {
    return /* [] */0;
  }
  var l = param.tl;
  var pair = param.hd;
  if (pair[0] === x) {
    return l;
  } else {
    return {
            hd: pair,
            tl: remove_assq(x, l)
          };
  }
}

function find(p, _param) {
  while(true) {
    var param = _param;
    if (param) {
      var x = param.hd;
      if (Curry._1(p, x)) {
        return x;
      }
      _param = param.tl;
      continue ;
    }
    throw {
          RE_EXN_ID: "Not_found",
          Error: new Error()
        };
  };
}

function find_opt(p, _param) {
  while(true) {
    var param = _param;
    if (!param) {
      return ;
    }
    var x = param.hd;
    if (Curry._1(p, x)) {
      return Caml_option.some(x);
    }
    _param = param.tl;
    continue ;
  };
}

function find_all(p) {
  return function (param) {
    var _accu = /* [] */0;
    var _param = param;
    while(true) {
      var param$1 = _param;
      var accu = _accu;
      if (!param$1) {
        return rev_append(accu, /* [] */0);
      }
      var l = param$1.tl;
      var x = param$1.hd;
      if (Curry._1(p, x)) {
        _param = l;
        _accu = {
          hd: x,
          tl: accu
        };
        continue ;
      }
      _param = l;
      continue ;
    };
  };
}

function partition(p, l) {
  var _yes = /* [] */0;
  var _no = /* [] */0;
  var _param = l;
  while(true) {
    var param = _param;
    var no = _no;
    var yes = _yes;
    if (!param) {
      return [
              rev_append(yes, /* [] */0),
              rev_append(no, /* [] */0)
            ];
    }
    var l$1 = param.tl;
    var x = param.hd;
    if (Curry._1(p, x)) {
      _param = l$1;
      _yes = {
        hd: x,
        tl: yes
      };
      continue ;
    }
    _param = l$1;
    _no = {
      hd: x,
      tl: no
    };
    continue ;
  };
}

function split(param) {
  if (!param) {
    return [
            /* [] */0,
            /* [] */0
          ];
  }
  var match = param.hd;
  var match$1 = split(param.tl);
  return [
          {
            hd: match[0],
            tl: match$1[0]
          },
          {
            hd: match[1],
            tl: match$1[1]
          }
        ];
}

function combine(l1, l2) {
  if (l1) {
    if (l2) {
      return {
              hd: [
                l1.hd,
                l2.hd
              ],
              tl: combine(l1.tl, l2.tl)
            };
    }
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "List.combine",
          Error: new Error()
        };
  }
  if (!l2) {
    return /* [] */0;
  }
  throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "List.combine",
        Error: new Error()
      };
}

function merge(cmp, l1, l2) {
  if (!l1) {
    return l2;
  }
  if (!l2) {
    return l1;
  }
  var h2 = l2.hd;
  var h1 = l1.hd;
  if (Curry._2(cmp, h1, h2) <= 0) {
    return {
            hd: h1,
            tl: merge(cmp, l1.tl, l2)
          };
  } else {
    return {
            hd: h2,
            tl: merge(cmp, l1, l2.tl)
          };
  }
}

function chop(_k, _l) {
  while(true) {
    var l = _l;
    var k = _k;
    if (k === 0) {
      return l;
    }
    if (l) {
      _l = l.tl;
      _k = k - 1 | 0;
      continue ;
    }
    throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "list.ml",
            262,
            11
          ],
          Error: new Error()
        };
  };
}

function stable_sort(cmp, l) {
  var sort = function (n, l) {
    if (n !== 2) {
      if (n === 3 && l) {
        var match = l.tl;
        if (match) {
          var match$1 = match.tl;
          if (match$1) {
            var x3 = match$1.hd;
            var x2 = match.hd;
            var x1 = l.hd;
            if (Curry._2(cmp, x1, x2) <= 0) {
              if (Curry._2(cmp, x2, x3) <= 0) {
                return {
                        hd: x1,
                        tl: {
                          hd: x2,
                          tl: {
                            hd: x3,
                            tl: /* [] */0
                          }
                        }
                      };
              } else if (Curry._2(cmp, x1, x3) <= 0) {
                return {
                        hd: x1,
                        tl: {
                          hd: x3,
                          tl: {
                            hd: x2,
                            tl: /* [] */0
                          }
                        }
                      };
              } else {
                return {
                        hd: x3,
                        tl: {
                          hd: x1,
                          tl: {
                            hd: x2,
                            tl: /* [] */0
                          }
                        }
                      };
              }
            } else if (Curry._2(cmp, x1, x3) <= 0) {
              return {
                      hd: x2,
                      tl: {
                        hd: x1,
                        tl: {
                          hd: x3,
                          tl: /* [] */0
                        }
                      }
                    };
            } else if (Curry._2(cmp, x2, x3) <= 0) {
              return {
                      hd: x2,
                      tl: {
                        hd: x3,
                        tl: {
                          hd: x1,
                          tl: /* [] */0
                        }
                      }
                    };
            } else {
              return {
                      hd: x3,
                      tl: {
                        hd: x2,
                        tl: {
                          hd: x1,
                          tl: /* [] */0
                        }
                      }
                    };
            }
          }
          
        }
        
      }
      
    } else if (l) {
      var match$2 = l.tl;
      if (match$2) {
        var x2$1 = match$2.hd;
        var x1$1 = l.hd;
        if (Curry._2(cmp, x1$1, x2$1) <= 0) {
          return {
                  hd: x1$1,
                  tl: {
                    hd: x2$1,
                    tl: /* [] */0
                  }
                };
        } else {
          return {
                  hd: x2$1,
                  tl: {
                    hd: x1$1,
                    tl: /* [] */0
                  }
                };
        }
      }
      
    }
    var n1 = (n >> 1);
    var n2 = n - n1 | 0;
    var l2 = chop(n1, l);
    var s1 = rev_sort(n1, l);
    var s2 = rev_sort(n2, l2);
    var _l1 = s1;
    var _l2 = s2;
    var _accu = /* [] */0;
    while(true) {
      var accu = _accu;
      var l2$1 = _l2;
      var l1 = _l1;
      if (!l1) {
        return rev_append(l2$1, accu);
      }
      if (!l2$1) {
        return rev_append(l1, accu);
      }
      var h2 = l2$1.hd;
      var h1 = l1.hd;
      if (Curry._2(cmp, h1, h2) > 0) {
        _accu = {
          hd: h1,
          tl: accu
        };
        _l1 = l1.tl;
        continue ;
      }
      _accu = {
        hd: h2,
        tl: accu
      };
      _l2 = l2$1.tl;
      continue ;
    };
  };
  var rev_sort = function (n, l) {
    if (n !== 2) {
      if (n === 3 && l) {
        var match = l.tl;
        if (match) {
          var match$1 = match.tl;
          if (match$1) {
            var x3 = match$1.hd;
            var x2 = match.hd;
            var x1 = l.hd;
            if (Curry._2(cmp, x1, x2) > 0) {
              if (Curry._2(cmp, x2, x3) > 0) {
                return {
                        hd: x1,
                        tl: {
                          hd: x2,
                          tl: {
                            hd: x3,
                            tl: /* [] */0
                          }
                        }
                      };
              } else if (Curry._2(cmp, x1, x3) > 0) {
                return {
                        hd: x1,
                        tl: {
                          hd: x3,
                          tl: {
                            hd: x2,
                            tl: /* [] */0
                          }
                        }
                      };
              } else {
                return {
                        hd: x3,
                        tl: {
                          hd: x1,
                          tl: {
                            hd: x2,
                            tl: /* [] */0
                          }
                        }
                      };
              }
            } else if (Curry._2(cmp, x1, x3) > 0) {
              return {
                      hd: x2,
                      tl: {
                        hd: x1,
                        tl: {
                          hd: x3,
                          tl: /* [] */0
                        }
                      }
                    };
            } else if (Curry._2(cmp, x2, x3) > 0) {
              return {
                      hd: x2,
                      tl: {
                        hd: x3,
                        tl: {
                          hd: x1,
                          tl: /* [] */0
                        }
                      }
                    };
            } else {
              return {
                      hd: x3,
                      tl: {
                        hd: x2,
                        tl: {
                          hd: x1,
                          tl: /* [] */0
                        }
                      }
                    };
            }
          }
          
        }
        
      }
      
    } else if (l) {
      var match$2 = l.tl;
      if (match$2) {
        var x2$1 = match$2.hd;
        var x1$1 = l.hd;
        if (Curry._2(cmp, x1$1, x2$1) > 0) {
          return {
                  hd: x1$1,
                  tl: {
                    hd: x2$1,
                    tl: /* [] */0
                  }
                };
        } else {
          return {
                  hd: x2$1,
                  tl: {
                    hd: x1$1,
                    tl: /* [] */0
                  }
                };
        }
      }
      
    }
    var n1 = (n >> 1);
    var n2 = n - n1 | 0;
    var l2 = chop(n1, l);
    var s1 = sort(n1, l);
    var s2 = sort(n2, l2);
    var _l1 = s1;
    var _l2 = s2;
    var _accu = /* [] */0;
    while(true) {
      var accu = _accu;
      var l2$1 = _l2;
      var l1 = _l1;
      if (!l1) {
        return rev_append(l2$1, accu);
      }
      if (!l2$1) {
        return rev_append(l1, accu);
      }
      var h2 = l2$1.hd;
      var h1 = l1.hd;
      if (Curry._2(cmp, h1, h2) <= 0) {
        _accu = {
          hd: h1,
          tl: accu
        };
        _l1 = l1.tl;
        continue ;
      }
      _accu = {
        hd: h2,
        tl: accu
      };
      _l2 = l2$1.tl;
      continue ;
    };
  };
  var len = length(l);
  if (len < 2) {
    return l;
  } else {
    return sort(len, l);
  }
}

function sort_uniq(cmp, l) {
  var sort = function (n, l) {
    if (n !== 2) {
      if (n === 3 && l) {
        var match = l.tl;
        if (match) {
          var match$1 = match.tl;
          if (match$1) {
            var x3 = match$1.hd;
            var x2 = match.hd;
            var x1 = l.hd;
            var c = Curry._2(cmp, x1, x2);
            if (c === 0) {
              var c$1 = Curry._2(cmp, x2, x3);
              if (c$1 === 0) {
                return {
                        hd: x2,
                        tl: /* [] */0
                      };
              } else if (c$1 < 0) {
                return {
                        hd: x2,
                        tl: {
                          hd: x3,
                          tl: /* [] */0
                        }
                      };
              } else {
                return {
                        hd: x3,
                        tl: {
                          hd: x2,
                          tl: /* [] */0
                        }
                      };
              }
            }
            if (c < 0) {
              var c$2 = Curry._2(cmp, x2, x3);
              if (c$2 === 0) {
                return {
                        hd: x1,
                        tl: {
                          hd: x2,
                          tl: /* [] */0
                        }
                      };
              }
              if (c$2 < 0) {
                return {
                        hd: x1,
                        tl: {
                          hd: x2,
                          tl: {
                            hd: x3,
                            tl: /* [] */0
                          }
                        }
                      };
              }
              var c$3 = Curry._2(cmp, x1, x3);
              if (c$3 === 0) {
                return {
                        hd: x1,
                        tl: {
                          hd: x2,
                          tl: /* [] */0
                        }
                      };
              } else if (c$3 < 0) {
                return {
                        hd: x1,
                        tl: {
                          hd: x3,
                          tl: {
                            hd: x2,
                            tl: /* [] */0
                          }
                        }
                      };
              } else {
                return {
                        hd: x3,
                        tl: {
                          hd: x1,
                          tl: {
                            hd: x2,
                            tl: /* [] */0
                          }
                        }
                      };
              }
            }
            var c$4 = Curry._2(cmp, x1, x3);
            if (c$4 === 0) {
              return {
                      hd: x2,
                      tl: {
                        hd: x1,
                        tl: /* [] */0
                      }
                    };
            }
            if (c$4 < 0) {
              return {
                      hd: x2,
                      tl: {
                        hd: x1,
                        tl: {
                          hd: x3,
                          tl: /* [] */0
                        }
                      }
                    };
            }
            var c$5 = Curry._2(cmp, x2, x3);
            if (c$5 === 0) {
              return {
                      hd: x2,
                      tl: {
                        hd: x1,
                        tl: /* [] */0
                      }
                    };
            } else if (c$5 < 0) {
              return {
                      hd: x2,
                      tl: {
                        hd: x3,
                        tl: {
                          hd: x1,
                          tl: /* [] */0
                        }
                      }
                    };
            } else {
              return {
                      hd: x3,
                      tl: {
                        hd: x2,
                        tl: {
                          hd: x1,
                          tl: /* [] */0
                        }
                      }
                    };
            }
          }
          
        }
        
      }
      
    } else if (l) {
      var match$2 = l.tl;
      if (match$2) {
        var x2$1 = match$2.hd;
        var x1$1 = l.hd;
        var c$6 = Curry._2(cmp, x1$1, x2$1);
        if (c$6 === 0) {
          return {
                  hd: x1$1,
                  tl: /* [] */0
                };
        } else if (c$6 < 0) {
          return {
                  hd: x1$1,
                  tl: {
                    hd: x2$1,
                    tl: /* [] */0
                  }
                };
        } else {
          return {
                  hd: x2$1,
                  tl: {
                    hd: x1$1,
                    tl: /* [] */0
                  }
                };
        }
      }
      
    }
    var n1 = (n >> 1);
    var n2 = n - n1 | 0;
    var l2 = chop(n1, l);
    var s1 = rev_sort(n1, l);
    var s2 = rev_sort(n2, l2);
    var _l1 = s1;
    var _l2 = s2;
    var _accu = /* [] */0;
    while(true) {
      var accu = _accu;
      var l2$1 = _l2;
      var l1 = _l1;
      if (!l1) {
        return rev_append(l2$1, accu);
      }
      if (!l2$1) {
        return rev_append(l1, accu);
      }
      var t2 = l2$1.tl;
      var h2 = l2$1.hd;
      var t1 = l1.tl;
      var h1 = l1.hd;
      var c$7 = Curry._2(cmp, h1, h2);
      if (c$7 === 0) {
        _accu = {
          hd: h1,
          tl: accu
        };
        _l2 = t2;
        _l1 = t1;
        continue ;
      }
      if (c$7 > 0) {
        _accu = {
          hd: h1,
          tl: accu
        };
        _l1 = t1;
        continue ;
      }
      _accu = {
        hd: h2,
        tl: accu
      };
      _l2 = t2;
      continue ;
    };
  };
  var rev_sort = function (n, l) {
    if (n !== 2) {
      if (n === 3 && l) {
        var match = l.tl;
        if (match) {
          var match$1 = match.tl;
          if (match$1) {
            var x3 = match$1.hd;
            var x2 = match.hd;
            var x1 = l.hd;
            var c = Curry._2(cmp, x1, x2);
            if (c === 0) {
              var c$1 = Curry._2(cmp, x2, x3);
              if (c$1 === 0) {
                return {
                        hd: x2,
                        tl: /* [] */0
                      };
              } else if (c$1 > 0) {
                return {
                        hd: x2,
                        tl: {
                          hd: x3,
                          tl: /* [] */0
                        }
                      };
              } else {
                return {
                        hd: x3,
                        tl: {
                          hd: x2,
                          tl: /* [] */0
                        }
                      };
              }
            }
            if (c > 0) {
              var c$2 = Curry._2(cmp, x2, x3);
              if (c$2 === 0) {
                return {
                        hd: x1,
                        tl: {
                          hd: x2,
                          tl: /* [] */0
                        }
                      };
              }
              if (c$2 > 0) {
                return {
                        hd: x1,
                        tl: {
                          hd: x2,
                          tl: {
                            hd: x3,
                            tl: /* [] */0
                          }
                        }
                      };
              }
              var c$3 = Curry._2(cmp, x1, x3);
              if (c$3 === 0) {
                return {
                        hd: x1,
                        tl: {
                          hd: x2,
                          tl: /* [] */0
                        }
                      };
              } else if (c$3 > 0) {
                return {
                        hd: x1,
                        tl: {
                          hd: x3,
                          tl: {
                            hd: x2,
                            tl: /* [] */0
                          }
                        }
                      };
              } else {
                return {
                        hd: x3,
                        tl: {
                          hd: x1,
                          tl: {
                            hd: x2,
                            tl: /* [] */0
                          }
                        }
                      };
              }
            }
            var c$4 = Curry._2(cmp, x1, x3);
            if (c$4 === 0) {
              return {
                      hd: x2,
                      tl: {
                        hd: x1,
                        tl: /* [] */0
                      }
                    };
            }
            if (c$4 > 0) {
              return {
                      hd: x2,
                      tl: {
                        hd: x1,
                        tl: {
                          hd: x3,
                          tl: /* [] */0
                        }
                      }
                    };
            }
            var c$5 = Curry._2(cmp, x2, x3);
            if (c$5 === 0) {
              return {
                      hd: x2,
                      tl: {
                        hd: x1,
                        tl: /* [] */0
                      }
                    };
            } else if (c$5 > 0) {
              return {
                      hd: x2,
                      tl: {
                        hd: x3,
                        tl: {
                          hd: x1,
                          tl: /* [] */0
                        }
                      }
                    };
            } else {
              return {
                      hd: x3,
                      tl: {
                        hd: x2,
                        tl: {
                          hd: x1,
                          tl: /* [] */0
                        }
                      }
                    };
            }
          }
          
        }
        
      }
      
    } else if (l) {
      var match$2 = l.tl;
      if (match$2) {
        var x2$1 = match$2.hd;
        var x1$1 = l.hd;
        var c$6 = Curry._2(cmp, x1$1, x2$1);
        if (c$6 === 0) {
          return {
                  hd: x1$1,
                  tl: /* [] */0
                };
        } else if (c$6 > 0) {
          return {
                  hd: x1$1,
                  tl: {
                    hd: x2$1,
                    tl: /* [] */0
                  }
                };
        } else {
          return {
                  hd: x2$1,
                  tl: {
                    hd: x1$1,
                    tl: /* [] */0
                  }
                };
        }
      }
      
    }
    var n1 = (n >> 1);
    var n2 = n - n1 | 0;
    var l2 = chop(n1, l);
    var s1 = sort(n1, l);
    var s2 = sort(n2, l2);
    var _l1 = s1;
    var _l2 = s2;
    var _accu = /* [] */0;
    while(true) {
      var accu = _accu;
      var l2$1 = _l2;
      var l1 = _l1;
      if (!l1) {
        return rev_append(l2$1, accu);
      }
      if (!l2$1) {
        return rev_append(l1, accu);
      }
      var t2 = l2$1.tl;
      var h2 = l2$1.hd;
      var t1 = l1.tl;
      var h1 = l1.hd;
      var c$7 = Curry._2(cmp, h1, h2);
      if (c$7 === 0) {
        _accu = {
          hd: h1,
          tl: accu
        };
        _l2 = t2;
        _l1 = t1;
        continue ;
      }
      if (c$7 < 0) {
        _accu = {
          hd: h1,
          tl: accu
        };
        _l1 = t1;
        continue ;
      }
      _accu = {
        hd: h2,
        tl: accu
      };
      _l2 = t2;
      continue ;
    };
  };
  var len = length(l);
  if (len < 2) {
    return l;
  } else {
    return sort(len, l);
  }
}

function compare_lengths(_l1, _l2) {
  while(true) {
    var l2 = _l2;
    var l1 = _l1;
    if (!l1) {
      if (l2) {
        return -1;
      } else {
        return 0;
      }
    }
    if (!l2) {
      return 1;
    }
    _l2 = l2.tl;
    _l1 = l1.tl;
    continue ;
  };
}

function compare_length_with(_l, _n) {
  while(true) {
    var n = _n;
    var l = _l;
    if (!l) {
      if (n === 0) {
        return 0;
      } else if (n > 0) {
        return -1;
      } else {
        return 1;
      }
    }
    if (n <= 0) {
      return 1;
    }
    _n = n - 1 | 0;
    _l = l.tl;
    continue ;
  };
}

var append = Pervasives.$at;

var concat = flatten;

var filter = find_all;

var sort = stable_sort;

var fast_sort = stable_sort;

exports.length = length;
exports.compare_lengths = compare_lengths;
exports.compare_length_with = compare_length_with;
exports.cons = cons;
exports.hd = hd;
exports.tl = tl;
exports.nth = nth;
exports.nth_opt = nth_opt;
exports.rev = rev;
exports.init = init;
exports.append = append;
exports.rev_append = rev_append;
exports.concat = concat;
exports.flatten = flatten;
exports.iter = iter;
exports.iteri = iteri;
exports.map = map;
exports.mapi = mapi$1;
exports.rev_map = rev_map;
exports.fold_left = fold_left;
exports.fold_right = fold_right;
exports.iter2 = iter2;
exports.map2 = map2;
exports.rev_map2 = rev_map2;
exports.fold_left2 = fold_left2;
exports.fold_right2 = fold_right2;
exports.for_all = for_all;
exports.exists = exists;
exports.for_all2 = for_all2;
exports.exists2 = exists2;
exports.mem = mem;
exports.memq = memq;
exports.find = find;
exports.find_opt = find_opt;
exports.filter = filter;
exports.find_all = find_all;
exports.partition = partition;
exports.assoc = assoc;
exports.assoc_opt = assoc_opt;
exports.assq = assq;
exports.assq_opt = assq_opt;
exports.mem_assoc = mem_assoc;
exports.mem_assq = mem_assq;
exports.remove_assoc = remove_assoc;
exports.remove_assq = remove_assq;
exports.split = split;
exports.combine = combine;
exports.sort = sort;
exports.stable_sort = stable_sort;
exports.fast_sort = fast_sort;
exports.sort_uniq = sort_uniq;
exports.merge = merge;
/* No side effect */

},{"./caml_obj.js":10,"./caml_option.js":11,"./curry.js":15,"./pervasives.js":17}],17:[function(require,module,exports){
'use strict';

var Curry = require("./curry.js");
var Caml_io = require("./caml_io.js");
var Caml_sys = require("./caml_sys.js");
var Caml_bytes = require("./caml_bytes.js");
var Caml_format = require("./caml_format.js");
var Caml_string = require("./caml_string.js");
var Caml_exceptions = require("./caml_exceptions.js");
var Caml_js_exceptions = require("./caml_js_exceptions.js");
var Caml_external_polyfill = require("./caml_external_polyfill.js");

function failwith(s) {
  throw {
        RE_EXN_ID: "Failure",
        _1: s,
        Error: new Error()
      };
}

function invalid_arg(s) {
  throw {
        RE_EXN_ID: "Invalid_argument",
        _1: s,
        Error: new Error()
      };
}

var Exit = /* @__PURE__ */Caml_exceptions.create("Pervasives.Exit");

function abs(x) {
  if (x >= 0) {
    return x;
  } else {
    return -x | 0;
  }
}

function lnot(x) {
  return x ^ -1;
}

var min_int = -2147483648;

function classify_float(x) {
  if (isFinite(x)) {
    if (Math.abs(x) >= 2.22507385850720138e-308) {
      return /* FP_normal */0;
    } else if (x !== 0) {
      return /* FP_subnormal */1;
    } else {
      return /* FP_zero */2;
    }
  } else if (isNaN(x)) {
    return /* FP_nan */4;
  } else {
    return /* FP_infinite */3;
  }
}

function char_of_int(n) {
  if (n < 0 || n > 255) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "char_of_int",
          Error: new Error()
        };
  }
  return n;
}

function string_of_bool(b) {
  if (b) {
    return "true";
  } else {
    return "false";
  }
}

function bool_of_string(param) {
  switch (param) {
    case "false" :
        return false;
    case "true" :
        return true;
    default:
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "bool_of_string",
            Error: new Error()
          };
  }
}

function bool_of_string_opt(param) {
  switch (param) {
    case "false" :
        return false;
    case "true" :
        return true;
    default:
      return ;
  }
}

function int_of_string_opt(s) {
  try {
    return Caml_format.caml_int_of_string(s);
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === "Failure") {
      return ;
    }
    throw exn;
  }
}

function valid_float_lexem(s) {
  var l = s.length;
  var _i = 0;
  while(true) {
    var i = _i;
    if (i >= l) {
      return s + ".";
    }
    var match = Caml_string.get(s, i);
    if (match >= 48) {
      if (match >= 58) {
        return s;
      }
      _i = i + 1 | 0;
      continue ;
    }
    if (match !== 45) {
      return s;
    }
    _i = i + 1 | 0;
    continue ;
  };
}

function string_of_float(f) {
  return valid_float_lexem(Caml_format.caml_format_float("%.12g", f));
}

function float_of_string_opt(s) {
  try {
    return Caml_format.caml_float_of_string(s);
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === "Failure") {
      return ;
    }
    throw exn;
  }
}

function $at(l1, l2) {
  if (l1) {
    return {
            hd: l1.hd,
            tl: $at(l1.tl, l2)
          };
  } else {
    return l2;
  }
}

var stdin = Caml_io.stdin;

var stdout = Caml_io.stdout;

var stderr = Caml_io.stderr;

function open_out_gen(mode, perm, name) {
  var c = Caml_external_polyfill.resolve("caml_ml_open_descriptor_out")(Caml_external_polyfill.resolve("caml_sys_open")(name, mode, perm));
  Caml_external_polyfill.resolve("caml_ml_set_channel_name")(c, name);
  return c;
}

function open_out(name) {
  return open_out_gen({
              hd: /* Open_wronly */1,
              tl: {
                hd: /* Open_creat */3,
                tl: {
                  hd: /* Open_trunc */4,
                  tl: {
                    hd: /* Open_text */7,
                    tl: /* [] */0
                  }
                }
              }
            }, 438, name);
}

function open_out_bin(name) {
  return open_out_gen({
              hd: /* Open_wronly */1,
              tl: {
                hd: /* Open_creat */3,
                tl: {
                  hd: /* Open_trunc */4,
                  tl: {
                    hd: /* Open_binary */6,
                    tl: /* [] */0
                  }
                }
              }
            }, 438, name);
}

function flush_all(param) {
  var _param = Caml_io.caml_ml_out_channels_list(undefined);
  while(true) {
    var param$1 = _param;
    if (!param$1) {
      return ;
    }
    try {
      Caml_io.caml_ml_flush(param$1.hd);
    }
    catch (raw_exn){
      var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
      if (exn.RE_EXN_ID !== "Sys_error") {
        throw exn;
      }
      
    }
    _param = param$1.tl;
    continue ;
  };
}

function output_bytes(oc, s) {
  return Caml_external_polyfill.resolve("caml_ml_output_bytes")(oc, s, 0, s.length);
}

function output_string(oc, s) {
  return Caml_io.caml_ml_output(oc, s, 0, s.length);
}

function output(oc, s, ofs, len) {
  if (ofs < 0 || len < 0 || ofs > (s.length - len | 0)) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "output",
          Error: new Error()
        };
  }
  return Caml_external_polyfill.resolve("caml_ml_output_bytes")(oc, s, ofs, len);
}

function output_substring(oc, s, ofs, len) {
  if (ofs < 0 || len < 0 || ofs > (s.length - len | 0)) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "output_substring",
          Error: new Error()
        };
  }
  return Caml_io.caml_ml_output(oc, s, ofs, len);
}

function output_value(chan, v) {
  return Caml_external_polyfill.resolve("caml_output_value")(chan, v, /* [] */0);
}

function close_out(oc) {
  Caml_io.caml_ml_flush(oc);
  return Caml_external_polyfill.resolve("caml_ml_close_channel")(oc);
}

function close_out_noerr(oc) {
  try {
    Caml_io.caml_ml_flush(oc);
  }
  catch (exn){
    
  }
  try {
    return Caml_external_polyfill.resolve("caml_ml_close_channel")(oc);
  }
  catch (exn$1){
    return ;
  }
}

function open_in_gen(mode, perm, name) {
  var c = Caml_external_polyfill.resolve("caml_ml_open_descriptor_in")(Caml_external_polyfill.resolve("caml_sys_open")(name, mode, perm));
  Caml_external_polyfill.resolve("caml_ml_set_channel_name")(c, name);
  return c;
}

function open_in(name) {
  return open_in_gen({
              hd: /* Open_rdonly */0,
              tl: {
                hd: /* Open_text */7,
                tl: /* [] */0
              }
            }, 0, name);
}

function open_in_bin(name) {
  return open_in_gen({
              hd: /* Open_rdonly */0,
              tl: {
                hd: /* Open_binary */6,
                tl: /* [] */0
              }
            }, 0, name);
}

function input(ic, s, ofs, len) {
  if (ofs < 0 || len < 0 || ofs > (s.length - len | 0)) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "input",
          Error: new Error()
        };
  }
  return Caml_external_polyfill.resolve("caml_ml_input")(ic, s, ofs, len);
}

function unsafe_really_input(ic, s, _ofs, _len) {
  while(true) {
    var len = _len;
    var ofs = _ofs;
    if (len <= 0) {
      return ;
    }
    var r = Caml_external_polyfill.resolve("caml_ml_input")(ic, s, ofs, len);
    if (r === 0) {
      throw {
            RE_EXN_ID: "End_of_file",
            Error: new Error()
          };
    }
    _len = len - r | 0;
    _ofs = ofs + r | 0;
    continue ;
  };
}

function really_input(ic, s, ofs, len) {
  if (ofs < 0 || len < 0 || ofs > (s.length - len | 0)) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "really_input",
          Error: new Error()
        };
  }
  return unsafe_really_input(ic, s, ofs, len);
}

function really_input_string(ic, len) {
  var s = Caml_bytes.caml_create_bytes(len);
  really_input(ic, s, 0, len);
  return Caml_bytes.bytes_to_string(s);
}

function input_line(chan) {
  var build_result = function (buf, _pos, _param) {
    while(true) {
      var param = _param;
      var pos = _pos;
      if (!param) {
        return buf;
      }
      var hd = param.hd;
      var len = hd.length;
      Caml_bytes.caml_blit_bytes(hd, 0, buf, pos - len | 0, len);
      _param = param.tl;
      _pos = pos - len | 0;
      continue ;
    };
  };
  var scan = function (_accu, _len) {
    while(true) {
      var len = _len;
      var accu = _accu;
      var n = Caml_external_polyfill.resolve("caml_ml_input_scan_line")(chan);
      if (n === 0) {
        if (accu) {
          return build_result(Caml_bytes.caml_create_bytes(len), len, accu);
        }
        throw {
              RE_EXN_ID: "End_of_file",
              Error: new Error()
            };
      }
      if (n > 0) {
        var res = Caml_bytes.caml_create_bytes(n - 1 | 0);
        Caml_external_polyfill.resolve("caml_ml_input")(chan, res, 0, n - 1 | 0);
        Caml_external_polyfill.resolve("caml_ml_input_char")(chan);
        if (!accu) {
          return res;
        }
        var len$1 = (len + n | 0) - 1 | 0;
        return build_result(Caml_bytes.caml_create_bytes(len$1), len$1, {
                    hd: res,
                    tl: accu
                  });
      }
      var beg = Caml_bytes.caml_create_bytes(-n | 0);
      Caml_external_polyfill.resolve("caml_ml_input")(chan, beg, 0, -n | 0);
      _len = len - n | 0;
      _accu = {
        hd: beg,
        tl: accu
      };
      continue ;
    };
  };
  return Caml_bytes.bytes_to_string(scan(/* [] */0, 0));
}

function close_in_noerr(ic) {
  try {
    return Caml_external_polyfill.resolve("caml_ml_close_channel")(ic);
  }
  catch (exn){
    return ;
  }
}

function print_char(c) {
  return Caml_io.caml_ml_output_char(stdout, c);
}

function print_string(s) {
  return output_string(stdout, s);
}

function print_bytes(s) {
  return output_bytes(stdout, s);
}

function print_int(i) {
  return output_string(stdout, String(i));
}

function print_float(f) {
  return output_string(stdout, valid_float_lexem(Caml_format.caml_format_float("%.12g", f)));
}

function print_newline(param) {
  Caml_io.caml_ml_output_char(stdout, /* '\n' */10);
  return Caml_io.caml_ml_flush(stdout);
}

function prerr_char(c) {
  return Caml_io.caml_ml_output_char(stderr, c);
}

function prerr_string(s) {
  return output_string(stderr, s);
}

function prerr_bytes(s) {
  return output_bytes(stderr, s);
}

function prerr_int(i) {
  return output_string(stderr, String(i));
}

function prerr_float(f) {
  return output_string(stderr, valid_float_lexem(Caml_format.caml_format_float("%.12g", f)));
}

function prerr_newline(param) {
  Caml_io.caml_ml_output_char(stderr, /* '\n' */10);
  return Caml_io.caml_ml_flush(stderr);
}

function read_line(param) {
  Caml_io.caml_ml_flush(stdout);
  return input_line(stdin);
}

function read_int(param) {
  return Caml_format.caml_int_of_string((Caml_io.caml_ml_flush(stdout), input_line(stdin)));
}

function read_int_opt(param) {
  return int_of_string_opt((Caml_io.caml_ml_flush(stdout), input_line(stdin)));
}

function read_float(param) {
  return Caml_format.caml_float_of_string((Caml_io.caml_ml_flush(stdout), input_line(stdin)));
}

function read_float_opt(param) {
  return float_of_string_opt((Caml_io.caml_ml_flush(stdout), input_line(stdin)));
}

function string_of_format(param) {
  return param._1;
}

var exit_function = {
  contents: flush_all
};

function at_exit(f) {
  var g = exit_function.contents;
  exit_function.contents = (function (param) {
      Curry._1(f, undefined);
      return Curry._1(g, undefined);
    });
  
}

function do_at_exit(param) {
  return Curry._1(exit_function.contents, undefined);
}

function exit(retcode) {
  do_at_exit(undefined);
  return Caml_sys.caml_sys_exit(retcode);
}

var max_int = 2147483647;

var infinity = Infinity;

var neg_infinity = -Infinity;

var max_float = 1.79769313486231571e+308;

var min_float = 2.22507385850720138e-308;

var epsilon_float = 2.22044604925031308e-16;

var flush = Caml_io.caml_ml_flush;

var output_char = Caml_io.caml_ml_output_char;

var output_byte = Caml_io.caml_ml_output_char;

function output_binary_int(prim, prim$1) {
  return Caml_external_polyfill.resolve("caml_ml_output_int")(prim, prim$1);
}

function seek_out(prim, prim$1) {
  return Caml_external_polyfill.resolve("caml_ml_seek_out")(prim, prim$1);
}

function pos_out(prim) {
  return Caml_external_polyfill.resolve("caml_ml_pos_out")(prim);
}

function out_channel_length(prim) {
  return Caml_external_polyfill.resolve("caml_ml_channel_size")(prim);
}

function set_binary_mode_out(prim, prim$1) {
  return Caml_external_polyfill.resolve("caml_ml_set_binary_mode")(prim, prim$1);
}

function input_char(prim) {
  return Caml_external_polyfill.resolve("caml_ml_input_char")(prim);
}

function input_byte(prim) {
  return Caml_external_polyfill.resolve("caml_ml_input_char")(prim);
}

function input_binary_int(prim) {
  return Caml_external_polyfill.resolve("caml_ml_input_int")(prim);
}

function input_value(prim) {
  return Caml_external_polyfill.resolve("caml_input_value")(prim);
}

function seek_in(prim, prim$1) {
  return Caml_external_polyfill.resolve("caml_ml_seek_in")(prim, prim$1);
}

function pos_in(prim) {
  return Caml_external_polyfill.resolve("caml_ml_pos_in")(prim);
}

function in_channel_length(prim) {
  return Caml_external_polyfill.resolve("caml_ml_channel_size")(prim);
}

function close_in(prim) {
  return Caml_external_polyfill.resolve("caml_ml_close_channel")(prim);
}

function set_binary_mode_in(prim, prim$1) {
  return Caml_external_polyfill.resolve("caml_ml_set_binary_mode")(prim, prim$1);
}

function LargeFile_seek_out(prim, prim$1) {
  return Caml_external_polyfill.resolve("caml_ml_seek_out_64")(prim, prim$1);
}

function LargeFile_pos_out(prim) {
  return Caml_external_polyfill.resolve("caml_ml_pos_out_64")(prim);
}

function LargeFile_out_channel_length(prim) {
  return Caml_external_polyfill.resolve("caml_ml_channel_size_64")(prim);
}

function LargeFile_seek_in(prim, prim$1) {
  return Caml_external_polyfill.resolve("caml_ml_seek_in_64")(prim, prim$1);
}

function LargeFile_pos_in(prim) {
  return Caml_external_polyfill.resolve("caml_ml_pos_in_64")(prim);
}

function LargeFile_in_channel_length(prim) {
  return Caml_external_polyfill.resolve("caml_ml_channel_size_64")(prim);
}

var LargeFile = {
  seek_out: LargeFile_seek_out,
  pos_out: LargeFile_pos_out,
  out_channel_length: LargeFile_out_channel_length,
  seek_in: LargeFile_seek_in,
  pos_in: LargeFile_pos_in,
  in_channel_length: LargeFile_in_channel_length
};

exports.invalid_arg = invalid_arg;
exports.failwith = failwith;
exports.Exit = Exit;
exports.abs = abs;
exports.max_int = max_int;
exports.min_int = min_int;
exports.lnot = lnot;
exports.infinity = infinity;
exports.neg_infinity = neg_infinity;
exports.max_float = max_float;
exports.min_float = min_float;
exports.epsilon_float = epsilon_float;
exports.classify_float = classify_float;
exports.char_of_int = char_of_int;
exports.string_of_bool = string_of_bool;
exports.bool_of_string = bool_of_string;
exports.bool_of_string_opt = bool_of_string_opt;
exports.int_of_string_opt = int_of_string_opt;
exports.string_of_float = string_of_float;
exports.float_of_string_opt = float_of_string_opt;
exports.$at = $at;
exports.stdin = stdin;
exports.stdout = stdout;
exports.stderr = stderr;
exports.print_char = print_char;
exports.print_string = print_string;
exports.print_bytes = print_bytes;
exports.print_int = print_int;
exports.print_float = print_float;
exports.print_newline = print_newline;
exports.prerr_char = prerr_char;
exports.prerr_string = prerr_string;
exports.prerr_bytes = prerr_bytes;
exports.prerr_int = prerr_int;
exports.prerr_float = prerr_float;
exports.prerr_newline = prerr_newline;
exports.read_line = read_line;
exports.read_int = read_int;
exports.read_int_opt = read_int_opt;
exports.read_float = read_float;
exports.read_float_opt = read_float_opt;
exports.open_out = open_out;
exports.open_out_bin = open_out_bin;
exports.open_out_gen = open_out_gen;
exports.flush = flush;
exports.flush_all = flush_all;
exports.output_char = output_char;
exports.output_string = output_string;
exports.output_bytes = output_bytes;
exports.output = output;
exports.output_substring = output_substring;
exports.output_byte = output_byte;
exports.output_binary_int = output_binary_int;
exports.output_value = output_value;
exports.seek_out = seek_out;
exports.pos_out = pos_out;
exports.out_channel_length = out_channel_length;
exports.close_out = close_out;
exports.close_out_noerr = close_out_noerr;
exports.set_binary_mode_out = set_binary_mode_out;
exports.open_in = open_in;
exports.open_in_bin = open_in_bin;
exports.open_in_gen = open_in_gen;
exports.input_char = input_char;
exports.input_line = input_line;
exports.input = input;
exports.really_input = really_input;
exports.really_input_string = really_input_string;
exports.input_byte = input_byte;
exports.input_binary_int = input_binary_int;
exports.input_value = input_value;
exports.seek_in = seek_in;
exports.pos_in = pos_in;
exports.in_channel_length = in_channel_length;
exports.close_in = close_in;
exports.close_in_noerr = close_in_noerr;
exports.set_binary_mode_in = set_binary_mode_in;
exports.LargeFile = LargeFile;
exports.string_of_format = string_of_format;
exports.exit = exit;
exports.at_exit = at_exit;
exports.valid_float_lexem = valid_float_lexem;
exports.unsafe_really_input = unsafe_really_input;
exports.do_at_exit = do_at_exit;
/* No side effect */

},{"./caml_bytes.js":3,"./caml_exceptions.js":4,"./caml_external_polyfill.js":5,"./caml_format.js":6,"./caml_io.js":8,"./caml_js_exceptions.js":9,"./caml_string.js":13,"./caml_sys.js":14,"./curry.js":15}],18:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],19:[function(require,module,exports){
// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var _map = {
  "Line": "line",
  "Bar": "bar",
  "HorizontalBar": "horizontalBar",
  "Radar": "radar",
  "Pie": "pie",
  "Doughnut": "doughnut",
  "PolarArea": "plarArea",
  "Bubble": "bubble",
  "Scatter": "scatter"
};
var _revMap = {
  "line": "Line",
  "bar": "Bar",
  "horizontalBar": "HorizontalBar",
  "radar": "Radar",
  "pie": "Pie",
  "doughnut": "Doughnut",
  "plarArea": "PolarArea",
  "bubble": "Bubble",
  "scatter": "Scatter"
};

function chart_typeToJs(param) {
  return _map[param];
}

function chart_typeFromJs(param) {
  return _revMap[param];
}

var Scatter = {};
var Bubble = {};
exports.chart_typeToJs = chart_typeToJs;
exports.chart_typeFromJs = chart_typeFromJs;
exports.Scatter = Scatter;
exports.Bubble = Bubble;
/* No side effect */

},{}],20:[function(require,module,exports){
// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");

var $$Array = require("bs-platform/lib/js/array.js");

var Curry = require("bs-platform/lib/js/curry.js");

var Chartjs = require("./chartjs.bs.js");

var Caml_array = require("bs-platform/lib/js/caml_array.js");

var Caml_exceptions = require("bs-platform/lib/js/caml_exceptions.js");

var Not_found_element = /* @__PURE__ */Caml_exceptions.create("Radical_main.Not_found_element");

function index_array(len) {
  var d = Caml_array.caml_make_vect(len, "");

  for (var i = 0; i < len; ++i) {
    Caml_array.set(d, i, String(i));
  }

  return d;
}

function an2(x) {
  return Math.sqrt(2 + x);
}

function an6(x) {
  return Math.sqrt(30 + x);
}

function ann(n, x) {
  return Math.sqrt(n * n - n + x);
}

function plot_ann(n, len, element_id, color_name) {
  var data = Caml_array.caml_make_vect(len, 0);
  var nf = n;

  var iter = function (_prev, _i) {
    while (true) {
      var i = _i;
      var prev = _prev;

      if (len <= i) {
        return;
      }

      Caml_array.set(data, i, Math.sqrt(nf * nf - nf + prev));
      _i = i + 1 | 0;
      _prev = Caml_array.get(data, i);
      continue;
    }

    ;
  };

  iter(0, 0);
  var opt = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  var param = {
    type: Chartjs.chart_typeToJs("Line"),
    data: {
      labels: index_array(len),
      datasets: [{
        label: String(n),
        data: data,
        borderColor: [color_name],
        fill: false
      }]
    },
    options: opt
  };
  var canvas = document.getElementById(element_id);
  var context;

  if (canvas == null) {
    throw {
      RE_EXN_ID: Not_found_element,
      _1: "canvas is not found",
      Error: new Error()
    };
  }

  context = canvas.getContext("2d");
  new Chart(context, param);
}

function plot_line(datasets, element_id) {
  var opt = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  var chartjs_datasets = $$Array.of_list(List.map(function (x) {
    return {
      label: x.label,
      data: $$Array.of_list(x.data),
      borderColor: [x.color],
      fill: false
    };
  }, datasets));
  var datalen = List.length(List.hd(datasets).data);
  var param = {
    type: Chartjs.chart_typeToJs("Line"),
    data: {
      labels: index_array(datalen),
      datasets: chartjs_datasets
    },
    options: opt
  };
  var canvas = document.getElementById(element_id);
  var context;

  if (canvas == null) {
    throw {
      RE_EXN_ID: Not_found_element,
      _1: "canvas is not found",
      Error: new Error()
    };
  }

  context = canvas.getContext("2d");
  new Chart(context, param);
}

function apply_sequence(f, len) {
  var _prev = 0;
  var _len = len;
  var _rev_result =
  /* [] */
  0;

  while (true) {
    var rev_result = _rev_result;
    var len$1 = _len;
    var prev = _prev;

    if (len$1 === 0) {
      return List.rev(rev_result);
    }

    var current = Curry._1(f, prev);

    _rev_result = {
      hd: current,
      tl: rev_result
    };
    _len = len$1 - 1 | 0;
    _prev = current;
    continue;
  }

  ;
}

function range(s, e) {
  var _current = e - 1 | 0;

  var _result =
  /* [] */
  0;

  while (true) {
    var result = _result;
    var current = _current;

    if (current < s) {
      return result;
    }

    _result = {
      hd: current,
      tl: result
    };
    _current = current - 1 | 0;
    continue;
  }

  ;
}

function main(param) {
  var pallete = ["Red", "Green", "Blue", "Yellow", "Purple", "Aqua", "Pink"];

  var data = function (n) {
    var color = Caml_array.get(pallete, n - 2 | 0);
    var partial_arg = n;
    return {
      data: apply_sequence(function (param) {
        return ann(partial_arg, param);
      }, 20),
      label: String(n),
      color: color
    };
  };

  var d2 = data(2);
  var d6 = data(6);
  plot_line({
    hd: d2,
    tl:
    /* [] */
    0
  }, "an2");
  plot_line({
    hd: d6,
    tl:
    /* [] */
    0
  }, "an6");
  var dataset = List.map(data, range(2, 2 + pallete.length | 0));
  return plot_line(dataset, "plot_simple");
}

window.addEventListener("load", function (param) {
  return main(undefined);
});
exports.Not_found_element = Not_found_element;
exports.index_array = index_array;
exports.an2 = an2;
exports.an6 = an6;
exports.ann = ann;
exports.plot_ann = plot_ann;
exports.plot_line = plot_line;
exports.apply_sequence = apply_sequence;
exports.range = range;
exports.main = main;
/*  Not a pure module */

},{"./chartjs.bs.js":19,"bs-platform/lib/js/array.js":1,"bs-platform/lib/js/caml_array.js":2,"bs-platform/lib/js/caml_exceptions.js":4,"bs-platform/lib/js/curry.js":15,"bs-platform/lib/js/list.js":16}]},{},[20]);
