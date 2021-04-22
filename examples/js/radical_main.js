(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var Curry = require("./curry.js");
var Caml_obj = require("./caml_obj.js");
var Caml_array = require("./caml_array.js");
var Caml_exceptions = require("./caml_exceptions.js");
var Caml_js_exceptions = require("./caml_js_exceptions.js");
var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

var make_float = Caml_array.caml_make_float_vect;

var Floatarray = { };

function init(l, f) {
  if (l === 0) {
    return [];
  } else {
    if (l < 0) {
      throw [
            Caml_builtin_exceptions.invalid_argument,
            "Array.init"
          ];
    }
    var res = Caml_array.caml_make_vect(l, Curry._1(f, 0));
    for(var i = 1 ,i_finish = l - 1 | 0; i <= i_finish; ++i){
      res[i] = Curry._1(f, i);
    }
    return res;
  }
}

function make_matrix(sx, sy, init) {
  var res = Caml_array.caml_make_vect(sx, []);
  for(var x = 0 ,x_finish = sx - 1 | 0; x <= x_finish; ++x){
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
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Array.sub"
        ];
  }
  return Caml_array.caml_array_sub(a, ofs, len);
}

function fill(a, ofs, len, v) {
  if (ofs < 0 || len < 0 || ofs > (a.length - len | 0)) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Array.fill"
        ];
  }
  for(var i = ofs ,i_finish = (ofs + len | 0) - 1 | 0; i <= i_finish; ++i){
    a[i] = v;
  }
  return /* () */0;
}

function blit(a1, ofs1, a2, ofs2, len) {
  if (len < 0 || ofs1 < 0 || ofs1 > (a1.length - len | 0) || ofs2 < 0 || ofs2 > (a2.length - len | 0)) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Array.blit"
        ];
  }
  return Caml_array.caml_array_blit(a1, ofs1, a2, ofs2, len);
}

function iter(f, a) {
  for(var i = 0 ,i_finish = a.length - 1 | 0; i <= i_finish; ++i){
    Curry._1(f, a[i]);
  }
  return /* () */0;
}

function iter2(f, a, b) {
  if (a.length !== b.length) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Array.iter2: arrays must have the same length"
        ];
  }
  for(var i = 0 ,i_finish = a.length - 1 | 0; i <= i_finish; ++i){
    Curry._2(f, a[i], b[i]);
  }
  return /* () */0;
}

function map(f, a) {
  var l = a.length;
  if (l === 0) {
    return [];
  } else {
    var r = Caml_array.caml_make_vect(l, Curry._1(f, a[0]));
    for(var i = 1 ,i_finish = l - 1 | 0; i <= i_finish; ++i){
      r[i] = Curry._1(f, a[i]);
    }
    return r;
  }
}

function map2(f, a, b) {
  var la = a.length;
  var lb = b.length;
  if (la !== lb) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Array.map2: arrays must have the same length"
        ];
  }
  if (la === 0) {
    return [];
  } else {
    var r = Caml_array.caml_make_vect(la, Curry._2(f, a[0], b[0]));
    for(var i = 1 ,i_finish = la - 1 | 0; i <= i_finish; ++i){
      r[i] = Curry._2(f, a[i], b[i]);
    }
    return r;
  }
}

function iteri(f, a) {
  for(var i = 0 ,i_finish = a.length - 1 | 0; i <= i_finish; ++i){
    Curry._2(f, i, a[i]);
  }
  return /* () */0;
}

function mapi(f, a) {
  var l = a.length;
  if (l === 0) {
    return [];
  } else {
    var r = Caml_array.caml_make_vect(l, Curry._2(f, 0, a[0]));
    for(var i = 1 ,i_finish = l - 1 | 0; i <= i_finish; ++i){
      r[i] = Curry._2(f, i, a[i]);
    }
    return r;
  }
}

function to_list(a) {
  var _i = a.length - 1 | 0;
  var _res = /* [] */0;
  while(true) {
    var res = _res;
    var i = _i;
    if (i < 0) {
      return res;
    } else {
      _res = /* :: */[
        a[i],
        res
      ];
      _i = i - 1 | 0;
      continue ;
    }
  };
}

function list_length(_accu, _param) {
  while(true) {
    var param = _param;
    var accu = _accu;
    if (param) {
      _param = param[1];
      _accu = accu + 1 | 0;
      continue ;
    } else {
      return accu;
    }
  };
}

function of_list(l) {
  if (l) {
    var a = Caml_array.caml_make_vect(list_length(0, l), l[0]);
    var _i = 1;
    var _param = l[1];
    while(true) {
      var param = _param;
      var i = _i;
      if (param) {
        a[i] = param[0];
        _param = param[1];
        _i = i + 1 | 0;
        continue ;
      } else {
        return a;
      }
    };
  } else {
    return [];
  }
}

function fold_left(f, x, a) {
  var r = x;
  for(var i = 0 ,i_finish = a.length - 1 | 0; i <= i_finish; ++i){
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
    } else if (Curry._1(p, a[i])) {
      return true;
    } else {
      _i = i + 1 | 0;
      continue ;
    }
  };
}

function for_all(p, a) {
  var n = a.length;
  var _i = 0;
  while(true) {
    var i = _i;
    if (i === n) {
      return true;
    } else if (Curry._1(p, a[i])) {
      _i = i + 1 | 0;
      continue ;
    } else {
      return false;
    }
  };
}

function mem(x, a) {
  var n = a.length;
  var _i = 0;
  while(true) {
    var i = _i;
    if (i === n) {
      return false;
    } else if (Caml_obj.caml_equal(a[i], x)) {
      return true;
    } else {
      _i = i + 1 | 0;
      continue ;
    }
  };
}

function memq(x, a) {
  var n = a.length;
  var _i = 0;
  while(true) {
    var i = _i;
    if (i === n) {
      return false;
    } else if (x === a[i]) {
      return true;
    } else {
      _i = i + 1 | 0;
      continue ;
    }
  };
}

var Bottom = Caml_exceptions.create("Array.Bottom");

function sort(cmp, a) {
  var maxson = function (l, i) {
    var i31 = ((i + i | 0) + i | 0) + 1 | 0;
    var x = i31;
    if ((i31 + 2 | 0) < l) {
      if (Curry._2(cmp, Caml_array.caml_array_get(a, i31), Caml_array.caml_array_get(a, i31 + 1 | 0)) < 0) {
        x = i31 + 1 | 0;
      }
      if (Curry._2(cmp, Caml_array.caml_array_get(a, x), Caml_array.caml_array_get(a, i31 + 2 | 0)) < 0) {
        x = i31 + 2 | 0;
      }
      return x;
    } else if ((i31 + 1 | 0) < l && Curry._2(cmp, Caml_array.caml_array_get(a, i31), Caml_array.caml_array_get(a, i31 + 1 | 0)) < 0) {
      return i31 + 1 | 0;
    } else if (i31 < l) {
      return i31;
    } else {
      throw [
            Bottom,
            i
          ];
    }
  };
  var trickle = function (l, i, e) {
    try {
      var l$1 = l;
      var _i = i;
      var e$1 = e;
      while(true) {
        var i$1 = _i;
        var j = maxson(l$1, i$1);
        if (Curry._2(cmp, Caml_array.caml_array_get(a, j), e$1) > 0) {
          Caml_array.caml_array_set(a, i$1, Caml_array.caml_array_get(a, j));
          _i = j;
          continue ;
        } else {
          return Caml_array.caml_array_set(a, i$1, e$1);
        }
      };
    }
    catch (raw_exn){
      var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
      if (exn[0] === Bottom) {
        return Caml_array.caml_array_set(a, exn[1], e);
      } else {
        throw exn;
      }
    }
  };
  var bubble = function (l, i) {
    try {
      var l$1 = l;
      var _i = i;
      while(true) {
        var i$1 = _i;
        var j = maxson(l$1, i$1);
        Caml_array.caml_array_set(a, i$1, Caml_array.caml_array_get(a, j));
        _i = j;
        continue ;
      };
    }
    catch (raw_exn){
      var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
      if (exn[0] === Bottom) {
        return exn[1];
      } else {
        throw exn;
      }
    }
  };
  var trickleup = function (_i, e) {
    while(true) {
      var i = _i;
      var father = (i - 1 | 0) / 3 | 0;
      if (i === father) {
        throw [
              Caml_builtin_exceptions.assert_failure,
              /* tuple */[
                "array.ml",
                238,
                4
              ]
            ];
      }
      if (Curry._2(cmp, Caml_array.caml_array_get(a, father), e) < 0) {
        Caml_array.caml_array_set(a, i, Caml_array.caml_array_get(a, father));
        if (father > 0) {
          _i = father;
          continue ;
        } else {
          return Caml_array.caml_array_set(a, 0, e);
        }
      } else {
        return Caml_array.caml_array_set(a, i, e);
      }
    };
  };
  var l = a.length;
  for(var i = ((l + 1 | 0) / 3 | 0) - 1 | 0; i >= 0; --i){
    trickle(l, i, Caml_array.caml_array_get(a, i));
  }
  for(var i$1 = l - 1 | 0; i$1 >= 2; --i$1){
    var e = Caml_array.caml_array_get(a, i$1);
    Caml_array.caml_array_set(a, i$1, Caml_array.caml_array_get(a, 0));
    trickleup(bubble(i$1, 0), e);
  }
  if (l > 1) {
    var e$1 = Caml_array.caml_array_get(a, 1);
    Caml_array.caml_array_set(a, 1, Caml_array.caml_array_get(a, 0));
    return Caml_array.caml_array_set(a, 0, e$1);
  } else {
    return 0;
  }
}

function stable_sort(cmp, a) {
  var merge = function (src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs) {
    var src1r = src1ofs + src1len | 0;
    var src2r = src2ofs + src2len | 0;
    var _i1 = src1ofs;
    var _s1 = Caml_array.caml_array_get(a, src1ofs);
    var _i2 = src2ofs;
    var _s2 = Caml_array.caml_array_get(src2, src2ofs);
    var _d = dstofs;
    while(true) {
      var d = _d;
      var s2 = _s2;
      var i2 = _i2;
      var s1 = _s1;
      var i1 = _i1;
      if (Curry._2(cmp, s1, s2) <= 0) {
        Caml_array.caml_array_set(dst, d, s1);
        var i1$1 = i1 + 1 | 0;
        if (i1$1 < src1r) {
          _d = d + 1 | 0;
          _s1 = Caml_array.caml_array_get(a, i1$1);
          _i1 = i1$1;
          continue ;
        } else {
          return blit(src2, i2, dst, d + 1 | 0, src2r - i2 | 0);
        }
      } else {
        Caml_array.caml_array_set(dst, d, s2);
        var i2$1 = i2 + 1 | 0;
        if (i2$1 < src2r) {
          _d = d + 1 | 0;
          _s2 = Caml_array.caml_array_get(src2, i2$1);
          _i2 = i2$1;
          continue ;
        } else {
          return blit(a, i1, dst, d + 1 | 0, src1r - i1 | 0);
        }
      }
    };
  };
  var isortto = function (srcofs, dst, dstofs, len) {
    for(var i = 0 ,i_finish = len - 1 | 0; i <= i_finish; ++i){
      var e = Caml_array.caml_array_get(a, srcofs + i | 0);
      var j = (dstofs + i | 0) - 1 | 0;
      while(j >= dstofs && Curry._2(cmp, Caml_array.caml_array_get(dst, j), e) > 0) {
        Caml_array.caml_array_set(dst, j + 1 | 0, Caml_array.caml_array_get(dst, j));
        j = j - 1 | 0;
      };
      Caml_array.caml_array_set(dst, j + 1 | 0, e);
    }
    return /* () */0;
  };
  var sortto = function (srcofs, dst, dstofs, len) {
    if (len <= 5) {
      return isortto(srcofs, dst, dstofs, len);
    } else {
      var l1 = len / 2 | 0;
      var l2 = len - l1 | 0;
      sortto(srcofs + l1 | 0, dst, dstofs + l1 | 0, l2);
      sortto(srcofs, a, srcofs + l2 | 0, l1);
      return merge(srcofs + l2 | 0, l1, dst, dstofs + l1 | 0, l2, dst, dstofs);
    }
  };
  var l = a.length;
  if (l <= 5) {
    return isortto(0, a, 0, l);
  } else {
    var l1 = l / 2 | 0;
    var l2 = l - l1 | 0;
    var t = Caml_array.caml_make_vect(l2, Caml_array.caml_array_get(a, 0));
    sortto(l1, t, 0, l2);
    sortto(0, a, l2, l1);
    return merge(l2, l1, t, 0, l2, a, 0);
  }
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

},{"./caml_array.js":3,"./caml_builtin_exceptions.js":4,"./caml_exceptions.js":6,"./caml_js_exceptions.js":12,"./caml_obj.js":13,"./curry.js":20}],2:[function(require,module,exports){
'use strict';


function __(tag, block) {
  block.tag = tag;
  return block;
}

exports.__ = __;
/* No side effect */

},{}],3:[function(require,module,exports){
'use strict';

var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

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
    if (l) {
      _l = l[1];
      _acc = l[0].length + acc | 0;
      continue ;
    } else {
      return acc;
    }
  };
}

function fill(arr, _i, _l) {
  while(true) {
    var l = _l;
    var i = _i;
    if (l) {
      var x = l[0];
      var l$1 = x.length;
      var k = i;
      var j = 0;
      while(j < l$1) {
        arr[k] = x[j];
        k = k + 1 | 0;
        j = j + 1 | 0;
      };
      _l = l[1];
      _i = k;
      continue ;
    } else {
      return /* () */0;
    }
  };
}

function caml_array_concat(l) {
  var v = len(0, l);
  var result = new Array(v);
  fill(result, 0, l);
  return result;
}

function caml_array_set(xs, index, newval) {
  if (index < 0 || index >= xs.length) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "index out of bounds"
        ];
  }
  xs[index] = newval;
  return /* () */0;
}

function caml_array_get(xs, index) {
  if (index < 0 || index >= xs.length) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "index out of bounds"
        ];
  }
  return xs[index];
}

function caml_make_vect(len, init) {
  var b = new Array(len);
  for(var i = 0 ,i_finish = len - 1 | 0; i <= i_finish; ++i){
    b[i] = init;
  }
  return b;
}

function caml_make_float_vect(len) {
  var b = new Array(len);
  for(var i = 0 ,i_finish = len - 1 | 0; i <= i_finish; ++i){
    b[i] = 0;
  }
  return b;
}

function caml_array_blit(a1, i1, a2, i2, len) {
  if (i2 <= i1) {
    for(var j = 0 ,j_finish = len - 1 | 0; j <= j_finish; ++j){
      a2[j + i2 | 0] = a1[j + i1 | 0];
    }
    return /* () */0;
  } else {
    for(var j$1 = len - 1 | 0; j$1 >= 0; --j$1){
      a2[j$1 + i2 | 0] = a1[j$1 + i1 | 0];
    }
    return /* () */0;
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
exports.caml_array_get = caml_array_get;
exports.caml_array_set = caml_array_set;
/* No side effect */

},{"./caml_builtin_exceptions.js":4}],4:[function(require,module,exports){
'use strict';


var out_of_memory = /* tuple */[
  "Out_of_memory",
  0
];

var sys_error = /* tuple */[
  "Sys_error",
  -1
];

var failure = /* tuple */[
  "Failure",
  -2
];

var invalid_argument = /* tuple */[
  "Invalid_argument",
  -3
];

var end_of_file = /* tuple */[
  "End_of_file",
  -4
];

var division_by_zero = /* tuple */[
  "Division_by_zero",
  -5
];

var not_found = /* tuple */[
  "Not_found",
  -6
];

var match_failure = /* tuple */[
  "Match_failure",
  -7
];

var stack_overflow = /* tuple */[
  "Stack_overflow",
  -8
];

var sys_blocked_io = /* tuple */[
  "Sys_blocked_io",
  -9
];

var assert_failure = /* tuple */[
  "Assert_failure",
  -10
];

var undefined_recursive_module = /* tuple */[
  "Undefined_recursive_module",
  -11
];

out_of_memory.tag = 248;

sys_error.tag = 248;

failure.tag = 248;

invalid_argument.tag = 248;

end_of_file.tag = 248;

division_by_zero.tag = 248;

not_found.tag = 248;

match_failure.tag = 248;

stack_overflow.tag = 248;

sys_blocked_io.tag = 248;

assert_failure.tag = 248;

undefined_recursive_module.tag = 248;

exports.out_of_memory = out_of_memory;
exports.sys_error = sys_error;
exports.failure = failure;
exports.invalid_argument = invalid_argument;
exports.end_of_file = end_of_file;
exports.division_by_zero = division_by_zero;
exports.not_found = not_found;
exports.match_failure = match_failure;
exports.stack_overflow = stack_overflow;
exports.sys_blocked_io = sys_blocked_io;
exports.assert_failure = assert_failure;
exports.undefined_recursive_module = undefined_recursive_module;
/*  Not a pure module */

},{}],5:[function(require,module,exports){
'use strict';

var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

function get(s, i) {
  if (i < 0 || i >= s.length) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "index out of bounds"
        ];
  }
  return s[i];
}

