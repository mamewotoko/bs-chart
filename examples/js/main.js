(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{"./caml_array.js":1}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
// Generated by ReScript, PLEASE EDIT WITH CARE
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

var Not_found_element = /* @__PURE__ */Caml_exceptions.create("Main.Not_found_element");
var param1 = {
  type: Chartjs.chart_typeToJs("Bar"),
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
  type: Chartjs.chart_typeToJs("HorizontalBar"),
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
var param_line = {
  type: Chartjs.chart_typeToJs("Line"),
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
      text: "Chart.js Line chart"
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
  type: Chartjs.chart_typeToJs("Doughnut"),
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
    var canvas = document.getElementById(id);
    var context;

    if (canvas == null) {
      throw {
        RE_EXN_ID: Not_found_element,
        _1: "canvas is not found",
        Error: new Error()
      };
    }

    context = canvas.getContext("2d");

    Curry._2(f, context, param);
  };

  draw("bar", function (prim, prim$1) {
    return new Chart(prim, prim$1);
  }, param1);
  draw("hbar", function (prim, prim$1) {
    return new Chart(prim, prim$1);
  }, param2);
  draw("line", function (prim, prim$1) {
    return new Chart(prim, prim$1);
  }, param_line);
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
  return main(undefined);
});
exports.$great$great$eq = $great$great$eq;
exports.Not_found_element = Not_found_element;
exports.param1 = param1;
exports.param2 = param2;
exports.param_line = param_line;
exports.pie_param = pie_param;
exports.scatter_param = scatter_param;
exports.bubble_param = bubble_param;
exports.main = main;
/* param1 Not a pure module */

},{"./chartjs.bs.js":5,"bs-platform/lib/js/caml_exceptions.js":2,"bs-platform/lib/js/caml_option.js":3,"bs-platform/lib/js/curry.js":4}]},{},[6]);
