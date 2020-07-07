(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"./caml_builtin_exceptions.js":2}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{"./caml_array.js":1}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

},{"bs-platform/lib/js/js_mapperRt.js":6}],8:[function(require,module,exports){
// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("bs-platform/lib/js/curry.js");

var Chartjs = require("./chartjs.bs.js");

var Caml_option = require("bs-platform/lib/js/caml_option.js");

var Caml_exceptions = require("bs-platform/lib/js/caml_exceptions.js");

function $great$great$eq(e, f) {
  if (e !== undefined) {
    return Caml_option.some(Curry._1(f, Caml_option.valFromOption(e)));
  }
}

var Not_found_element = Caml_exceptions.create("Main.Not_found_element");
var param1 = {
  type: Chartjs.chart_typeToJs(
  /* Bar */
  3303859),
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [{
      label: "Dataset1",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: ["Red", "Red", "Red", "Red", "Red", "Red"],
      borderColor: ["Red", "Red", "Red", "Red", "Red", "Red"],
      borderWidth: 1
    }, {
      label: "Dataset2",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: ["Green", "Green", "Green", "Green", "Green", "Green"],
      borderColor: ["Green", "Green", "Green", "Green", "Green", "Green"],
      borderWidth: 1
    }, {
      label: "Dataset3",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: ["Blue", "Blue", "Blue", "Blue", "Blue", "Blue"],
      borderColor: ["Blue", "Blue", "Blue", "Blue", "Blue", "Blue"],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      xAxes: [{}],
      yAxes: [{
        ticks: {
          beginAtZero: true
        },
        stacked: true
      }]
    }
  }
};
var param2 = {
  type: Chartjs.chart_typeToJs(
  /* HorizontalBar */
  381215535),
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [{
      label: "My First dataset",
      data: [93.89, 65.79, 22.57, 33.78, 9.61, 31.21, 2.3],
      backgroundColor: ["Red"],
      borderColor: ["Red"],
      fill: false
    }, {
      label: "My Second dataset",
      data: [27.99, 15.09, 91.47, 5.92, 15.75, 92.90, 3.4],
      backgroundColor: ["Blue"],
      borderColor: ["Blue"],
      fill: false
    }]
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: "Chart.js Horizontal Bar Chart"
    },
    legend: {
      position: "right"
    },
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: "month"
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: "count"
        },
        gridLines: {
          drawBorder: false
        },
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
};
var pie_param = {
  type: Chartjs.chart_typeToJs(
  /* Doughnut */
  340644898),
  data: {
    labels: ["Red", "Green", "Blue", "Yellow", "Purple", "Pink"],
    datasets: [{
      label: "dataset1",
      data: [27.99, 15.09, 91.47, 5.92, 15.75, 92.90],
      backgroundColor: ["Red", "Green", "Blue", "Yellow", "Purple", "Pink"],
      hoverBackgroundColor: ["Red", "Green", "Blue", "Yellow", "Purple", "Pink"],
      borderColor: ["Red", "Green", "Blue", "Yellow", "Purple", "Pink"]
    }]
  }
};
var scatter_param = {
  type: "scatter",
  data: {
    datasets: [{
      label: "some data",
      data: [{
        x: 1,
        y: 1
      }, {
        x: 20,
        y: 3
      }, {
        x: 1,
        y: 4
      }, {
        x: 1,
        y: 5
      }, {
        x: 6,
        y: 9
      }, {
        x: 2,
        y: 10
      }],
      backgroundColor: "Green",
      borderColor: "Green"
    }]
  },
  options: {
    title: {
      display: true,
      text: "Chart.js scatter plot"
    }
  }
};
var bubble_param = {
  type: "bubble",
  data: {
    datasets: [{
      label: "some data",
      data: [{
        x: 1,
        y: 1,
        r: 20
      }, {
        x: 20,
        y: 3,
        r: 10
      }, {
        x: 1,
        y: 4,
        r: 2
      }, {
        x: 1,
        y: 5,
        r: 200
      }, {
        x: 6,
        y: 9,
        r: 20
      }, {
        x: 2,
        y: 10,
        r: 2
      }],
      backgroundColor: "rgba(0,0,255,0.5)",
      hoverBackgroundColor: "rgba(0,0,255,0.2)",
      borderColor: "rgba(0,0,255,0.5)"
    }]
  },
  options: {
    title: {
      display: true,
      text: "Chart.js Bubble plot"
    }
  }
};

function main(param) {
  var draw = function (id, f, param) {
    var match = document.getElementById(id);
    var context;

    if (match == null) {
      throw [Not_found_element, "canvas is not found"];
    } else {
      context = match.getContext("2d");
    }

    Curry._2(f, context, param);

    return (
      /* () */
      0
    );
  };

  draw("bar", function (prim, prim$1) {
    return new Chart(prim, prim$1);
  }, param1);
  draw("line", function (prim, prim$1) {
    return new Chart(prim, prim$1);
  }, param2);
  draw("pie", function (prim, prim$1) {
    return new Chart(prim, prim$1);
  }, pie_param);
  draw("scatter", function (prim, prim$1) {
    return new Chart(prim, prim$1);
  }, scatter_param);
  return draw("bubble", function (prim, prim$1) {
    return new Chart(prim, prim$1);
  }, bubble_param);
}

window.addEventListener("load", function (param) {
  return main(
  /* () */
  0);
});
exports.$great$great$eq = $great$great$eq;
exports.Not_found_element = Not_found_element;
exports.param1 = param1;
exports.param2 = param2;
exports.pie_param = pie_param;
exports.scatter_param = scatter_param;
exports.bubble_param = bubble_param;
exports.main = main;
/* param1 Not a pure module */

},{"./chartjs.bs.js":7,"bs-platform/lib/js/caml_exceptions.js":3,"bs-platform/lib/js/caml_option.js":4,"bs-platform/lib/js/curry.js":5}]},{},[8]);