function caml_fill_bytes(s, i, l, c) {
  if (l > 0) {
    for(var k = i ,k_finish = (l + i | 0) - 1 | 0; k <= k_finish; ++k){
      s[k] = c;
    }
    return /* () */0;
  } else {
    return 0;
  }
}

function caml_create_bytes(len) {
  if (len < 0) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "String.create"
        ];
  }
  var result = new Array(len);
  for(var i = 0 ,i_finish = len - 1 | 0; i <= i_finish; ++i){
    result[i] = /* "\000" */0;
  }
  return result;
}

function caml_blit_bytes(s1, i1, s2, i2, len) {
  if (len > 0) {
    if (s1 === s2) {
      var s1$1 = s1;
      var i1$1 = i1;
      var i2$1 = i2;
      var len$1 = len;
      if (i1$1 < i2$1) {
        var range_a = (s1$1.length - i2$1 | 0) - 1 | 0;
        var range_b = len$1 - 1 | 0;
        var range = range_a > range_b ? range_b : range_a;
        for(var j = range; j >= 0; --j){
          s1$1[i2$1 + j | 0] = s1$1[i1$1 + j | 0];
        }
        return /* () */0;
      } else if (i1$1 > i2$1) {
        var range_a$1 = (s1$1.length - i1$1 | 0) - 1 | 0;
        var range_b$1 = len$1 - 1 | 0;
        var range$1 = range_a$1 > range_b$1 ? range_b$1 : range_a$1;
        for(var k = 0; k <= range$1; ++k){
          s1$1[i2$1 + k | 0] = s1$1[i1$1 + k | 0];
        }
        return /* () */0;
      } else {
        return 0;
      }
    } else {
      var off1 = s1.length - i1 | 0;
      if (len <= off1) {
        for(var i = 0 ,i_finish = len - 1 | 0; i <= i_finish; ++i){
          s2[i2 + i | 0] = s1[i1 + i | 0];
        }
        return /* () */0;
      } else {
        for(var i$1 = 0 ,i_finish$1 = off1 - 1 | 0; i$1 <= i_finish$1; ++i$1){
          s2[i2 + i$1 | 0] = s1[i1 + i$1 | 0];
        }
        for(var i$2 = off1 ,i_finish$2 = len - 1 | 0; i$2 <= i_finish$2; ++i$2){
          s2[i2 + i$2 | 0] = /* "\000" */0;
        }
        return /* () */0;
      }
    }
  } else {
    return 0;
  }
}

function bytes_to_string(a) {
  var bytes = a;
  var i = 0;
  var len = a.length;
  var s = "";
  var s_len = len;
  if (i === 0 && len <= 4096 && len === bytes.length) {
    return String.fromCharCode.apply(null, bytes);
  } else {
    var offset = 0;
    while(s_len > 0) {
      var next = s_len < 1024 ? s_len : 1024;
      var tmp_bytes = new Array(next);
      caml_blit_bytes(bytes, offset, tmp_bytes, 0, next);
      s = s + String.fromCharCode.apply(null, tmp_bytes);
      s_len = s_len - next | 0;
      offset = offset + next | 0;
    };
    return s;
  }
}

function caml_blit_string(s1, i1, s2, i2, len) {
  if (len > 0) {
    var off1 = s1.length - i1 | 0;
    if (len <= off1) {
      for(var i = 0 ,i_finish = len - 1 | 0; i <= i_finish; ++i){
        s2[i2 + i | 0] = s1.charCodeAt(i1 + i | 0);
      }
      return /* () */0;
    } else {
      for(var i$1 = 0 ,i_finish$1 = off1 - 1 | 0; i$1 <= i_finish$1; ++i$1){
        s2[i2 + i$1 | 0] = s1.charCodeAt(i1 + i$1 | 0);
      }
      for(var i$2 = off1 ,i_finish$2 = len - 1 | 0; i$2 <= i_finish$2; ++i$2){
        s2[i2 + i$2 | 0] = /* "\000" */0;
      }
      return /* () */0;
    }
  } else {
    return 0;
  }
}

function bytes_of_string(s) {
  var len = s.length;
  var res = new Array(len);
  for(var i = 0 ,i_finish = len - 1 | 0; i <= i_finish; ++i){
    res[i] = s.charCodeAt(i);
  }
  return res;
}

exports.caml_create_bytes = caml_create_bytes;
exports.caml_fill_bytes = caml_fill_bytes;
exports.get = get;
exports.bytes_to_string = bytes_to_string;
exports.caml_blit_bytes = caml_blit_bytes;
exports.caml_blit_string = caml_blit_string;
exports.bytes_of_string = bytes_of_string;
/* No side effect */

},{"./caml_builtin_exceptions.js":4}],6:[function(require,module,exports){
'use strict';


var id = {
  contents: 0
};

function caml_set_oo_id(b) {
  b[1] = id.contents;
  id.contents = id.contents + 1;
  return b;
}

function caml_fresh_oo_id(param) {
  id.contents = id.contents + 1;
  return id.contents;
}

function create(str) {
  var v_001 = caml_fresh_oo_id(/* () */0);
  var v = /* tuple */[
    str,
    v_001
  ];
  v.tag = 248;
  return v;
}

function caml_is_extension(e) {
  if (e === undefined) {
    return false;
  } else if (e.tag === 248) {
    return true;
  } else {
    var slot = e[0];
    if (slot !== undefined) {
      return slot.tag === 248;
    } else {
      return false;
    }
  }
}

exports.caml_set_oo_id = caml_set_oo_id;
exports.caml_fresh_oo_id = caml_fresh_oo_id;
exports.create = create;
exports.caml_is_extension = caml_is_extension;
/* No side effect */

},{}],7:[function(require,module,exports){
(function (global){
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],8:[function(require,module,exports){
'use strict';

var Caml_int32 = require("./caml_int32.js");
var Caml_int64 = require("./caml_int64.js");
var Caml_utils = require("./caml_utils.js");
var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

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
    return c - /* "0" */48 | 0;
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
          switch (match$1 - 111 | 0) {
            case 0 :
                base = /* Oct */0;
                i = i + 2 | 0;
                break;
            case 6 :
                i = i + 2 | 0;
                break;
            case 1 :
            case 2 :
            case 3 :
            case 4 :
            case 5 :
            case 7 :
            case 8 :
                break;
            case 9 :
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
        switch (match$1 - 79 | 0) {
          case 0 :
              base = /* Oct */0;
              i = i + 2 | 0;
              break;
          case 6 :
              i = i + 2 | 0;
              break;
          case 1 :
          case 2 :
          case 3 :
          case 4 :
          case 5 :
          case 7 :
          case 8 :
              break;
          case 9 :
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
  return /* tuple */[
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
  var c = i < len ? s.charCodeAt(i) : /* "\000" */0;
  var d = parse_digit(c);
  if (d < 0 || d >= base) {
    throw [
          Caml_builtin_exceptions.failure,
          "int_of_string"
        ];
  }
  var aux = function (_acc, _k) {
    while(true) {
      var k = _k;
      var acc = _acc;
      if (k === len) {
        return acc;
      } else {
        var a = s.charCodeAt(k);
        if (a === /* "_" */95) {
          _k = k + 1 | 0;
          continue ;
        } else {
          var v = parse_digit(a);
          if (v < 0 || v >= base) {
            throw [
                  Caml_builtin_exceptions.failure,
                  "int_of_string"
                ];
          }
          var acc$1 = base * acc + v;
          if (acc$1 > threshold) {
            throw [
                  Caml_builtin_exceptions.failure,
                  "int_of_string"
                ];
          }
          _k = k + 1 | 0;
          _acc = acc$1;
          continue ;
        }
      }
    };
  };
  var res = match[1] * aux(d, i + 1 | 0);
  var or_res = res | 0;
  if (base === 10 && res !== or_res) {
    throw [
          Caml_builtin_exceptions.failure,
          "int_of_string"
        ];
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
        threshold = /* int64 */[
          /* hi */536870911,
          /* lo */4294967295
        ];
        break;
    case /* Hex */1 :
        threshold = /* int64 */[
          /* hi */268435455,
          /* lo */4294967295
        ];
        break;
    case /* Dec */2 :
        threshold = /* int64 */[
          /* hi */429496729,
          /* lo */2576980377
        ];
        break;
    case /* Bin */3 :
        threshold = /* int64 */[
          /* hi */2147483647,
          /* lo */4294967295
        ];
        break;
    
  }
  var len = s.length;
  var c = i < len ? s.charCodeAt(i) : /* "\000" */0;
  var d = Caml_int64.of_int32(parse_digit(c));
  if (Caml_int64.lt(d, /* int64 */[
          /* hi */0,
          /* lo */0
        ]) || Caml_int64.ge(d, base)) {
    throw [
          Caml_builtin_exceptions.failure,
          "int64_of_string"
        ];
  }
  var aux = function (_acc, _k) {
    while(true) {
      var k = _k;
      var acc = _acc;
      if (k === len) {
        return acc;
      } else {
        var a = s.charCodeAt(k);
        if (a === /* "_" */95) {
          _k = k + 1 | 0;
          continue ;
        } else {
          var v = Caml_int64.of_int32(parse_digit(a));
          if (Caml_int64.lt(v, /* int64 */[
                  /* hi */0,
                  /* lo */0
                ]) || Caml_int64.ge(v, base) || Caml_int64.gt(acc, threshold)) {
            throw [
                  Caml_builtin_exceptions.failure,
                  "int64_of_string"
                ];
          }
          var acc$1 = Caml_int64.add(Caml_int64.mul(base, acc), v);
          _k = k + 1 | 0;
          _acc = acc$1;
          continue ;
        }
      }
    };
  };
  var res = Caml_int64.mul(sign, aux(d, i + 1 | 0));
  var or_res = Caml_int64.or_(res, /* int64 */[
        /* hi */0,
        /* lo */0
      ]);
  if (Caml_int64.eq(base, /* int64 */[
          /* hi */0,
          /* lo */10
        ]) && Caml_int64.neq(res, or_res)) {
    throw [
          Caml_builtin_exceptions.failure,
          "int64_of_string"
        ];
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
  if (c >= /* "A" */65 && c <= /* "Z" */90 || c >= /* "\192" */192 && c <= /* "\214" */214 || c >= /* "\216" */216 && c <= /* "\222" */222) {
    return c + 32 | 0;
  } else {
    return c;
  }
}

function parse_format(fmt) {
  var len = fmt.length;
  if (len > 31) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "format_int: format too long"
        ];
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
    } else {
      var c = fmt.charCodeAt(i);
      var exit = 0;
      if (c >= 69) {
        if (c >= 88) {
          if (c >= 121) {
            exit = 1;
          } else {
            switch (c - 88 | 0) {
              case 0 :
                  f.base = /* Hex */1;
                  f.uppercase = true;
                  _i = i + 1 | 0;
                  continue ;
              case 13 :
              case 14 :
              case 15 :
                  exit = 5;
                  break;
              case 12 :
              case 17 :
                  exit = 4;
                  break;
              case 23 :
                  f.base = /* Oct */0;
                  _i = i + 1 | 0;
                  continue ;
              case 29 :
                  f.base = /* Dec */2;
                  _i = i + 1 | 0;
                  continue ;
              case 1 :
              case 2 :
              case 3 :
              case 4 :
              case 5 :
              case 6 :
              case 7 :
              case 8 :
              case 9 :
              case 10 :
              case 11 :
              case 16 :
              case 18 :
              case 19 :
              case 20 :
              case 21 :
              case 22 :
              case 24 :
              case 25 :
              case 26 :
              case 27 :
              case 28 :
              case 30 :
              case 31 :
                  exit = 1;
                  break;
              case 32 :
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
                    var w = fmt.charCodeAt(j) - /* "0" */48 | 0;
                    return w >= 0 && w <= 9;
                  }
                  }(j))()) {
                f.prec = (Caml_int32.imul(f.prec, 10) + fmt.charCodeAt(j) | 0) - /* "0" */48 | 0;
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
                  var w = fmt.charCodeAt(j$1) - /* "0" */48 | 0;
                  return w >= 0 && w <= 9;
                }
                }(j$1))()) {
              f.width = (Caml_int32.imul(f.width, 10) + fmt.charCodeAt(j$1) | 0) - /* "0" */48 | 0;
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
    for(var _for = len ,_for_finish = width - 1 | 0; _for <= _for_finish; ++_for){
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
    for(var _for$1 = len ,_for_finish$1 = width - 1 | 0; _for$1 <= _for_finish$1; ++_for$1){
      buffer = buffer + filter;
    }
  }
  buffer = uppercase ? buffer + rawbuffer.toUpperCase() : buffer + rawbuffer;
  if (justify === "-") {
    for(var _for$2 = len ,_for_finish$2 = width - 1 | 0; _for$2 <= _for_finish$2; ++_for$2){
      buffer = buffer + " ";
    }
  }
  return buffer;
}

function caml_format_int(fmt, i) {
  if (fmt === "%d") {
    return String(i);
  } else {
    var f = parse_format(fmt);
    var f$1 = f;
    var i$1 = i;
    var i$2 = i$1 < 0 ? (
        f$1.signedconv ? (f$1.sign = -1, -i$1) : (i$1 >>> 0)
      ) : i$1;
    var s = i$2.toString(int_of_base(f$1.base));
    if (f$1.prec >= 0) {
      f$1.filter = " ";
      var n = f$1.prec - s.length | 0;
      if (n > 0) {
        s = Caml_utils.repeat(n, "0") + s;
      }
      
    }
    return finish_formatting(f$1, s);
  }
}

function dec_of_pos_int64(x) {
  if (Caml_int64.lt(x, /* int64 */[
          /* hi */0,
          /* lo */0
        ])) {
    var wbase = /* int64 */[
      /* hi */0,
      /* lo */10
    ];
    var y = Caml_int64.discard_sign(x);
    var match = Caml_int64.div_mod(y, wbase);
    var match$1 = Caml_int64.div_mod(Caml_int64.add(/* int64 */[
              /* hi */0,
              /* lo */8
            ], match[1]), wbase);
    var quotient = Caml_int64.add(Caml_int64.add(/* int64 */[
              /* hi */214748364,
              /* lo */3435973836
            ], match[0]), match$1[0]);
    return Caml_int64.to_string(quotient) + "0123456789"[Caml_int64.to_int32(match$1[1])];
  } else {
    return Caml_int64.to_string(x);
  }
}

function oct_of_int64(x) {
  var s = "";
  var wbase = /* int64 */[
    /* hi */0,
    /* lo */8
  ];
  var cvtbl = "01234567";
  if (Caml_int64.lt(x, /* int64 */[
          /* hi */0,
          /* lo */0
        ])) {
    var y = Caml_int64.discard_sign(x);
    var match = Caml_int64.div_mod(y, wbase);
    var quotient = Caml_int64.add(/* int64 */[
          /* hi */268435456,
          /* lo */0
        ], match[0]);
    var modulus = match[1];
    s = cvtbl[Caml_int64.to_int32(modulus)] + s;
    while(Caml_int64.neq(quotient, /* int64 */[
            /* hi */0,
            /* lo */0
          ])) {
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
    while(Caml_int64.neq(quotient$1, /* int64 */[
            /* hi */0,
            /* lo */0
          ])) {
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
  } else {
    var f = parse_format(fmt);
    var x$1 = f.signedconv && Caml_int64.lt(x, /* int64 */[
          /* hi */0,
          /* lo */0
        ]) ? (f.sign = -1, Caml_int64.neg(x)) : x;
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
      fill_s = n > 0 ? Caml_utils.repeat(n, "0") + s : s;
    } else {
      fill_s = s;
    }
    return finish_formatting(f, fill_s);
  }
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
  return float_of_string(s, [
              Caml_builtin_exceptions.failure,
              "float_of_string"
            ]);
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

},{"./caml_builtin_exceptions.js":4,"./caml_int32.js":9,"./caml_int64.js":10,"./caml_utils.js":18}],9:[function(require,module,exports){
'use strict';

var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

function div(x, y) {
  if (y === 0) {
    throw Caml_builtin_exceptions.division_by_zero;
  }
  return x / y | 0;
}

function mod_(x, y) {
  if (y === 0) {
    throw Caml_builtin_exceptions.division_by_zero;
  }
  return x % y;
}

function caml_bswap16(x) {
  return ((x & 255) << 8) | ((x & 65280) >>> 8);
}

function caml_int32_bswap(x) {
  return ((x & 255) << 24) | ((x & 65280) << 8) | ((x & 16711680) >>> 8) | ((x & 4278190080) >>> 24);
}

var imul = (Math.imul || function (x,y) {
  y |= 0; return ((((x >> 16) * y) << 16) + (x & 0xffff) * y)|0; 
});

var caml_nativeint_bswap = caml_int32_bswap;

exports.div = div;
exports.mod_ = mod_;
exports.caml_bswap16 = caml_bswap16;
exports.caml_int32_bswap = caml_int32_bswap;
exports.caml_nativeint_bswap = caml_nativeint_bswap;
exports.imul = imul;
/* imul Not a pure module */

},{"./caml_builtin_exceptions.js":4}],10:[function(require,module,exports){
'use strict';

var Caml_int32 = require("./caml_int32.js");
var Caml_utils = require("./caml_utils.js");
var Caml_primitive = require("./caml_primitive.js");
var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

var min_int = /* Int64 */[
  /* hi */-2147483648,
  /* lo */0
];

var max_int = /* Int64 */[
  /* hi */2147483647,
  /* lo */1
];

var one = /* Int64 */[
  /* hi */0,
  /* lo */1
];

var zero = /* Int64 */[
  /* hi */0,
  /* lo */0
];

var neg_one = /* Int64 */[
  /* hi */-1,
  /* lo */4294967295
];

function neg_signed(x) {
  return (x & 2147483648) !== 0;
}

function succ(param) {
  var x_lo = param[/* lo */1];
  var x_hi = param[/* hi */0];
  var lo = x_lo + 1 & 4294967295;
  var hi = x_hi + (
    lo === 0 ? 1 : 0
  ) & 4294967295;
  return /* Int64 */[
          /* hi */hi,
          /* lo */(lo >>> 0)
        ];
}

function neg(param) {
  var other_lo = (param[/* lo */1] ^ -1) + 1 & 4294967295;
  var hi = (param[/* hi */0] ^ -1) + (
    other_lo === 0 ? 1 : 0
  ) & 4294967295;
  return /* Int64 */[
          /* hi */hi,
          /* lo */(other_lo >>> 0)
        ];
}

function add_aux(param, y_lo, y_hi) {
  var x_lo = param[/* lo */1];
  var lo = x_lo + y_lo & 4294967295;
  var overflow = neg_signed(x_lo) && (neg_signed(y_lo) || !neg_signed(lo)) || neg_signed(y_lo) && !neg_signed(lo) ? 1 : 0;
  var hi = param[/* hi */0] + y_hi + overflow & 4294967295;
  return /* Int64 */[
          /* hi */hi,
          /* lo */(lo >>> 0)
        ];
}

function add_lo(self, lo) {
  return add_aux(self, (lo >>> 0), 0);
}

function add(self, param) {
  return add_aux(self, param[/* lo */1], param[/* hi */0]);
}

function eq(param, param$1) {
  if (param[/* hi */0] === param$1[/* hi */0]) {
    return param[/* lo */1] === param$1[/* lo */1];
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
  var neg_lo = (((lo ^ -1) + 1 & 4294967295) >>> 0);
  var neg_hi = (hi ^ -1) + (
    neg_lo === 0 ? 1 : 0
  ) & 4294967295;
  return add_aux(x, neg_lo, neg_hi);
}

function sub(self, param) {
  return sub_aux(self, param[/* lo */1], param[/* hi */0]);
}

function lsl_(x, numBits) {
  if (numBits === 0) {
    return x;
  } else {
    var lo = x[/* lo */1];
    if (numBits >= 32) {
      return /* Int64 */[
              /* hi */(lo << (numBits - 32 | 0)),
              /* lo */0
            ];
    } else {
      var hi = (lo >>> (32 - numBits | 0)) | (x[/* hi */0] << numBits);
      return /* Int64 */[
              /* hi */hi,
              /* lo */((lo << numBits) >>> 0)
            ];
    }
  }
}

function lsr_(x, numBits) {
  if (numBits === 0) {
    return x;
  } else {
    var hi = x[/* hi */0];
    var offset = numBits - 32 | 0;
    if (offset === 0) {
      return /* Int64 */[
              /* hi */0,
              /* lo */(hi >>> 0)
            ];
    } else if (offset > 0) {
      var lo = (hi >>> offset);
      return /* Int64 */[
              /* hi */0,
              /* lo */(lo >>> 0)
            ];
    } else {
      var hi$1 = (hi >>> numBits);
      var lo$1 = (hi << (-offset | 0)) | (x[/* lo */1] >>> numBits);
      return /* Int64 */[
              /* hi */hi$1,
              /* lo */(lo$1 >>> 0)
            ];
    }
  }
}

function asr_(x, numBits) {
  if (numBits === 0) {
    return x;
  } else {
    var hi = x[/* hi */0];
    if (numBits < 32) {
      var hi$1 = (hi >> numBits);
      var lo = (hi << (32 - numBits | 0)) | (x[/* lo */1] >>> numBits);
      return /* Int64 */[
              /* hi */hi$1,
              /* lo */(lo >>> 0)
            ];
    } else {
      var lo$1 = (hi >> (numBits - 32 | 0));
      return /* Int64 */[
              /* hi */hi >= 0 ? 0 : -1,
              /* lo */(lo$1 >>> 0)
            ];
    }
  }
}

function is_zero(param) {
  if (param[/* hi */0] !== 0 || param[/* lo */1] !== 0) {
    return false;
  } else {
    return true;
  }
}

function mul(_this, _other) {
  while(true) {
    var other = _other;
    var $$this = _this;
    var lo;
    var exit = 0;
    var exit$1 = 0;
    if ($$this[/* hi */0] !== 0 || $$this[/* lo */1] !== 0) {
      exit$1 = 3;
    } else {
      return zero;
    }
    if (exit$1 === 3) {
      if (other[/* hi */0] !== 0 || other[/* lo */1] !== 0) {
        exit = 2;
      } else {
        return zero;
      }
    }
    if (exit === 2) {
      var this_hi = $$this[/* hi */0];
      var exit$2 = 0;
      if (this_hi !== -2147483648 || $$this[/* lo */1] !== 0) {
        exit$2 = 3;
      } else {
        lo = other[/* lo */1];
      }
      if (exit$2 === 3) {
        var other_hi = other[/* hi */0];
        var lo$1 = $$this[/* lo */1];
        var exit$3 = 0;
        if (other_hi !== -2147483648 || other[/* lo */1] !== 0) {
          exit$3 = 4;
        } else {
          lo = lo$1;
        }
        if (exit$3 === 4) {
          var other_lo = other[/* lo */1];
          if (this_hi < 0) {
            if (other_hi < 0) {
              _other = neg(other);
              _this = neg($$this);
              continue ;
            } else {
              return neg(mul(neg($$this), other));
            }
          } else if (other_hi < 0) {
            return neg(mul($$this, neg(other)));
          } else {
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
            var hi = c32 | (c48 << 16);
            var lo$2 = c00 & 65535 | ((c16 & 65535) << 16);
            return /* Int64 */[
                    /* hi */hi,
                    /* lo */(lo$2 >>> 0)
                  ];
          }
        }
        
      }
      
    }
    if ((lo & 1) === 0) {
      return zero;
    } else {
      return min_int;
    }
  };
}

function swap(param) {
  var hi = Caml_int32.caml_int32_bswap(param[/* lo */1]);
  var lo = Caml_int32.caml_int32_bswap(param[/* hi */0]);
  return /* Int64 */[
          /* hi */hi,
          /* lo */(lo >>> 0)
        ];
}

function xor(param, param$1) {
  return /* Int64 */[
          /* hi */param[/* hi */0] ^ param$1[/* hi */0],
          /* lo */((param[/* lo */1] ^ param$1[/* lo */1]) >>> 0)
        ];
}

function or_(param, param$1) {
  return /* Int64 */[
          /* hi */param[/* hi */0] | param$1[/* hi */0],
          /* lo */((param[/* lo */1] | param$1[/* lo */1]) >>> 0)
        ];
}

function and_(param, param$1) {
  return /* Int64 */[
          /* hi */param[/* hi */0] & param$1[/* hi */0],
          /* lo */((param[/* lo */1] & param$1[/* lo */1]) >>> 0)
        ];
}

function ge(param, param$1) {
  var other_hi = param$1[/* hi */0];
  var hi = param[/* hi */0];
  if (hi > other_hi) {
    return true;
  } else if (hi < other_hi) {
    return false;
  } else {
    return param[/* lo */1] >= param$1[/* lo */1];
  }
}

function neq(x, y) {
  return !eq(x, y);
}

function lt(x, y) {
  return !ge(x, y);
}

function gt(param, param$1) {
  if (param[/* hi */0] > param$1[/* hi */0]) {
    return true;
  } else if (param[/* hi */0] < param$1[/* hi */0]) {
    return false;
  } else {
    return param[/* lo */1] > param$1[/* lo */1];
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
  return param[/* hi */0] * 0x100000000 + param[/* lo */1];
}

function of_float(x) {
  if (isNaN(x) || !isFinite(x)) {
    return zero;
  } else if (x <= -9.22337203685477581e+18) {
    return min_int;
  } else if (x + 1 >= 9.22337203685477581e+18) {
    return max_int;
  } else if (x < 0) {
    return neg(of_float(-x));
  } else {
    var hi = x / 4294967296 | 0;
    var lo = x % 4294967296 | 0;
    return /* Int64 */[
            /* hi */hi,
            /* lo */(lo >>> 0)
          ];
  }
}

function isSafeInteger(param) {
  var hi = param[/* hi */0];
  var top11Bits = (hi >> 21);
  if (top11Bits === 0) {
    return true;
  } else if (top11Bits === -1) {
    return !(param[/* lo */1] === 0 && hi === (4292870144 | 0));
  } else {
    return false;
  }
}

function to_string(self) {
  if (isSafeInteger(self)) {
    return String(to_float(self));
  } else if (self[/* hi */0] < 0) {
    if (eq(self, min_int)) {
      return "-9223372036854775808";
    } else {
      return "-" + to_string(neg(self));
    }
  } else {
    var approx_div1 = of_float(Math.floor(to_float(self) / 10));
    var lo = approx_div1[/* lo */1];
    var hi = approx_div1[/* hi */0];
    var match = sub_aux(sub_aux(self, (lo << 3), (lo >>> 29) | (hi << 3)), (lo << 1), (lo >>> 31) | (hi << 1));
    var rem_lo = match[/* lo */1];
    var rem_hi = match[/* hi */0];
    if (rem_lo === 0 && rem_hi === 0) {
      return to_string(approx_div1) + "0";
    } else if (rem_hi < 0) {
      var rem_lo$1 = (((rem_lo ^ -1) + 1 & 4294967295) >>> 0);
      var delta = Math.ceil(rem_lo$1 / 10);
      var remainder = 10 * delta - rem_lo$1;
      return to_string(sub_aux(approx_div1, delta | 0, 0)) + String(remainder | 0);
    } else {
      var rem_lo$2 = rem_lo;
      var delta$1 = Math.floor(rem_lo$2 / 10);
      var remainder$1 = rem_lo$2 - 10 * delta$1;
      return to_string(add_lo(approx_div1, delta$1 | 0)) + String(remainder$1 | 0);
    }
  }
}

function div(_self, _other) {
  while(true) {
    var other = _other;
    var self = _self;
    var exit = 0;
    var exit$1 = 0;
    if (other[/* hi */0] !== 0 || other[/* lo */1] !== 0) {
      exit$1 = 3;
    } else {
      throw Caml_builtin_exceptions.division_by_zero;
    }
    if (exit$1 === 3) {
      var match = self[/* hi */0];
      if (match !== -2147483648) {
        if (match !== 0 || self[/* lo */1] !== 0) {
          exit = 2;
        } else {
          return zero;
        }
      } else if (self[/* lo */1] !== 0) {
        exit = 2;
      } else if (eq(other, one) || eq(other, neg_one)) {
        return self;
      } else if (eq(other, min_int)) {
        return one;
      } else {
        var half_this = asr_(self, 1);
        var approx = lsl_(div(half_this, other), 1);
        var exit$2 = 0;
        if (approx[/* hi */0] !== 0 || approx[/* lo */1] !== 0) {
          exit$2 = 4;
        } else if (other[/* hi */0] < 0) {
          return one;
        } else {
          return neg(one);
        }
        if (exit$2 === 4) {
          var rem = sub(self, mul(other, approx));
          return add(approx, div(rem, other));
        }
        
      }
    }
    if (exit === 2 && other[/* hi */0] === -2147483648 && other[/* lo */1] === 0) {
      return zero;
    }
    var other_hi = other[/* hi */0];
    if (self[/* hi */0] < 0) {
      if (other_hi < 0) {
        _other = neg(other);
        _self = neg(self);
        continue ;
      } else {
        return neg(div(neg(self), other));
      }
    } else if (other_hi < 0) {
      return neg(div(self, neg(other)));
    } else {
      var res = zero;
      var rem$1 = self;
      while(ge(rem$1, other)) {
        var approx$1 = Caml_primitive.caml_float_max(1, Math.floor(to_float(rem$1) / to_float(other)));
        var log2 = Math.ceil(Math.log(approx$1) / Math.LN2);
        var delta = log2 <= 48 ? 1 : Math.pow(2, log2 - 48);
        var approxRes = of_float(approx$1);
        var approxRem = mul(approxRes, other);
        while(approxRem[/* hi */0] < 0 || gt(approxRem, rem$1)) {
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
  };
}

function mod_(self, other) {
  return sub(self, mul(div(self, other), other));
}

function div_mod(self, other) {
  var quotient = div(self, other);
  return /* tuple */[
          quotient,
          sub(self, mul(quotient, other))
        ];
}

function compare(param, param$1) {
  var v = Caml_primitive.caml_nativeint_compare(param[/* hi */0], param$1[/* hi */0]);
  if (v === 0) {
    return Caml_primitive.caml_nativeint_compare(param[/* lo */1], param$1[/* lo */1]);
  } else {
    return v;
  }
}

function of_int32(lo) {
  return /* Int64 */[
          /* hi */lo < 0 ? -1 : 0,
          /* lo */(lo >>> 0)
        ];
}

function to_int32(param) {
  return param[/* lo */1] | 0;
}

function to_hex(x) {
  var x_lo = x[/* lo */1];
  var x_hi = x[/* hi */0];
  var aux = function (v) {
    return (v >>> 0).toString(16);
  };
  if (x_hi === 0 && x_lo === 0) {
    return "0";
  }
  if (x_lo !== 0) {
    if (x_hi !== 0) {
      var lo = aux(x_lo);
      var pad = 8 - lo.length | 0;
      if (pad <= 0) {
        return aux(x_hi) + lo;
      } else {
        return aux(x_hi) + (Caml_utils.repeat(pad, "0") + lo);
      }
    } else {
      return aux(x_lo);
    }
  } else {
    return aux(x_hi) + "00000000";
  }
}

function discard_sign(x) {
  return /* Int64 */[
          /* hi */2147483647 & x[/* hi */0],
          /* lo */x[/* lo */1]
        ];
}

function float_of_bits(param) {
  return (function(lo,hi){ return (new Float64Array(new Int32Array([lo,hi]).buffer))[0]})(param[/* lo */1], param[/* hi */0]);
}

function bits_of_float(x) {
  var buf = (function(x){return new Int32Array(new Float64Array([x]).buffer)})(x);
  return /* Int64 */[
          /* hi */buf[1],
          /* lo */(buf[0] >>> 0)
        ];
}

exports.succ = succ;
exports.min_int = min_int;
exports.max_int = max_int;
exports.one = one;
exports.zero = zero;
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
exports.swap = swap;
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
/* Caml_int32 Not a pure module */

},{"./caml_builtin_exceptions.js":4,"./caml_int32.js":9,"./caml_primitive.js":15,"./caml_utils.js":18}],11:[function(require,module,exports){
(function (process){
'use strict';

var Curry = require("./curry.js");

var stdout = {
  buffer: "",
  output: (function (param, s) {
      var v = s.length - 1 | 0;
      if (((typeof process !== "undefined") && process.stdout && process.stdout.write)) {
        return process.stdout.write(s);
      } else if (s[v] === "\n") {
        console.log(s.slice(0, v));
        return /* () */0;
      } else {
        console.log(s);
        return /* () */0;
      }
    })
};

var stderr = {
  buffer: "",
  output: (function (param, s) {
      var v = s.length - 1 | 0;
      if (s[v] === "\n") {
        console.log(s.slice(0, v));
        return /* () */0;
      } else {
        console.log(s);
        return /* () */0;
      }
    })
};

function caml_ml_flush(oc) {
  if (oc.buffer !== "") {
    Curry._2(oc.output, oc, oc.buffer);
    oc.buffer = "";
    return /* () */0;
  } else {
    return 0;
  }
}

function caml_ml_output(oc, str, offset, len) {
  var str$1 = offset === 0 && len === str.length ? str : str.slice(offset, len);
  if (((typeof process !== "undefined") && process.stdout && process.stdout.write) && oc === stdout) {
    return process.stdout.write(str$1);
  } else {
    var id = str$1.lastIndexOf("\n");
    if (id < 0) {
      oc.buffer = oc.buffer + str$1;
      return /* () */0;
    } else {
      oc.buffer = oc.buffer + str$1.slice(0, id + 1 | 0);
      caml_ml_flush(oc);
      oc.buffer = oc.buffer + str$1.slice(id + 1 | 0);
      return /* () */0;
    }
  }
}

function caml_ml_output_char(oc, $$char) {
  return caml_ml_output(oc, String.fromCharCode($$char), 0, 1);
}

function caml_ml_out_channels_list(param) {
  return /* :: */[
          stdout,
          /* :: */[
            stderr,
            /* [] */0
          ]
        ];
}

var stdin = undefined;

exports.stdin = stdin;
exports.stdout = stdout;
exports.stderr = stderr;
exports.caml_ml_flush = caml_ml_flush;
exports.caml_ml_output = caml_ml_output;
exports.caml_ml_output_char = caml_ml_output_char;
exports.caml_ml_out_channels_list = caml_ml_out_channels_list;
/* No side effect */

}).call(this,require('_process'))
},{"./curry.js":20,"_process":24}],12:[function(require,module,exports){
'use strict';

var Caml_option = require("./caml_option.js");
var Caml_exceptions = require("./caml_exceptions.js");

var $$Error = Caml_exceptions.create("Caml_js_exceptions.Error");

function internalToOCamlException(e) {
  if (Caml_exceptions.caml_is_extension(e)) {
    return e;
  } else {
    return [
            $$Error,
            e
          ];
  }
}

function caml_as_js_exn(exn) {
  if (exn[0] === $$Error) {
    return Caml_option.some(exn[1]);
  }
  
}

exports.$$Error = $$Error;
exports.internalToOCamlException = internalToOCamlException;
exports.caml_as_js_exn = caml_as_js_exn;
/* No side effect */

},{"./caml_exceptions.js":6,"./caml_option.js":14}],13:[function(require,module,exports){
'use strict';

var Block = require("./block.js");
var Caml_primitive = require("./caml_primitive.js");
var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

var for_in = (function(o,foo){
        for (var x in o) { foo(x) }});

function caml_obj_block(tag, size) {
  var v = new Array(size);
  v.tag = tag;
  return v;
}

function caml_obj_dup(x) {
  if (Array.isArray(x)) {
    var len = x.length | 0;
    var v = new Array(len);
    for(var i = 0 ,i_finish = len - 1 | 0; i <= i_finish; ++i){
      v[i] = x[i];
    }
    v.tag = x.tag | 0;
    return v;
  } else {
    return Object.assign(({}), x);
  }
}

function caml_obj_truncate(x, new_size) {
  var len = x.length | 0;
  if (new_size <= 0 || new_size > len) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Obj.truncate"
        ];
  }
  if (len !== new_size) {
    for(var i = new_size ,i_finish = len - 1 | 0; i <= i_finish; ++i){
      x[i] = 0;
    }
    x.length = new_size;
    return /* () */0;
  } else {
    return 0;
  }
}

function caml_lazy_make_forward(x) {
  return Block.__(250, [x]);
}

function caml_lazy_make(fn) {
  var block = [fn];
  block.tag = 246;
  return block;
}

var caml_update_dummy = (function(x,y){
  for (var k in y){
    x[k] = y[k]
  }
  return 0;
  });

function caml_compare(_a, _b) {
  while(true) {
    var b = _b;
    var a = _a;
    if (a === b) {
      return 0;
    } else {
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
              throw [
                    Caml_builtin_exceptions.invalid_argument,
                    "compare: functional value"
                  ];
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
          } else if (b_type === "boolean") {
            return -1;
          } else if (a_type === "function") {
            return 1;
          } else if (b_type === "function") {
            return -1;
          } else if (a_type === "number") {
            if (b === null || b.tag === 256) {
              return 1;
            } else {
              return -1;
            }
          } else if (b_type === "number") {
            if (a === null || a.tag === 256) {
              return -1;
            } else {
              return 1;
            }
          } else if (a === null) {
            if (b.tag === 256) {
              return 1;
            } else {
              return -1;
            }
          } else if (b === null) {
            if (a.tag === 256) {
              return -1;
            } else {
              return 1;
            }
          } else {
            var tag_a = a.tag | 0;
            var tag_b = b.tag | 0;
            if (tag_a === 250) {
              _a = a[0];
              continue ;
            } else if (tag_b === 250) {
              _b = b[0];
              continue ;
            } else if (tag_a === 256) {
              if (tag_b === 256) {
                return Caml_primitive.caml_int_compare(a[1], b[1]);
              } else {
                return -1;
              }
            } else if (tag_a === 248) {
              return Caml_primitive.caml_int_compare(a[1], b[1]);
            } else {
              if (tag_a === 251) {
                throw [
                      Caml_builtin_exceptions.invalid_argument,
                      "equal: abstract value"
                    ];
              }
              if (tag_a !== tag_b) {
                if (tag_a < tag_b) {
                  return -1;
                } else {
                  return 1;
                }
              } else {
                var len_a = a.length | 0;
                var len_b = b.length | 0;
                if (len_a === len_b) {
                  if (Array.isArray(a)) {
                    var a$1 = a;
                    var b$1 = b;
                    var _i = 0;
                    var same_length = len_a;
                    while(true) {
                      var i = _i;
                      if (i === same_length) {
                        return 0;
                      } else {
                        var res = caml_compare(a$1[i], b$1[i]);
                        if (res !== 0) {
                          return res;
                        } else {
                          _i = i + 1 | 0;
                          continue ;
                        }
                      }
                    };
                  } else if ((a instanceof Date && b instanceof Date)) {
                    return (a - b);
                  } else {
                    var a$2 = a;
                    var b$2 = b;
                    var min_key_lhs = {
                      contents: undefined
                    };
                    var min_key_rhs = {
                      contents: undefined
                    };
                    var do_key = function (param, key) {
                      var min_key = param[2];
                      var b = param[1];
                      if (!b.hasOwnProperty(key) || caml_compare(param[0][key], b[key]) > 0) {
                        var match = min_key.contents;
                        if (match !== undefined && key >= match) {
                          return 0;
                        } else {
                          min_key.contents = key;
                          return /* () */0;
                        }
                      } else {
                        return 0;
                      }
                    };
                    var partial_arg = /* tuple */[
                      a$2,
                      b$2,
                      min_key_rhs
                    ];
                    var do_key_a = (function(partial_arg){
                    return function do_key_a(param) {
                      return do_key(partial_arg, param);
                    }
                    }(partial_arg));
                    var partial_arg$1 = /* tuple */[
                      b$2,
                      a$2,
                      min_key_lhs
                    ];
                    var do_key_b = (function(partial_arg$1){
                    return function do_key_b(param) {
                      return do_key(partial_arg$1, param);
                    }
                    }(partial_arg$1));
                    for_in(a$2, do_key_a);
                    for_in(b$2, do_key_b);
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
                } else if (len_a < len_b) {
                  var a$3 = a;
                  var b$3 = b;
                  var _i$1 = 0;
                  var short_length = len_a;
                  while(true) {
                    var i$1 = _i$1;
                    if (i$1 === short_length) {
                      return -1;
                    } else {
                      var res$1 = caml_compare(a$3[i$1], b$3[i$1]);
                      if (res$1 !== 0) {
                        return res$1;
                      } else {
                        _i$1 = i$1 + 1 | 0;
                        continue ;
                      }
                    }
                  };
                } else {
                  var a$4 = a;
                  var b$4 = b;
                  var _i$2 = 0;
                  var short_length$1 = len_b;
                  while(true) {
                    var i$2 = _i$2;
                    if (i$2 === short_length$1) {
                      return 1;
                    } else {
                      var res$2 = caml_compare(a$4[i$2], b$4[i$2]);
                      if (res$2 !== 0) {
                        return res$2;
                      } else {
                        _i$2 = i$2 + 1 | 0;
                        continue ;
                      }
                    }
                  };
                }
              }
            }
          }
      }
    }
  };
}

function caml_equal(_a, _b) {
  while(true) {
    var b = _b;
    var a = _a;
    if (a === b) {
      return true;
    } else {
      var a_type = typeof a;
      if (a_type === "string" || a_type === "number" || a_type === "boolean" || a_type === "undefined" || a === null) {
        return false;
      } else {
        var b_type = typeof b;
        if (a_type === "function" || b_type === "function") {
          throw [
                Caml_builtin_exceptions.invalid_argument,
                "equal: functional value"
              ];
        }
        if (b_type === "number" || b_type === "undefined" || b === null) {
          return false;
        } else {
          var tag_a = a.tag | 0;
          var tag_b = b.tag | 0;
          if (tag_a === 250) {
            _a = a[0];
            continue ;
          } else if (tag_b === 250) {
            _b = b[0];
            continue ;
          } else if (tag_a === 248) {
            return a[1] === b[1];
          } else {
            if (tag_a === 251) {
              throw [
                    Caml_builtin_exceptions.invalid_argument,
                    "equal: abstract value"
                  ];
            }
            if (tag_a !== tag_b) {
              return false;
            } else if (tag_a === 256) {
              return a[1] === b[1];
            } else {
              var len_a = a.length | 0;
              var len_b = b.length | 0;
              if (len_a === len_b) {
                if (Array.isArray(a)) {
                  var a$1 = a;
                  var b$1 = b;
                  var _i = 0;
                  var same_length = len_a;
                  while(true) {
                    var i = _i;
                    if (i === same_length) {
                      return true;
                    } else if (caml_equal(a$1[i], b$1[i])) {
                      _i = i + 1 | 0;
                      continue ;
                    } else {
                      return false;
                    }
                  };
                } else if ((a instanceof Date && b instanceof Date)) {
                  return !(a > b || a < b);
                } else {
                  var a$2 = a;
                  var b$2 = b;
                  var result = {
                    contents: true
                  };
                  var do_key_a = (function(b$2,result){
                  return function do_key_a(key) {
                    if (b$2.hasOwnProperty(key)) {
                      return 0;
                    } else {
                      result.contents = false;
                      return /* () */0;
                    }
                  }
                  }(b$2,result));
                  var do_key_b = (function(a$2,b$2,result){
                  return function do_key_b(key) {
                    if (!a$2.hasOwnProperty(key) || !caml_equal(b$2[key], a$2[key])) {
                      result.contents = false;
                      return /* () */0;
                    } else {
                      return 0;
                    }
                  }
                  }(a$2,b$2,result));
                  for_in(a$2, do_key_a);
                  if (result.contents) {
                    for_in(b$2, do_key_b);
                  }
                  return result.contents;
                }
              } else {
                return false;
              }
            }
          }
        }
      }
    }
  };
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

function caml_obj_set_tag(prim, prim$1) {
  prim.tag = prim$1;
  return /* () */0;
}

exports.caml_obj_block = caml_obj_block;
exports.caml_obj_dup = caml_obj_dup;
exports.caml_obj_truncate = caml_obj_truncate;
exports.caml_lazy_make_forward = caml_lazy_make_forward;
exports.caml_lazy_make = caml_lazy_make;
exports.caml_update_dummy = caml_update_dummy;
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
exports.caml_obj_set_tag = caml_obj_set_tag;
/* No side effect */

},{"./block.js":2,"./caml_builtin_exceptions.js":4,"./caml_primitive.js":15}],14:[function(require,module,exports){
'use strict';


var undefinedHeader = [];

function some(x) {
  if (x === undefined) {
    var block = /* tuple */[
      undefinedHeader,
      0
    ];
    block.tag = 256;
    return block;
  } else if (x !== null && x[0] === undefinedHeader) {
    var nid = x[1] + 1 | 0;
    var block$1 = /* tuple */[
      undefinedHeader,
      nid
    ];
    block$1.tag = 256;
    return block$1;
  } else {
    return x;
  }
}

function nullable_to_opt(x) {
  if (x === null || x === undefined) {
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
  if (x !== null && x[0] === undefinedHeader) {
    var depth = x[1];
    if (depth === 0) {
      return ;
    } else {
      return /* tuple */[
              undefinedHeader,
              depth - 1 | 0
            ];
    }
  } else {
    return x;
  }
}

function option_get(x) {
  if (x === undefined) {
    return ;
  } else {
    return valFromOption(x);
  }
}

function option_get_unwrap(x) {
  if (x === undefined) {
    return ;
  } else {
    return valFromOption(x)[1];
  }
}

exports.nullable_to_opt = nullable_to_opt;
exports.undefined_to_opt = undefined_to_opt;
exports.null_to_opt = null_to_opt;
exports.valFromOption = valFromOption;
exports.some = some;
exports.option_get = option_get;
exports.option_get_unwrap = option_get_unwrap;
/* No side effect */

},{}],15:[function(require,module,exports){
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

function caml_bytes_compare_aux(s1, s2, _off, len, def) {
  while(true) {
    var off = _off;
    if (off < len) {
      var a = s1[off];
      var b = s2[off];
      if (a > b) {
        return 1;
      } else if (a < b) {
        return -1;
      } else {
        _off = off + 1 | 0;
        continue ;
      }
    } else {
      return def;
    }
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
    var s1$1 = s1;
    var s2$1 = s2;
    var _off = 0;
    var len = len1;
    while(true) {
      var off = _off;
      if (off === len) {
        return true;
      } else {
        var a = s1$1[off];
        var b = s2$1[off];
        if (a === b) {
          _off = off + 1 | 0;
          continue ;
        } else {
          return false;
        }
      }
    };
  } else {
    return false;
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

function caml_nativeint_min(x, y) {
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

function caml_nativeint_max(x, y) {
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

var caml_nativeint_compare = caml_int_compare;

var caml_int32_compare = caml_int_compare;

exports.caml_bytes_compare = caml_bytes_compare;
exports.caml_bytes_equal = caml_bytes_equal;
exports.caml_int_compare = caml_int_compare;
exports.caml_bool_compare = caml_bool_compare;
exports.caml_float_compare = caml_float_compare;
exports.caml_nativeint_compare = caml_nativeint_compare;
exports.caml_string_compare = caml_string_compare;
exports.caml_int32_compare = caml_int32_compare;
exports.caml_bool_min = caml_bool_min;
exports.caml_int_min = caml_int_min;
exports.caml_float_min = caml_float_min;
exports.caml_string_min = caml_string_min;
exports.caml_nativeint_min = caml_nativeint_min;
exports.caml_int32_min = caml_int32_min;
exports.caml_bool_max = caml_bool_max;
exports.caml_int_max = caml_int_max;
exports.caml_float_max = caml_float_max;
exports.caml_string_max = caml_string_max;
exports.caml_nativeint_max = caml_nativeint_max;
exports.caml_int32_max = caml_int32_max;
/* No side effect */

},{}],16:[function(require,module,exports){
'use strict';

var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

function get(s, i) {
  if (i >= s.length || i < 0) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "index out of bounds"
        ];
  }
  return s.charCodeAt(i);
}

exports.get = get;
/* No side effect */

},{"./caml_builtin_exceptions.js":4}],17:[function(require,module,exports){
(function (process){
'use strict';

var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

function caml_sys_getenv(s) {
  if (typeof process === "undefined" || process.env === undefined) {
    throw Caml_builtin_exceptions.not_found;
  }
  var match = process.env[s];
  if (match !== undefined) {
    return match;
  } else {
    throw Caml_builtin_exceptions.not_found;
  }
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

function caml_sys_random_seed(param) {
  return [((Date.now() | 0) ^ 4294967295) * Math.random() | 0];
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
    return /* tuple */[
            "",
            [""]
          ];
  } else {
    var argv = process.argv;
    if (argv == null) {
      return /* tuple */[
              "",
              [""]
            ];
    } else {
      return /* tuple */[
              argv[0],
              argv
            ];
    }
  }
}

function caml_sys_exit(exit_code) {
  if (typeof process !== "undefined") {
    return process.exit(exit_code);
  } else {
    return 0;
  }
}

function caml_sys_is_directory(_s) {
  throw [
        Caml_builtin_exceptions.failure,
        "caml_sys_is_directory not implemented"
      ];
}

function caml_sys_file_exists(_s) {
  throw [
        Caml_builtin_exceptions.failure,
        "caml_sys_file_exists not implemented"
      ];
}

exports.caml_sys_getenv = caml_sys_getenv;
exports.caml_sys_time = caml_sys_time;
exports.os_type = os_type;
exports.caml_sys_random_seed = caml_sys_random_seed;
exports.caml_sys_system_command = caml_sys_system_command;
exports.caml_sys_getcwd = caml_sys_getcwd;
exports.caml_sys_get_argv = caml_sys_get_argv;
exports.caml_sys_exit = caml_sys_exit;
exports.caml_sys_is_directory = caml_sys_is_directory;
exports.caml_sys_file_exists = caml_sys_file_exists;
/* No side effect */

}).call(this,require('_process'))
},{"./caml_builtin_exceptions.js":4,"_process":24}],18:[function(require,module,exports){
'use strict';


var repeat = (function(count,self){
    if (self.repeat){
        return self.repeat(count)
    }
    if (self.length == 0 || count == 0) {
            return '';
        }
    // Ensuring count is a 31-bit integer allows us to heavily optimize the
    // main part. But anyway, most current (August 2014) browsers can't handle
    // strings 1 << 28 chars or longer, so:
    if (self.length * count >= 1 << 28) {
            throw new RangeError('repeat count must not overflow maximum string size');
    }
    var rpt = '';
    for (;;) {
            if ((count & 1) == 1) {
                rpt += self;
            }
            count >>>= 1;
            if (count == 0) {
                break;
            }
            self += self;
    }
    return rpt;
});

exports.repeat = repeat;
/* No side effect */

},{}],19:[function(require,module,exports){
'use strict';

var Block = require("./block.js");

function erase_rel(param) {
  if (typeof param === "number") {
    return /* End_of_fmtty */0;
  } else {
    switch (param.tag | 0) {
      case /* Char_ty */0 :
          return /* Char_ty */Block.__(0, [erase_rel(param[0])]);
      case /* String_ty */1 :
          return /* String_ty */Block.__(1, [erase_rel(param[0])]);
      case /* Int_ty */2 :
          return /* Int_ty */Block.__(2, [erase_rel(param[0])]);
      case /* Int32_ty */3 :
          return /* Int32_ty */Block.__(3, [erase_rel(param[0])]);
      case /* Nativeint_ty */4 :
          return /* Nativeint_ty */Block.__(4, [erase_rel(param[0])]);
      case /* Int64_ty */5 :
          return /* Int64_ty */Block.__(5, [erase_rel(param[0])]);
      case /* Float_ty */6 :
          return /* Float_ty */Block.__(6, [erase_rel(param[0])]);
      case /* Bool_ty */7 :
          return /* Bool_ty */Block.__(7, [erase_rel(param[0])]);
      case /* Format_arg_ty */8 :
          return /* Format_arg_ty */Block.__(8, [
                    param[0],
                    erase_rel(param[1])
                  ]);
      case /* Format_subst_ty */9 :
          var ty1 = param[0];
          return /* Format_subst_ty */Block.__(9, [
                    ty1,
                    ty1,
                    erase_rel(param[2])
                  ]);
      case /* Alpha_ty */10 :
          return /* Alpha_ty */Block.__(10, [erase_rel(param[0])]);
      case /* Theta_ty */11 :
          return /* Theta_ty */Block.__(11, [erase_rel(param[0])]);
      case /* Any_ty */12 :
          return /* Any_ty */Block.__(12, [erase_rel(param[0])]);
      case /* Reader_ty */13 :
          return /* Reader_ty */Block.__(13, [erase_rel(param[0])]);
      case /* Ignored_reader_ty */14 :
          return /* Ignored_reader_ty */Block.__(14, [erase_rel(param[0])]);
      
    }
  }
}

function concat_fmtty(fmtty1, fmtty2) {
  if (typeof fmtty1 === "number") {
    return fmtty2;
  } else {
    switch (fmtty1.tag | 0) {
      case /* Char_ty */0 :
          return /* Char_ty */Block.__(0, [concat_fmtty(fmtty1[0], fmtty2)]);
      case /* String_ty */1 :
          return /* String_ty */Block.__(1, [concat_fmtty(fmtty1[0], fmtty2)]);
      case /* Int_ty */2 :
          return /* Int_ty */Block.__(2, [concat_fmtty(fmtty1[0], fmtty2)]);
      case /* Int32_ty */3 :
          return /* Int32_ty */Block.__(3, [concat_fmtty(fmtty1[0], fmtty2)]);
      case /* Nativeint_ty */4 :
          return /* Nativeint_ty */Block.__(4, [concat_fmtty(fmtty1[0], fmtty2)]);
      case /* Int64_ty */5 :
          return /* Int64_ty */Block.__(5, [concat_fmtty(fmtty1[0], fmtty2)]);
      case /* Float_ty */6 :
          return /* Float_ty */Block.__(6, [concat_fmtty(fmtty1[0], fmtty2)]);
      case /* Bool_ty */7 :
          return /* Bool_ty */Block.__(7, [concat_fmtty(fmtty1[0], fmtty2)]);
      case /* Format_arg_ty */8 :
          return /* Format_arg_ty */Block.__(8, [
                    fmtty1[0],
                    concat_fmtty(fmtty1[1], fmtty2)
                  ]);
      case /* Format_subst_ty */9 :
          return /* Format_subst_ty */Block.__(9, [
                    fmtty1[0],
                    fmtty1[1],
                    concat_fmtty(fmtty1[2], fmtty2)
                  ]);
      case /* Alpha_ty */10 :
          return /* Alpha_ty */Block.__(10, [concat_fmtty(fmtty1[0], fmtty2)]);
      case /* Theta_ty */11 :
          return /* Theta_ty */Block.__(11, [concat_fmtty(fmtty1[0], fmtty2)]);
      case /* Any_ty */12 :
          return /* Any_ty */Block.__(12, [concat_fmtty(fmtty1[0], fmtty2)]);
      case /* Reader_ty */13 :
          return /* Reader_ty */Block.__(13, [concat_fmtty(fmtty1[0], fmtty2)]);
      case /* Ignored_reader_ty */14 :
          return /* Ignored_reader_ty */Block.__(14, [concat_fmtty(fmtty1[0], fmtty2)]);
      
    }
  }
}

function concat_fmt(fmt1, fmt2) {
  if (typeof fmt1 === "number") {
    return fmt2;
  } else {
    switch (fmt1.tag | 0) {
      case /* Char */0 :
          return /* Char */Block.__(0, [concat_fmt(fmt1[0], fmt2)]);
      case /* Caml_char */1 :
          return /* Caml_char */Block.__(1, [concat_fmt(fmt1[0], fmt2)]);
      case /* String */2 :
          return /* String */Block.__(2, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case /* Caml_string */3 :
          return /* Caml_string */Block.__(3, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case /* Int */4 :
          return /* Int */Block.__(4, [
                    fmt1[0],
                    fmt1[1],
                    fmt1[2],
                    concat_fmt(fmt1[3], fmt2)
                  ]);
      case /* Int32 */5 :
          return /* Int32 */Block.__(5, [
                    fmt1[0],
                    fmt1[1],
                    fmt1[2],
                    concat_fmt(fmt1[3], fmt2)
                  ]);
      case /* Nativeint */6 :
          return /* Nativeint */Block.__(6, [
                    fmt1[0],
                    fmt1[1],
                    fmt1[2],
                    concat_fmt(fmt1[3], fmt2)
                  ]);
      case /* Int64 */7 :
          return /* Int64 */Block.__(7, [
                    fmt1[0],
                    fmt1[1],
                    fmt1[2],
                    concat_fmt(fmt1[3], fmt2)
                  ]);
      case /* Float */8 :
          return /* Float */Block.__(8, [
                    fmt1[0],
                    fmt1[1],
                    fmt1[2],
                    concat_fmt(fmt1[3], fmt2)
                  ]);
      case /* Bool */9 :
          return /* Bool */Block.__(9, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case /* Flush */10 :
          return /* Flush */Block.__(10, [concat_fmt(fmt1[0], fmt2)]);
      case /* String_literal */11 :
          return /* String_literal */Block.__(11, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case /* Char_literal */12 :
          return /* Char_literal */Block.__(12, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case /* Format_arg */13 :
          return /* Format_arg */Block.__(13, [
                    fmt1[0],
                    fmt1[1],
                    concat_fmt(fmt1[2], fmt2)
                  ]);
      case /* Format_subst */14 :
          return /* Format_subst */Block.__(14, [
                    fmt1[0],
                    fmt1[1],
                    concat_fmt(fmt1[2], fmt2)
                  ]);
      case /* Alpha */15 :
          return /* Alpha */Block.__(15, [concat_fmt(fmt1[0], fmt2)]);
      case /* Theta */16 :
          return /* Theta */Block.__(16, [concat_fmt(fmt1[0], fmt2)]);
      case /* Formatting_lit */17 :
          return /* Formatting_lit */Block.__(17, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case /* Formatting_gen */18 :
          return /* Formatting_gen */Block.__(18, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case /* Reader */19 :
          return /* Reader */Block.__(19, [concat_fmt(fmt1[0], fmt2)]);
      case /* Scan_char_set */20 :
          return /* Scan_char_set */Block.__(20, [
                    fmt1[0],
                    fmt1[1],
                    concat_fmt(fmt1[2], fmt2)
                  ]);
      case /* Scan_get_counter */21 :
          return /* Scan_get_counter */Block.__(21, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case /* Scan_next_char */22 :
          return /* Scan_next_char */Block.__(22, [concat_fmt(fmt1[0], fmt2)]);
      case /* Ignored_param */23 :
          return /* Ignored_param */Block.__(23, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case /* Custom */24 :
          return /* Custom */Block.__(24, [
                    fmt1[0],
                    fmt1[1],
                    concat_fmt(fmt1[2], fmt2)
                  ]);
      
    }
  }
}

exports.concat_fmtty = concat_fmtty;
exports.erase_rel = erase_rel;
exports.concat_fmt = concat_fmt;
/* No side effect */

},{"./block.js":2}],20:[function(require,module,exports){
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
    } else if (d < 0) {
      _args = Caml_array.caml_array_sub(args, arity, -d | 0);
      _f = f.apply(null, Caml_array.caml_array_sub(args, 0, arity));
      continue ;
    } else {
      return (function(f,args){
      return function (x) {
        return app(f, args.concat([x]));
      }
      }(f,args));
    }
  };
}

function curry_1(o, a0, arity) {
  switch (arity) {
    case 1 :
        return o(a0);
    case 2 :
        return (function (param) {
            return o(a0, param);
          });
    case 3 :
        return (function (param, param$1) {
            return o(a0, param, param$1);
          });
    case 4 :
        return (function (param, param$1, param$2) {
            return o(a0, param, param$1, param$2);
          });
    case 5 :
        return (function (param, param$1, param$2, param$3) {
            return o(a0, param, param$1, param$2, param$3);
          });
    case 6 :
        return (function (param, param$1, param$2, param$3, param$4) {
            return o(a0, param, param$1, param$2, param$3, param$4);
          });
    case 7 :
        return (function (param, param$1, param$2, param$3, param$4, param$5) {
            return o(a0, param, param$1, param$2, param$3, param$4, param$5);
          });
    default:
      return app(o, [a0]);
  }
}

function _1(o, a0) {
  var arity = o.length;
  if (arity === 1) {
    return o(a0);
  } else {
    return curry_1(o, a0, arity);
  }
}

function __1(o) {
  var arity = o.length;
  if (arity === 1) {
    return o;
  } else {
    return (function (a0) {
        return _1(o, a0);
      });
  }
}

function curry_2(o, a0, a1, arity) {
  switch (arity) {
    case 1 :
        return app(o(a0), [a1]);
    case 2 :
        return o(a0, a1);
    case 3 :
        return (function (param) {
            return o(a0, a1, param);
          });
    case 4 :
        return (function (param, param$1) {
            return o(a0, a1, param, param$1);
          });
    case 5 :
        return (function (param, param$1, param$2) {
            return o(a0, a1, param, param$1, param$2);
          });
    case 6 :
        return (function (param, param$1, param$2, param$3) {
            return o(a0, a1, param, param$1, param$2, param$3);
          });
    case 7 :
        return (function (param, param$1, param$2, param$3, param$4) {
            return o(a0, a1, param, param$1, param$2, param$3, param$4);
          });
    default:
      return app(o, [
                  a0,
                  a1
                ]);
  }
}

function _2(o, a0, a1) {
  var arity = o.length;
  if (arity === 2) {
    return o(a0, a1);
  } else {
    return curry_2(o, a0, a1, arity);
  }
}

function __2(o) {
  var arity = o.length;
  if (arity === 2) {
    return o;
  } else {
    return (function (a0, a1) {
        return _2(o, a0, a1);
      });
  }
}

function curry_3(o, a0, a1, a2, arity) {
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
        return (function (param) {
            return o(a0, a1, a2, param);
          });
    case 5 :
        return (function (param, param$1) {
            return o(a0, a1, a2, param, param$1);
          });
    case 6 :
        return (function (param, param$1, param$2) {
            return o(a0, a1, a2, param, param$1, param$2);
          });
    case 7 :
        return (function (param, param$1, param$2, param$3) {
            return o(a0, a1, a2, param, param$1, param$2, param$3);
          });
    default:
      return app(o, [
                  a0,
                  a1,
                  a2
                ]);
  }
}

function _3(o, a0, a1, a2) {
  var arity = o.length;
  if (arity === 3) {
    return o(a0, a1, a2);
  } else {
    return curry_3(o, a0, a1, a2, arity);
  }
}

function __3(o) {
  var arity = o.length;
  if (arity === 3) {
    return o;
  } else {
    return (function (a0, a1, a2) {
        return _3(o, a0, a1, a2);
      });
  }
}

function curry_4(o, a0, a1, a2, a3, arity) {
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
        return (function (param) {
            return o(a0, a1, a2, a3, param);
          });
    case 6 :
        return (function (param, param$1) {
            return o(a0, a1, a2, a3, param, param$1);
          });
    case 7 :
        return (function (param, param$1, param$2) {
            return o(a0, a1, a2, a3, param, param$1, param$2);
          });
    default:
      return app(o, [
                  a0,
                  a1,
                  a2,
                  a3
                ]);
  }
}

function _4(o, a0, a1, a2, a3) {
  var arity = o.length;
  if (arity === 4) {
    return o(a0, a1, a2, a3);
  } else {
    return curry_4(o, a0, a1, a2, a3, arity);
  }
}

function __4(o) {
  var arity = o.length;
  if (arity === 4) {
    return o;
  } else {
    return (function (a0, a1, a2, a3) {
        return _4(o, a0, a1, a2, a3);
      });
  }
}

function curry_5(o, a0, a1, a2, a3, a4, arity) {
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
        return (function (param) {
            return o(a0, a1, a2, a3, a4, param);
          });
    case 7 :
        return (function (param, param$1) {
            return o(a0, a1, a2, a3, a4, param, param$1);
          });
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

function _5(o, a0, a1, a2, a3, a4) {
  var arity = o.length;
  if (arity === 5) {
    return o(a0, a1, a2, a3, a4);
  } else {
    return curry_5(o, a0, a1, a2, a3, a4, arity);
  }
}

function __5(o) {
  var arity = o.length;
  if (arity === 5) {
    return o;
  } else {
    return (function (a0, a1, a2, a3, a4) {
        return _5(o, a0, a1, a2, a3, a4);
      });
  }
}

function curry_6(o, a0, a1, a2, a3, a4, a5, arity) {
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
        return (function (param) {
            return o(a0, a1, a2, a3, a4, a5, param);
          });
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

function _6(o, a0, a1, a2, a3, a4, a5) {
  var arity = o.length;
  if (arity === 6) {
    return o(a0, a1, a2, a3, a4, a5);
  } else {
    return curry_6(o, a0, a1, a2, a3, a4, a5, arity);
  }
}

function __6(o) {
  var arity = o.length;
  if (arity === 6) {
    return o;
  } else {
    return (function (a0, a1, a2, a3, a4, a5) {
        return _6(o, a0, a1, a2, a3, a4, a5);
      });
  }
}

function curry_7(o, a0, a1, a2, a3, a4, a5, a6, arity) {
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

function _7(o, a0, a1, a2, a3, a4, a5, a6) {
  var arity = o.length;
  if (arity === 7) {
    return o(a0, a1, a2, a3, a4, a5, a6);
  } else {
    return curry_7(o, a0, a1, a2, a3, a4, a5, a6, arity);
  }
}

function __7(o) {
  var arity = o.length;
  if (arity === 7) {
    return o;
  } else {
    return (function (a0, a1, a2, a3, a4, a5, a6) {
        return _7(o, a0, a1, a2, a3, a4, a5, a6);
      });
  }
}

function curry_8(o, a0, a1, a2, a3, a4, a5, a6, a7, arity) {
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

function _8(o, a0, a1, a2, a3, a4, a5, a6, a7) {
  var arity = o.length;
  if (arity === 8) {
    return o(a0, a1, a2, a3, a4, a5, a6, a7);
  } else {
    return curry_8(o, a0, a1, a2, a3, a4, a5, a6, a7, arity);
  }
}

function __8(o) {
  var arity = o.length;
  if (arity === 8) {
    return o;
  } else {
    return (function (a0, a1, a2, a3, a4, a5, a6, a7) {
        return _8(o, a0, a1, a2, a3, a4, a5, a6, a7);
      });
  }
}

exports.app = app;
exports.curry_1 = curry_1;
exports._1 = _1;
exports.__1 = __1;
exports.curry_2 = curry_2;
exports._2 = _2;
exports.__2 = __2;
exports.curry_3 = curry_3;
exports._3 = _3;
exports.__3 = __3;
exports.curry_4 = curry_4;
exports._4 = _4;
exports.__4 = __4;
exports.curry_5 = curry_5;
exports._5 = _5;
exports.__5 = __5;
exports.curry_6 = curry_6;
exports._6 = _6;
exports.__6 = __6;
exports.curry_7 = curry_7;
exports._7 = _7;
exports.__7 = __7;
exports.curry_8 = curry_8;
exports._8 = _8;
exports.__8 = __8;
/* No side effect */

},{"./caml_array.js":3}],21:[function(require,module,exports){
'use strict';


function binarySearch(upper, id, array) {
  var _lower = 0;
  var _upper = upper;
  var xs = array;
  var k = id;
  while(true) {
    var upper$1 = _upper;
    var lower = _lower;
    if (lower >= upper$1) {
      throw new Error("binarySearchAux");
    }
    var mid = (lower + upper$1 | 0) / 2 | 0;
    var match = xs[mid];
    var i = match[0];
    if (i === k) {
      return match[1];
    } else if (i < k) {
      _lower = mid + 1 | 0;
      continue ;
    } else {
      _upper = mid;
      continue ;
    }
  };
}

function revSearch(len, array, x) {
  var _i = 0;
  var len$1 = len;
  var xs = array;
  var k = x;
  while(true) {
    var i = _i;
    if (i === len$1) {
      return ;
    } else {
      var match = xs[i];
      if (match[1] === k) {
        return match[0];
      } else {
        _i = i + 1 | 0;
        continue ;
      }
    }
  };
}

function revSearchAssert(len, array, x) {
  var len$1 = len;
  var _i = 0;
  var xs = array;
  var k = x;
  while(true) {
    var i = _i;
    if (i >= len$1) {
      throw new Error("File \"js_mapperRt.ml\", line 63, characters 4-10");
    }
    var match = xs[i];
    if (match[1] === k) {
      return match[0];
    } else {
      _i = i + 1 | 0;
      continue ;
    }
  };
}

function toInt(i, xs) {
  return xs[i];
}

function fromInt(len, xs, $$enum) {
  var $$enum$1 = $$enum;
  var _i = 0;
  var len$1 = len;
  var xs$1 = xs;
  while(true) {
    var i = _i;
    if (i === len$1) {
      return ;
    } else {
      var k = xs$1[i];
      if (k === $$enum$1) {
        return i;
      } else {
        _i = i + 1 | 0;
        continue ;
      }
    }
  };
}

function fromIntAssert(len, xs, $$enum) {
  var len$1 = len;
  var $$enum$1 = $$enum;
  var _i = 0;
  var xs$1 = xs;
  while(true) {
    var i = _i;
    if (i >= len$1) {
      throw new Error("File \"js_mapperRt.ml\", line 87, characters 4-10");
    }
    var k = xs$1[i];
    if (k === $$enum$1) {
      return i;
    } else {
      _i = i + 1 | 0;
      continue ;
    }
  };
}

exports.binarySearch = binarySearch;
exports.revSearch = revSearch;
exports.revSearchAssert = revSearchAssert;
exports.toInt = toInt;
exports.fromInt = fromInt;
exports.fromIntAssert = fromIntAssert;
/* No side effect */

},{}],22:[function(require,module,exports){
'use strict';

var Curry = require("./curry.js");
var Caml_obj = require("./caml_obj.js");
var Pervasives = require("./pervasives.js");
var Caml_option = require("./caml_option.js");
var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

function length(l) {
  var _len = 0;
  var _param = l;
  while(true) {
    var param = _param;
    var len = _len;
    if (param) {
      _param = param[1];
      _len = len + 1 | 0;
      continue ;
    } else {
      return len;
    }
  };
}

function cons(a, l) {
  return /* :: */[
          a,
          l
        ];
}

function hd(param) {
  if (param) {
    return param[0];
  } else {
    throw [
          Caml_builtin_exceptions.failure,
          "hd"
        ];
  }
}

function tl(param) {
  if (param) {
    return param[1];
  } else {
    throw [
          Caml_builtin_exceptions.failure,
          "tl"
        ];
  }
}

function nth(l, n) {
  if (n < 0) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "List.nth"
        ];
  }
  var _l = l;
  var _n = n;
  while(true) {
    var n$1 = _n;
    var l$1 = _l;
    if (l$1) {
      if (n$1 === 0) {
        return l$1[0];
      } else {
        _n = n$1 - 1 | 0;
        _l = l$1[1];
        continue ;
      }
    } else {
      throw [
            Caml_builtin_exceptions.failure,
            "nth"
          ];
    }
  };
}

function nth_opt(l, n) {
  if (n < 0) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "List.nth"
        ];
  }
  var _l = l;
  var _n = n;
  while(true) {
    var n$1 = _n;
    var l$1 = _l;
    if (l$1) {
      if (n$1 === 0) {
        return Caml_option.some(l$1[0]);
      } else {
        _n = n$1 - 1 | 0;
        _l = l$1[1];
        continue ;
      }
    } else {
      return ;
    }
  };
}

function rev_append(_l1, _l2) {
  while(true) {
    var l2 = _l2;
    var l1 = _l1;
    if (l1) {
      _l2 = /* :: */[
        l1[0],
        l2
      ];
      _l1 = l1[1];
      continue ;
    } else {
      return l2;
    }
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
    } else {
      _i = i + 1 | 0;
      _acc = /* :: */[
        Curry._1(f, i),
        acc
      ];
      continue ;
    }
  };
}

function init_aux(i, n, f) {
  if (i >= n) {
    return /* [] */0;
  } else {
    var r = Curry._1(f, i);
    return /* :: */[
            r,
            init_aux(i + 1 | 0, n, f)
          ];
  }
}

function init(len, f) {
  if (len < 0) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "List.init"
        ];
  }
  if (len > 10000) {
    return rev_append(init_tailrec_aux(/* [] */0, 0, len, f), /* [] */0);
  } else {
    return init_aux(0, len, f);
  }
}

function flatten(param) {
  if (param) {
    return Pervasives.$at(param[0], flatten(param[1]));
  } else {
    return /* [] */0;
  }
}

function map(f, param) {
  if (param) {
    var r = Curry._1(f, param[0]);
    return /* :: */[
            r,
            map(f, param[1])
          ];
  } else {
    return /* [] */0;
  }
}

function mapi(i, f, param) {
  if (param) {
    var r = Curry._2(f, i, param[0]);
    return /* :: */[
            r,
            mapi(i + 1 | 0, f, param[1])
          ];
  } else {
    return /* [] */0;
  }
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
    if (param) {
      _param = param[1];
      _accu = /* :: */[
        Curry._1(f, param[0]),
        accu
      ];
      continue ;
    } else {
      return accu;
    }
  };
}

function iter(f, _param) {
  while(true) {
    var param = _param;
    if (param) {
      Curry._1(f, param[0]);
      _param = param[1];
      continue ;
    } else {
      return /* () */0;
    }
  };
}

function iteri(f, l) {
  var _i = 0;
  var f$1 = f;
  var _param = l;
  while(true) {
    var param = _param;
    var i = _i;
    if (param) {
      Curry._2(f$1, i, param[0]);
      _param = param[1];
      _i = i + 1 | 0;
      continue ;
    } else {
      return /* () */0;
    }
  };
}

function fold_left(f, _accu, _l) {
  while(true) {
    var l = _l;
    var accu = _accu;
    if (l) {
      _l = l[1];
      _accu = Curry._2(f, accu, l[0]);
      continue ;
    } else {
      return accu;
    }
  };
}

function fold_right(f, l, accu) {
  if (l) {
    return Curry._2(f, l[0], fold_right(f, l[1], accu));
  } else {
    return accu;
  }
}

function map2(f, l1, l2) {
  if (l1) {
    if (l2) {
      var r = Curry._2(f, l1[0], l2[0]);
      return /* :: */[
              r,
              map2(f, l1[1], l2[1])
            ];
    } else {
      throw [
            Caml_builtin_exceptions.invalid_argument,
            "List.map2"
          ];
    }
  } else if (l2) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "List.map2"
        ];
  } else {
    return /* [] */0;
  }
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
        _l2 = l2$1[1];
        _l1 = l1$1[1];
        _accu = /* :: */[
          Curry._2(f, l1$1[0], l2$1[0]),
          accu
        ];
        continue ;
      } else {
        throw [
              Caml_builtin_exceptions.invalid_argument,
              "List.rev_map2"
            ];
      }
    } else {
      if (l2$1) {
        throw [
              Caml_builtin_exceptions.invalid_argument,
              "List.rev_map2"
            ];
      }
      return accu;
    }
  };
}

function iter2(f, _l1, _l2) {
  while(true) {
    var l2 = _l2;
    var l1 = _l1;
    if (l1) {
      if (l2) {
        Curry._2(f, l1[0], l2[0]);
        _l2 = l2[1];
        _l1 = l1[1];
        continue ;
      } else {
        throw [
              Caml_builtin_exceptions.invalid_argument,
              "List.iter2"
            ];
      }
    } else if (l2) {
      throw [
            Caml_builtin_exceptions.invalid_argument,
            "List.iter2"
          ];
    } else {
      return /* () */0;
    }
  };
}

function fold_left2(f, _accu, _l1, _l2) {
  while(true) {
    var l2 = _l2;
    var l1 = _l1;
    var accu = _accu;
    if (l1) {
      if (l2) {
        _l2 = l2[1];
        _l1 = l1[1];
        _accu = Curry._3(f, accu, l1[0], l2[0]);
        continue ;
      } else {
        throw [
              Caml_builtin_exceptions.invalid_argument,
              "List.fold_left2"
            ];
      }
    } else {
      if (l2) {
        throw [
              Caml_builtin_exceptions.invalid_argument,
              "List.fold_left2"
            ];
      }
      return accu;
    }
  };
}

function fold_right2(f, l1, l2, accu) {
  if (l1) {
    if (l2) {
      return Curry._3(f, l1[0], l2[0], fold_right2(f, l1[1], l2[1], accu));
    } else {
      throw [
            Caml_builtin_exceptions.invalid_argument,
            "List.fold_right2"
          ];
    }
  } else {
    if (l2) {
      throw [
            Caml_builtin_exceptions.invalid_argument,
            "List.fold_right2"
          ];
    }
    return accu;
  }
}

function for_all(p, _param) {
  while(true) {
    var param = _param;
    if (param) {
      if (Curry._1(p, param[0])) {
        _param = param[1];
        continue ;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };
}

function exists(p, _param) {
  while(true) {
    var param = _param;
    if (param) {
      if (Curry._1(p, param[0])) {
        return true;
      } else {
        _param = param[1];
        continue ;
      }
    } else {
      return false;
    }
  };
}

function for_all2(p, _l1, _l2) {
  while(true) {
    var l2 = _l2;
    var l1 = _l1;
    if (l1) {
      if (l2) {
        if (Curry._2(p, l1[0], l2[0])) {
          _l2 = l2[1];
          _l1 = l1[1];
          continue ;
        } else {
          return false;
        }
      } else {
        throw [
              Caml_builtin_exceptions.invalid_argument,
              "List.for_all2"
            ];
      }
    } else if (l2) {
      throw [
            Caml_builtin_exceptions.invalid_argument,
            "List.for_all2"
          ];
    } else {
      return true;
    }
  };
}

function exists2(p, _l1, _l2) {
  while(true) {
    var l2 = _l2;
    var l1 = _l1;
    if (l1) {
      if (l2) {
        if (Curry._2(p, l1[0], l2[0])) {
          return true;
        } else {
          _l2 = l2[1];
          _l1 = l1[1];
          continue ;
        }
      } else {
        throw [
              Caml_builtin_exceptions.invalid_argument,
              "List.exists2"
            ];
      }
    } else if (l2) {
      throw [
            Caml_builtin_exceptions.invalid_argument,
            "List.exists2"
          ];
    } else {
      return false;
    }
  };
}

function mem(x, _param) {
  while(true) {
    var param = _param;
    if (param) {
      if (Caml_obj.caml_equal(param[0], x)) {
        return true;
      } else {
        _param = param[1];
        continue ;
      }
    } else {
      return false;
    }
  };
}

function memq(x, _param) {
  while(true) {
    var param = _param;
    if (param) {
      if (param[0] === x) {
        return true;
      } else {
        _param = param[1];
        continue ;
      }
    } else {
      return false;
    }
  };
}

function assoc(x, _param) {
  while(true) {
    var param = _param;
    if (param) {
      var match = param[0];
      if (Caml_obj.caml_equal(match[0], x)) {
        return match[1];
      } else {
        _param = param[1];
        continue ;
      }
    } else {
      throw Caml_builtin_exceptions.not_found;
    }
  };
}

function assoc_opt(x, _param) {
  while(true) {
    var param = _param;
    if (param) {
      var match = param[0];
      if (Caml_obj.caml_equal(match[0], x)) {
        return Caml_option.some(match[1]);
      } else {
        _param = param[1];
        continue ;
      }
    } else {
      return ;
    }
  };
}

function assq(x, _param) {
  while(true) {
    var param = _param;
    if (param) {
      var match = param[0];
      if (match[0] === x) {
        return match[1];
      } else {
        _param = param[1];
        continue ;
      }
    } else {
      throw Caml_builtin_exceptions.not_found;
    }
  };
}

function assq_opt(x, _param) {
  while(true) {
    var param = _param;
    if (param) {
      var match = param[0];
      if (match[0] === x) {
        return Caml_option.some(match[1]);
      } else {
        _param = param[1];
        continue ;
      }
    } else {
      return ;
    }
  };
}

function mem_assoc(x, _param) {
  while(true) {
    var param = _param;
    if (param) {
      if (Caml_obj.caml_equal(param[0][0], x)) {
        return true;
      } else {
        _param = param[1];
        continue ;
      }
    } else {
      return false;
    }
  };
}

function mem_assq(x, _param) {
  while(true) {
    var param = _param;
    if (param) {
      if (param[0][0] === x) {
        return true;
      } else {
        _param = param[1];
        continue ;
      }
    } else {
      return false;
    }
  };
}

function remove_assoc(x, param) {
  if (param) {
    var l = param[1];
    var pair = param[0];
    if (Caml_obj.caml_equal(pair[0], x)) {
      return l;
    } else {
      return /* :: */[
              pair,
              remove_assoc(x, l)
            ];
    }
  } else {
    return /* [] */0;
  }
}

function remove_assq(x, param) {
  if (param) {
    var l = param[1];
    var pair = param[0];
    if (pair[0] === x) {
      return l;
    } else {
      return /* :: */[
              pair,
              remove_assq(x, l)
            ];
    }
  } else {
    return /* [] */0;
  }
}

function find(p, _param) {
  while(true) {
    var param = _param;
    if (param) {
      var x = param[0];
      if (Curry._1(p, x)) {
        return x;
      } else {
        _param = param[1];
        continue ;
      }
    } else {
      throw Caml_builtin_exceptions.not_found;
    }
  };
}

function find_opt(p, _param) {
  while(true) {
    var param = _param;
    if (param) {
      var x = param[0];
      if (Curry._1(p, x)) {
        return Caml_option.some(x);
      } else {
        _param = param[1];
        continue ;
      }
    } else {
      return ;
    }
  };
}

function find_all(p) {
  return (function (param) {
      var _accu = /* [] */0;
      var _param = param;
      while(true) {
        var param$1 = _param;
        var accu = _accu;
        if (param$1) {
          var l = param$1[1];
          var x = param$1[0];
          if (Curry._1(p, x)) {
            _param = l;
            _accu = /* :: */[
              x,
              accu
            ];
            continue ;
          } else {
            _param = l;
            continue ;
          }
        } else {
          return rev_append(accu, /* [] */0);
        }
      };
    });
}

function partition(p, l) {
  var _yes = /* [] */0;
  var _no = /* [] */0;
  var _param = l;
  while(true) {
    var param = _param;
    var no = _no;
    var yes = _yes;
    if (param) {
      var l$1 = param[1];
      var x = param[0];
      if (Curry._1(p, x)) {
        _param = l$1;
        _yes = /* :: */[
          x,
          yes
        ];
        continue ;
      } else {
        _param = l$1;
        _no = /* :: */[
          x,
          no
        ];
        continue ;
      }
    } else {
      return /* tuple */[
              rev_append(yes, /* [] */0),
              rev_append(no, /* [] */0)
            ];
    }
  };
}

function split(param) {
  if (param) {
    var match = param[0];
    var match$1 = split(param[1]);
    return /* tuple */[
            /* :: */[
              match[0],
              match$1[0]
            ],
            /* :: */[
              match[1],
              match$1[1]
            ]
          ];
  } else {
    return /* tuple */[
            /* [] */0,
            /* [] */0
          ];
  }
}

function combine(l1, l2) {
  if (l1) {
    if (l2) {
      return /* :: */[
              /* tuple */[
                l1[0],
                l2[0]
              ],
              combine(l1[1], l2[1])
            ];
    } else {
      throw [
            Caml_builtin_exceptions.invalid_argument,
            "List.combine"
          ];
    }
  } else if (l2) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "List.combine"
        ];
  } else {
    return /* [] */0;
  }
}

function merge(cmp, l1, l2) {
  if (l1) {
    if (l2) {
      var h2 = l2[0];
      var h1 = l1[0];
      if (Curry._2(cmp, h1, h2) <= 0) {
        return /* :: */[
                h1,
                merge(cmp, l1[1], l2)
              ];
      } else {
        return /* :: */[
                h2,
                merge(cmp, l1, l2[1])
              ];
      }
    } else {
      return l1;
    }
  } else {
    return l2;
  }
}

function chop(_k, _l) {
  while(true) {
    var l = _l;
    var k = _k;
    if (k === 0) {
      return l;
    } else if (l) {
      _l = l[1];
      _k = k - 1 | 0;
      continue ;
    } else {
      throw [
            Caml_builtin_exceptions.assert_failure,
            /* tuple */[
              "list.ml",
              262,
              11
            ]
          ];
    }
  };
}

function stable_sort(cmp, l) {
  var sort = function (n, l) {
    if (n !== 2) {
      if (n === 3 && l) {
        var match = l[1];
        if (match) {
          var match$1 = match[1];
          if (match$1) {
            var x3 = match$1[0];
            var x2 = match[0];
            var x1 = l[0];
            if (Curry._2(cmp, x1, x2) <= 0) {
              if (Curry._2(cmp, x2, x3) <= 0) {
                return /* :: */[
                        x1,
                        /* :: */[
                          x2,
                          /* :: */[
                            x3,
                            /* [] */0
                          ]
                        ]
                      ];
              } else if (Curry._2(cmp, x1, x3) <= 0) {
                return /* :: */[
                        x1,
                        /* :: */[
                          x3,
                          /* :: */[
                            x2,
                            /* [] */0
                          ]
                        ]
                      ];
              } else {
                return /* :: */[
                        x3,
                        /* :: */[
                          x1,
                          /* :: */[
                            x2,
                            /* [] */0
                          ]
                        ]
                      ];
              }
            } else if (Curry._2(cmp, x1, x3) <= 0) {
              return /* :: */[
                      x2,
                      /* :: */[
                        x1,
                        /* :: */[
                          x3,
                          /* [] */0
                        ]
                      ]
                    ];
            } else if (Curry._2(cmp, x2, x3) <= 0) {
              return /* :: */[
                      x2,
                      /* :: */[
                        x3,
                        /* :: */[
                          x1,
                          /* [] */0
                        ]
                      ]
                    ];
            } else {
              return /* :: */[
                      x3,
                      /* :: */[
                        x2,
                        /* :: */[
                          x1,
                          /* [] */0
                        ]
                      ]
                    ];
            }
          }
          
        }
        
      }
      
    } else if (l) {
      var match$2 = l[1];
      if (match$2) {
        var x2$1 = match$2[0];
        var x1$1 = l[0];
        if (Curry._2(cmp, x1$1, x2$1) <= 0) {
          return /* :: */[
                  x1$1,
                  /* :: */[
                    x2$1,
                    /* [] */0
                  ]
                ];
        } else {
          return /* :: */[
                  x2$1,
                  /* :: */[
                    x1$1,
                    /* [] */0
                  ]
                ];
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
      if (l1) {
        if (l2$1) {
          var h2 = l2$1[0];
          var h1 = l1[0];
          if (Curry._2(cmp, h1, h2) > 0) {
            _accu = /* :: */[
              h1,
              accu
            ];
            _l1 = l1[1];
            continue ;
          } else {
            _accu = /* :: */[
              h2,
              accu
            ];
            _l2 = l2$1[1];
            continue ;
          }
        } else {
          return rev_append(l1, accu);
        }
      } else {
        return rev_append(l2$1, accu);
      }
    };
  };
  var rev_sort = function (n, l) {
    if (n !== 2) {
      if (n === 3 && l) {
        var match = l[1];
        if (match) {
          var match$1 = match[1];
          if (match$1) {
            var x3 = match$1[0];
            var x2 = match[0];
            var x1 = l[0];
            if (Curry._2(cmp, x1, x2) > 0) {
              if (Curry._2(cmp, x2, x3) > 0) {
                return /* :: */[
                        x1,
                        /* :: */[
                          x2,
                          /* :: */[
                            x3,
                            /* [] */0
                          ]
                        ]
                      ];
              } else if (Curry._2(cmp, x1, x3) > 0) {
                return /* :: */[
                        x1,
                        /* :: */[
                          x3,
                          /* :: */[
                            x2,
                            /* [] */0
                          ]
                        ]
                      ];
              } else {
                return /* :: */[
                        x3,
                        /* :: */[
                          x1,
                          /* :: */[
                            x2,
                            /* [] */0
                          ]
                        ]
                      ];
              }
            } else if (Curry._2(cmp, x1, x3) > 0) {
              return /* :: */[
                      x2,
                      /* :: */[
                        x1,
                        /* :: */[
                          x3,
                          /* [] */0
                        ]
                      ]
                    ];
            } else if (Curry._2(cmp, x2, x3) > 0) {
              return /* :: */[
                      x2,
                      /* :: */[
                        x3,
                        /* :: */[
                          x1,
                          /* [] */0
                        ]
                      ]
                    ];
            } else {
              return /* :: */[
                      x3,
                      /* :: */[
                        x2,
                        /* :: */[
                          x1,
                          /* [] */0
                        ]
                      ]
                    ];
            }
          }
          
        }
        
      }
      
    } else if (l) {
      var match$2 = l[1];
      if (match$2) {
        var x2$1 = match$2[0];
        var x1$1 = l[0];
        if (Curry._2(cmp, x1$1, x2$1) > 0) {
          return /* :: */[
                  x1$1,
                  /* :: */[
                    x2$1,
                    /* [] */0
                  ]
                ];
        } else {
          return /* :: */[
                  x2$1,
                  /* :: */[
                    x1$1,
                    /* [] */0
                  ]
                ];
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
      if (l1) {
        if (l2$1) {
          var h2 = l2$1[0];
          var h1 = l1[0];
          if (Curry._2(cmp, h1, h2) <= 0) {
            _accu = /* :: */[
              h1,
              accu
            ];
            _l1 = l1[1];
            continue ;
          } else {
            _accu = /* :: */[
              h2,
              accu
            ];
            _l2 = l2$1[1];
            continue ;
          }
        } else {
          return rev_append(l1, accu);
        }
      } else {
        return rev_append(l2$1, accu);
      }
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
        var match = l[1];
        if (match) {
          var match$1 = match[1];
          if (match$1) {
            var x3 = match$1[0];
            var x2 = match[0];
            var x1 = l[0];
            var c = Curry._2(cmp, x1, x2);
            if (c === 0) {
              var c$1 = Curry._2(cmp, x2, x3);
              if (c$1 === 0) {
                return /* :: */[
                        x2,
                        /* [] */0
                      ];
              } else if (c$1 < 0) {
                return /* :: */[
                        x2,
                        /* :: */[
                          x3,
                          /* [] */0
                        ]
                      ];
              } else {
                return /* :: */[
                        x3,
                        /* :: */[
                          x2,
                          /* [] */0
                        ]
                      ];
              }
            } else if (c < 0) {
              var c$2 = Curry._2(cmp, x2, x3);
              if (c$2 === 0) {
                return /* :: */[
                        x1,
                        /* :: */[
                          x2,
                          /* [] */0
                        ]
                      ];
              } else if (c$2 < 0) {
                return /* :: */[
                        x1,
                        /* :: */[
                          x2,
                          /* :: */[
                            x3,
                            /* [] */0
                          ]
                        ]
                      ];
              } else {
                var c$3 = Curry._2(cmp, x1, x3);
                if (c$3 === 0) {
                  return /* :: */[
                          x1,
                          /* :: */[
                            x2,
                            /* [] */0
                          ]
                        ];
                } else if (c$3 < 0) {
                  return /* :: */[
                          x1,
                          /* :: */[
                            x3,
                            /* :: */[
                              x2,
                              /* [] */0
                            ]
                          ]
                        ];
                } else {
                  return /* :: */[
                          x3,
                          /* :: */[
                            x1,
                            /* :: */[
                              x2,
                              /* [] */0
                            ]
                          ]
                        ];
                }
              }
            } else {
              var c$4 = Curry._2(cmp, x1, x3);
              if (c$4 === 0) {
                return /* :: */[
                        x2,
                        /* :: */[
                          x1,
                          /* [] */0
                        ]
                      ];
              } else if (c$4 < 0) {
                return /* :: */[
                        x2,
                        /* :: */[
                          x1,
                          /* :: */[
                            x3,
                            /* [] */0
                          ]
                        ]
                      ];
              } else {
                var c$5 = Curry._2(cmp, x2, x3);
                if (c$5 === 0) {
                  return /* :: */[
                          x2,
                          /* :: */[
                            x1,
                            /* [] */0
                          ]
                        ];
                } else if (c$5 < 0) {
                  return /* :: */[
                          x2,
                          /* :: */[
                            x3,
                            /* :: */[
                              x1,
                              /* [] */0
                            ]
                          ]
                        ];
                } else {
                  return /* :: */[
                          x3,
                          /* :: */[
                            x2,
                            /* :: */[
                              x1,
                              /* [] */0
                            ]
                          ]
                        ];
                }
              }
            }
          }
          
        }
        
      }
      
    } else if (l) {
      var match$2 = l[1];
      if (match$2) {
        var x2$1 = match$2[0];
        var x1$1 = l[0];
        var c$6 = Curry._2(cmp, x1$1, x2$1);
        if (c$6 === 0) {
          return /* :: */[
                  x1$1,
                  /* [] */0
                ];
        } else if (c$6 < 0) {
          return /* :: */[
                  x1$1,
                  /* :: */[
                    x2$1,
                    /* [] */0
                  ]
                ];
        } else {
          return /* :: */[
                  x2$1,
                  /* :: */[
                    x1$1,
                    /* [] */0
                  ]
                ];
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
      if (l1) {
        if (l2$1) {
          var t2 = l2$1[1];
          var h2 = l2$1[0];
          var t1 = l1[1];
          var h1 = l1[0];
          var c$7 = Curry._2(cmp, h1, h2);
          if (c$7 === 0) {
            _accu = /* :: */[
              h1,
              accu
            ];
            _l2 = t2;
            _l1 = t1;
            continue ;
          } else if (c$7 > 0) {
            _accu = /* :: */[
              h1,
              accu
            ];
            _l1 = t1;
            continue ;
          } else {
            _accu = /* :: */[
              h2,
              accu
            ];
            _l2 = t2;
            continue ;
          }
        } else {
          return rev_append(l1, accu);
        }
      } else {
        return rev_append(l2$1, accu);
      }
    };
  };
  var rev_sort = function (n, l) {
    if (n !== 2) {
      if (n === 3 && l) {
        var match = l[1];
        if (match) {
          var match$1 = match[1];
          if (match$1) {
            var x3 = match$1[0];
            var x2 = match[0];
            var x1 = l[0];
            var c = Curry._2(cmp, x1, x2);
            if (c === 0) {
              var c$1 = Curry._2(cmp, x2, x3);
              if (c$1 === 0) {
                return /* :: */[
                        x2,
                        /* [] */0
                      ];
              } else if (c$1 > 0) {
                return /* :: */[
                        x2,
                        /* :: */[
                          x3,
                          /* [] */0
                        ]
                      ];
              } else {
                return /* :: */[
                        x3,
                        /* :: */[
                          x2,
                          /* [] */0
                        ]
                      ];
              }
            } else if (c > 0) {
              var c$2 = Curry._2(cmp, x2, x3);
              if (c$2 === 0) {
                return /* :: */[
                        x1,
                        /* :: */[
                          x2,
                          /* [] */0
                        ]
                      ];
              } else if (c$2 > 0) {
                return /* :: */[
                        x1,
                        /* :: */[
                          x2,
                          /* :: */[
                            x3,
                            /* [] */0
                          ]
                        ]
                      ];
              } else {
                var c$3 = Curry._2(cmp, x1, x3);
                if (c$3 === 0) {
                  return /* :: */[
                          x1,
                          /* :: */[
                            x2,
                            /* [] */0
                          ]
                        ];
                } else if (c$3 > 0) {
                  return /* :: */[
                          x1,
                          /* :: */[
                            x3,
                            /* :: */[
                              x2,
                              /* [] */0
                            ]
                          ]
                        ];
                } else {
                  return /* :: */[
                          x3,
                          /* :: */[
                            x1,
                            /* :: */[
                              x2,
                              /* [] */0
                            ]
                          ]
                        ];
                }
              }
            } else {
              var c$4 = Curry._2(cmp, x1, x3);
              if (c$4 === 0) {
                return /* :: */[
                        x2,
                        /* :: */[
                          x1,
                          /* [] */0
                        ]
                      ];
              } else if (c$4 > 0) {
                return /* :: */[
                        x2,
                        /* :: */[
                          x1,
                          /* :: */[
                            x3,
                            /* [] */0
                          ]
                        ]
                      ];
              } else {
                var c$5 = Curry._2(cmp, x2, x3);
                if (c$5 === 0) {
                  return /* :: */[
                          x2,
                          /* :: */[
                            x1,
                            /* [] */0
                          ]
                        ];
                } else if (c$5 > 0) {
                  return /* :: */[
                          x2,
                          /* :: */[
                            x3,
                            /* :: */[
                              x1,
                              /* [] */0
                            ]
                          ]
                        ];
                } else {
                  return /* :: */[
                          x3,
                          /* :: */[
                            x2,
                            /* :: */[
                              x1,
                              /* [] */0
                            ]
                          ]
                        ];
                }
              }
            }
          }
          
        }
        
      }
      
    } else if (l) {
      var match$2 = l[1];
      if (match$2) {
        var x2$1 = match$2[0];
        var x1$1 = l[0];
        var c$6 = Curry._2(cmp, x1$1, x2$1);
        if (c$6 === 0) {
          return /* :: */[
                  x1$1,
                  /* [] */0
                ];
        } else if (c$6 > 0) {
          return /* :: */[
                  x1$1,
                  /* :: */[
                    x2$1,
                    /* [] */0
                  ]
                ];
        } else {
          return /* :: */[
                  x2$1,
                  /* :: */[
                    x1$1,
                    /* [] */0
                  ]
                ];
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
      if (l1) {
        if (l2$1) {
          var t2 = l2$1[1];
          var h2 = l2$1[0];
          var t1 = l1[1];
          var h1 = l1[0];
          var c$7 = Curry._2(cmp, h1, h2);
          if (c$7 === 0) {
            _accu = /* :: */[
              h1,
              accu
            ];
            _l2 = t2;
            _l1 = t1;
            continue ;
          } else if (c$7 < 0) {
            _accu = /* :: */[
              h1,
              accu
            ];
            _l1 = t1;
            continue ;
          } else {
            _accu = /* :: */[
              h2,
              accu
            ];
            _l2 = t2;
            continue ;
          }
        } else {
          return rev_append(l1, accu);
        }
      } else {
        return rev_append(l2$1, accu);
      }
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
    if (l1) {
      if (l2) {
        _l2 = l2[1];
        _l1 = l1[1];
        continue ;
      } else {
        return 1;
      }
    } else if (l2) {
      return -1;
    } else {
      return 0;
    }
  };
}

function compare_length_with(_l, _n) {
  while(true) {
    var n = _n;
    var l = _l;
    if (l) {
      if (n <= 0) {
        return 1;
      } else {
        _n = n - 1 | 0;
        _l = l[1];
        continue ;
      }
    } else if (n === 0) {
      return 0;
    } else if (n > 0) {
      return -1;
    } else {
      return 1;
    }
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

},{"./caml_builtin_exceptions.js":4,"./caml_obj.js":13,"./caml_option.js":14,"./curry.js":20,"./pervasives.js":23}],23:[function(require,module,exports){
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
var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");
var CamlinternalFormatBasics = require("./camlinternalFormatBasics.js");

function failwith(s) {
  throw [
        Caml_builtin_exceptions.failure,
        s
      ];
}

function invalid_arg(s) {
  throw [
        Caml_builtin_exceptions.invalid_argument,
        s
      ];
}

var Exit = Caml_exceptions.create("Pervasives.Exit");

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
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "char_of_int"
        ];
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
      throw [
            Caml_builtin_exceptions.invalid_argument,
            "bool_of_string"
          ];
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
    if (exn[0] === Caml_builtin_exceptions.failure) {
      return ;
    } else {
      throw exn;
    }
  }
}

function valid_float_lexem(s) {
  var l = s.length;
  var _i = 0;
  while(true) {
    var i = _i;
    if (i >= l) {
      return s + ".";
    } else {
      var match = Caml_string.get(s, i);
      if (match >= 48) {
        if (match >= 58) {
          return s;
        } else {
          _i = i + 1 | 0;
          continue ;
        }
      } else if (match !== 45) {
        return s;
      } else {
        _i = i + 1 | 0;
        continue ;
      }
    }
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
    if (exn[0] === Caml_builtin_exceptions.failure) {
      return ;
    } else {
      throw exn;
    }
  }
}

function $at(l1, l2) {
  if (l1) {
    return /* :: */[
            l1[0],
            $at(l1[1], l2)
          ];
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
  return open_out_gen(/* :: */[
              /* Open_wronly */1,
              /* :: */[
                /* Open_creat */3,
                /* :: */[
                  /* Open_trunc */4,
                  /* :: */[
                    /* Open_text */7,
                    /* [] */0
                  ]
                ]
              ]
            ], 438, name);
}

function open_out_bin(name) {
  return open_out_gen(/* :: */[
              /* Open_wronly */1,
              /* :: */[
                /* Open_creat */3,
                /* :: */[
                  /* Open_trunc */4,
                  /* :: */[
                    /* Open_binary */6,
                    /* [] */0
                  ]
                ]
              ]
            ], 438, name);
}

function flush_all(param) {
  var _param = Caml_io.caml_ml_out_channels_list(/* () */0);
  while(true) {
    var param$1 = _param;
    if (param$1) {
      try {
        Caml_io.caml_ml_flush(param$1[0]);
      }
      catch (raw_exn){
        var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
        if (exn[0] !== Caml_builtin_exceptions.sys_error) {
          throw exn;
        }
        
      }
      _param = param$1[1];
      continue ;
    } else {
      return /* () */0;
    }
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
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "output"
        ];
  }
  return Caml_external_polyfill.resolve("caml_ml_output_bytes")(oc, s, ofs, len);
}

function output_substring(oc, s, ofs, len) {
  if (ofs < 0 || len < 0 || ofs > (s.length - len | 0)) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "output_substring"
        ];
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
    return /* () */0;
  }
}

function open_in_gen(mode, perm, name) {
  var c = Caml_external_polyfill.resolve("caml_ml_open_descriptor_in")(Caml_external_polyfill.resolve("caml_sys_open")(name, mode, perm));
  Caml_external_polyfill.resolve("caml_ml_set_channel_name")(c, name);
  return c;
}

function open_in(name) {
  return open_in_gen(/* :: */[
              /* Open_rdonly */0,
              /* :: */[
                /* Open_text */7,
                /* [] */0
              ]
            ], 0, name);
}

function open_in_bin(name) {
  return open_in_gen(/* :: */[
              /* Open_rdonly */0,
              /* :: */[
                /* Open_binary */6,
                /* [] */0
              ]
            ], 0, name);
}

function input(ic, s, ofs, len) {
  if (ofs < 0 || len < 0 || ofs > (s.length - len | 0)) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "input"
        ];
  }
  return Caml_external_polyfill.resolve("caml_ml_input")(ic, s, ofs, len);
}

function unsafe_really_input(ic, s, _ofs, _len) {
  while(true) {
    var len = _len;
    var ofs = _ofs;
    if (len <= 0) {
      return /* () */0;
    } else {
      var r = Caml_external_polyfill.resolve("caml_ml_input")(ic, s, ofs, len);
      if (r === 0) {
        throw Caml_builtin_exceptions.end_of_file;
      }
      _len = len - r | 0;
      _ofs = ofs + r | 0;
      continue ;
    }
  };
}

function really_input(ic, s, ofs, len) {
  if (ofs < 0 || len < 0 || ofs > (s.length - len | 0)) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "really_input"
        ];
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
      if (param) {
        var hd = param[0];
        var len = hd.length;
        Caml_bytes.caml_blit_bytes(hd, 0, buf, pos - len | 0, len);
        _param = param[1];
        _pos = pos - len | 0;
        continue ;
      } else {
        return buf;
      }
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
        } else {
          throw Caml_builtin_exceptions.end_of_file;
        }
      } else if (n > 0) {
        var res = Caml_bytes.caml_create_bytes(n - 1 | 0);
        Caml_external_polyfill.resolve("caml_ml_input")(chan, res, 0, n - 1 | 0);
        Caml_external_polyfill.resolve("caml_ml_input_char")(chan);
        if (accu) {
          var len$1 = (len + n | 0) - 1 | 0;
          return build_result(Caml_bytes.caml_create_bytes(len$1), len$1, /* :: */[
                      res,
                      accu
                    ]);
        } else {
          return res;
        }
      } else {
        var beg = Caml_bytes.caml_create_bytes(-n | 0);
        Caml_external_polyfill.resolve("caml_ml_input")(chan, beg, 0, -n | 0);
        _len = len - n | 0;
        _accu = /* :: */[
          beg,
          accu
        ];
        continue ;
      }
    };
  };
  return Caml_bytes.bytes_to_string(scan(/* [] */0, 0));
}

function close_in_noerr(ic) {
  try {
    return Caml_external_polyfill.resolve("caml_ml_close_channel")(ic);
  }
  catch (exn){
    return /* () */0;
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
  Caml_io.caml_ml_output_char(stdout, /* "\n" */10);
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
  Caml_io.caml_ml_output_char(stderr, /* "\n" */10);
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
  return param[1];
}

function $caret$caret(param, param$1) {
  return /* Format */[
          CamlinternalFormatBasics.concat_fmt(param[0], param$1[0]),
          param[1] + ("%," + param$1[1])
        ];
}

var exit_function = {
  contents: flush_all
};

function at_exit(f) {
  var g = exit_function.contents;
  exit_function.contents = (function (param) {
      Curry._1(f, /* () */0);
      return Curry._1(g, /* () */0);
    });
  return /* () */0;
}

function do_at_exit(param) {
  return Curry._1(exit_function.contents, /* () */0);
}

function exit(retcode) {
  do_at_exit(/* () */0);
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
exports.$caret$caret = $caret$caret;
exports.exit = exit;
exports.at_exit = at_exit;
exports.valid_float_lexem = valid_float_lexem;
exports.unsafe_really_input = unsafe_really_input;
exports.do_at_exit = do_at_exit;
/* No side effect */

},{"./caml_builtin_exceptions.js":4,"./caml_bytes.js":5,"./caml_exceptions.js":6,"./caml_external_polyfill.js":7,"./caml_format.js":8,"./caml_io.js":11,"./caml_js_exceptions.js":12,"./caml_string.js":16,"./caml_sys.js":17,"./camlinternalFormatBasics.js":19,"./curry.js":20}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Js_mapperRt = require("bs-platform/lib/js/js_mapperRt.js");

var jsMapperConstantArray = [
/* tuple */
[-621265333, "plarArea"],
/* tuple */
[-146441754, "radar"],
/* tuple */
[3303859, "bar"],
/* tuple */
[4001836, "pie"],
/* tuple */
[42029996, "bubble"],
/* tuple */
[340644898, "doughnut"],
/* tuple */
[381215535, "horizontalBar"],
/* tuple */
[848053268, "line"],
/* tuple */
[934124574, "scatter"]];

function chart_typeToJs(param) {
  return Js_mapperRt.binarySearch(9, param, jsMapperConstantArray);
}

function chart_typeFromJs(param) {
  return Js_mapperRt.revSearch(9, jsMapperConstantArray, param);
}

var Scatter = {};
var Bubble = {};
exports.chart_typeToJs = chart_typeToJs;
exports.chart_typeFromJs = chart_typeFromJs;
exports.Scatter = Scatter;
exports.Bubble = Bubble;
/* No side effect */

},{"bs-platform/lib/js/js_mapperRt.js":21}],26:[function(require,module,exports){
// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");

var $$Array = require("bs-platform/lib/js/array.js");

var Curry = require("bs-platform/lib/js/curry.js");

var Chartjs = require("./chartjs.bs.js");

var Caml_array = require("bs-platform/lib/js/caml_array.js");

var Caml_exceptions = require("bs-platform/lib/js/caml_exceptions.js");

var Not_found_element = Caml_exceptions.create("Radical_main.Not_found_element");

function index_array(len) {
  var d = Caml_array.caml_make_vect(len, "");

  for (var i = 0, i_finish = len - 1 | 0; i <= i_finish; ++i) {
    Caml_array.caml_array_set(d, i, String(i));
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
        return (
          /* () */
          0
        );
      } else {
        Caml_array.caml_array_set(data, i, Math.sqrt(nf * nf - nf + prev));
        _i = i + 1 | 0;
        _prev = Caml_array.caml_array_get(data, i);
        continue;
      }
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
    type: Chartjs.chart_typeToJs(
    /* Line */
    848053268),
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
  var match = document.getElementById(element_id);
  var context;

  if (match == null) {
    throw [Not_found_element, "canvas is not found"];
  } else {
    context = match.getContext("2d");
  }

  new Chart(context, param);
  return (
    /* () */
    0
  );
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
    type: Chartjs.chart_typeToJs(
    /* Line */
    848053268),
    data: {
      labels: index_array(datalen),
      datasets: chartjs_datasets
    },
    options: opt
  };
  var match = document.getElementById(element_id);
  var context;

  if (match == null) {
    throw [Not_found_element, "canvas is not found"];
  } else {
    context = match.getContext("2d");
  }

  new Chart(context, param);
  return (
    /* () */
    0
  );
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
    } else {
      var current = Curry._1(f, prev);

      _rev_result =
      /* :: */
      [current, rev_result];
      _len = len$1 - 1 | 0;
      _prev = current;
      continue;
    }
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
    } else {
      _result =
      /* :: */
      [current, result];
      _current = current - 1 | 0;
      continue;
    }
  }

  ;
}

function main(param) {
  var pallete = ["Red", "Green", "Blue", "Yellow", "Purple", "Aqua", "Pink"];

  var data = function (n) {
    var color = Caml_array.caml_array_get(pallete, n - 2 | 0);
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
  plot_line(
  /* :: */
  [d2,
  /* [] */
  0], "an2");
  plot_line(
  /* :: */
  [d6,
  /* [] */
  0], "an6");
  var dataset = List.map(data, range(2, 2 + pallete.length | 0));
  return plot_line(dataset, "plot_simple");
}

window.addEventListener("load", function (param) {
  return main(
  /* () */
  0);
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

},{"./chartjs.bs.js":25,"bs-platform/lib/js/array.js":1,"bs-platform/lib/js/caml_array.js":3,"bs-platform/lib/js/caml_exceptions.js":6,"bs-platform/lib/js/curry.js":20,"bs-platform/lib/js/list.js":22}]},{},[26]);
