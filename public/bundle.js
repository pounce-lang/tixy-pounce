(function () {
  'use strict';

  function _isPlaceholder(a) {
    return a != null && typeof a === 'object' && a['@@functional/placeholder'] === true;
  }

  /**
   * Optimized internal one-arity curry function.
   *
   * @private
   * @category Function
   * @param {Function} fn The function to curry.
   * @return {Function} The curried function.
   */

  function _curry1(fn) {
    return function f1(a) {
      if (arguments.length === 0 || _isPlaceholder(a)) {
        return f1;
      } else {
        return fn.apply(this, arguments);
      }
    };
  }

  /**
   * Optimized internal two-arity curry function.
   *
   * @private
   * @category Function
   * @param {Function} fn The function to curry.
   * @return {Function} The curried function.
   */

  function _curry2(fn) {
    return function f2(a, b) {
      switch (arguments.length) {
        case 0:
          return f2;

        case 1:
          return _isPlaceholder(a) ? f2 : _curry1(function (_b) {
            return fn(a, _b);
          });

        default:
          return _isPlaceholder(a) && _isPlaceholder(b) ? f2 : _isPlaceholder(a) ? _curry1(function (_a) {
            return fn(_a, b);
          }) : _isPlaceholder(b) ? _curry1(function (_b) {
            return fn(a, _b);
          }) : fn(a, b);
      }
    };
  }

  function _arity(n, fn) {
    /* eslint-disable no-unused-vars */
    switch (n) {
      case 0:
        return function () {
          return fn.apply(this, arguments);
        };

      case 1:
        return function (a0) {
          return fn.apply(this, arguments);
        };

      case 2:
        return function (a0, a1) {
          return fn.apply(this, arguments);
        };

      case 3:
        return function (a0, a1, a2) {
          return fn.apply(this, arguments);
        };

      case 4:
        return function (a0, a1, a2, a3) {
          return fn.apply(this, arguments);
        };

      case 5:
        return function (a0, a1, a2, a3, a4) {
          return fn.apply(this, arguments);
        };

      case 6:
        return function (a0, a1, a2, a3, a4, a5) {
          return fn.apply(this, arguments);
        };

      case 7:
        return function (a0, a1, a2, a3, a4, a5, a6) {
          return fn.apply(this, arguments);
        };

      case 8:
        return function (a0, a1, a2, a3, a4, a5, a6, a7) {
          return fn.apply(this, arguments);
        };

      case 9:
        return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
          return fn.apply(this, arguments);
        };

      case 10:
        return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
          return fn.apply(this, arguments);
        };

      default:
        throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
    }
  }

  /**
   * Internal curryN function.
   *
   * @private
   * @category Function
   * @param {Number} length The arity of the curried function.
   * @param {Array} received An array of arguments received thus far.
   * @param {Function} fn The function to curry.
   * @return {Function} The curried function.
   */

  function _curryN(length, received, fn) {
    return function () {
      var combined = [];
      var argsIdx = 0;
      var left = length;
      var combinedIdx = 0;

      while (combinedIdx < received.length || argsIdx < arguments.length) {
        var result;

        if (combinedIdx < received.length && (!_isPlaceholder(received[combinedIdx]) || argsIdx >= arguments.length)) {
          result = received[combinedIdx];
        } else {
          result = arguments[argsIdx];
          argsIdx += 1;
        }

        combined[combinedIdx] = result;

        if (!_isPlaceholder(result)) {
          left -= 1;
        }

        combinedIdx += 1;
      }

      return left <= 0 ? fn.apply(this, combined) : _arity(left, _curryN(length, combined, fn));
    };
  }

  /**
   * Returns a curried equivalent of the provided function, with the specified
   * arity. The curried function has two unusual capabilities. First, its
   * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the
   * following are equivalent:
   *
   *   - `g(1)(2)(3)`
   *   - `g(1)(2, 3)`
   *   - `g(1, 2)(3)`
   *   - `g(1, 2, 3)`
   *
   * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
   * "gaps", allowing partial application of any combination of arguments,
   * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
   * the following are equivalent:
   *
   *   - `g(1, 2, 3)`
   *   - `g(_, 2, 3)(1)`
   *   - `g(_, _, 3)(1)(2)`
   *   - `g(_, _, 3)(1, 2)`
   *   - `g(_, 2)(1)(3)`
   *   - `g(_, 2)(1, 3)`
   *   - `g(_, 2)(_, 3)(1)`
   *
   * @func
   * @memberOf R
   * @since v0.5.0
   * @category Function
   * @sig Number -> (* -> a) -> (* -> a)
   * @param {Number} length The arity for the returned function.
   * @param {Function} fn The function to curry.
   * @return {Function} A new, curried function.
   * @see R.curry
   * @example
   *
   *      const sumArgs = (...args) => R.sum(args);
   *
   *      const curriedAddFourNumbers = R.curryN(4, sumArgs);
   *      const f = curriedAddFourNumbers(1, 2);
   *      const g = f(3);
   *      g(4); //=> 10
   */

  var curryN =
  /*#__PURE__*/
  _curry2(function curryN(length, fn) {
    if (length === 1) {
      return _curry1(fn);
    }

    return _arity(length, _curryN(length, [], fn));
  });

  var curryN$1 = curryN;

  /**
   * Optimized internal three-arity curry function.
   *
   * @private
   * @category Function
   * @param {Function} fn The function to curry.
   * @return {Function} The curried function.
   */

  function _curry3(fn) {
    return function f3(a, b, c) {
      switch (arguments.length) {
        case 0:
          return f3;

        case 1:
          return _isPlaceholder(a) ? f3 : _curry2(function (_b, _c) {
            return fn(a, _b, _c);
          });

        case 2:
          return _isPlaceholder(a) && _isPlaceholder(b) ? f3 : _isPlaceholder(a) ? _curry2(function (_a, _c) {
            return fn(_a, b, _c);
          }) : _isPlaceholder(b) ? _curry2(function (_b, _c) {
            return fn(a, _b, _c);
          }) : _curry1(function (_c) {
            return fn(a, b, _c);
          });

        default:
          return _isPlaceholder(a) && _isPlaceholder(b) && _isPlaceholder(c) ? f3 : _isPlaceholder(a) && _isPlaceholder(b) ? _curry2(function (_a, _b) {
            return fn(_a, _b, c);
          }) : _isPlaceholder(a) && _isPlaceholder(c) ? _curry2(function (_a, _c) {
            return fn(_a, b, _c);
          }) : _isPlaceholder(b) && _isPlaceholder(c) ? _curry2(function (_b, _c) {
            return fn(a, _b, _c);
          }) : _isPlaceholder(a) ? _curry1(function (_a) {
            return fn(_a, b, c);
          }) : _isPlaceholder(b) ? _curry1(function (_b) {
            return fn(a, _b, c);
          }) : _isPlaceholder(c) ? _curry1(function (_c) {
            return fn(a, b, _c);
          }) : fn(a, b, c);
      }
    };
  }

  /**
   * Tests whether or not an object is an array.
   *
   * @private
   * @param {*} val The object to test.
   * @return {Boolean} `true` if `val` is an array, `false` otherwise.
   * @example
   *
   *      _isArray([]); //=> true
   *      _isArray(null); //=> false
   *      _isArray({}); //=> false
   */
  var _isArray = Array.isArray || function _isArray(val) {
    return val != null && val.length >= 0 && Object.prototype.toString.call(val) === '[object Array]';
  };

  function _isTransformer(obj) {
    return obj != null && typeof obj['@@transducer/step'] === 'function';
  }

  /**
   * Returns a function that dispatches with different strategies based on the
   * object in list position (last argument). If it is an array, executes [fn].
   * Otherwise, if it has a function with one of the given method names, it will
   * execute that function (functor case). Otherwise, if it is a transformer,
   * uses transducer [xf] to return a new transformer (transducer case).
   * Otherwise, it will default to executing [fn].
   *
   * @private
   * @param {Array} methodNames properties to check for a custom implementation
   * @param {Function} xf transducer to initialize if object is transformer
   * @param {Function} fn default ramda implementation
   * @return {Function} A function that dispatches on object in list position
   */

  function _dispatchable(methodNames, xf, fn) {
    return function () {
      if (arguments.length === 0) {
        return fn();
      }

      var args = Array.prototype.slice.call(arguments, 0);
      var obj = args.pop();

      if (!_isArray(obj)) {
        var idx = 0;

        while (idx < methodNames.length) {
          if (typeof obj[methodNames[idx]] === 'function') {
            return obj[methodNames[idx]].apply(obj, args);
          }

          idx += 1;
        }

        if (_isTransformer(obj)) {
          var transducer = xf.apply(null, args);
          return transducer(obj);
        }
      }

      return fn.apply(this, arguments);
    };
  }

  function _reduced(x) {
    return x && x['@@transducer/reduced'] ? x : {
      '@@transducer/value': x,
      '@@transducer/reduced': true
    };
  }

  var _xfBase = {
    init: function () {
      return this.xf['@@transducer/init']();
    },
    result: function (result) {
      return this.xf['@@transducer/result'](result);
    }
  };

  function _map(fn, functor) {
    var idx = 0;
    var len = functor.length;
    var result = Array(len);

    while (idx < len) {
      result[idx] = fn(functor[idx]);
      idx += 1;
    }

    return result;
  }

  function _isString(x) {
    return Object.prototype.toString.call(x) === '[object String]';
  }

  /**
   * Tests whether or not an object is similar to an array.
   *
   * @private
   * @category Type
   * @category List
   * @sig * -> Boolean
   * @param {*} x The object to test.
   * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.
   * @example
   *
   *      _isArrayLike([]); //=> true
   *      _isArrayLike(true); //=> false
   *      _isArrayLike({}); //=> false
   *      _isArrayLike({length: 10}); //=> false
   *      _isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
   */

  var _isArrayLike =
  /*#__PURE__*/
  _curry1(function isArrayLike(x) {
    if (_isArray(x)) {
      return true;
    }

    if (!x) {
      return false;
    }

    if (typeof x !== 'object') {
      return false;
    }

    if (_isString(x)) {
      return false;
    }

    if (x.nodeType === 1) {
      return !!x.length;
    }

    if (x.length === 0) {
      return true;
    }

    if (x.length > 0) {
      return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
    }

    return false;
  });

  var _isArrayLike$1 = _isArrayLike;

  var XWrap =
  /*#__PURE__*/
  function () {
    function XWrap(fn) {
      this.f = fn;
    }

    XWrap.prototype['@@transducer/init'] = function () {
      throw new Error('init not implemented on XWrap');
    };

    XWrap.prototype['@@transducer/result'] = function (acc) {
      return acc;
    };

    XWrap.prototype['@@transducer/step'] = function (acc, x) {
      return this.f(acc, x);
    };

    return XWrap;
  }();

  function _xwrap(fn) {
    return new XWrap(fn);
  }

  /**
   * Creates a function that is bound to a context.
   * Note: `R.bind` does not provide the additional argument-binding capabilities of
   * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
   *
   * @func
   * @memberOf R
   * @since v0.6.0
   * @category Function
   * @category Object
   * @sig (* -> *) -> {*} -> (* -> *)
   * @param {Function} fn The function to bind to context
   * @param {Object} thisObj The context to bind `fn` to
   * @return {Function} A function that will execute in the context of `thisObj`.
   * @see R.partial
   * @example
   *
   *      const log = R.bind(console.log, console);
   *      R.pipe(R.assoc('a', 2), R.tap(log), R.assoc('a', 3))({a: 1}); //=> {a: 3}
   *      // logs {a: 2}
   * @symb R.bind(f, o)(a, b) = f.call(o, a, b)
   */

  var bind =
  /*#__PURE__*/
  _curry2(function bind(fn, thisObj) {
    return _arity(fn.length, function () {
      return fn.apply(thisObj, arguments);
    });
  });

  var bind$1 = bind;

  function _arrayReduce(xf, acc, list) {
    var idx = 0;
    var len = list.length;

    while (idx < len) {
      acc = xf['@@transducer/step'](acc, list[idx]);

      if (acc && acc['@@transducer/reduced']) {
        acc = acc['@@transducer/value'];
        break;
      }

      idx += 1;
    }

    return xf['@@transducer/result'](acc);
  }

  function _iterableReduce(xf, acc, iter) {
    var step = iter.next();

    while (!step.done) {
      acc = xf['@@transducer/step'](acc, step.value);

      if (acc && acc['@@transducer/reduced']) {
        acc = acc['@@transducer/value'];
        break;
      }

      step = iter.next();
    }

    return xf['@@transducer/result'](acc);
  }

  function _methodReduce(xf, acc, obj, methodName) {
    return xf['@@transducer/result'](obj[methodName](bind$1(xf['@@transducer/step'], xf), acc));
  }

  var symIterator = typeof Symbol !== 'undefined' ? Symbol.iterator : '@@iterator';
  function _reduce(fn, acc, list) {
    if (typeof fn === 'function') {
      fn = _xwrap(fn);
    }

    if (_isArrayLike$1(list)) {
      return _arrayReduce(fn, acc, list);
    }

    if (typeof list['fantasy-land/reduce'] === 'function') {
      return _methodReduce(fn, acc, list, 'fantasy-land/reduce');
    }

    if (list[symIterator] != null) {
      return _iterableReduce(fn, acc, list[symIterator]());
    }

    if (typeof list.next === 'function') {
      return _iterableReduce(fn, acc, list);
    }

    if (typeof list.reduce === 'function') {
      return _methodReduce(fn, acc, list, 'reduce');
    }

    throw new TypeError('reduce: list must be array or iterable');
  }

  var XMap =
  /*#__PURE__*/
  function () {
    function XMap(f, xf) {
      this.xf = xf;
      this.f = f;
    }

    XMap.prototype['@@transducer/init'] = _xfBase.init;
    XMap.prototype['@@transducer/result'] = _xfBase.result;

    XMap.prototype['@@transducer/step'] = function (result, input) {
      return this.xf['@@transducer/step'](result, this.f(input));
    };

    return XMap;
  }();

  var _xmap =
  /*#__PURE__*/
  _curry2(function _xmap(f, xf) {
    return new XMap(f, xf);
  });

  var _xmap$1 = _xmap;

  function _has(prop, obj) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }

  var toString = Object.prototype.toString;

  var _isArguments =
  /*#__PURE__*/
  function () {
    return toString.call(arguments) === '[object Arguments]' ? function _isArguments(x) {
      return toString.call(x) === '[object Arguments]';
    } : function _isArguments(x) {
      return _has('callee', x);
    };
  }();

  var _isArguments$1 = _isArguments;

  var hasEnumBug = !
  /*#__PURE__*/
  {
    toString: null
  }.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['constructor', 'valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString']; // Safari bug

  var hasArgsEnumBug =
  /*#__PURE__*/
  function () {

    return arguments.propertyIsEnumerable('length');
  }();

  var contains = function contains(list, item) {
    var idx = 0;

    while (idx < list.length) {
      if (list[idx] === item) {
        return true;
      }

      idx += 1;
    }

    return false;
  };
  /**
   * Returns a list containing the names of all the enumerable own properties of
   * the supplied object.
   * Note that the order of the output array is not guaranteed to be consistent
   * across different JS platforms.
   *
   * @func
   * @memberOf R
   * @since v0.1.0
   * @category Object
   * @sig {k: v} -> [k]
   * @param {Object} obj The object to extract properties from
   * @return {Array} An array of the object's own properties.
   * @see R.keysIn, R.values
   * @example
   *
   *      R.keys({a: 1, b: 2, c: 3}); //=> ['a', 'b', 'c']
   */


  var keys = typeof Object.keys === 'function' && !hasArgsEnumBug ?
  /*#__PURE__*/
  _curry1(function keys(obj) {
    return Object(obj) !== obj ? [] : Object.keys(obj);
  }) :
  /*#__PURE__*/
  _curry1(function keys(obj) {
    if (Object(obj) !== obj) {
      return [];
    }

    var prop, nIdx;
    var ks = [];

    var checkArgsLength = hasArgsEnumBug && _isArguments$1(obj);

    for (prop in obj) {
      if (_has(prop, obj) && (!checkArgsLength || prop !== 'length')) {
        ks[ks.length] = prop;
      }
    }

    if (hasEnumBug) {
      nIdx = nonEnumerableProps.length - 1;

      while (nIdx >= 0) {
        prop = nonEnumerableProps[nIdx];

        if (_has(prop, obj) && !contains(ks, prop)) {
          ks[ks.length] = prop;
        }

        nIdx -= 1;
      }
    }

    return ks;
  });
  var keys$1 = keys;

  /**
   * Takes a function and
   * a [functor](https://github.com/fantasyland/fantasy-land#functor),
   * applies the function to each of the functor's values, and returns
   * a functor of the same shape.
   *
   * Ramda provides suitable `map` implementations for `Array` and `Object`,
   * so this function may be applied to `[1, 2, 3]` or `{x: 1, y: 2, z: 3}`.
   *
   * Dispatches to the `map` method of the second argument, if present.
   *
   * Acts as a transducer if a transformer is given in list position.
   *
   * Also treats functions as functors and will compose them together.
   *
   * @func
   * @memberOf R
   * @since v0.1.0
   * @category List
   * @sig Functor f => (a -> b) -> f a -> f b
   * @param {Function} fn The function to be called on every element of the input `list`.
   * @param {Array} list The list to be iterated over.
   * @return {Array} The new list.
   * @see R.transduce, R.addIndex
   * @example
   *
   *      const double = x => x * 2;
   *
   *      R.map(double, [1, 2, 3]); //=> [2, 4, 6]
   *
   *      R.map(double, {x: 1, y: 2, z: 3}); //=> {x: 2, y: 4, z: 6}
   * @symb R.map(f, [a, b]) = [f(a), f(b)]
   * @symb R.map(f, { x: a, y: b }) = { x: f(a), y: f(b) }
   * @symb R.map(f, functor_o) = functor_o.map(f)
   */

  var map =
  /*#__PURE__*/
  _curry2(
  /*#__PURE__*/
  _dispatchable(['fantasy-land/map', 'map'], _xmap$1, function map(fn, functor) {
    switch (Object.prototype.toString.call(functor)) {
      case '[object Function]':
        return curryN$1(functor.length, function () {
          return fn.call(this, functor.apply(this, arguments));
        });

      case '[object Object]':
        return _reduce(function (acc, key) {
          acc[key] = fn(functor[key]);
          return acc;
        }, {}, keys$1(functor));

      default:
        return _map(fn, functor);
    }
  }));

  var map$1 = map;

  /**
   * Determine if the passed argument is an integer.
   *
   * @private
   * @param {*} n
   * @category Type
   * @return {Boolean}
   */
  var _isInteger = Number.isInteger || function _isInteger(n) {
    return n << 0 === n;
  };

  /**
   * Returns the nth element of the given list or string. If n is negative the
   * element at index length + n is returned.
   *
   * @func
   * @memberOf R
   * @since v0.1.0
   * @category List
   * @sig Number -> [a] -> a | Undefined
   * @sig Number -> String -> String
   * @param {Number} offset
   * @param {*} list
   * @return {*}
   * @example
   *
   *      const list = ['foo', 'bar', 'baz', 'quux'];
   *      R.nth(1, list); //=> 'bar'
   *      R.nth(-1, list); //=> 'quux'
   *      R.nth(-99, list); //=> undefined
   *
   *      R.nth(2, 'abc'); //=> 'c'
   *      R.nth(3, 'abc'); //=> ''
   * @symb R.nth(-1, [a, b, c]) = c
   * @symb R.nth(0, [a, b, c]) = a
   * @symb R.nth(1, [a, b, c]) = b
   */

  var nth =
  /*#__PURE__*/
  _curry2(function nth(offset, list) {
    var idx = offset < 0 ? list.length + offset : offset;
    return _isString(list) ? list.charAt(idx) : list[idx];
  });

  var nth$1 = nth;

  /**
   * Retrieves the values at given paths of an object.
   *
   * @func
   * @memberOf R
   * @since v0.27.1
   * @category Object
   * @typedefn Idx = [String | Int]
   * @sig [Idx] -> {a} -> [a | Undefined]
   * @param {Array} pathsArray The array of paths to be fetched.
   * @param {Object} obj The object to retrieve the nested properties from.
   * @return {Array} A list consisting of values at paths specified by "pathsArray".
   * @see R.path
   * @example
   *
   *      R.paths([['a', 'b'], ['p', 0, 'q']], {a: {b: 2}, p: [{q: 3}]}); //=> [2, 3]
   *      R.paths([['a', 'b'], ['p', 'r']], {a: {b: 2}, p: [{q: 3}]}); //=> [2, undefined]
   */

  var paths =
  /*#__PURE__*/
  _curry2(function paths(pathsArray, obj) {
    return pathsArray.map(function (paths) {
      var val = obj;
      var idx = 0;
      var p;

      while (idx < paths.length) {
        if (val == null) {
          return;
        }

        p = paths[idx];
        val = _isInteger(p) ? nth$1(p, val) : val[p];
        idx += 1;
      }

      return val;
    });
  });

  var paths$1 = paths;

  /**
   * Retrieve the value at a given path.
   *
   * @func
   * @memberOf R
   * @since v0.2.0
   * @category Object
   * @typedefn Idx = String | Int
   * @sig [Idx] -> {a} -> a | Undefined
   * @param {Array} path The path to use.
   * @param {Object} obj The object to retrieve the nested property from.
   * @return {*} The data at `path`.
   * @see R.prop, R.nth
   * @example
   *
   *      R.path(['a', 'b'], {a: {b: 2}}); //=> 2
   *      R.path(['a', 'b'], {c: {b: 2}}); //=> undefined
   *      R.path(['a', 'b', 0], {a: {b: [1, 2, 3]}}); //=> 1
   *      R.path(['a', 'b', -2], {a: {b: [1, 2, 3]}}); //=> 2
   */

  var path =
  /*#__PURE__*/
  _curry2(function path(pathAr, obj) {
    return paths$1([pathAr], obj)[0];
  });

  var path$1 = path;

  function _cloneRegExp(pattern) {
    return new RegExp(pattern.source, (pattern.global ? 'g' : '') + (pattern.ignoreCase ? 'i' : '') + (pattern.multiline ? 'm' : '') + (pattern.sticky ? 'y' : '') + (pattern.unicode ? 'u' : ''));
  }

  /**
   * Gives a single-word string description of the (native) type of a value,
   * returning such answers as 'Object', 'Number', 'Array', or 'Null'. Does not
   * attempt to distinguish user Object types any further, reporting them all as
   * 'Object'.
   *
   * @func
   * @memberOf R
   * @since v0.8.0
   * @category Type
   * @sig (* -> {*}) -> String
   * @param {*} val The value to test
   * @return {String}
   * @example
   *
   *      R.type({}); //=> "Object"
   *      R.type(1); //=> "Number"
   *      R.type(false); //=> "Boolean"
   *      R.type('s'); //=> "String"
   *      R.type(null); //=> "Null"
   *      R.type([]); //=> "Array"
   *      R.type(/[A-z]/); //=> "RegExp"
   *      R.type(() => {}); //=> "Function"
   *      R.type(undefined); //=> "Undefined"
   */

  var type =
  /*#__PURE__*/
  _curry1(function type(val) {
    return val === null ? 'Null' : val === undefined ? 'Undefined' : Object.prototype.toString.call(val).slice(8, -1);
  });

  var type$1 = type;

  /**
   * Copies an object.
   *
   * @private
   * @param {*} value The value to be copied
   * @param {Array} refFrom Array containing the source references
   * @param {Array} refTo Array containing the copied source references
   * @param {Boolean} deep Whether or not to perform deep cloning.
   * @return {*} The copied value.
   */

  function _clone(value, refFrom, refTo, deep) {
    var copy = function copy(copiedValue) {
      var len = refFrom.length;
      var idx = 0;

      while (idx < len) {
        if (value === refFrom[idx]) {
          return refTo[idx];
        }

        idx += 1;
      }

      refFrom[idx + 1] = value;
      refTo[idx + 1] = copiedValue;

      for (var key in value) {
        copiedValue[key] = deep ? _clone(value[key], refFrom, refTo, true) : value[key];
      }

      return copiedValue;
    };

    switch (type$1(value)) {
      case 'Object':
        return copy({});

      case 'Array':
        return copy([]);

      case 'Date':
        return new Date(value.valueOf());

      case 'RegExp':
        return _cloneRegExp(value);

      default:
        return value;
    }
  }

  /**
   * Creates a deep copy of the value which may contain (nested) `Array`s and
   * `Object`s, `Number`s, `String`s, `Boolean`s and `Date`s. `Function`s are
   * assigned by reference rather than copied
   *
   * Dispatches to a `clone` method if present.
   *
   * @func
   * @memberOf R
   * @since v0.1.0
   * @category Object
   * @sig {*} -> {*}
   * @param {*} value The object or array to clone
   * @return {*} A deeply cloned copy of `val`
   * @example
   *
   *      const objects = [{}, {}, {}];
   *      const objectsClone = R.clone(objects);
   *      objects === objectsClone; //=> false
   *      objects[0] === objectsClone[0]; //=> false
   */

  var clone$1 =
  /*#__PURE__*/
  _curry1(function clone(value) {
    return value != null && typeof value.clone === 'function' ? value.clone() : _clone(value, [], [], true);
  });

  var clone$1$1 = clone$1;

  /**
   * This checks whether a function has a [methodname] function. If it isn't an
   * array it will execute that function otherwise it will default to the ramda
   * implementation.
   *
   * @private
   * @param {Function} fn ramda implemtation
   * @param {String} methodname property to check for a custom implementation
   * @return {Object} Whatever the return value of the method is.
   */

  function _checkForMethod(methodname, fn) {
    return function () {
      var length = arguments.length;

      if (length === 0) {
        return fn();
      }

      var obj = arguments[length - 1];
      return _isArray(obj) || typeof obj[methodname] !== 'function' ? fn.apply(this, arguments) : obj[methodname].apply(obj, Array.prototype.slice.call(arguments, 0, length - 1));
    };
  }

  /**
   * Returns the elements of the given list or string (or object with a `slice`
   * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).
   *
   * Dispatches to the `slice` method of the third argument, if present.
   *
   * @func
   * @memberOf R
   * @since v0.1.4
   * @category List
   * @sig Number -> Number -> [a] -> [a]
   * @sig Number -> Number -> String -> String
   * @param {Number} fromIndex The start index (inclusive).
   * @param {Number} toIndex The end index (exclusive).
   * @param {*} list
   * @return {*}
   * @example
   *
   *      R.slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']
   *      R.slice(1, Infinity, ['a', 'b', 'c', 'd']); //=> ['b', 'c', 'd']
   *      R.slice(0, -1, ['a', 'b', 'c', 'd']);       //=> ['a', 'b', 'c']
   *      R.slice(-3, -1, ['a', 'b', 'c', 'd']);      //=> ['b', 'c']
   *      R.slice(0, 3, 'ramda');                     //=> 'ram'
   */

  var slice =
  /*#__PURE__*/
  _curry3(
  /*#__PURE__*/
  _checkForMethod('slice', function slice(fromIndex, toIndex, list) {
    return Array.prototype.slice.call(list, fromIndex, toIndex);
  }));

  var slice$1 = slice;

  /**
   * Returns all but the first element of the given list or string (or object
   * with a `tail` method).
   *
   * Dispatches to the `slice` method of the first argument, if present.
   *
   * @func
   * @memberOf R
   * @since v0.1.0
   * @category List
   * @sig [a] -> [a]
   * @sig String -> String
   * @param {*} list
   * @return {*}
   * @see R.head, R.init, R.last
   * @example
   *
   *      R.tail([1, 2, 3]);  //=> [2, 3]
   *      R.tail([1, 2]);     //=> [2]
   *      R.tail([1]);        //=> []
   *      R.tail([]);         //=> []
   *
   *      R.tail('abc');  //=> 'bc'
   *      R.tail('ab');   //=> 'b'
   *      R.tail('a');    //=> ''
   *      R.tail('');     //=> ''
   */

  var tail =
  /*#__PURE__*/
  _curry1(
  /*#__PURE__*/
  _checkForMethod('tail',
  /*#__PURE__*/
  slice$1(1, Infinity)));

  var tail$1 = tail;

  /**
   * Returns a new list or string with the elements or characters in reverse
   * order.
   *
   * @func
   * @memberOf R
   * @since v0.1.0
   * @category List
   * @sig [a] -> [a]
   * @sig String -> String
   * @param {Array|String} list
   * @return {Array|String}
   * @example
   *
   *      R.reverse([1, 2, 3]);  //=> [3, 2, 1]
   *      R.reverse([1, 2]);     //=> [2, 1]
   *      R.reverse([1]);        //=> [1]
   *      R.reverse([]);         //=> []
   *
   *      R.reverse('abc');      //=> 'cba'
   *      R.reverse('ab');       //=> 'ba'
   *      R.reverse('a');        //=> 'a'
   *      R.reverse('');         //=> ''
   */

  var reverse =
  /*#__PURE__*/
  _curry1(function reverse(list) {
    return _isString(list) ? list.split('').reverse().join('') : Array.prototype.slice.call(list, 0).reverse();
  });

  var reverse$1 = reverse;

  /**
   * Returns the first element of the given list or string. In some libraries
   * this function is named `first`.
   *
   * @func
   * @memberOf R
   * @since v0.1.0
   * @category List
   * @sig [a] -> a | Undefined
   * @sig String -> String
   * @param {Array|String} list
   * @return {*}
   * @see R.tail, R.init, R.last
   * @example
   *
   *      R.head(['fi', 'fo', 'fum']); //=> 'fi'
   *      R.head([]); //=> undefined
   *
   *      R.head('abc'); //=> 'a'
   *      R.head(''); //=> ''
   */

  var head =
  /*#__PURE__*/
  nth$1(0);
  var head$1 = head;

  /**
   * Returns the second argument if it is not `null`, `undefined` or `NaN`;
   * otherwise the first argument is returned.
   *
   * @func
   * @memberOf R
   * @since v0.10.0
   * @category Logic
   * @sig a -> b -> a | b
   * @param {a} default The default value.
   * @param {b} val `val` will be returned instead of `default` unless `val` is `null`, `undefined` or `NaN`.
   * @return {*} The second value if it is not `null`, `undefined` or `NaN`, otherwise the default value
   * @example
   *
   *      const defaultTo42 = R.defaultTo(42);
   *
   *      defaultTo42(null);  //=> 42
   *      defaultTo42(undefined);  //=> 42
   *      defaultTo42(false);  //=> false
   *      defaultTo42('Ramda');  //=> 'Ramda'
   *      // parseInt('string') results in NaN
   *      defaultTo42(parseInt('string')); //=> 42
   */

  var defaultTo =
  /*#__PURE__*/
  _curry2(function defaultTo(d, v) {
    return v == null || v !== v ? d : v;
  });

  var defaultTo$1 = defaultTo;

  /**
   * Returns the last element of the given list or string.
   *
   * @func
   * @memberOf R
   * @since v0.1.4
   * @category List
   * @sig [a] -> a | Undefined
   * @sig String -> String
   * @param {*} list
   * @return {*}
   * @see R.init, R.head, R.tail
   * @example
   *
   *      R.last(['fi', 'fo', 'fum']); //=> 'fum'
   *      R.last([]); //=> undefined
   *
   *      R.last('abc'); //=> 'c'
   *      R.last(''); //=> ''
   */

  var last =
  /*#__PURE__*/
  nth$1(-1);
  var last$1 = last;

  var XFindIndex =
  /*#__PURE__*/
  function () {
    function XFindIndex(f, xf) {
      this.xf = xf;
      this.f = f;
      this.idx = -1;
      this.found = false;
    }

    XFindIndex.prototype['@@transducer/init'] = _xfBase.init;

    XFindIndex.prototype['@@transducer/result'] = function (result) {
      if (!this.found) {
        result = this.xf['@@transducer/step'](result, -1);
      }

      return this.xf['@@transducer/result'](result);
    };

    XFindIndex.prototype['@@transducer/step'] = function (result, input) {
      this.idx += 1;

      if (this.f(input)) {
        this.found = true;
        result = _reduced(this.xf['@@transducer/step'](result, this.idx));
      }

      return result;
    };

    return XFindIndex;
  }();

  var _xfindIndex =
  /*#__PURE__*/
  _curry2(function _xfindIndex(f, xf) {
    return new XFindIndex(f, xf);
  });

  var _xfindIndex$1 = _xfindIndex;

  /**
   * Returns the index of the first element of the list which matches the
   * predicate, or `-1` if no element matches.
   *
   * Acts as a transducer if a transformer is given in list position.
   *
   * @func
   * @memberOf R
   * @since v0.1.1
   * @category List
   * @sig (a -> Boolean) -> [a] -> Number
   * @param {Function} fn The predicate function used to determine if the element is the
   * desired one.
   * @param {Array} list The array to consider.
   * @return {Number} The index of the element found, or `-1`.
   * @see R.transduce
   * @example
   *
   *      const xs = [{a: 1}, {a: 2}, {a: 3}];
   *      R.findIndex(R.propEq('a', 2))(xs); //=> 1
   *      R.findIndex(R.propEq('a', 4))(xs); //=> -1
   */

  var findIndex =
  /*#__PURE__*/
  _curry2(
  /*#__PURE__*/
  _dispatchable([], _xfindIndex$1, function findIndex(fn, list) {
    var idx = 0;
    var len = list.length;

    while (idx < len) {
      if (fn(list[idx])) {
        return idx;
      }

      idx += 1;
    }

    return -1;
  }));

  var findIndex$1 = findIndex;

  /**
   * Returns all but the last element of the given list or string.
   *
   * @func
   * @memberOf R
   * @since v0.9.0
   * @category List
   * @sig [a] -> [a]
   * @sig String -> String
   * @param {*} list
   * @return {*}
   * @see R.last, R.head, R.tail
   * @example
   *
   *      R.init([1, 2, 3]);  //=> [1, 2]
   *      R.init([1, 2]);     //=> [1]
   *      R.init([1]);        //=> []
   *      R.init([]);         //=> []
   *
   *      R.init('abc');  //=> 'ab'
   *      R.init('ab');   //=> 'a'
   *      R.init('a');    //=> ''
   *      R.init('');     //=> ''
   */

  var init =
  /*#__PURE__*/
  slice$1(0, -1);
  var init$1 = init;

  function _objectAssign(target) {
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    var output = Object(target);
    var idx = 1;
    var length = arguments.length;

    while (idx < length) {
      var source = arguments[idx];

      if (source != null) {
        for (var nextKey in source) {
          if (_has(nextKey, source)) {
            output[nextKey] = source[nextKey];
          }
        }
      }

      idx += 1;
    }

    return output;
  }

  var _objectAssign$1 = typeof Object.assign === 'function' ? Object.assign : _objectAssign;

  /**
   * See if an object (`val`) is an instance of the supplied constructor. This
   * function will check up the inheritance chain, if any.
   *
   * @func
   * @memberOf R
   * @since v0.3.0
   * @category Type
   * @sig (* -> {*}) -> a -> Boolean
   * @param {Object} ctor A constructor
   * @param {*} val The value to test
   * @return {Boolean}
   * @example
   *
   *      R.is(Object, {}); //=> true
   *      R.is(Number, 1); //=> true
   *      R.is(Object, 1); //=> false
   *      R.is(String, 's'); //=> true
   *      R.is(String, new String('')); //=> true
   *      R.is(Object, new String('')); //=> true
   *      R.is(Object, 's'); //=> false
   *      R.is(Number, {}); //=> false
   */

  var is =
  /*#__PURE__*/
  _curry2(function is(Ctor, val) {
    return val != null && val.constructor === Ctor || val instanceof Ctor;
  });

  var is$1 = is;

  /**
   * Create a new object with the own properties of the first object merged with
   * the own properties of the second object. If a key exists in both objects,
   * the value from the second object will be used.
   *
   * @func
   * @memberOf R
   * @since v0.26.0
   * @category Object
   * @sig {k: v} -> {k: v} -> {k: v}
   * @param {Object} l
   * @param {Object} r
   * @return {Object}
   * @see R.mergeLeft, R.mergeDeepRight, R.mergeWith, R.mergeWithKey
   * @example
   *
   *      R.mergeRight({ 'name': 'fred', 'age': 10 }, { 'age': 40 });
   *      //=> { 'name': 'fred', 'age': 40 }
   *
   *      const withDefaults = R.mergeRight({x: 0, y: 0});
   *      withDefaults({y: 2}); //=> {x: 0, y: 2}
   * @symb R.mergeRight(a, b) = {...a, ...b}
   */

  var mergeRight =
  /*#__PURE__*/
  _curry2(function mergeRight(l, r) {
    return _objectAssign$1({}, l, r);
  });

  var mergeRight$1 = mergeRight;

  /**
   * Returns a partial copy of an object omitting the keys specified.
   *
   * @func
   * @memberOf R
   * @since v0.1.0
   * @category Object
   * @sig [String] -> {String: *} -> {String: *}
   * @param {Array} names an array of String property names to omit from the new object
   * @param {Object} obj The object to copy from
   * @return {Object} A new object with properties from `names` not on it.
   * @see R.pick
   * @example
   *
   *      R.omit(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, c: 3}
   */

  var omit =
  /*#__PURE__*/
  _curry2(function omit(names, obj) {
    var result = {};
    var index = {};
    var idx = 0;
    var len = names.length;

    while (idx < len) {
      index[names[idx]] = 1;
      idx += 1;
    }

    for (var prop in obj) {
      if (!index.hasOwnProperty(prop)) {
        result[prop] = obj[prop];
      }
    }

    return result;
  });

  var omit$1 = omit;

  /**
   * If the given, non-null object has a value at the given path, returns the
   * value at that path. Otherwise returns the provided default value.
   *
   * @func
   * @memberOf R
   * @since v0.18.0
   * @category Object
   * @typedefn Idx = String | Int
   * @sig a -> [Idx] -> {a} -> a
   * @param {*} d The default value.
   * @param {Array} p The path to use.
   * @param {Object} obj The object to retrieve the nested property from.
   * @return {*} The data at `path` of the supplied object or the default value.
   * @example
   *
   *      R.pathOr('N/A', ['a', 'b'], {a: {b: 2}}); //=> 2
   *      R.pathOr('N/A', ['a', 'b'], {c: {b: 2}}); //=> "N/A"
   */

  var pathOr =
  /*#__PURE__*/
  _curry3(function pathOr(d, p, obj) {
    return defaultTo$1(d, path$1(p, obj));
  });

  var pathOr$1 = pathOr;

  /**
   * If the given, non-null object has an own property with the specified name,
   * returns the value of that property. Otherwise returns the provided default
   * value.
   *
   * @func
   * @memberOf R
   * @since v0.6.0
   * @category Object
   * @sig a -> String -> Object -> a
   * @param {*} val The default value.
   * @param {String} p The name of the property to return.
   * @param {Object} obj The object to query.
   * @return {*} The value of given property of the supplied object or the default value.
   * @example
   *
   *      const alice = {
   *        name: 'ALICE',
   *        age: 101
   *      };
   *      const favorite = R.prop('favoriteLibrary');
   *      const favoriteWithDefault = R.propOr('Ramda', 'favoriteLibrary');
   *
   *      favorite(alice);  //=> undefined
   *      favoriteWithDefault(alice);  //=> 'Ramda'
   */

  var propOr =
  /*#__PURE__*/
  _curry3(function propOr(val, p, obj) {
    return pathOr$1(val, [p], obj);
  });

  var propOr$1 = propOr;

  /**
   * @desc 解决浮动运算问题，避免小数点后产生多位数和计算精度损失。
   *
   * 问题示例：2.3 + 2.4 = 4.699999999999999，1.0 - 0.9 = 0.09999999999999998
   */
  /**
   * Correct the given number to specifying significant digits.
   *
   * @param num The input number
   * @param precision An integer specifying the number of significant digits
   *
   * @example strip(0.09999999999999998) === 0.1 // true
   */
  function strip(num, precision) {
      if (precision === void 0) { precision = 15; }
      return +parseFloat(Number(num).toPrecision(precision));
  }
  /**
   * Return digits length of a number.
   *
   * @param num The input number
   */
  function digitLength(num) {
      // Get digit length of e
      var eSplit = num.toString().split(/[eE]/);
      var len = (eSplit[0].split('.')[1] || '').length - +(eSplit[1] || 0);
      return len > 0 ? len : 0;
  }
  /**
   * Convert the given number to integer, support scientific notation.
   * The number will be scale up if it is decimal.
   *
   * @param num The input number
   */
  function float2Fixed(num) {
      if (num.toString().indexOf('e') === -1) {
          return Number(num.toString().replace('.', ''));
      }
      var dLen = digitLength(num);
      return dLen > 0 ? strip(Number(num) * Math.pow(10, dLen)) : Number(num);
  }
  /**
   * Log a warning if the given number is out of bounds.
   *
   * @param num The input number
   */
  function checkBoundary(num) {
      if (_boundaryCheckingState) {
          if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
              console.warn(num + " is beyond boundary when transfer to integer, the results may not be accurate");
          }
      }
  }
  /**
   * Create an operation to support rest params.
   *
   * @param operation The original operation
   */
  function createOperation(operation) {
      return function () {
          var nums = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              nums[_i] = arguments[_i];
          }
          var first = nums[0], others = nums.slice(1);
          return others.reduce(function (prev, next) { return operation(prev, next); }, first);
      };
  }
  /**
   * Accurate multiplication.
   *
   * @param nums The numbers to multiply
   */
  var times = createOperation(function (num1, num2) {
      var num1Changed = float2Fixed(num1);
      var num2Changed = float2Fixed(num2);
      var baseNum = digitLength(num1) + digitLength(num2);
      var leftValue = num1Changed * num2Changed;
      checkBoundary(leftValue);
      return leftValue / Math.pow(10, baseNum);
  });
  /**
   * Accurate addition.
   *
   * @param nums The numbers to add
   */
  var plus = createOperation(function (num1, num2) {
      // 取最大的小数位
      var baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
      // 把小数都转为整数然后再计算
      return (times(num1, baseNum) + times(num2, baseNum)) / baseNum;
  });
  /**
   * Accurate subtraction.
   *
   * @param nums The numbers to subtract
   */
  var minus = createOperation(function (num1, num2) {
      var baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
      return (times(num1, baseNum) - times(num2, baseNum)) / baseNum;
  });
  /**
   * Accurate division.
   *
   * @param nums The numbers to divide
   */
  var divide = createOperation(function (num1, num2) {
      var num1Changed = float2Fixed(num1);
      var num2Changed = float2Fixed(num2);
      checkBoundary(num1Changed);
      checkBoundary(num2Changed);
      // fix: 类似 10 ** -4 为 0.00009999999999999999，strip 修正
      return times(num1Changed / num2Changed, strip(Math.pow(10, digitLength(num2) - digitLength(num1))));
  });
  /**
   * Accurate rounding method.
   *
   * @param num The number to round
   * @param decimal An integer specifying the decimal digits
   */
  function round(num, decimal) {
      var base = Math.pow(10, decimal);
      var result = divide(Math.round(Math.abs(times(num, base))), base);
      if (num < 0 && result !== 0) {
          result = times(result, -1);
      }
      return result;
  }
  var _boundaryCheckingState = true;
  /**
   * Whether to check the bounds of number, default is enabled.
   *
   * @param flag The value to indicate whether is enabled
   */
  function enableBoundaryChecking(flag) {
      if (flag === void 0) { flag = true; }
      _boundaryCheckingState = flag;
  }
  var index = {
      strip: strip,
      plus: plus,
      minus: minus,
      times: times,
      divide: divide,
      round: round,
      digitLength: digitLength,
      float2Fixed: float2Fixed,
      enableBoundaryChecking: enableBoundaryChecking,
  };

  var Prando = /** @class */ (function () {
      // ================================================================================================================
      // CONSTRUCTOR ----------------------------------------------------------------------------------------------------
      /**
       * Generate a new Prando pseudo-random number generator.
       *
       * @param seed - A number or string seed that determines which pseudo-random number sequence will be created. Defaults to current time.
       */
      function Prando(seed) {
          this._value = NaN;
          if (typeof (seed) === "string") {
              // String seed
              this._seed = this.hashCode(seed);
          }
          else if (typeof (seed) === "number") {
              // Numeric seed
              this._seed = this.getSafeSeed(seed);
          }
          else {
              // Pseudo-random seed
              this._seed = this.getSafeSeed(Prando.MIN + Math.floor((Prando.MAX - Prando.MIN) * Math.random()));
          }
          this.reset();
      }
      // ================================================================================================================
      // PUBLIC INTERFACE -----------------------------------------------------------------------------------------------
      /**
       * Generates a pseudo-random number between a lower (inclusive) and a higher (exclusive) bounds.
       *
       * @param min - The minimum number that can be randomly generated.
       * @param pseudoMax - The maximum number that can be randomly generated (exclusive).
       * @return The generated pseudo-random number.
       */
      Prando.prototype.next = function (min, pseudoMax) {
          if (min === void 0) { min = 0; }
          if (pseudoMax === void 0) { pseudoMax = 1; }
          this.recalculate();
          return this.map(this._value, Prando.MIN, Prando.MAX, min, pseudoMax);
      };
      /**
       * Generates a pseudo-random integer number in a range (inclusive).
       *
       * @param min - The minimum number that can be randomly generated.
       * @param max - The maximum number that can be randomly generated.
       * @return The generated pseudo-random number.
       */
      Prando.prototype.nextInt = function (min, max) {
          if (min === void 0) { min = 10; }
          if (max === void 0) { max = 100; }
          this.recalculate();
          return Math.floor(this.map(this._value, Prando.MIN, Prando.MAX, min, max + 1));
      };
      /**
       * Generates a pseudo-random string sequence of a particular length from a specific character range.
       *
       * Note: keep in mind that creating a random string sequence does not guarantee uniqueness; there is always a
       * 1 in (char_length^string_length) chance of collision. For real unique string ids, always check for
       * pre-existing ids, or employ a robust GUID/UUID generator.
       *
       * @param length - Length of the strting to be generated.
       * @param chars - Characters that are used when creating the random string. Defaults to all alphanumeric chars (A-Z, a-z, 0-9).
       * @return The generated string sequence.
       */
      Prando.prototype.nextString = function (length, chars) {
          if (length === void 0) { length = 16; }
          if (chars === void 0) { chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; }
          var str = "";
          while (str.length < length) {
              str += this.nextChar(chars);
          }
          return str;
      };
      /**
       * Generates a pseudo-random string of 1 character specific character range.
       *
       * @param chars - Characters that are used when creating the random string. Defaults to all alphanumeric chars (A-Z, a-z, 0-9).
       * @return The generated character.
       */
      Prando.prototype.nextChar = function (chars) {
          if (chars === void 0) { chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; }
          this.recalculate();
          return chars.substr(this.nextInt(0, chars.length - 1), 1);
      };
      /**
       * Picks a pseudo-random item from an array. The array is left unmodified.
       *
       * Note: keep in mind that while the returned item will be random enough, picking one item from the array at a time
       * does not guarantee nor imply that a sequence of random non-repeating items will be picked. If you want to
       * *pick items in a random order* from an array, instead of *pick one random item from an array*, it's best to
       * apply a *shuffle* transformation to the array instead, then read it linearly.
       *
       * @param array - Array of any type containing one or more candidates for random picking.
       * @return An item from the array.
       */
      Prando.prototype.nextArrayItem = function (array) {
          this.recalculate();
          return array[this.nextInt(0, array.length - 1)];
      };
      /**
       * Generates a pseudo-random boolean.
       *
       * @return A value of true or false.
       */
      Prando.prototype.nextBoolean = function () {
          this.recalculate();
          return this._value > 0.5;
      };
      /**
       * Skips ahead in the sequence of numbers that are being generated. This is equivalent to
       * calling next() a specified number of times, but faster since it doesn't need to map the
       * new random numbers to a range and return it.
       *
       * @param iterations - The number of items to skip ahead.
       */
      Prando.prototype.skip = function (iterations) {
          if (iterations === void 0) { iterations = 1; }
          while (iterations-- > 0) {
              this.recalculate();
          }
      };
      /**
       * Reset the pseudo-random number sequence back to its starting seed. Further calls to next()
       * will then produce the same sequence of numbers it had produced before. This is equivalent to
       * creating a new Prando instance with the same seed as another Prando instance.
       *
       * Example:
       * let rng = new Prando(12345678);
       * console.log(rng.next()); // 0.6177754114889017
       * console.log(rng.next()); // 0.5784605181725837
       * rng.reset();
       * console.log(rng.next()); // 0.6177754114889017 again
       * console.log(rng.next()); // 0.5784605181725837 again
       */
      Prando.prototype.reset = function () {
          this._value = this._seed;
      };
      // ================================================================================================================
      // PRIVATE INTERFACE ----------------------------------------------------------------------------------------------
      Prando.prototype.recalculate = function () {
          this._value = this.xorshift(this._value);
      };
      Prando.prototype.xorshift = function (value) {
          // Xorshift*32
          // Based on George Marsaglia's work: http://www.jstatsoft.org/v08/i14/paper
          value ^= value << 13;
          value ^= value >> 17;
          value ^= value << 5;
          return value;
      };
      Prando.prototype.map = function (val, minFrom, maxFrom, minTo, maxTo) {
          return ((val - minFrom) / (maxFrom - minFrom)) * (maxTo - minTo) + minTo;
      };
      Prando.prototype.hashCode = function (str) {
          var hash = 0;
          if (str) {
              var l = str.length;
              for (var i = 0; i < l; i++) {
                  hash = ((hash << 5) - hash) + str.charCodeAt(i);
                  hash |= 0;
                  hash = this.xorshift(hash);
              }
          }
          return this.getSafeSeed(hash);
      };
      Prando.prototype.getSafeSeed = function (seed) {
          if (seed === 0)
              return 1;
          return seed;
      };
      Prando.MIN = -2147483648; // Int32 min
      Prando.MAX = 2147483647; // Int32 max
      return Prando;
  }());

  var pinnaParser = function () {
      var parser_actions = {
          make_pounce_empty: function () {
              return [];
          },
          make_pounce_pl: function (input, start, end, elements) {
              var list = [elements[1]];
              elements[2].forEach(function (el) { list.push(el.value); });
              return list;
          },
          make_word: function (input, start, end, elements) {
              return input.substring(start, end);
          },
          make_map: function (input, start, end, elements) {
              var map = {};
              if (elements.length = 6) {
                  map[elements[2][0]] = elements[2][1];
                  elements[3].elements.forEach(function (el) {
                      map[el.elements[2][0]] = el.elements[2][1];
                  });
              }
              return map;
          },
          make_pair: function (input, start, end, elements) {
              return [elements[0], elements[4]];
          },
          make_string_s: function (input, start, end, elements) {
              return "'" + elements[1].text + "'";
          },
          make_string_d: function (input, start, end, elements) {
              return '"' + elements[1].text + '"';
          },
          make_string_t: function (input, start, end, elements) {
              return '`' + elements[1].text + '`';
          },
          make_list: function (input, start, end, elements) {
              var list = [elements[2]];
              elements[3].forEach(function (el) { list.push(el.value); });
              return list;
          },
          make_list_empty: function (input, start, end, elements) {
              return [];
          },
          make_integer: function (input, start, end, elements) {
              return parseNumber(input.substring(start, end));
          },
          make_float: function (input, start, end, elements) {
              return parseNumber(input.substring(start, end));
          },
          make_ws: function (input, start, end, elements) {
              return null;
          }
      };
      var extend = function (destination, source) {
          if (!destination || !source)
              return destination;
          for (var key in source) {
              if (destination[key] !== source[key])
                  destination[key] = source[key];
          }
          return destination;
      };
      var formatError = function (input, offset, expected) {
          var lines = input.split(/\n/g), lineNo = 0, position = 0;
          while (position <= offset) {
              position += lines[lineNo].length + 1;
              lineNo += 1;
          }
          var message = 'Line ' + lineNo + ': expected ' + expected.join(', ') + '\n', line = lines[lineNo - 1];
          message += line + '\n';
          position -= line.length + 1;
          while (position < offset) {
              message += ' ';
              position += 1;
          }
          return message + '^';
      };
      var inherit = function (subclass, parent) {
          var chain = function () { };
          chain.prototype = parent.prototype;
          subclass.prototype = new chain();
          subclass.prototype.constructor = subclass;
      };
      var TreeNode = function (text, offset, elements) {
          this.text = text;
          this.offset = offset;
          this.elements = elements || [];
      };
      TreeNode.prototype.forEach = function (block, context) {
          for (var el = this.elements, i = 0, n = el.length; i < n; i++) {
              block.call(context, el[i], i, el);
          }
      };
      var TreeNode1 = function (text, offset, elements) {
          TreeNode.apply(this, arguments);
          this['value'] = elements[1];
      };
      inherit(TreeNode1, TreeNode);
      var TreeNode2 = function (text, offset, elements) {
          TreeNode.apply(this, arguments);
          this['value'] = elements[1];
      };
      inherit(TreeNode2, TreeNode);
      var TreeNode3 = function (text, offset, elements) {
          TreeNode.apply(this, arguments);
          this['pair'] = elements[2];
      };
      inherit(TreeNode3, TreeNode);
      var TreeNode4 = function (text, offset, elements) {
          TreeNode.apply(this, arguments);
          this['word'] = elements[0];
          this['value'] = elements[4];
      };
      inherit(TreeNode4, TreeNode);
      var TreeNode5 = function (text, offset, elements) {
          TreeNode.apply(this, arguments);
          this['value'] = elements[2];
      };
      inherit(TreeNode5, TreeNode);
      var TreeNode6 = function (text, offset, elements) {
          TreeNode.apply(this, arguments);
          this['value'] = elements[1];
      };
      inherit(TreeNode6, TreeNode);
      var TreeNode7 = function (text, offset, elements) {
          TreeNode.apply(this, arguments);
          this['end_of_word'] = elements[4];
      };
      inherit(TreeNode7, TreeNode);
      var TreeNode8 = function (text, offset, elements) {
          TreeNode.apply(this, arguments);
          this['end_of_word'] = elements[3];
      };
      inherit(TreeNode8, TreeNode);
      var TreeNode9 = function (text, offset, elements) {
          TreeNode.apply(this, arguments);
          this['end_of_word'] = elements[3];
      };
      inherit(TreeNode9, TreeNode);
      var TreeNode10 = function (text, offset, elements) {
          TreeNode.apply(this, arguments);
          this['end_of_word'] = elements[2];
      };
      inherit(TreeNode10, TreeNode);
      var FAILURE = {};
      var Grammar = {
          _read_pounce: function () {
              var address0 = FAILURE, index0 = this._offset;
              this._cache._pounce = this._cache._pounce || {};
              var cached = this._cache._pounce[index0];
              if (cached) {
                  this._offset = cached[1];
                  return cached[0];
              }
              var index1 = this._offset;
              address0 = this._read_pounce_pl();
              if (address0 === FAILURE) {
                  this._offset = index1;
                  address0 = this._read_pounce_empty();
                  if (address0 === FAILURE) {
                      this._offset = index1;
                  }
              }
              this._cache._pounce[index0] = [address0, this._offset];
              return address0;
          },
          _read_pounce_pl: function () {
              var address0 = FAILURE, index0 = this._offset;
              this._cache._pounce_pl = this._cache._pounce_pl || {};
              var cached = this._cache._pounce_pl[index0];
              if (cached) {
                  this._offset = cached[1];
                  return cached[0];
              }
              var index1 = this._offset, elements0 = new Array(4);
              var address1 = FAILURE;
              var remaining0 = 0, index2 = this._offset, elements1 = [], address2 = true;
              while (address2 !== FAILURE) {
                  address2 = this._read_ws();
                  if (address2 !== FAILURE) {
                      elements1.push(address2);
                      --remaining0;
                  }
              }
              if (remaining0 <= 0) {
                  address1 = new TreeNode(this._input.substring(index2, this._offset), index2, elements1);
                  this._offset = this._offset;
              }
              else {
                  address1 = FAILURE;
              }
              if (address1 !== FAILURE) {
                  elements0[0] = address1;
                  var address3 = FAILURE;
                  address3 = this._read_value();
                  if (address3 !== FAILURE) {
                      elements0[1] = address3;
                      var address4 = FAILURE;
                      var remaining1 = 0, index3 = this._offset, elements2 = [], address5 = true;
                      while (address5 !== FAILURE) {
                          var index4 = this._offset, elements3 = new Array(2);
                          var address6 = FAILURE;
                          var remaining2 = 0, index5 = this._offset, elements4 = [], address7 = true;
                          while (address7 !== FAILURE) {
                              address7 = this._read_ws();
                              if (address7 !== FAILURE) {
                                  elements4.push(address7);
                                  --remaining2;
                              }
                          }
                          if (remaining2 <= 0) {
                              address6 = new TreeNode(this._input.substring(index5, this._offset), index5, elements4);
                              this._offset = this._offset;
                          }
                          else {
                              address6 = FAILURE;
                          }
                          if (address6 !== FAILURE) {
                              elements3[0] = address6;
                              var address8 = FAILURE;
                              address8 = this._read_value();
                              if (address8 !== FAILURE) {
                                  elements3[1] = address8;
                              }
                              else {
                                  elements3 = null;
                                  this._offset = index4;
                              }
                          }
                          else {
                              elements3 = null;
                              this._offset = index4;
                          }
                          if (elements3 === null) {
                              address5 = FAILURE;
                          }
                          else {
                              address5 = new TreeNode2(this._input.substring(index4, this._offset), index4, elements3);
                              this._offset = this._offset;
                          }
                          if (address5 !== FAILURE) {
                              elements2.push(address5);
                              --remaining1;
                          }
                      }
                      if (remaining1 <= 0) {
                          address4 = new TreeNode(this._input.substring(index3, this._offset), index3, elements2);
                          this._offset = this._offset;
                      }
                      else {
                          address4 = FAILURE;
                      }
                      if (address4 !== FAILURE) {
                          elements0[2] = address4;
                          var address9 = FAILURE;
                          var remaining3 = 0, index6 = this._offset, elements5 = [], address10 = true;
                          while (address10 !== FAILURE) {
                              address10 = this._read_ws();
                              if (address10 !== FAILURE) {
                                  elements5.push(address10);
                                  --remaining3;
                              }
                          }
                          if (remaining3 <= 0) {
                              address9 = new TreeNode(this._input.substring(index6, this._offset), index6, elements5);
                              this._offset = this._offset;
                          }
                          else {
                              address9 = FAILURE;
                          }
                          if (address9 !== FAILURE) {
                              elements0[3] = address9;
                          }
                          else {
                              elements0 = null;
                              this._offset = index1;
                          }
                      }
                      else {
                          elements0 = null;
                          this._offset = index1;
                      }
                  }
                  else {
                      elements0 = null;
                      this._offset = index1;
                  }
              }
              else {
                  elements0 = null;
                  this._offset = index1;
              }
              if (elements0 === null) {
                  address0 = FAILURE;
              }
              else {
                  address0 = this._actions.make_pounce_pl(this._input, index1, this._offset, elements0);
                  this._offset = this._offset;
              }
              this._cache._pounce_pl[index0] = [address0, this._offset];
              return address0;
          },
          _read_pounce_empty: function () {
              var address0 = FAILURE, index0 = this._offset;
              this._cache._pounce_empty = this._cache._pounce_empty || {};
              var cached = this._cache._pounce_empty[index0];
              if (cached) {
                  this._offset = cached[1];
                  return cached[0];
              }
              var remaining0 = 0, index1 = this._offset, elements0 = [], address1 = true;
              while (address1 !== FAILURE) {
                  address1 = this._read_ws();
                  if (address1 !== FAILURE) {
                      elements0.push(address1);
                      --remaining0;
                  }
              }
              if (remaining0 <= 0) {
                  address0 = this._actions.make_pounce_empty(this._input, index1, this._offset, elements0);
                  this._offset = this._offset;
              }
              else {
                  address0 = FAILURE;
              }
              this._cache._pounce_empty[index0] = [address0, this._offset];
              return address0;
          },
          _read_word: function () {
              var address0 = FAILURE, index0 = this._offset;
              this._cache._word = this._cache._word || {};
              var cached = this._cache._word[index0];
              if (cached) {
                  this._offset = cached[1];
                  return cached[0];
              }
              var index1 = this._offset, elements0 = new Array(2);
              var address1 = FAILURE;
              var remaining0 = 1, index2 = this._offset, elements1 = [], address2 = true;
              while (address2 !== FAILURE) {
                  var chunk0 = null;
                  if (this._offset < this._inputSize) {
                      chunk0 = this._input.substring(this._offset, this._offset + 1);
                  }
                  if (chunk0 !== null && /^[a-zA-Z0-9\|\_\-\+\=\/\~\!\@\$\%\^\&\*\?\<\>]/.test(chunk0)) {
                      address2 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                      this._offset = this._offset + 1;
                  }
                  else {
                      address2 = FAILURE;
                      if (this._offset > this._failure) {
                          this._failure = this._offset;
                          this._expected = [];
                      }
                      if (this._offset === this._failure) {
                          this._expected.push('[a-zA-Z0-9\\|\\_\\-\\+\\=\\/\\~\\!\\@\\$\\%\\^\\&\\*\\?\\<\\>]');
                      }
                  }
                  if (address2 !== FAILURE) {
                      elements1.push(address2);
                      --remaining0;
                  }
              }
              if (remaining0 <= 0) {
                  address1 = new TreeNode(this._input.substring(index2, this._offset), index2, elements1);
                  this._offset = this._offset;
              }
              else {
                  address1 = FAILURE;
              }
              if (address1 !== FAILURE) {
                  elements0[0] = address1;
                  var address3 = FAILURE;
                  var remaining1 = 0, index3 = this._offset, elements2 = [], address4 = true;
                  while (address4 !== FAILURE) {
                      var chunk1 = null;
                      if (this._offset < this._inputSize) {
                          chunk1 = this._input.substring(this._offset, this._offset + 1);
                      }
                      if (chunk1 !== null && /^[a-zA-Z0-9\_\-\+\=\/\~\!\@\#\$\%\^\&\*\?\.\<\>]/.test(chunk1)) {
                          address4 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                          this._offset = this._offset + 1;
                      }
                      else {
                          address4 = FAILURE;
                          if (this._offset > this._failure) {
                              this._failure = this._offset;
                              this._expected = [];
                          }
                          if (this._offset === this._failure) {
                              this._expected.push('[a-zA-Z0-9\\_\\-\\+\\=\\/\\~\\!\\@\\#\\$\\%\\^\\&\\*\\?\\.\\<\\>]');
                          }
                      }
                      if (address4 !== FAILURE) {
                          elements2.push(address4);
                          --remaining1;
                      }
                  }
                  if (remaining1 <= 0) {
                      address3 = new TreeNode(this._input.substring(index3, this._offset), index3, elements2);
                      this._offset = this._offset;
                  }
                  else {
                      address3 = FAILURE;
                  }
                  if (address3 !== FAILURE) {
                      elements0[1] = address3;
                  }
                  else {
                      elements0 = null;
                      this._offset = index1;
                  }
              }
              else {
                  elements0 = null;
                  this._offset = index1;
              }
              if (elements0 === null) {
                  address0 = FAILURE;
              }
              else {
                  address0 = this._actions.make_word(this._input, index1, this._offset, elements0);
                  this._offset = this._offset;
              }
              this._cache._word[index0] = [address0, this._offset];
              return address0;
          },
          _read_value: function () {
              var address0 = FAILURE, index0 = this._offset;
              this._cache._value = this._cache._value || {};
              var cached = this._cache._value[index0];
              if (cached) {
                  this._offset = cached[1];
                  return cached[0];
              }
              var index1 = this._offset;
              address0 = this._read_list();
              if (address0 === FAILURE) {
                  this._offset = index1;
                  address0 = this._read_number();
                  if (address0 === FAILURE) {
                      this._offset = index1;
                      address0 = this._read_word();
                      if (address0 === FAILURE) {
                          this._offset = index1;
                          address0 = this._read_string();
                          if (address0 === FAILURE) {
                              this._offset = index1;
                              address0 = this._read_map();
                              if (address0 === FAILURE) {
                                  this._offset = index1;
                              }
                          }
                      }
                  }
              }
              this._cache._value[index0] = [address0, this._offset];
              return address0;
          },
          _read_map: function () {
              var address0 = FAILURE, index0 = this._offset;
              this._cache._map = this._cache._map || {};
              var cached = this._cache._map[index0];
              if (cached) {
                  this._offset = cached[1];
                  return cached[0];
              }
              var index1 = this._offset, elements0 = new Array(6);
              var address1 = FAILURE;
              var chunk0 = null;
              if (this._offset < this._inputSize) {
                  chunk0 = this._input.substring(this._offset, this._offset + 1);
              }
              if (chunk0 === '{') {
                  address1 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                  this._offset = this._offset + 1;
              }
              else {
                  address1 = FAILURE;
                  if (this._offset > this._failure) {
                      this._failure = this._offset;
                      this._expected = [];
                  }
                  if (this._offset === this._failure) {
                      this._expected.push('"{"');
                  }
              }
              if (address1 !== FAILURE) {
                  elements0[0] = address1;
                  var address2 = FAILURE;
                  var remaining0 = 0, index2 = this._offset, elements1 = [], address3 = true;
                  while (address3 !== FAILURE) {
                      address3 = this._read_ws();
                      if (address3 !== FAILURE) {
                          elements1.push(address3);
                          --remaining0;
                      }
                  }
                  if (remaining0 <= 0) {
                      address2 = new TreeNode(this._input.substring(index2, this._offset), index2, elements1);
                      this._offset = this._offset;
                  }
                  else {
                      address2 = FAILURE;
                  }
                  if (address2 !== FAILURE) {
                      elements0[1] = address2;
                      var address4 = FAILURE;
                      var index3 = this._offset;
                      address4 = this._read_pair();
                      if (address4 === FAILURE) {
                          address4 = new TreeNode(this._input.substring(index3, index3), index3);
                          this._offset = index3;
                      }
                      if (address4 !== FAILURE) {
                          elements0[2] = address4;
                          var address5 = FAILURE;
                          var remaining1 = 0, index4 = this._offset, elements2 = [], address6 = true;
                          while (address6 !== FAILURE) {
                              var index5 = this._offset, elements3 = new Array(3);
                              var address7 = FAILURE;
                              var remaining2 = 0, index6 = this._offset, elements4 = [], address8 = true;
                              while (address8 !== FAILURE) {
                                  address8 = this._read_ws();
                                  if (address8 !== FAILURE) {
                                      elements4.push(address8);
                                      --remaining2;
                                  }
                              }
                              if (remaining2 <= 0) {
                                  address7 = new TreeNode(this._input.substring(index6, this._offset), index6, elements4);
                                  this._offset = this._offset;
                              }
                              else {
                                  address7 = FAILURE;
                              }
                              if (address7 !== FAILURE) {
                                  elements3[0] = address7;
                                  var address9 = FAILURE;
                                  var remaining3 = 0, index7 = this._offset, elements5 = [], address10 = true;
                                  while (address10 !== FAILURE) {
                                      address10 = this._read_ws();
                                      if (address10 !== FAILURE) {
                                          elements5.push(address10);
                                          --remaining3;
                                      }
                                  }
                                  if (remaining3 <= 0) {
                                      address9 = new TreeNode(this._input.substring(index7, this._offset), index7, elements5);
                                      this._offset = this._offset;
                                  }
                                  else {
                                      address9 = FAILURE;
                                  }
                                  if (address9 !== FAILURE) {
                                      elements3[1] = address9;
                                      var address11 = FAILURE;
                                      address11 = this._read_pair();
                                      if (address11 !== FAILURE) {
                                          elements3[2] = address11;
                                      }
                                      else {
                                          elements3 = null;
                                          this._offset = index5;
                                      }
                                  }
                                  else {
                                      elements3 = null;
                                      this._offset = index5;
                                  }
                              }
                              else {
                                  elements3 = null;
                                  this._offset = index5;
                              }
                              if (elements3 === null) {
                                  address6 = FAILURE;
                              }
                              else {
                                  address6 = new TreeNode3(this._input.substring(index5, this._offset), index5, elements3);
                                  this._offset = this._offset;
                              }
                              if (address6 !== FAILURE) {
                                  elements2.push(address6);
                                  --remaining1;
                              }
                          }
                          if (remaining1 <= 0) {
                              address5 = new TreeNode(this._input.substring(index4, this._offset), index4, elements2);
                              this._offset = this._offset;
                          }
                          else {
                              address5 = FAILURE;
                          }
                          if (address5 !== FAILURE) {
                              elements0[3] = address5;
                              var address12 = FAILURE;
                              var remaining4 = 0, index8 = this._offset, elements6 = [], address13 = true;
                              while (address13 !== FAILURE) {
                                  address13 = this._read_ws();
                                  if (address13 !== FAILURE) {
                                      elements6.push(address13);
                                      --remaining4;
                                  }
                              }
                              if (remaining4 <= 0) {
                                  address12 = new TreeNode(this._input.substring(index8, this._offset), index8, elements6);
                                  this._offset = this._offset;
                              }
                              else {
                                  address12 = FAILURE;
                              }
                              if (address12 !== FAILURE) {
                                  elements0[4] = address12;
                                  var address14 = FAILURE;
                                  var chunk1 = null;
                                  if (this._offset < this._inputSize) {
                                      chunk1 = this._input.substring(this._offset, this._offset + 1);
                                  }
                                  if (chunk1 === '}') {
                                      address14 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                                      this._offset = this._offset + 1;
                                  }
                                  else {
                                      address14 = FAILURE;
                                      if (this._offset > this._failure) {
                                          this._failure = this._offset;
                                          this._expected = [];
                                      }
                                      if (this._offset === this._failure) {
                                          this._expected.push('"}"');
                                      }
                                  }
                                  if (address14 !== FAILURE) {
                                      elements0[5] = address14;
                                  }
                                  else {
                                      elements0 = null;
                                      this._offset = index1;
                                  }
                              }
                              else {
                                  elements0 = null;
                                  this._offset = index1;
                              }
                          }
                          else {
                              elements0 = null;
                              this._offset = index1;
                          }
                      }
                      else {
                          elements0 = null;
                          this._offset = index1;
                      }
                  }
                  else {
                      elements0 = null;
                      this._offset = index1;
                  }
              }
              else {
                  elements0 = null;
                  this._offset = index1;
              }
              if (elements0 === null) {
                  address0 = FAILURE;
              }
              else {
                  address0 = this._actions.make_map(this._input, index1, this._offset, elements0);
                  this._offset = this._offset;
              }
              this._cache._map[index0] = [address0, this._offset];
              return address0;
          },
          _read_pair: function () {
              var address0 = FAILURE, index0 = this._offset;
              this._cache._pair = this._cache._pair || {};
              var cached = this._cache._pair[index0];
              if (cached) {
                  this._offset = cached[1];
                  return cached[0];
              }
              var index1 = this._offset, elements0 = new Array(5);
              var address1 = FAILURE;
              address1 = this._read_word();
              if (address1 !== FAILURE) {
                  elements0[0] = address1;
                  var address2 = FAILURE;
                  var remaining0 = 0, index2 = this._offset, elements1 = [], address3 = true;
                  while (address3 !== FAILURE) {
                      address3 = this._read_ws();
                      if (address3 !== FAILURE) {
                          elements1.push(address3);
                          --remaining0;
                      }
                  }
                  if (remaining0 <= 0) {
                      address2 = new TreeNode(this._input.substring(index2, this._offset), index2, elements1);
                      this._offset = this._offset;
                  }
                  else {
                      address2 = FAILURE;
                  }
                  if (address2 !== FAILURE) {
                      elements0[1] = address2;
                      var address4 = FAILURE;
                      var chunk0 = null;
                      if (this._offset < this._inputSize) {
                          chunk0 = this._input.substring(this._offset, this._offset + 1);
                      }
                      if (chunk0 === ':') {
                          address4 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                          this._offset = this._offset + 1;
                      }
                      else {
                          address4 = FAILURE;
                          if (this._offset > this._failure) {
                              this._failure = this._offset;
                              this._expected = [];
                          }
                          if (this._offset === this._failure) {
                              this._expected.push('":"');
                          }
                      }
                      if (address4 !== FAILURE) {
                          elements0[2] = address4;
                          var address5 = FAILURE;
                          var remaining1 = 0, index3 = this._offset, elements2 = [], address6 = true;
                          while (address6 !== FAILURE) {
                              address6 = this._read_ws();
                              if (address6 !== FAILURE) {
                                  elements2.push(address6);
                                  --remaining1;
                              }
                          }
                          if (remaining1 <= 0) {
                              address5 = new TreeNode(this._input.substring(index3, this._offset), index3, elements2);
                              this._offset = this._offset;
                          }
                          else {
                              address5 = FAILURE;
                          }
                          if (address5 !== FAILURE) {
                              elements0[3] = address5;
                              var address7 = FAILURE;
                              address7 = this._read_value();
                              if (address7 !== FAILURE) {
                                  elements0[4] = address7;
                              }
                              else {
                                  elements0 = null;
                                  this._offset = index1;
                              }
                          }
                          else {
                              elements0 = null;
                              this._offset = index1;
                          }
                      }
                      else {
                          elements0 = null;
                          this._offset = index1;
                      }
                  }
                  else {
                      elements0 = null;
                      this._offset = index1;
                  }
              }
              else {
                  elements0 = null;
                  this._offset = index1;
              }
              if (elements0 === null) {
                  address0 = FAILURE;
              }
              else {
                  address0 = this._actions.make_pair(this._input, index1, this._offset, elements0);
                  this._offset = this._offset;
              }
              this._cache._pair[index0] = [address0, this._offset];
              return address0;
          },
          _read_string: function () {
              var address0 = FAILURE, index0 = this._offset;
              this._cache._string = this._cache._string || {};
              var cached = this._cache._string[index0];
              if (cached) {
                  this._offset = cached[1];
                  return cached[0];
              }
              var index1 = this._offset;
              address0 = this._read_string_s();
              if (address0 === FAILURE) {
                  this._offset = index1;
                  address0 = this._read_string_d();
                  if (address0 === FAILURE) {
                      this._offset = index1;
                      address0 = this._read_string_t();
                      if (address0 === FAILURE) {
                          this._offset = index1;
                      }
                  }
              }
              this._cache._string[index0] = [address0, this._offset];
              return address0;
          },
          _read_string_s: function () {
              var address0 = FAILURE, index0 = this._offset;
              this._cache._string_s = this._cache._string_s || {};
              var cached = this._cache._string_s[index0];
              if (cached) {
                  this._offset = cached[1];
                  return cached[0];
              }
              var index1 = this._offset, elements0 = new Array(3);
              var address1 = FAILURE;
              var chunk0 = null;
              if (this._offset < this._inputSize) {
                  chunk0 = this._input.substring(this._offset, this._offset + 1);
              }
              if (chunk0 === '\'') {
                  address1 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                  this._offset = this._offset + 1;
              }
              else {
                  address1 = FAILURE;
                  if (this._offset > this._failure) {
                      this._failure = this._offset;
                      this._expected = [];
                  }
                  if (this._offset === this._failure) {
                      this._expected.push('"\'"');
                  }
              }
              if (address1 !== FAILURE) {
                  elements0[0] = address1;
                  var address2 = FAILURE;
                  var remaining0 = 0, index2 = this._offset, elements1 = [], address3 = true;
                  while (address3 !== FAILURE) {
                      var chunk1 = null;
                      if (this._offset < this._inputSize) {
                          chunk1 = this._input.substring(this._offset, this._offset + 1);
                      }
                      if (chunk1 !== null && /^[^']/.test(chunk1)) {
                          address3 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                          this._offset = this._offset + 1;
                      }
                      else {
                          address3 = FAILURE;
                          if (this._offset > this._failure) {
                              this._failure = this._offset;
                              this._expected = [];
                          }
                          if (this._offset === this._failure) {
                              this._expected.push('[^\']');
                          }
                      }
                      if (address3 !== FAILURE) {
                          elements1.push(address3);
                          --remaining0;
                      }
                  }
                  if (remaining0 <= 0) {
                      address2 = new TreeNode(this._input.substring(index2, this._offset), index2, elements1);
                      this._offset = this._offset;
                  }
                  else {
                      address2 = FAILURE;
                  }
                  if (address2 !== FAILURE) {
                      elements0[1] = address2;
                      var address4 = FAILURE;
                      var chunk2 = null;
                      if (this._offset < this._inputSize) {
                          chunk2 = this._input.substring(this._offset, this._offset + 1);
                      }
                      if (chunk2 === '\'') {
                          address4 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                          this._offset = this._offset + 1;
                      }
                      else {
                          address4 = FAILURE;
                          if (this._offset > this._failure) {
                              this._failure = this._offset;
                              this._expected = [];
                          }
                          if (this._offset === this._failure) {
                              this._expected.push('"\'"');
                          }
                      }
                      if (address4 !== FAILURE) {
                          elements0[2] = address4;
                      }
                      else {
                          elements0 = null;
                          this._offset = index1;
                      }
                  }
                  else {
                      elements0 = null;
                      this._offset = index1;
                  }
              }
              else {
                  elements0 = null;
                  this._offset = index1;
              }
              if (elements0 === null) {
                  address0 = FAILURE;
              }
              else {
                  address0 = this._actions.make_string_s(this._input, index1, this._offset, elements0);
                  this._offset = this._offset;
              }
              this._cache._string_s[index0] = [address0, this._offset];
              return address0;
          },
          _read_string_d: function () {
              var address0 = FAILURE, index0 = this._offset;
              this._cache._string_d = this._cache._string_d || {};
              var cached = this._cache._string_d[index0];
              if (cached) {
                  this._offset = cached[1];
                  return cached[0];
              }
              var index1 = this._offset, elements0 = new Array(3);
              var address1 = FAILURE;
              var chunk0 = null;
              if (this._offset < this._inputSize) {
                  chunk0 = this._input.substring(this._offset, this._offset + 1);
              }
              if (chunk0 === '"') {
                  address1 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                  this._offset = this._offset + 1;
              }
              else {
                  address1 = FAILURE;
                  if (this._offset > this._failure) {
                      this._failure = this._offset;
                      this._expected = [];
                  }
                  if (this._offset === this._failure) {
                      this._expected.push('\'"\'');
                  }
              }
              if (address1 !== FAILURE) {
                  elements0[0] = address1;
                  var address2 = FAILURE;
                  var remaining0 = 0, index2 = this._offset, elements1 = [], address3 = true;
                  while (address3 !== FAILURE) {
                      var chunk1 = null;
                      if (this._offset < this._inputSize) {
                          chunk1 = this._input.substring(this._offset, this._offset + 1);
                      }
                      if (chunk1 !== null && /^[^\"]/.test(chunk1)) {
                          address3 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                          this._offset = this._offset + 1;
                      }
                      else {
                          address3 = FAILURE;
                          if (this._offset > this._failure) {
                              this._failure = this._offset;
                              this._expected = [];
                          }
                          if (this._offset === this._failure) {
                              this._expected.push('[^\\"]');
                          }
                      }
                      if (address3 !== FAILURE) {
                          elements1.push(address3);
                          --remaining0;
                      }
                  }
                  if (remaining0 <= 0) {
                      address2 = new TreeNode(this._input.substring(index2, this._offset), index2, elements1);
                      this._offset = this._offset;
                  }
                  else {
                      address2 = FAILURE;
                  }
                  if (address2 !== FAILURE) {
                      elements0[1] = address2;
                      var address4 = FAILURE;
                      var chunk2 = null;
                      if (this._offset < this._inputSize) {
                          chunk2 = this._input.substring(this._offset, this._offset + 1);
                      }
                      if (chunk2 === '"') {
                          address4 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                          this._offset = this._offset + 1;
                      }
                      else {
                          address4 = FAILURE;
                          if (this._offset > this._failure) {
                              this._failure = this._offset;
                              this._expected = [];
                          }
                          if (this._offset === this._failure) {
                              this._expected.push('\'"\'');
                          }
                      }
                      if (address4 !== FAILURE) {
                          elements0[2] = address4;
                      }
                      else {
                          elements0 = null;
                          this._offset = index1;
                      }
                  }
                  else {
                      elements0 = null;
                      this._offset = index1;
                  }
              }
              else {
                  elements0 = null;
                  this._offset = index1;
              }
              if (elements0 === null) {
                  address0 = FAILURE;
              }
              else {
                  address0 = this._actions.make_string_d(this._input, index1, this._offset, elements0);
                  this._offset = this._offset;
              }
              this._cache._string_d[index0] = [address0, this._offset];
              return address0;
          },
          _read_string_t: function () {
              var address0 = FAILURE, index0 = this._offset;
              this._cache._string_t = this._cache._string_t || {};
              var cached = this._cache._string_t[index0];
              if (cached) {
                  this._offset = cached[1];
                  return cached[0];
              }
              var index1 = this._offset, elements0 = new Array(3);
              var address1 = FAILURE;
              var chunk0 = null;
              if (this._offset < this._inputSize) {
                  chunk0 = this._input.substring(this._offset, this._offset + 1);
              }
              if (chunk0 === '`') {
                  address1 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                  this._offset = this._offset + 1;
              }
              else {
                  address1 = FAILURE;
                  if (this._offset > this._failure) {
                      this._failure = this._offset;
                      this._expected = [];
                  }
                  if (this._offset === this._failure) {
                      this._expected.push('\'`\'');
                  }
              }
              if (address1 !== FAILURE) {
                  elements0[0] = address1;
                  var address2 = FAILURE;
                  var remaining0 = 0, index2 = this._offset, elements1 = [], address3 = true;
                  while (address3 !== FAILURE) {
                      var chunk1 = null;
                      if (this._offset < this._inputSize) {
                          chunk1 = this._input.substring(this._offset, this._offset + 1);
                      }
                      if (chunk1 !== null && /^[^`]/.test(chunk1)) {
                          address3 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                          this._offset = this._offset + 1;
                      }
                      else {
                          address3 = FAILURE;
                          if (this._offset > this._failure) {
                              this._failure = this._offset;
                              this._expected = [];
                          }
                          if (this._offset === this._failure) {
                              this._expected.push('[^`]');
                          }
                      }
                      if (address3 !== FAILURE) {
                          elements1.push(address3);
                          --remaining0;
                      }
                  }
                  if (remaining0 <= 0) {
                      address2 = new TreeNode(this._input.substring(index2, this._offset), index2, elements1);
                      this._offset = this._offset;
                  }
                  else {
                      address2 = FAILURE;
                  }
                  if (address2 !== FAILURE) {
                      elements0[1] = address2;
                      var address4 = FAILURE;
                      var chunk2 = null;
                      if (this._offset < this._inputSize) {
                          chunk2 = this._input.substring(this._offset, this._offset + 1);
                      }
                      if (chunk2 === '`') {
                          address4 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                          this._offset = this._offset + 1;
                      }
                      else {
                          address4 = FAILURE;
                          if (this._offset > this._failure) {
                              this._failure = this._offset;
                              this._expected = [];
                          }
                          if (this._offset === this._failure) {
                              this._expected.push('\'`\'');
                          }
                      }
                      if (address4 !== FAILURE) {
                          elements0[2] = address4;
                      }
                      else {
                          elements0 = null;
                          this._offset = index1;
                      }
                  }
                  else {
                      elements0 = null;
                      this._offset = index1;
                  }
              }
              else {
                  elements0 = null;
                  this._offset = index1;
              }
              if (elements0 === null) {
                  address0 = FAILURE;
              }
              else {
                  address0 = this._actions.make_string_t(this._input, index1, this._offset, elements0);
                  this._offset = this._offset;
              }
              this._cache._string_t[index0] = [address0, this._offset];
              return address0;
          },
          _read_list: function () {
              var address0 = FAILURE, index0 = this._offset;
              this._cache._list = this._cache._list || {};
              var cached = this._cache._list[index0];
              if (cached) {
                  this._offset = cached[1];
                  return cached[0];
              }
              var index1 = this._offset;
              address0 = this._read_list_empty();
              if (address0 === FAILURE) {
                  this._offset = index1;
                  address0 = this._read_list_full();
                  if (address0 === FAILURE) {
                      this._offset = index1;
                  }
              }
              this._cache._list[index0] = [address0, this._offset];
              return address0;
          },
          _read_list_empty: function () {
              var address0 = FAILURE, index0 = this._offset;
              this._cache._list_empty = this._cache._list_empty || {};
              var cached = this._cache._list_empty[index0];
              if (cached) {
                  this._offset = cached[1];
                  return cached[0];
              }
              var index1 = this._offset, elements0 = new Array(3);
              var address1 = FAILURE;
              var chunk0 = null;
              if (this._offset < this._inputSize) {
                  chunk0 = this._input.substring(this._offset, this._offset + 1);
              }
              if (chunk0 === '[') {
                  address1 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                  this._offset = this._offset + 1;
              }
              else {
                  address1 = FAILURE;
                  if (this._offset > this._failure) {
                      this._failure = this._offset;
                      this._expected = [];
                  }
                  if (this._offset === this._failure) {
                      this._expected.push('"["');
                  }
              }
              if (address1 !== FAILURE) {
                  elements0[0] = address1;
                  var address2 = FAILURE;
                  var remaining0 = 0, index2 = this._offset, elements1 = [], address3 = true;
                  while (address3 !== FAILURE) {
                      address3 = this._read_ws();
                      if (address3 !== FAILURE) {
                          elements1.push(address3);
                          --remaining0;
                      }
                  }
                  if (remaining0 <= 0) {
                      address2 = new TreeNode(this._input.substring(index2, this._offset), index2, elements1);
                      this._offset = this._offset;
                  }
                  else {
                      address2 = FAILURE;
                  }
                  if (address2 !== FAILURE) {
                      elements0[1] = address2;
                      var address4 = FAILURE;
                      var chunk1 = null;
                      if (this._offset < this._inputSize) {
                          chunk1 = this._input.substring(this._offset, this._offset + 1);
                      }
                      if (chunk1 === ']') {
                          address4 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                          this._offset = this._offset + 1;
                      }
                      else {
                          address4 = FAILURE;
                          if (this._offset > this._failure) {
                              this._failure = this._offset;
                              this._expected = [];
                          }
                          if (this._offset === this._failure) {
                              this._expected.push('"]"');
                          }
                      }
                      if (address4 !== FAILURE) {
                          elements0[2] = address4;
                      }
                      else {
                          elements0 = null;
                          this._offset = index1;
                      }
                  }
                  else {
                      elements0 = null;
                      this._offset = index1;
                  }
              }
              else {
                  elements0 = null;
                  this._offset = index1;
              }
              if (elements0 === null) {
                  address0 = FAILURE;
              }
              else {
                  address0 = this._actions.make_list_empty(this._input, index1, this._offset, elements0);
                  this._offset = this._offset;
              }
              this._cache._list_empty[index0] = [address0, this._offset];
              return address0;
          },
          _read_list_full: function () {
              var address0 = FAILURE, index0 = this._offset;
              this._cache._list_full = this._cache._list_full || {};
              var cached = this._cache._list_full[index0];
              if (cached) {
                  this._offset = cached[1];
                  return cached[0];
              }
              var index1 = this._offset, elements0 = new Array(6);
              var address1 = FAILURE;
              var chunk0 = null;
              if (this._offset < this._inputSize) {
                  chunk0 = this._input.substring(this._offset, this._offset + 1);
              }
              if (chunk0 === '[') {
                  address1 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                  this._offset = this._offset + 1;
              }
              else {
                  address1 = FAILURE;
                  if (this._offset > this._failure) {
                      this._failure = this._offset;
                      this._expected = [];
                  }
                  if (this._offset === this._failure) {
                      this._expected.push('"["');
                  }
              }
              if (address1 !== FAILURE) {
                  elements0[0] = address1;
                  var address2 = FAILURE;
                  var remaining0 = 0, index2 = this._offset, elements1 = [], address3 = true;
                  while (address3 !== FAILURE) {
                      address3 = this._read_ws();
                      if (address3 !== FAILURE) {
                          elements1.push(address3);
                          --remaining0;
                      }
                  }
                  if (remaining0 <= 0) {
                      address2 = new TreeNode(this._input.substring(index2, this._offset), index2, elements1);
                      this._offset = this._offset;
                  }
                  else {
                      address2 = FAILURE;
                  }
                  if (address2 !== FAILURE) {
                      elements0[1] = address2;
                      var address4 = FAILURE;
                      address4 = this._read_value();
                      if (address4 !== FAILURE) {
                          elements0[2] = address4;
                          var address5 = FAILURE;
                          var remaining1 = 0, index3 = this._offset, elements2 = [], address6 = true;
                          while (address6 !== FAILURE) {
                              var index4 = this._offset, elements3 = new Array(2);
                              var address7 = FAILURE;
                              var remaining2 = 0, index5 = this._offset, elements4 = [], address8 = true;
                              while (address8 !== FAILURE) {
                                  address8 = this._read_ws();
                                  if (address8 !== FAILURE) {
                                      elements4.push(address8);
                                      --remaining2;
                                  }
                              }
                              if (remaining2 <= 0) {
                                  address7 = new TreeNode(this._input.substring(index5, this._offset), index5, elements4);
                                  this._offset = this._offset;
                              }
                              else {
                                  address7 = FAILURE;
                              }
                              if (address7 !== FAILURE) {
                                  elements3[0] = address7;
                                  var address9 = FAILURE;
                                  address9 = this._read_value();
                                  if (address9 !== FAILURE) {
                                      elements3[1] = address9;
                                  }
                                  else {
                                      elements3 = null;
                                      this._offset = index4;
                                  }
                              }
                              else {
                                  elements3 = null;
                                  this._offset = index4;
                              }
                              if (elements3 === null) {
                                  address6 = FAILURE;
                              }
                              else {
                                  address6 = new TreeNode6(this._input.substring(index4, this._offset), index4, elements3);
                                  this._offset = this._offset;
                              }
                              if (address6 !== FAILURE) {
                                  elements2.push(address6);
                                  --remaining1;
                              }
                          }
                          if (remaining1 <= 0) {
                              address5 = new TreeNode(this._input.substring(index3, this._offset), index3, elements2);
                              this._offset = this._offset;
                          }
                          else {
                              address5 = FAILURE;
                          }
                          if (address5 !== FAILURE) {
                              elements0[3] = address5;
                              var address10 = FAILURE;
                              var remaining3 = 0, index6 = this._offset, elements5 = [], address11 = true;
                              while (address11 !== FAILURE) {
                                  address11 = this._read_ws();
                                  if (address11 !== FAILURE) {
                                      elements5.push(address11);
                                      --remaining3;
                                  }
                              }
                              if (remaining3 <= 0) {
                                  address10 = new TreeNode(this._input.substring(index6, this._offset), index6, elements5);
                                  this._offset = this._offset;
                              }
                              else {
                                  address10 = FAILURE;
                              }
                              if (address10 !== FAILURE) {
                                  elements0[4] = address10;
                                  var address12 = FAILURE;
                                  var chunk1 = null;
                                  if (this._offset < this._inputSize) {
                                      chunk1 = this._input.substring(this._offset, this._offset + 1);
                                  }
                                  if (chunk1 === ']') {
                                      address12 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                                      this._offset = this._offset + 1;
                                  }
                                  else {
                                      address12 = FAILURE;
                                      if (this._offset > this._failure) {
                                          this._failure = this._offset;
                                          this._expected = [];
                                      }
                                      if (this._offset === this._failure) {
                                          this._expected.push('"]"');
                                      }
                                  }
                                  if (address12 !== FAILURE) {
                                      elements0[5] = address12;
                                  }
                                  else {
                                      elements0 = null;
                                      this._offset = index1;
                                  }
                              }
                              else {
                                  elements0 = null;
                                  this._offset = index1;
                              }
                          }
                          else {
                              elements0 = null;
                              this._offset = index1;
                          }
                      }
                      else {
                          elements0 = null;
                          this._offset = index1;
                      }
                  }
                  else {
                      elements0 = null;
                      this._offset = index1;
                  }
              }
              else {
                  elements0 = null;
                  this._offset = index1;
              }
              if (elements0 === null) {
                  address0 = FAILURE;
              }
              else {
                  address0 = this._actions.make_list(this._input, index1, this._offset, elements0);
                  this._offset = this._offset;
              }
              this._cache._list_full[index0] = [address0, this._offset];
              return address0;
          },
          _read_number: function () {
              var address0 = FAILURE, index0 = this._offset;
              this._cache._number = this._cache._number || {};
              var cached = this._cache._number[index0];
              if (cached) {
                  this._offset = cached[1];
                  return cached[0];
              }
              var index1 = this._offset;
              address0 = this._read_float1();
              if (address0 === FAILURE) {
                  this._offset = index1;
                  address0 = this._read_float2();
                  if (address0 === FAILURE) {
                      this._offset = index1;
                      address0 = this._read_float3();
                      if (address0 === FAILURE) {
                          this._offset = index1;
                          address0 = this._read_integer();
                          if (address0 === FAILURE) {
                              this._offset = index1;
                          }
                      }
                  }
              }
              this._cache._number[index0] = [address0, this._offset];
              return address0;
          },
          _read_float1: function () {
              var address0 = FAILURE, index0 = this._offset;
              this._cache._float1 = this._cache._float1 || {};
              var cached = this._cache._float1[index0];
              if (cached) {
                  this._offset = cached[1];
                  return cached[0];
              }
              var index1 = this._offset, elements0 = new Array(5);
              var address1 = FAILURE;
              var index2 = this._offset;
              var chunk0 = null;
              if (this._offset < this._inputSize) {
                  chunk0 = this._input.substring(this._offset, this._offset + 1);
              }
              if (chunk0 === '-') {
                  address1 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                  this._offset = this._offset + 1;
              }
              else {
                  address1 = FAILURE;
                  if (this._offset > this._failure) {
                      this._failure = this._offset;
                      this._expected = [];
                  }
                  if (this._offset === this._failure) {
                      this._expected.push('"-"');
                  }
              }
              if (address1 === FAILURE) {
                  address1 = new TreeNode(this._input.substring(index2, index2), index2);
                  this._offset = index2;
              }
              if (address1 !== FAILURE) {
                  elements0[0] = address1;
                  var address2 = FAILURE;
                  var remaining0 = 1, index3 = this._offset, elements1 = [], address3 = true;
                  while (address3 !== FAILURE) {
                      var chunk1 = null;
                      if (this._offset < this._inputSize) {
                          chunk1 = this._input.substring(this._offset, this._offset + 1);
                      }
                      if (chunk1 !== null && /^[0-9]/.test(chunk1)) {
                          address3 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                          this._offset = this._offset + 1;
                      }
                      else {
                          address3 = FAILURE;
                          if (this._offset > this._failure) {
                              this._failure = this._offset;
                              this._expected = [];
                          }
                          if (this._offset === this._failure) {
                              this._expected.push('[0-9]');
                          }
                      }
                      if (address3 !== FAILURE) {
                          elements1.push(address3);
                          --remaining0;
                      }
                  }
                  if (remaining0 <= 0) {
                      address2 = new TreeNode(this._input.substring(index3, this._offset), index3, elements1);
                      this._offset = this._offset;
                  }
                  else {
                      address2 = FAILURE;
                  }
                  if (address2 !== FAILURE) {
                      elements0[1] = address2;
                      var address4 = FAILURE;
                      var chunk2 = null;
                      if (this._offset < this._inputSize) {
                          chunk2 = this._input.substring(this._offset, this._offset + 1);
                      }
                      if (chunk2 === '.') {
                          address4 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                          this._offset = this._offset + 1;
                      }
                      else {
                          address4 = FAILURE;
                          if (this._offset > this._failure) {
                              this._failure = this._offset;
                              this._expected = [];
                          }
                          if (this._offset === this._failure) {
                              this._expected.push('"."');
                          }
                      }
                      if (address4 !== FAILURE) {
                          elements0[2] = address4;
                          var address5 = FAILURE;
                          var remaining1 = 1, index4 = this._offset, elements2 = [], address6 = true;
                          while (address6 !== FAILURE) {
                              var chunk3 = null;
                              if (this._offset < this._inputSize) {
                                  chunk3 = this._input.substring(this._offset, this._offset + 1);
                              }
                              if (chunk3 !== null && /^[0-9]/.test(chunk3)) {
                                  address6 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                                  this._offset = this._offset + 1;
                              }
                              else {
                                  address6 = FAILURE;
                                  if (this._offset > this._failure) {
                                      this._failure = this._offset;
                                      this._expected = [];
                                  }
                                  if (this._offset === this._failure) {
                                      this._expected.push('[0-9]');
                                  }
                              }
                              if (address6 !== FAILURE) {
                                  elements2.push(address6);
                                  --remaining1;
                              }
                          }
                          if (remaining1 <= 0) {
                              address5 = new TreeNode(this._input.substring(index4, this._offset), index4, elements2);
                              this._offset = this._offset;
                          }
                          else {
                              address5 = FAILURE;
                          }
                          if (address5 !== FAILURE) {
                              elements0[3] = address5;
                              var address7 = FAILURE;
                              address7 = this._read_end_of_word();
                              if (address7 !== FAILURE) {
                                  elements0[4] = address7;
                              }
                              else {
                                  elements0 = null;
                                  this._offset = index1;
                              }
                          }
                          else {
                              elements0 = null;
                              this._offset = index1;
                          }
                      }
                      else {
                          elements0 = null;
                          this._offset = index1;
                      }
                  }
                  else {
                      elements0 = null;
                      this._offset = index1;
                  }
              }
              else {
                  elements0 = null;
                  this._offset = index1;
              }
              if (elements0 === null) {
                  address0 = FAILURE;
              }
              else {
                  address0 = this._actions.make_float(this._input, index1, this._offset, elements0);
                  this._offset = this._offset;
              }
              this._cache._float1[index0] = [address0, this._offset];
              return address0;
          },
          _read_float2: function () {
              var address0 = FAILURE, index0 = this._offset;
              this._cache._float2 = this._cache._float2 || {};
              var cached = this._cache._float2[index0];
              if (cached) {
                  this._offset = cached[1];
                  return cached[0];
              }
              var index1 = this._offset, elements0 = new Array(4);
              var address1 = FAILURE;
              var index2 = this._offset;
              var chunk0 = null;
              if (this._offset < this._inputSize) {
                  chunk0 = this._input.substring(this._offset, this._offset + 1);
              }
              if (chunk0 === '-') {
                  address1 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                  this._offset = this._offset + 1;
              }
              else {
                  address1 = FAILURE;
                  if (this._offset > this._failure) {
                      this._failure = this._offset;
                      this._expected = [];
                  }
                  if (this._offset === this._failure) {
                      this._expected.push('"-"');
                  }
              }
              if (address1 === FAILURE) {
                  address1 = new TreeNode(this._input.substring(index2, index2), index2);
                  this._offset = index2;
              }
              if (address1 !== FAILURE) {
                  elements0[0] = address1;
                  var address2 = FAILURE;
                  var chunk1 = null;
                  if (this._offset < this._inputSize) {
                      chunk1 = this._input.substring(this._offset, this._offset + 1);
                  }
                  if (chunk1 === '.') {
                      address2 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                      this._offset = this._offset + 1;
                  }
                  else {
                      address2 = FAILURE;
                      if (this._offset > this._failure) {
                          this._failure = this._offset;
                          this._expected = [];
                      }
                      if (this._offset === this._failure) {
                          this._expected.push('"."');
                      }
                  }
                  if (address2 !== FAILURE) {
                      elements0[1] = address2;
                      var address3 = FAILURE;
                      var remaining0 = 1, index3 = this._offset, elements1 = [], address4 = true;
                      while (address4 !== FAILURE) {
                          var chunk2 = null;
                          if (this._offset < this._inputSize) {
                              chunk2 = this._input.substring(this._offset, this._offset + 1);
                          }
                          if (chunk2 !== null && /^[0-9]/.test(chunk2)) {
                              address4 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                              this._offset = this._offset + 1;
                          }
                          else {
                              address4 = FAILURE;
                              if (this._offset > this._failure) {
                                  this._failure = this._offset;
                                  this._expected = [];
                              }
                              if (this._offset === this._failure) {
                                  this._expected.push('[0-9]');
                              }
                          }
                          if (address4 !== FAILURE) {
                              elements1.push(address4);
                              --remaining0;
                          }
                      }
                      if (remaining0 <= 0) {
                          address3 = new TreeNode(this._input.substring(index3, this._offset), index3, elements1);
                          this._offset = this._offset;
                      }
                      else {
                          address3 = FAILURE;
                      }
                      if (address3 !== FAILURE) {
                          elements0[2] = address3;
                          var address5 = FAILURE;
                          address5 = this._read_end_of_word();
                          if (address5 !== FAILURE) {
                              elements0[3] = address5;
                          }
                          else {
                              elements0 = null;
                              this._offset = index1;
                          }
                      }
                      else {
                          elements0 = null;
                          this._offset = index1;
                      }
                  }
                  else {
                      elements0 = null;
                      this._offset = index1;
                  }
              }
              else {
                  elements0 = null;
                  this._offset = index1;
              }
              if (elements0 === null) {
                  address0 = FAILURE;
              }
              else {
                  address0 = this._actions.make_float(this._input, index1, this._offset, elements0);
                  this._offset = this._offset;
              }
              this._cache._float2[index0] = [address0, this._offset];
              return address0;
          },
          _read_float3: function () {
              var address0 = FAILURE, index0 = this._offset;
              this._cache._float3 = this._cache._float3 || {};
              var cached = this._cache._float3[index0];
              if (cached) {
                  this._offset = cached[1];
                  return cached[0];
              }
              var index1 = this._offset, elements0 = new Array(4);
              var address1 = FAILURE;
              var index2 = this._offset;
              var chunk0 = null;
              if (this._offset < this._inputSize) {
                  chunk0 = this._input.substring(this._offset, this._offset + 1);
              }
              if (chunk0 === '-') {
                  address1 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                  this._offset = this._offset + 1;
              }
              else {
                  address1 = FAILURE;
                  if (this._offset > this._failure) {
                      this._failure = this._offset;
                      this._expected = [];
                  }
                  if (this._offset === this._failure) {
                      this._expected.push('"-"');
                  }
              }
              if (address1 === FAILURE) {
                  address1 = new TreeNode(this._input.substring(index2, index2), index2);
                  this._offset = index2;
              }
              if (address1 !== FAILURE) {
                  elements0[0] = address1;
                  var address2 = FAILURE;
                  var remaining0 = 1, index3 = this._offset, elements1 = [], address3 = true;
                  while (address3 !== FAILURE) {
                      var chunk1 = null;
                      if (this._offset < this._inputSize) {
                          chunk1 = this._input.substring(this._offset, this._offset + 1);
                      }
                      if (chunk1 !== null && /^[0-9]/.test(chunk1)) {
                          address3 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                          this._offset = this._offset + 1;
                      }
                      else {
                          address3 = FAILURE;
                          if (this._offset > this._failure) {
                              this._failure = this._offset;
                              this._expected = [];
                          }
                          if (this._offset === this._failure) {
                              this._expected.push('[0-9]');
                          }
                      }
                      if (address3 !== FAILURE) {
                          elements1.push(address3);
                          --remaining0;
                      }
                  }
                  if (remaining0 <= 0) {
                      address2 = new TreeNode(this._input.substring(index3, this._offset), index3, elements1);
                      this._offset = this._offset;
                  }
                  else {
                      address2 = FAILURE;
                  }
                  if (address2 !== FAILURE) {
                      elements0[1] = address2;
                      var address4 = FAILURE;
                      var chunk2 = null;
                      if (this._offset < this._inputSize) {
                          chunk2 = this._input.substring(this._offset, this._offset + 1);
                      }
                      if (chunk2 === '.') {
                          address4 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                          this._offset = this._offset + 1;
                      }
                      else {
                          address4 = FAILURE;
                          if (this._offset > this._failure) {
                              this._failure = this._offset;
                              this._expected = [];
                          }
                          if (this._offset === this._failure) {
                              this._expected.push('"."');
                          }
                      }
                      if (address4 !== FAILURE) {
                          elements0[2] = address4;
                          var address5 = FAILURE;
                          address5 = this._read_end_of_word();
                          if (address5 !== FAILURE) {
                              elements0[3] = address5;
                          }
                          else {
                              elements0 = null;
                              this._offset = index1;
                          }
                      }
                      else {
                          elements0 = null;
                          this._offset = index1;
                      }
                  }
                  else {
                      elements0 = null;
                      this._offset = index1;
                  }
              }
              else {
                  elements0 = null;
                  this._offset = index1;
              }
              if (elements0 === null) {
                  address0 = FAILURE;
              }
              else {
                  address0 = this._actions.make_float(this._input, index1, this._offset, elements0);
                  this._offset = this._offset;
              }
              this._cache._float3[index0] = [address0, this._offset];
              return address0;
          },
          _read_integer: function () {
              var address0 = FAILURE, index0 = this._offset;
              this._cache._integer = this._cache._integer || {};
              var cached = this._cache._integer[index0];
              if (cached) {
                  this._offset = cached[1];
                  return cached[0];
              }
              var index1 = this._offset, elements0 = new Array(3);
              var address1 = FAILURE;
              var index2 = this._offset;
              var chunk0 = null;
              if (this._offset < this._inputSize) {
                  chunk0 = this._input.substring(this._offset, this._offset + 1);
              }
              if (chunk0 === '-') {
                  address1 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                  this._offset = this._offset + 1;
              }
              else {
                  address1 = FAILURE;
                  if (this._offset > this._failure) {
                      this._failure = this._offset;
                      this._expected = [];
                  }
                  if (this._offset === this._failure) {
                      this._expected.push('"-"');
                  }
              }
              if (address1 === FAILURE) {
                  address1 = new TreeNode(this._input.substring(index2, index2), index2);
                  this._offset = index2;
              }
              if (address1 !== FAILURE) {
                  elements0[0] = address1;
                  var address2 = FAILURE;
                  var remaining0 = 1, index3 = this._offset, elements1 = [], address3 = true;
                  while (address3 !== FAILURE) {
                      var chunk1 = null;
                      if (this._offset < this._inputSize) {
                          chunk1 = this._input.substring(this._offset, this._offset + 1);
                      }
                      if (chunk1 !== null && /^[0-9]/.test(chunk1)) {
                          address3 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                          this._offset = this._offset + 1;
                      }
                      else {
                          address3 = FAILURE;
                          if (this._offset > this._failure) {
                              this._failure = this._offset;
                              this._expected = [];
                          }
                          if (this._offset === this._failure) {
                              this._expected.push('[0-9]');
                          }
                      }
                      if (address3 !== FAILURE) {
                          elements1.push(address3);
                          --remaining0;
                      }
                  }
                  if (remaining0 <= 0) {
                      address2 = new TreeNode(this._input.substring(index3, this._offset), index3, elements1);
                      this._offset = this._offset;
                  }
                  else {
                      address2 = FAILURE;
                  }
                  if (address2 !== FAILURE) {
                      elements0[1] = address2;
                      var address4 = FAILURE;
                      address4 = this._read_end_of_word();
                      if (address4 !== FAILURE) {
                          elements0[2] = address4;
                      }
                      else {
                          elements0 = null;
                          this._offset = index1;
                      }
                  }
                  else {
                      elements0 = null;
                      this._offset = index1;
                  }
              }
              else {
                  elements0 = null;
                  this._offset = index1;
              }
              if (elements0 === null) {
                  address0 = FAILURE;
              }
              else {
                  address0 = this._actions.make_integer(this._input, index1, this._offset, elements0);
                  this._offset = this._offset;
              }
              this._cache._integer[index0] = [address0, this._offset];
              return address0;
          },
          _read_end_of_word: function () {
              var address0 = FAILURE, index0 = this._offset;
              this._cache._end_of_word = this._cache._end_of_word || {};
              var cached = this._cache._end_of_word[index0];
              if (cached) {
                  this._offset = cached[1];
                  return cached[0];
              }
              var index1 = this._offset;
              var index2 = this._offset;
              address0 = this._read_ws();
              this._offset = index2;
              if (address0 !== FAILURE) {
                  address0 = new TreeNode(this._input.substring(this._offset, this._offset), this._offset);
                  this._offset = this._offset;
              }
              else {
                  address0 = FAILURE;
              }
              if (address0 === FAILURE) {
                  this._offset = index1;
                  var index3 = this._offset;
                  var chunk0 = null;
                  if (this._offset < this._inputSize) {
                      chunk0 = this._input.substring(this._offset, this._offset + 1);
                  }
                  if (chunk0 === '[') {
                      address0 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                      this._offset = this._offset + 1;
                  }
                  else {
                      address0 = FAILURE;
                      if (this._offset > this._failure) {
                          this._failure = this._offset;
                          this._expected = [];
                      }
                      if (this._offset === this._failure) {
                          this._expected.push('"["');
                      }
                  }
                  this._offset = index3;
                  if (address0 !== FAILURE) {
                      address0 = new TreeNode(this._input.substring(this._offset, this._offset), this._offset);
                      this._offset = this._offset;
                  }
                  else {
                      address0 = FAILURE;
                  }
                  if (address0 === FAILURE) {
                      this._offset = index1;
                      var index4 = this._offset;
                      var chunk1 = null;
                      if (this._offset < this._inputSize) {
                          chunk1 = this._input.substring(this._offset, this._offset + 1);
                      }
                      if (chunk1 === ']') {
                          address0 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                          this._offset = this._offset + 1;
                      }
                      else {
                          address0 = FAILURE;
                          if (this._offset > this._failure) {
                              this._failure = this._offset;
                              this._expected = [];
                          }
                          if (this._offset === this._failure) {
                              this._expected.push('"]"');
                          }
                      }
                      this._offset = index4;
                      if (address0 !== FAILURE) {
                          address0 = new TreeNode(this._input.substring(this._offset, this._offset), this._offset);
                          this._offset = this._offset;
                      }
                      else {
                          address0 = FAILURE;
                      }
                      if (address0 === FAILURE) {
                          this._offset = index1;
                          var index5 = this._offset;
                          var chunk2 = null;
                          if (this._offset < this._inputSize) {
                              chunk2 = this._input.substring(this._offset, this._offset + 1);
                          }
                          if (chunk2 === '{') {
                              address0 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                              this._offset = this._offset + 1;
                          }
                          else {
                              address0 = FAILURE;
                              if (this._offset > this._failure) {
                                  this._failure = this._offset;
                                  this._expected = [];
                              }
                              if (this._offset === this._failure) {
                                  this._expected.push('"{"');
                              }
                          }
                          this._offset = index5;
                          if (address0 !== FAILURE) {
                              address0 = new TreeNode(this._input.substring(this._offset, this._offset), this._offset);
                              this._offset = this._offset;
                          }
                          else {
                              address0 = FAILURE;
                          }
                          if (address0 === FAILURE) {
                              this._offset = index1;
                              var index6 = this._offset;
                              var chunk3 = null;
                              if (this._offset < this._inputSize) {
                                  chunk3 = this._input.substring(this._offset, this._offset + 1);
                              }
                              if (chunk3 === '}') {
                                  address0 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                                  this._offset = this._offset + 1;
                              }
                              else {
                                  address0 = FAILURE;
                                  if (this._offset > this._failure) {
                                      this._failure = this._offset;
                                      this._expected = [];
                                  }
                                  if (this._offset === this._failure) {
                                      this._expected.push('"}"');
                                  }
                              }
                              this._offset = index6;
                              if (address0 !== FAILURE) {
                                  address0 = new TreeNode(this._input.substring(this._offset, this._offset), this._offset);
                                  this._offset = this._offset;
                              }
                              else {
                                  address0 = FAILURE;
                              }
                              if (address0 === FAILURE) {
                                  this._offset = index1;
                                  var remaining0 = 1, index7 = this._offset, elements0 = [], address1 = true;
                                  while (address1 !== FAILURE) {
                                      var chunk4 = null;
                                      if (this._offset < this._inputSize) {
                                          chunk4 = this._input.substring(this._offset, this._offset + 1);
                                      }
                                      if (chunk4 !== null && /^[$]/.test(chunk4)) {
                                          address1 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                                          this._offset = this._offset + 1;
                                      }
                                      else {
                                          address1 = FAILURE;
                                          if (this._offset > this._failure) {
                                              this._failure = this._offset;
                                              this._expected = [];
                                          }
                                          if (this._offset === this._failure) {
                                              this._expected.push('[$]');
                                          }
                                      }
                                      if (address1 !== FAILURE) {
                                          elements0.push(address1);
                                          --remaining0;
                                      }
                                  }
                                  if (remaining0 <= 0) {
                                      address0 = new TreeNode(this._input.substring(index7, this._offset), index7, elements0);
                                      this._offset = this._offset;
                                  }
                                  else {
                                      address0 = FAILURE;
                                  }
                                  if (address0 === FAILURE) {
                                      this._offset = index1;
                                  }
                              }
                          }
                      }
                  }
              }
              this._cache._end_of_word[index0] = [address0, this._offset];
              return address0;
          },
          _read_ws: function () {
              var address0 = FAILURE, index0 = this._offset;
              this._cache._ws = this._cache._ws || {};
              var cached = this._cache._ws[index0];
              if (cached) {
                  this._offset = cached[1];
                  return cached[0];
              }
              var index1 = this._offset;
              address0 = this._read_newline();
              if (address0 === FAILURE) {
                  this._offset = index1;
                  address0 = this._read_space();
                  if (address0 === FAILURE) {
                      this._offset = index1;
                      address0 = this._read_tab();
                      if (address0 === FAILURE) {
                          this._offset = index1;
                          address0 = this._read_comment();
                          if (address0 === FAILURE) {
                              this._offset = index1;
                              address0 = this._read_end_of_string();
                              if (address0 === FAILURE) {
                                  this._offset = index1;
                              }
                          }
                      }
                  }
              }
              this._cache._ws[index0] = [address0, this._offset];
              return address0;
          },
          _read_space: function () {
              var address0 = FAILURE, index0 = this._offset;
              this._cache._space = this._cache._space || {};
              var cached = this._cache._space[index0];
              if (cached) {
                  this._offset = cached[1];
                  return cached[0];
              }
              var chunk0 = null;
              if (this._offset < this._inputSize) {
                  chunk0 = this._input.substring(this._offset, this._offset + 1);
              }
              if (chunk0 !== null && /^[\s]/.test(chunk0)) {
                  address0 = this._actions.make_ws(this._input, this._offset, this._offset + 1);
                  this._offset = this._offset + 1;
              }
              else {
                  address0 = FAILURE;
                  if (this._offset > this._failure) {
                      this._failure = this._offset;
                      this._expected = [];
                  }
                  if (this._offset === this._failure) {
                      this._expected.push('[\\s]');
                  }
              }
              this._cache._space[index0] = [address0, this._offset];
              return address0;
          },
          _read_tab: function () {
              var address0 = FAILURE, index0 = this._offset;
              this._cache._tab = this._cache._tab || {};
              var cached = this._cache._tab[index0];
              if (cached) {
                  this._offset = cached[1];
                  return cached[0];
              }
              var chunk0 = null;
              if (this._offset < this._inputSize) {
                  chunk0 = this._input.substring(this._offset, this._offset + 1);
              }
              if (chunk0 !== null && /^[\t]/.test(chunk0)) {
                  address0 = this._actions.make_ws(this._input, this._offset, this._offset + 1);
                  this._offset = this._offset + 1;
              }
              else {
                  address0 = FAILURE;
                  if (this._offset > this._failure) {
                      this._failure = this._offset;
                      this._expected = [];
                  }
                  if (this._offset === this._failure) {
                      this._expected.push('[\\t]');
                  }
              }
              this._cache._tab[index0] = [address0, this._offset];
              return address0;
          },
          _read_newline: function () {
              var address0 = FAILURE, index0 = this._offset;
              this._cache._newline = this._cache._newline || {};
              var cached = this._cache._newline[index0];
              if (cached) {
                  this._offset = cached[1];
                  return cached[0];
              }
              var index1 = this._offset;
              address0 = this._read_newline1();
              if (address0 === FAILURE) {
                  this._offset = index1;
                  address0 = this._read_newline2();
                  if (address0 === FAILURE) {
                      this._offset = index1;
                  }
              }
              this._cache._newline[index0] = [address0, this._offset];
              return address0;
          },
          _read_newline1: function () {
              var address0 = FAILURE, index0 = this._offset;
              this._cache._newline1 = this._cache._newline1 || {};
              var cached = this._cache._newline1[index0];
              if (cached) {
                  this._offset = cached[1];
                  return cached[0];
              }
              var chunk0 = null;
              if (this._offset < this._inputSize) {
                  chunk0 = this._input.substring(this._offset, this._offset + 1);
              }
              if (chunk0 !== null && /^[\r]/.test(chunk0)) {
                  address0 = this._actions.make_ws(this._input, this._offset, this._offset + 1);
                  this._offset = this._offset + 1;
              }
              else {
                  address0 = FAILURE;
                  if (this._offset > this._failure) {
                      this._failure = this._offset;
                      this._expected = [];
                  }
                  if (this._offset === this._failure) {
                      this._expected.push('[\\r]');
                  }
              }
              this._cache._newline1[index0] = [address0, this._offset];
              return address0;
          },
          _read_newline2: function () {
              var address0 = FAILURE, index0 = this._offset;
              this._cache._newline2 = this._cache._newline2 || {};
              var cached = this._cache._newline2[index0];
              if (cached) {
                  this._offset = cached[1];
                  return cached[0];
              }
              var chunk0 = null;
              if (this._offset < this._inputSize) {
                  chunk0 = this._input.substring(this._offset, this._offset + 1);
              }
              if (chunk0 !== null && /^[\n]/.test(chunk0)) {
                  address0 = this._actions.make_ws(this._input, this._offset, this._offset + 1);
                  this._offset = this._offset + 1;
              }
              else {
                  address0 = FAILURE;
                  if (this._offset > this._failure) {
                      this._failure = this._offset;
                      this._expected = [];
                  }
                  if (this._offset === this._failure) {
                      this._expected.push('[\\n]');
                  }
              }
              this._cache._newline2[index0] = [address0, this._offset];
              return address0;
          },
          _read_comment: function () {
              var address0 = FAILURE, index0 = this._offset;
              this._cache._comment = this._cache._comment || {};
              var cached = this._cache._comment[index0];
              if (cached) {
                  this._offset = cached[1];
                  return cached[0];
              }
              var index1 = this._offset, elements0 = new Array(2);
              var address1 = FAILURE;
              var chunk0 = null;
              if (this._offset < this._inputSize) {
                  chunk0 = this._input.substring(this._offset, this._offset + 1);
              }
              if (chunk0 === '#') {
                  address1 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                  this._offset = this._offset + 1;
              }
              else {
                  address1 = FAILURE;
                  if (this._offset > this._failure) {
                      this._failure = this._offset;
                      this._expected = [];
                  }
                  if (this._offset === this._failure) {
                      this._expected.push('"#"');
                  }
              }
              if (address1 !== FAILURE) {
                  elements0[0] = address1;
                  var address2 = FAILURE;
                  var remaining0 = 0, index2 = this._offset, elements1 = [], address3 = true;
                  while (address3 !== FAILURE) {
                      var chunk1 = null;
                      if (this._offset < this._inputSize) {
                          chunk1 = this._input.substring(this._offset, this._offset + 1);
                      }
                      if (chunk1 !== null && /^[^\n]/.test(chunk1)) {
                          address3 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset);
                          this._offset = this._offset + 1;
                      }
                      else {
                          address3 = FAILURE;
                          if (this._offset > this._failure) {
                              this._failure = this._offset;
                              this._expected = [];
                          }
                          if (this._offset === this._failure) {
                              this._expected.push('[^\\n]');
                          }
                      }
                      if (address3 !== FAILURE) {
                          elements1.push(address3);
                          --remaining0;
                      }
                  }
                  if (remaining0 <= 0) {
                      address2 = new TreeNode(this._input.substring(index2, this._offset), index2, elements1);
                      this._offset = this._offset;
                  }
                  else {
                      address2 = FAILURE;
                  }
                  if (address2 !== FAILURE) {
                      elements0[1] = address2;
                  }
                  else {
                      elements0 = null;
                      this._offset = index1;
                  }
              }
              else {
                  elements0 = null;
                  this._offset = index1;
              }
              if (elements0 === null) {
                  address0 = FAILURE;
              }
              else {
                  address0 = new TreeNode(this._input.substring(index1, this._offset), index1, elements0);
                  this._offset = this._offset;
              }
              this._cache._comment[index0] = [address0, this._offset];
              return address0;
          },
          _read_end_of_string: function () {
              var address0 = FAILURE, index0 = this._offset;
              this._cache._end_of_string = this._cache._end_of_string || {};
              var cached = this._cache._end_of_string[index0];
              if (cached) {
                  this._offset = cached[1];
                  return cached[0];
              }
              var chunk0 = null;
              if (this._offset < this._inputSize) {
                  chunk0 = this._input.substring(this._offset, this._offset + 1);
              }
              if (chunk0 !== null && /^[$]/.test(chunk0)) {
                  address0 = this._actions.make_ws(this._input, this._offset, this._offset + 1);
                  this._offset = this._offset + 1;
              }
              else {
                  address0 = FAILURE;
                  if (this._offset > this._failure) {
                      this._failure = this._offset;
                      this._expected = [];
                  }
                  if (this._offset === this._failure) {
                      this._expected.push('[$]');
                  }
              }
              this._cache._end_of_string[index0] = [address0, this._offset];
              return address0;
          }
      };
      var Parser = function (input, actions, types) {
          if (actions === void 0) { actions = parser_actions; }
          this._input = input;
          this._inputSize = input.length;
          this._actions = actions;
          this._types = types;
          this._offset = 0;
          this._cache = {};
          this._failure = 0;
          this._expected = [];
      };
      Parser.prototype.parse = function () {
          var tree = this._read_pounce();
          if (tree !== FAILURE && this._offset === this._inputSize) {
              return tree;
          }
          if (this._expected.length === 0) {
              this._failure = this._offset;
              this._expected.push('<EOF>');
          }
          this.constructor.lastError = { offset: this._offset, expected: this._expected };
          throw new SyntaxError(formatError(this._input, this._failure, this._expected));
      };
      var strip_quotes = function (s) {
          var len = s.length;
          if (len > 1 && s[0] === '"' && s[len - 1] === '"') {
              return s.slice(1, -1);
          }
          return s;
      };
      var cbaNumber = function (s) {
          var num;
          if (!isNaN(parseFloat(s))) {
              num = parseFloat(s);
              if (('' + num).length === s.length || s[s.length - 1] == '.' || s[s.length - 1] == '0' || s[0] == '.') {
                  if (s.indexOf('.') === s.lastIndexOf('.')) {
                      return num;
                  }
              }
          }
          if (!isNaN(parseInt(s, 10))) {
              num = parseInt(s, 10);
              if (('' + num).length === s.length) {
                  return num;
              }
          }
          return s;
      };
      var parseNumber = function (s) {
          var num;
          if (!isNaN(parseFloat(s))) {
              num = parseFloat(s);
              if (('' + num).length === s.length || s[s.length - 1] == '.' || s[s.length - 1] == '0' || s[0] == '.') {
                  if (s.indexOf('.') === s.lastIndexOf('.')) {
                      return num;
                  }
              }
          }
          if (!isNaN(parseInt(s, 10))) {
              num = parseInt(s, 10);
              if (('' + num).length === s.length) {
                  return num;
              }
          }
          return parseFloat("NaN");
      };
      var cleanStrings = function (pl) {
          if (is$1(Array, pl)) {
              return pl.map(function (i) {
                  if (is$1(String, i)) {
                      if (i === 'true')
                          return true;
                      if (i === 'false')
                          return false;
                      var cbaN = cbaNumber(i); // cbaNumber(strip_quotes(i));
                      return is$1(String, cbaN) ? strip_quotes(i) : cbaN;
                  }
                  return cleanStrings(i);
              });
          }
          return pl; //cbaNumber(strip_quotes(pl));
      };
      var parse = function (input, options) {
          options = options || {};
          var parser = new Parser(input + " ", options.actions, options.types);
          return cleanStrings(parser.parse());
      };
      extend(Parser.prototype, Grammar);
      return { Grammar: Grammar, Parser: Parser, parse: parse };
  };
  var unParser = function (pl) {
      var ps = '';
      var spacer = '';
      for (var i in pl) {
          if (pl[i] && typeof pl[i] == "object") {
              if (Array.isArray(pl[i])) {
                  ps += spacer + '[' + unParser(pl[i]) + ']';
              }
              else {
                  ps += spacer + '{' + unParseKeyValuePair(pl[i]) + '}';
              }
          }
          else {
              ps += spacer + pl[i];
          }
          spacer = ' ';
      }
      return ps;
  };
  var unParseKeyValuePair = function (pl) {
      var ps = '';
      var spacer = '';
      for (var i in pl) {
          if (pl.hasOwnProperty(i)) {
              if (pl[i] && typeof pl[i] == "object") {
                  if (Array.isArray(pl[i])) {
                      ps += spacer + i + ':[' + unParser(pl[i]) + ']';
                  }
                  else {
                      ps += spacer + i + ':{' + unParseKeyValuePair(pl[i]) + '}';
                  }
              }
              else {
                  ps += spacer + i + ':' + pl[i];
              }
              spacer = ' ';
          }
      }
      return ps;
  };
  var p = pinnaParser();
  var parser = p.parse;

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0

  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.

  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** */

  var __assign = function() {
      __assign = Object.assign || function __assign(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
          return t;
      };
      return __assign.apply(this, arguments);
  };

  function __generator(thisArg, body) {
      var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
      function verb(n) { return function (v) { return step([n, v]); }; }
      function step(op) {
          if (f) throw new TypeError("Generator is already executing.");
          while (_) try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
              if (y = 0, t) op = [op[0] & 2, t.value];
              switch (op[0]) {
                  case 0: case 1: t = op; break;
                  case 4: _.label++; return { value: op[1], done: false };
                  case 5: _.label++; y = op[1]; op = [0]; continue;
                  case 7: op = _.ops.pop(); _.trys.pop(); continue;
                  default:
                      if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                      if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                      if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                      if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                      if (t[2]) _.ops.pop();
                      _.trys.pop(); continue;
              }
              op = body.call(thisArg, _);
          } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
          if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
      }
  }

  function __spreadArrays() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++)
          for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
              r[k] = a[j];
      return r;
  }

  index.enableBoundaryChecking(false);
  var rng;
  var toNumOrNull = function (u) {
      return is$1(Number, u) ? u : null;
  };
  var toArrOrNull = function (u) {
      return is$1(Array, u) ? u : null;
  };
  var toArrOfStrOrNull = function (u) {
      return is$1(Array, u) ? u : null;
  };
  var toStringOrNull = function (u) {
      return is$1(String, u) ? u : null;
  };
  var toPLOrNull = function (u) {
      return is$1(Array, u) ? u : null;
  };
  var toBoolOrNull = function (u) {
      return is$1(Boolean, u) ? u : null;
  };
  var toWordOrNull = function (u) {
      //string | number | Word[] | boolean | { [index: string]: Word }
      if (toStringOrNull(u) !== null) {
          return u;
      }
      if (toNumOrNull(u) !== null) {
          return u;
      }
      if (toArrOrNull(u) !== null) {
          return u;
      }
      if (toBoolOrNull(u) !== null) {
          return u;
      }
      if (is$1(Object, u) !== null) {
          return u;
      }
      return null;
  };
  // const toWordDictionaryOrNull = (u: any): WordDictionary | null =>
  //     r.is(Object, u) ? u : null;
  // const fetchProp = (wd: { [index: string]: Word }) => (w: Word, s: string | null) => {
  //     const res = r.prop(s, wd);
  //     if (!res) {
  //         return res;
  //     }
  //     return w;
  // };
  var consReslover = function (localWD) { return function (w) {
      if (is$1(String, w)) {
          var newW = toWordOrNull(propOr$1(w, w, localWD));
          return newW !== null ? newW : w;
      }
      var subList = toPLOrNull(w);
      if (is$1(Array, subList)) {
          return subInWD(localWD, __spreadArrays(subList));
      }
      return w;
  }; };
  var subInWD = function (localWD, words) {
      var resolveWord = consReslover(localWD);
      return map$1(resolveWord, words);
  };
  var deepZipObj = function (n, s) {
      if (!n.length || !s.length) {
          return {};
      }
      var name = n.pop();
      if (is$1(String, name)) {
          var value = s.pop();
          var def = {};
          def[name] = value;
          return __assign(__assign({}, deepZipObj(n, s)), def);
      }
      if (is$1(Array, name)) {
          var value = s.pop();
          if (is$1(Array, name)) {
              return __assign(__assign({}, deepZipObj(n, s)), deepZipObj(name, value));
          }
      }
      return null;
  };
  var coreWords = {
      'words': {
          compose: function (s) {
              s.push(introspectWords());
              return [s];
          }
      },
      // introspectWord
      'word': {
          compose: function (s) {
              var phrase = toArrOfStrOrNull(s === null || s === void 0 ? void 0 : s.pop());
              var wordName = toStringOrNull(phrase[0]);
              if (wordName) {
                  s.push(introspectWord(wordName));
                  return [s];
              }
              return [null];
          }
      },
      'dup': {
          dt: '[[A][A A] bind]',
          compose: function (s) { s.push(clone(s[s.length - 1])); return [s]; }
          // s => { s.push(s[s.length - 1]); return [s]; }
      },
      'dup2': {
          dt: '[[C D][C D C D] bind]',
          compose: [['dup'], 'dip', 'dup', ['swap'], 'dip']
      },
      'swap': {
          dt: '[[C D][D C] bind]',
          compose: function (s) {
              var top = s === null || s === void 0 ? void 0 : s.pop();
              var under = s === null || s === void 0 ? void 0 : s.pop();
              s.push(top);
              s.push(under);
              return [s];
          }
      },
      'drop': {
          dt: '[[A][] bind]',
          compose: function (s) { s === null || s === void 0 ? void 0 : s.pop(); return [s]; }
      },
      'round': {
          compose: function (s) {
              // const b = <number | null>toTypeOrNull<number | null>(s?.pop(), 'number');
              var b = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              var a = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (a !== null && b !== null) {
                  s.push(index.round(a, b));
                  return [s];
              }
              return [null];
          }
      },
      '+': {
          dt: '[[N N][N] comp]',
          compose: function (s) {
              // const b = <number | null>toTypeOrNull<number | null>(s?.pop(), 'number');
              var b = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              var a = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (a !== null && b !== null) {
                  s.push(index.plus(a, b));
                  return [s];
              }
              return [null];
          }
      },
      '-': {
          dt: '[[N N] [N] comp]',
          compose: function (s) {
              var b = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              var a = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (a !== null && b !== null) {
                  s.push(index.minus(a, b));
                  return [s];
              }
              return [null];
          }
      },
      '/': {
          dt: '[[N N][N] comp  [N|0 !=] guard]',
          compose: function (s) {
              var b = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              var a = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (a !== null && b !== null && b !== 0) {
                  s.push(index.divide(a, b));
                  return [s];
              }
              return [null];
          }
      },
      '%': {
          dt: '[[N N][N] comp]',
          compose: function (s) {
              var b = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              var a = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (a !== null && b !== null && b !== 0) {
                  s.push(a % b);
                  return [s];
              }
              return [null];
          }
      },
      '*': {
          dt: '[[N N][N] comp]',
          compose: function (s) {
              var b = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              var a = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (a !== null && b !== null) {
                  s.push(index.times(a, b));
                  return [s];
              }
              return [null];
          }
      },
      // bitwise on integers
      '&': {
          dt: '[[N N][N] comp]',
          compose: function (s) {
              var b = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              var a = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (a !== null && b !== null) {
                  s.push(a & b);
                  return [s];
              }
              return [null];
          }
      },
      '|': {
          dt: '[[N N][N] comp]',
          compose: function (s) {
              var b = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              var a = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (a !== null && b !== null) {
                  s.push(a | b);
                  return [s];
              }
              return [null];
          }
      },
      '^': {
          dt: '[[N N][N] comp]',
          compose: function (s) {
              var b = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              var a = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (a !== null && b !== null) {
                  s.push(a ^ b);
                  return [s];
              }
              return [null];
          }
      },
      '~': {
          dt: '[[N][N] comp]',
          compose: function (s) {
              var a = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (a !== null) {
                  s.push(~a);
                  return [s];
              }
              return [null];
          }
      },
      '&&': {
          dt: '[[B B] [B] comp]',
          compose: function (s) {
              var b = toBoolOrNull(s === null || s === void 0 ? void 0 : s.pop());
              var a = toBoolOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (a !== null && b !== null) {
                  s.push(a && b);
                  return [s];
              }
              return [null];
          }
      },
      '||': {
          dt: '[[B B][B] comp]',
          compose: function (s) {
              var b = toBoolOrNull(s === null || s === void 0 ? void 0 : s.pop());
              var a = toBoolOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (a !== null && b !== null) {
                  s.push(a || b);
                  return [s];
              }
              return [null];
          }
      },
      '!': {
          dt: '[[B][B] comp]',
          compose: function (s) {
              var a = toBoolOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (a !== null) {
                  s.push(!a);
                  return [s];
              }
              return [null];
          }
      },
      // Math.E
      'E': {
          dt: '[[]][N] comp]',
          compose: function (s) {
              s.push(Math.E);
              return [s];
          }
      },
      // Math.LN10
      'LN10': {
          dt: '[[]][N] comp]',
          compose: function (s) {
              s.push(Math.LN10);
              return [s];
          }
      },
      // Math.LN2
      'LN2': {
          dt: '[[]][N] comp]',
          compose: function (s) {
              s.push(Math.LN2);
              return [s];
          }
      },
      // Math.LOG10E
      'LOG10E': {
          dt: '[[]][N] comp]',
          compose: function (s) {
              s.push(Math.LOG10E);
              return [s];
          }
      },
      // Math.LOG2E
      'LOG2E': {
          dt: '[[]][N] comp]',
          compose: function (s) {
              s.push(Math.LOG2E);
              return [s];
          }
      },
      // Math.PI
      'PI': {
          dt: '[[]][N] comp]',
          compose: function (s) {
              s.push(Math.PI);
              return [s];
          }
      },
      // Math.SQRT1_2
      'SQRT1_2': {
          dt: '[[]][N] comp]',
          compose: function (s) {
              s.push(Math.SQRT1_2);
              return [s];
          }
      },
      // Math.SQRT2
      'SQRT2': {
          dt: '[[]][N] comp]',
          compose: function (s) {
              s.push(Math.SQRT2);
              return [s];
          }
      },
      // Math.abs()
      'abs': {
          dt: '[[N][N] comp]',
          compose: function (s) {
              var a = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (a !== null) {
                  s.push(Math.abs(a));
                  return [s];
              }
              return [null];
          }
      },
      // Math.acos()
      'acos': {
          dt: '[[N][N] comp]',
          compose: function (s) {
              var a = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (a !== null) {
                  s.push(Math.acos(a));
                  return [s];
              }
              return [null];
          }
      },
      // Math.acosh()
      'acosh': {
          dt: '[[N][N] comp]',
          compose: function (s) {
              var a = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (a !== null) {
                  s.push(Math.acosh(a));
                  return [s];
              }
              return [null];
          }
      },
      // Math.asin()
      'asin': {
          dt: '[[N][N] comp]',
          compose: function (s) {
              var a = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (a !== null) {
                  s.push(Math.asin(a));
                  return [s];
              }
              return [null];
          }
      },
      // Math.asinh()
      'asinh': {
          dt: '[[N][N] comp]',
          compose: function (s) {
              var a = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (a !== null) {
                  s.push(Math.asinh(a));
                  return [s];
              }
              return [null];
          }
      },
      // Math.atan()
      'atan': {
          dt: '[[N][N] comp]',
          compose: function (s) {
              var a = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (a !== null) {
                  s.push(Math.atan(a));
                  return [s];
              }
              return [null];
          }
      },
      // Math.atan2()
      'atan2': {
          dt: '[[N][N] comp]',
          compose: function (s) {
              var a = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              var b = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (a !== null && b !== null) {
                  s.push(Math.atan2(b, a));
                  return [s];
              }
              return [null];
          }
      },
      // Math.atanh()
      'atanh': {
          dt: '[[N][N] comp]',
          compose: function (s) {
              var a = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (a !== null) {
                  s.push(Math.atanh(a));
                  return [s];
              }
              return [null];
          }
      },
      // Math.cbrt()
      'cbrt': {
          dt: '[[N][N] comp]',
          compose: function (s) {
              var a = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (a !== null) {
                  s.push(Math.cbrt(a));
                  return [s];
              }
              return [null];
          }
      },
      // Math.ceil()
      'ceil': {
          dt: '[[N][N] comp]',
          compose: function (s) {
              var a = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (a !== null) {
                  s.push(Math.ceil(a));
                  return [s];
              }
              return [null];
          }
      },
      // Math.cos()
      'cos': {
          dt: '[[N][N] comp]',
          compose: function (s) {
              var a = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (a !== null) {
                  s.push(Math.cos(a));
                  return [s];
              }
              return [null];
          }
      },
      // Math.cosh()
      'cosh': {
          dt: '[[N][N] comp]',
          compose: function (s) {
              var a = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (a !== null) {
                  s.push(Math.cosh(a));
                  return [s];
              }
              return [null];
          }
      },
      // Math.exp()
      'exp': {
          dt: '[[N][N] comp]',
          compose: function (s) {
              var a = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (a !== null) {
                  s.push(Math.exp(a));
                  return [s];
              }
              return [null];
          }
      },
      // Math.expm1()
      'expm1': {
          dt: '[[N][N] comp]',
          compose: function (s) {
              var a = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (a !== null) {
                  s.push(Math.expm1(a));
                  return [s];
              }
              return [null];
          }
      },
      // Math.floor()
      'floor': {
          dt: '[[N][N] comp]',
          compose: function (s) {
              var a = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (a !== null) {
                  s.push(Math.floor(a));
                  return [s];
              }
              return [null];
          }
      },
      // Math.hypot()
      'hypot': {
          dt: '[[N][N] comp]',
          compose: function (s) {
              var a = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (a !== null) {
                  s.push(Math.hypot(a));
                  return [s];
              }
              return [null];
          }
      },
      // Math.log()
      'log': {
          dt: '[[N][N] comp]',
          compose: function (s) {
              var a = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (a !== null) {
                  s.push(Math.log(a));
                  return [s];
              }
              return [null];
          }
      },
      // Math.log10()
      'log10': {
          dt: '[[N][N] comp]',
          compose: function (s) {
              var a = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (a !== null) {
                  s.push(Math.log10(a));
                  return [s];
              }
              return [null];
          }
      },
      // Math.log1p()
      'log1p': {
          dt: '[[N][N] comp]',
          compose: function (s) {
              var a = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (a !== null) {
                  s.push(Math.log1p(a));
                  return [s];
              }
              return [null];
          }
      },
      // Math.log2()
      'log2': {
          dt: '[[N][N] comp]',
          compose: function (s) {
              var a = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (a !== null) {
                  s.push(Math.log2(a));
                  return [s];
              }
              return [null];
          }
      },
      // Math.max()
      'max': {
          dt: '[[N N][N] comp]',
          compose: function (s) {
              var a = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              var b = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (a !== null && b !== null) {
                  s.push(Math.max(a, b));
                  return [s];
              }
              return [null];
          }
      },
      // Math.min()
      'min': {
          dt: '[[N N][N] comp]',
          compose: function (s) {
              var a = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              var b = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (a !== null && b !== null) {
                  s.push(Math.min(a, b));
                  return [s];
              }
              return [null];
          }
      },
      // Math.pow()
      'pow': {
          dt: '[[N N][N] comp]',
          compose: function (s) {
              var a = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              var b = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (a !== null && b !== null) {
                  s.push(Math.pow(b, a));
                  return [s];
              }
              return [null];
          }
      },
      // seedrandom
      'seedrandom': {
          dt: '[[N][] comp]',
          compose: function (s) {
              var a = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (a !== null) {
                  rng = new Prando(a);
                  // rng_first = prng_alea(, {state: true});
                  // SR.seedrandom(a.toString(10), { global: true });
                  return [s];
              }
              return [null];
          }
      },
      // Math.random()
      'random': {
          dt: '[[][N] comp]',
          compose: function (s) {
              s.push(rng.next());
              return [s];
          }
      },
      // Math.sign()
      'sign': {
          dt: '[[N][N] comp]',
          compose: function (s) {
              var a = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (a !== null) {
                  s.push(Math.sign(a));
                  return [s];
              }
              return [null];
          }
      },
      // Math.sin()
      'sin': {
          dt: '[[N][N] comp]',
          compose: function (s) {
              var a = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (a !== null) {
                  s.push(Math.sin(a));
                  return [s];
              }
              return [null];
          }
      },
      // Math.sinh()
      'sinh': {
          dt: '[[N][N] comp]',
          compose: function (s) {
              var a = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (a !== null) {
                  s.push(Math.sinh(a));
                  return [s];
              }
              return [null];
          }
      },
      // Math.sqrt()
      'sqrt': {
          dt: '[[N][N] comp]',
          compose: function (s) {
              var a = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (a !== null) {
                  s.push(Math.sqrt(a));
                  return [s];
              }
              return [null];
          }
      },
      // Math.tan()
      'tan': {
          dt: '[[N][N] comp]',
          compose: function (s) {
              var a = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (a !== null) {
                  s.push(Math.tan(a));
                  return [s];
              }
              return [null];
          }
      },
      // Math.tanh()
      'tanh': {
          dt: '[[N][N] comp]',
          compose: function (s) {
              var a = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (a !== null) {
                  s.push(Math.tanh(a));
                  return [s];
              }
              return [null];
          }
      },
      // Math.trunc()
      'trunc': {
          dt: '[[N][N] comp]',
          compose: function (s) {
              var a = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (a !== null) {
                  s.push(Math.trunc(a));
                  return [s];
              }
              return [null];
          }
      },
      'leap': {
          dt: '[[F][F run] bind]',
          compose: function (s, pl) {
              var block = toPLOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (block) {
                  pl = block.concat(pl);
              }
              else {
                  pl.unshift(block);
              }
              return [s, pl];
          }
      },
      // binds names to stack values within a phrase of words
      'crouch': {
          dt: '[[[S+]F][F]]',
          compose: function (s, pl) {
              var words = toPLOrNull(s === null || s === void 0 ? void 0 : s.pop());
              var argList = clone$1$1(toArrOfStrOrNull(s === null || s === void 0 ? void 0 : s.pop()));
              if (words !== null && argList) {
                  var values = map$1(function () { return s === null || s === void 0 ? void 0 : s.pop(); }, argList);
                  // const localWD: { [index: string]: Word } =
                  //     r.zipObj(r.flatten(r.reverse(argList)), r.flatten(values));
                  var localWD = deepZipObj(reverse$1(argList), values);
                  var newWords = toPLOrNull(subInWD(localWD, words));
                  if (newWords) {
                      s.push(newWords);
                  }
              }
              return [s, pl];
          }
      },
      'pounce': {
          dt: '[[[S+]F][F run]]',
          compose: function (s, pl) {
              var words = toPLOrNull(s === null || s === void 0 ? void 0 : s.pop());
              var argList = clone$1$1(toArrOfStrOrNull(s === null || s === void 0 ? void 0 : s.pop()));
              if (words !== null && argList) {
                  var values = map$1(function () { return s === null || s === void 0 ? void 0 : s.pop(); }, argList);
                  // const localWD: { [index: string]: Word } =
                  //     r.zipObj(r.flatten(r.reverse(argList)), r.flatten(values));
                  var localWD = deepZipObj(reverse$1(argList), values);
                  var newWords = toPLOrNull(subInWD(localWD, words));
                  if (newWords) {
                      pl = newWords.concat(pl);
                  }
              }
              return [s, pl];
          }
      },
      'dip': {
          dt: '[[A F][F run A] bind]',
          compose: function (s, pl) {
              var block = toPLOrNull(s === null || s === void 0 ? void 0 : s.pop());
              var item = s === null || s === void 0 ? void 0 : s.pop();
              pl = [item].concat(pl);
              if (block) {
                  pl = block.concat(pl);
              }
              else {
                  pl.unshift(block);
              }
              return [s, pl];
          }
      },
      'dip2': {
          dt: '[[A C F][F run A C] bind]',
          compose: function (s, pl) {
              var block = toPLOrNull(s === null || s === void 0 ? void 0 : s.pop());
              var item2 = s === null || s === void 0 ? void 0 : s.pop();
              pl = [item2].concat(pl);
              var item1 = s === null || s === void 0 ? void 0 : s.pop();
              pl = [item1].concat(pl);
              if (block) {
                  pl = block.concat(pl);
              }
              else {
                  pl.unshift(block);
              }
              return [s, pl];
          }
      },
      'rotate': {
          dt: '[[C D E][E D C] bind]',
          compose: ['swap', ['swap'], 'dip', 'swap']
      },
      'rollup': {
          dt: '[[C D E][E C D] bind]',
          compose: ['swap', ['swap'], 'dip']
      },
      'rolldown': {
          dt: '[[C D E][D E C] bind]',
          compose: [['swap'], 'dip', 'swap']
      },
      'if-else': {
          dt: '[[B F F][F run] bind]',
          compose: function (s, pl) {
              var else_block = toPLOrNull(s === null || s === void 0 ? void 0 : s.pop());
              var then_block = toPLOrNull(s === null || s === void 0 ? void 0 : s.pop());
              var condition = toBoolOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (condition === null || then_block === null || else_block === null) {
                  return [null];
              }
              if (condition) {
                  if (is$1(Array, then_block)) {
                      pl = then_block.concat(pl);
                  }
                  else {
                      pl.unshift(then_block);
                  }
              }
              else {
                  if (is$1(Array, else_block)) {
                      pl = else_block.concat(pl);
                  }
                  else {
                      pl.unshift(else_block);
                  }
              }
              return [s, pl];
          }
      },
      'ifte': {
          dt: '[[F G G][F run G G] bind [B F F] [F run] bind]',
          compose: [['leap'], 'dip2', 'if-else']
      },
      '=': {
          dt: '[[N N][N B] comp]',
          compose: function (s) {
              var top = s === null || s === void 0 ? void 0 : s.pop();
              var b = toNumOrNull(top);
              var a = toNumOrNull(s[s.length - 1]);
              if (a !== null && b !== null) {
                  s.push(a === b);
              }
              else {
                  var c = toStringOrNull(top);
                  var d = toStringOrNull(s[s.length - 1]);
                  if (c !== null && d !== null) {
                      s.push(c === d);
                  }
                  else {
                      var e = toPLOrNull(top);
                      var f = toPLOrNull(s[s.length - 1]);
                      if (e !== null && f !== null) {
                          s.push(unParser(e) === unParser(f));
                      }
                      else {
                          s.push(false);
                      }
                  }
              }
              return [s];
          }
      },
      '==': {
          dt: '[[N N][B] comp]',
          compose: function (s) {
              var b = s === null || s === void 0 ? void 0 : s.pop();
              var a = s === null || s === void 0 ? void 0 : s.pop();
              var num_b = toNumOrNull(b);
              var num_a = toNumOrNull(a);
              if (num_a !== null && num_b !== null) {
                  s.push(num_a === num_b);
                  return [s];
              }
              var str_b = toStringOrNull(b);
              var str_a = toStringOrNull(a);
              if (str_a !== null && str_b !== null) {
                  s.push(str_a === str_b);
                  return [s];
              }
              var e = toPLOrNull(a);
              var f = toPLOrNull(b);
              if (e !== null && f !== null) {
                  s.push(unParser(e) === unParser(f));
                  return [s];
              }
              s.push(false);
              return [s];
          }
      },
      '!=': {
          compose: function (s) {
              var b = s === null || s === void 0 ? void 0 : s.pop();
              var a = s === null || s === void 0 ? void 0 : s.pop();
              var num_b = toNumOrNull(b);
              var num_a = toNumOrNull(a);
              if (num_a !== null && num_b !== null) {
                  s.push(num_a !== num_b);
                  return [s];
              }
              var str_b = toStringOrNull(b);
              var str_a = toStringOrNull(a);
              if (str_a !== null && str_b !== null) {
                  s.push(str_a !== str_b);
                  return [s];
              }
              var e = toPLOrNull(a);
              var f = toPLOrNull(b);
              if (e !== null && f !== null) {
                  s.push(unParser(e) !== unParser(f));
                  return [s];
              }
              s.push(true);
              return [s];
          }
      },
      '>': {
          compose: function (s) {
              var b = s === null || s === void 0 ? void 0 : s.pop();
              var a = s === null || s === void 0 ? void 0 : s.pop();
              var num_b = toNumOrNull(b);
              var num_a = toNumOrNull(a);
              if (num_a !== null && num_b !== null) {
                  s.push(num_a > num_b);
                  return [s];
              }
              var str_b = toStringOrNull(b);
              var str_a = toStringOrNull(a);
              if (str_a !== null && str_b !== null) {
                  s.push(str_a.localeCompare(str_b) > 0);
                  return [s];
              }
              s.push(null);
              return [s];
          }
      },
      '<': {
          compose: function (s) {
              var b = s === null || s === void 0 ? void 0 : s.pop();
              var a = s === null || s === void 0 ? void 0 : s.pop();
              var num_b = toNumOrNull(b);
              var num_a = toNumOrNull(a);
              if (num_a !== null && num_b !== null) {
                  s.push(num_a < num_b);
                  return [s];
              }
              var str_b = toStringOrNull(b);
              var str_a = toStringOrNull(a);
              if (str_a !== null && str_b !== null) {
                  s.push(str_a.localeCompare(str_b) < 0);
                  return [s];
              }
              s.push(null);
              return [s];
          }
      },
      '>=': {
          compose: function (s) {
              var b = s === null || s === void 0 ? void 0 : s.pop();
              var a = s === null || s === void 0 ? void 0 : s.pop();
              var num_b = toNumOrNull(b);
              var num_a = toNumOrNull(a);
              if (num_a !== null && num_b !== null) {
                  s.push(num_a >= num_b);
                  return [s];
              }
              var str_b = toStringOrNull(b);
              var str_a = toStringOrNull(a);
              if (str_a !== null && str_b !== null) {
                  s.push(str_a.localeCompare(str_b) >= 0);
                  return [s];
              }
              s.push(null);
              return [s];
          }
      },
      '<=': {
          compose: function (s) {
              var b = s === null || s === void 0 ? void 0 : s.pop();
              var a = s === null || s === void 0 ? void 0 : s.pop();
              var num_b = toNumOrNull(b);
              var num_a = toNumOrNull(a);
              if (num_a !== null && num_b !== null) {
                  s.push(num_a <= num_b);
                  return [s];
              }
              var str_b = toStringOrNull(b);
              var str_a = toStringOrNull(a);
              if (str_a !== null && str_b !== null) {
                  s.push(str_a.localeCompare(str_b) <= 0);
                  return [s];
              }
              s.push(null);
              return [s];
          }
      },
      'concat': {
          dt: '[[[A*] [C*]][[A* C*]] bind]',
          compose: function (s) {
              var b = toArrOrNull(s === null || s === void 0 ? void 0 : s.pop());
              var a = toArrOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (a && b) {
                  s.push(__spreadArrays(a, b));
              }
              return [s];
          }
      },
      'cons': {
          dt: '[[A [C*]][[A C*]] bind]',
          compose: function (s) {
              var b = toArrOrNull(s === null || s === void 0 ? void 0 : s.pop());
              var a = s === null || s === void 0 ? void 0 : s.pop();
              if (b) {
                  s.push(__spreadArrays([a], b));
              }
              return [s];
          }
      },
      'uncons': {
          dt: '[[[A+]][Af [Ar]] bind]',
          compose: function (s) {
              var arr = toArrOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (arr) {
                  s.push(head$1(arr), tail$1(arr));
              }
              return [s];
          }
      },
      'push': {
          dt: '[[[A*] C][[A C]] bind]',
          compose: function (s) {
              var item = s === null || s === void 0 ? void 0 : s.pop();
              var arr = toArrOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (arr) {
                  s.push(__spreadArrays(arr, [item]));
              }
              return [s];
          }
      },
      'pop': {
          dt: '[[[A+]][[Ab] Al] bind]',
          compose: function (s) {
              var arr = toArrOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (arr) {
                  s.push(init$1(arr), last$1(arr));
              }
              return [s];
          }
      },
      'constrec': {
          dt: '[[F][G][H][I][J]] [J run H run F run...]',
          //     { type: 'initial extends (list<words>)' },
          //     { type: 'increment extends (list<words>)' },
          //     { type: 'condition extends (list<words>)' },
          //     { type: 'recurse extends (list<words>)' },
          //     { type: 'final extends (list<words>)' }
          // ], []],
          compose: function (s, pl) {
              // initial increment condition recurse final constrec
              var final = toPLOrNull(s === null || s === void 0 ? void 0 : s.pop());
              var recurse = toPLOrNull(s === null || s === void 0 ? void 0 : s.pop());
              var condition = toPLOrNull(s === null || s === void 0 ? void 0 : s.pop());
              var increment = toPLOrNull(s === null || s === void 0 ? void 0 : s.pop());
              var initial = toPLOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (initial && increment && condition && recurse && final) {
                  var nextRec = [[], increment, condition, recurse, final, 'constrec'];
                  pl = __spreadArrays(initial, increment, condition, [__spreadArrays(recurse, nextRec), final, 'if-else']).concat(pl);
              }
              else {
                  // console.error("In 'constrec' some stack value(s) not found");
                  // throw new Error("stack value(s) not found");
                  return [null];
              }
              return [s, pl];
          }
      },
      'linrec': {
          dt: '[[F][G][H][I]] [I run H [G run I H G F linrec F run] if-else]',
          //     { type: 'termTest extends (list<words>)' },
          //     { type: 'terminal extends (list<words>)' },
          //     { type: 'recurse extends (list<words>)' },
          //     { type: 'final extends (list<words>)' }
          // ], []],
          compose: function (s, pl) {
              // termtest && terminal && recurse && final linrec 
              var final = toPLOrNull(s === null || s === void 0 ? void 0 : s.pop()); // F
              var recurse = toPLOrNull(s === null || s === void 0 ? void 0 : s.pop()); // G
              var terminal = toPLOrNull(s === null || s === void 0 ? void 0 : s.pop()); // H
              var termtest = toPLOrNull(s === null || s === void 0 ? void 0 : s.pop()); // I
              if (termtest && terminal && recurse && final) {
                  var nextRec = __spreadArrays([termtest, terminal, recurse, final, 'linrec'], final);
                  pl = __spreadArrays(termtest, [terminal, __spreadArrays(recurse, nextRec), 'if-else']).concat(pl);
              }
              else {
                  // console.error("In 'linrec' some stack value(s) not found");
                  // throw new Error("stack value(s) not found");
                  return [null];
              }
              // console.log('*** s pl ***', s, pl);
              return [s, pl];
          }
      },
      'linrec5': {
          dt: '[[F][G][H][I][J]] [J run H run F run...]',
          //     { type: 'init extends (list<words>)' },
          //     { type: 'termTest extends (list<words>)' },
          //     { type: 'terminal extends (list<words>)' },
          //     { type: 'recurse extends (list<words>)' },
          //     { type: 'final extends (list<words>)' }
          // ], []],
          compose: function (s, pl) {
              // termtest && terminal && recurse && final linrec 
              var final = toPLOrNull(s === null || s === void 0 ? void 0 : s.pop());
              var recurse = toPLOrNull(s === null || s === void 0 ? void 0 : s.pop());
              var terminal = toPLOrNull(s === null || s === void 0 ? void 0 : s.pop());
              var termtest = toPLOrNull(s === null || s === void 0 ? void 0 : s.pop());
              var init = toPLOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (init && termtest && terminal && recurse && final) {
                  var nextRec = __spreadArrays([termtest, terminal, recurse, final, 'linrec'], final);
                  pl = __spreadArrays(init, termtest, [terminal, __spreadArrays(recurse, nextRec), 'if-else']).concat(pl);
              }
              else {
                  // console.error("In 'linrec5' some stack value(s) not found");
                  // throw new Error("stack value(s) not found");
                  return [null];
              }
              // console.log('*** s pl ***', s, pl);
              return [s, pl];
          }
      },
      'binrec': {
          //     { type: 'termTest extends (list<words>)' },
          //     { type: 'terminal extends (list<words>)' },
          //     { type: 'recurse extends (list<words>)' },
          //     { type: 'final extends (list<words>)' }
          // ], []],
          compose: function (s, pl) {
              // termtest && terminal && recurse && final binrec 
              var final = toPLOrNull(s === null || s === void 0 ? void 0 : s.pop());
              var recurse = toPLOrNull(s === null || s === void 0 ? void 0 : s.pop());
              var terminal = toPLOrNull(s === null || s === void 0 ? void 0 : s.pop());
              var termtest = toPLOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (termtest && terminal && recurse && final) {
                  var nextRec = [termtest, terminal, recurse, final, 'binrec'];
                  pl = __spreadArrays(termtest, [terminal, __spreadArrays(recurse, [__spreadArrays(nextRec), 'dip'], nextRec, final), 'if-else']).concat(pl);
              }
              else {
                  // console.error("In 'binrec' some stack value(s) not found");
                  // throw new Error("stack value(s) not found");
                  return [null];
              }
              // console.log('*** s pl ***', s, pl);
              return [s, pl];
          }
      },
      'times': {
          dt: '[F N] [F run] bind',
          compose: ['dup', 0, '>', [1, '-', 'swap', 'dup', 'dip2', 'swap', 'times'], ['drop', 'drop'], 'if-else']
      },
      'map': {
          dt: '[[A] F] [A F run [] cons] bind',
          compose: [["list", "phrase"], [
                  [[], "list"],
                  ['size', 0, '<='],
                  ['drop'],
                  ['uncons', ["swap", ["phrase", 'leap'], 'dip', "swap", 'push'], 'dip'],
                  [], 'linrec5'
              ], "pounce"]
      },
      'map2': {
          dt: '[[A] F] [A F run [] cons] bind',
          compose: [["list", "phrase"],
              [
                  [[], "list"],
                  ['size', 1, '<='],
                  ['drop'],
                  [
                      'uncons', 'uncons',
                      ['phrase', 'leap', 'push'], 'dip'
                  ],
                  [], 'linrec5'
              ], "pounce"]
      },
      'filter': {
          // [{ type: 'valueList extends (list<words>)' },
          // { type: 'phrase extends (list<words>)' }],
          // [{ type: 'resultValueList extends (list<words>)' }]],
          compose: [["list", "phrase"], [
                  [[], "list"],
                  ['size', 0, '<='],
                  ['drop'],
                  ['uncons', ["swap", ["dup", "phrase", 'leap'], 'dip', "rollup", ['push'], ['drop'], 'if-else'], 'dip'],
                  [], 'linrec5'
              ], "pounce"]
      },
      'reduce': {
          // [{ type: 'valueList extends (list<words>)' },
          // { type: 'accumulater (word)' },
          // { type: 'phrase extends (list<words>)' }],
          // [{ type: 'resultValueList extends (list<words>)' }]],
          compose: [["_list", "_acc", "_phrase"], [
                  ["_acc", "_list"],
                  ['size', 0, '<='],
                  ['drop'],
                  ['uncons', ["_phrase", "leap"], 'dip'],
                  [], 'linrec5'
              ], "pounce"]
      },
      // // 'split': {
      // //     compose: [["cutVal", "theList", "operator"], [
      // //         [], [], "cutVal", "theList",
      // //         'size',
      // //         ['uncons',
      // //             ['dup2', "operator", "leap",
      // //                 ['swap', ['swap', ['push'], 'dip'], 'dip'],
      // //                 ['swap', ['push'], 'dip'], 'if-else'], 'dip',
      // //         ], 'swap', 'times', 'drop', 'swap', ['push'], 'dip'
      // //     ], "pounce"]
      // // },
      'split': {
          compose: [["cutVal", "theList", "operator"], [
                  "theList", "cutVal", "operator", "cons", ["!"], "concat", "filter", "cutVal", "push",
                  "theList", "cutVal", "operator", "cons", "filter",
              ], "pounce"]
      },
      'spliti': {
          compose: [["theList", "cutValIndex", "operator"], [
                  "theList", "cutValIndex", "outAt", "operator", "cons", ["!"], "concat", "filter",
                  "theList", "cutValIndex", "outAt", "operator", "cons", "filter",
              ], "pounce"]
      },
      'size': {
          compose: function (s) {
              var arr = toArrOrNull(s[s.length - 1]);
              if (arr) {
                  s.push(arr.length);
              }
              return [s];
          }
      },
      'outAt': {
          compose: function (s) {
              var i = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              var arr = toArrOrNull(s[s.length - 1]);
              if (i !== null && arr && arr.length - 1 >= i) {
                  s.push(arr[i]);
                  return [s];
              }
              var str = toStringOrNull(s[s.length - 1]);
              if (i !== null && str && str.length - 1 >= i) {
                  s.push(str[i]);
                  return [s];
              }
              // console.error("In 'outAt' some stack value(s) not found", "i =", i, arr, str);
              // throw new Error("stack value(s) not found");
              return [null];
          }
      },
      'inAt': {
          compose: function (s) {
              var i = toNumOrNull(s === null || s === void 0 ? void 0 : s.pop());
              var ele = toWordOrNull(s === null || s === void 0 ? void 0 : s.pop());
              var arr = toArrOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (i !== null && ele !== null && arr && arr.length - 1 >= i) {
                  arr[i] = ele;
                  s.push(arr);
              }
              else {
                  // console.error("In 'inAt' some stack value(s) not found");
                  // throw new Error("stack value(s) not found");
                  return [null];
              }
              return [s];
          }
      },
      'depth': {
          compose: function (s) {
              s.push(s.length);
              return [s];
          }
      },
      'stack-copy': {
          compose: function (s) {
              s.push(__spreadArrays(s));
              return [s];
          }
      },
      'popInternalCallStack': {
          compose: []
      },
      // // 'import': {
      // //     definition: function (s: Json[], pl: PL, wordstack: Dictionary[]) {
      // //         const importable = toString(s?.pop());
      // //         if (typeof importable === 'string') {
      // //             if (imported[importable]) {
      // //                 // already imported
      // //                 return [s, pl];
      // //             }
      // //             // given a path to a dictionary load it or fetch and load
      // //             // options are to extend the core dictionary or pushit on a stack
      // //             // 1. Object.assign(window[importable].words, wordstack[0]);
      // //             // 2. wordstack.push(window[importable].words);
      // //             if (window[importable]) {
      // //                 imported[importable] = true;
      // //                 wordstack.push(window[importable].words);
      // //             } else {
      // //                 console.log('TBD: code to load resourse:', importable)
      // //             }
      // //         } else {
      // //             // given a dictionary
      // //             wordstack.push(importable);
      // //         }
      // //         return [s, pl];
      // //     }
      // // },
      // // 's2int': {
      // //     expects: [{ desc: 'a number in a string', ofType: 'string' }, { desc: 'radix', ofType: 'integer' }],
      // //     definition: function (s: Json[]) {
      // //         const radix = s?.pop();
      // //         const str = toString(s?.pop());
      // //         s.push(Number.parseInt(str, radix));
      // //         return [s, pl];
      // //     }
      // // },
      // // 'int2s': {
      // //     expects: [{ desc: 'number', ofType: 'integer' }, { desc: 'radix', ofType: 'integer' }],
      // //     definition: function (s: Json[]) {
      // //         const radix = s?.pop();
      // //         const n = s?.pop();
      // //         s.push(n.toString(radix));
      // //         return [s, pl];
      // //     }
      // // },
      // // '<<': {
      // //     expects: [{ desc: 'number', ofType: 'integer' }, { desc: 'shift', ofType: 'integer' }],
      // //     definition: function (s: Json[]) {
      // //         const shift = s?.pop();
      // //         const n = s?.pop();
      // //         s.push(n << shift);
      // //         return [s, pl];
      // //     }
      // // },
      // // '>>': {
      // //     expects: [{ desc: 'number', ofType: 'integer' }, { desc: 'shift', ofType: 'integer' }],
      // //     definition: function (s: Json[]) {
      // //         const shift = s?.pop();
      // //         const n = s?.pop();
      // //         s.push(n >> shift);
      // //         return [s, pl];
      // //     }
      // // },
      // // 'XOR': {
      // //     expects: [{ desc: 'number', ofType: 'integer' }, { desc: 'shift', ofType: 'integer' }],
      // //     definition: function (s: Json[]) {
      // //         const shift = s?.pop();
      // //         const n = s?.pop();
      // //         s.push(n ^ shift);
      // //         return [s, pl];
      // //     }
      // // },
      // // 'AND': {
      // //     expects: [{ desc: 'number', ofType: 'integer' }, { desc: 'shift', ofType: 'integer' }],
      // //     definition: function (s: Json[]) {
      // //         const shift = s?.pop();
      // //         const n = s?.pop();
      // //         s.push(n & shift);
      // //         return [s, pl];
      // //     }
      // // },
      // // 'store.set': {
      // //     definition: function (s: Json[]) {
      // //         const name = toString(s?.pop());
      // //         localStorage.setItem(name, JSON.stringify(s?.pop()));
      // //         return [s, pl];
      // //     }
      // // },
      // // 'store.get': {
      // //     definition: function (s: Json[]) {
      // //         const name = toString(s?.pop());
      // //         s.push(JSON.parse(localStorage.getItem(name)));
      // //         return [s, pl];
      // //     }
      // // },
      // // 'store.remove': {
      // //     definition: function (s: Json[]) {
      // //         const name = toString(s?.pop());
      // //         localStorage.removeItem(name);
      // //         return [s, pl];
      // //     }
      // // },
      'type-of': {
          compose: function (s, pl) {
              var item = s === null || s === void 0 ? void 0 : s.pop();
              var aNumber = toNumOrNull(item);
              if ((aNumber || aNumber === 0) && aNumber >= 0) {
                  s.push("Nat");
                  return [s];
              }
              if (aNumber && aNumber < 0) {
                  s.push("Neg");
                  return [s];
              }
              var aString = toStringOrNull(item);
              if (aString) {
                  if (aString === "Nat" || aString === "Zero" || aString === "Str" || aString === "Neg") {
                      s.push("Type");
                  }
                  else if (aString === "Type") {
                      s.push("MetaType");
                  }
                  else {
                      s.push("Str");
                  }
                  return [s];
              }
              var aList = toArrOrNull(item);
              if (aList) {
                  pl.unshift("map");
                  pl.unshift(["type-of"]);
                  pl.unshift(aList);
                  return [s, pl];
              }
              return null;
          }
      },
      'is-a-type': {
          compose: function (s, pl) {
              var item = s === null || s === void 0 ? void 0 : s.pop();
              var aString = toStringOrNull(item);
              if (aString &&
                  (aString === 'Str'
                      || aString === 'Nat'
                      || aString === 'Neg'
                      || aString === 'Zero')) {
                  s.push(true);
                  return [s];
              }
              var aList = toArrOrNull(item);
              if (aList) {
                  pl.unshift("map");
                  pl.unshift(["is-a-type"]);
                  pl.unshift(aList);
                  return [s, pl];
              }
              s.push(false);
              return [s];
          }
      }
  };
  // function cloneItem(item: Word) {
  //     // return cloneObject(item);
  //     if (item !== undefined) {
  //         return JSON.parse(JSON.stringify(item));
  //     }
  //     return item;
  // }
  var introspectWords = function () { return keys$1(omit$1(['popInternalCallStack'], coreWords)); };
  var introspectWord = function (wn) { return JSON.parse(JSON.stringify(path$1([wn], coreWords))); };
  var clone = function (source) {
      if (source === null)
          return source;
      if (source instanceof Date)
          return new Date(source.getTime());
      if (source instanceof Array)
          return source.map(function (item) { return clone(item); });
      if (typeof source === 'object' && source !== {}) {
          var clonnedObj_1 = __assign({}, source);
          Object.keys(clonnedObj_1).forEach(function (prop) {
              clonnedObj_1[prop] = clone(clonnedObj_1[prop]);
          });
          return clonnedObj_1;
      }
      return source;
  };
  // function deepClone<T extends object>(value: T): T {
  //     if (typeof value !== 'object' || value === null) {
  //       return value;
  //     }
  //     if (value instanceof Set) {
  //       return new Set(Array.from(value, deepClone)) as T;
  //     }
  //     if (value instanceof Map) {
  //       return new Map(Array.from(value, ([k, v]) => [k, deepClone(v)])) as T;
  //     }
  //     if (value instanceof Date) {
  //       return new Date(value) as T;
  //     }
  //     if (value instanceof RegExp) {
  //       return new RegExp(value.source, value.flags) as T;
  //     }
  //     return Object.keys(value).reduce((acc, key) => {
  //       return Object.assign(acc, { [key]: deepClone(value[key]) });
  //     }, (Array.isArray(value) ? [] : {}) as T);
  //   }

  var preProcessDefs = function (pl, coreWords) {
      var defineWord = function (wd, key, val) {
          var new_word = {};
          new_word[key] = val;
          // ToDo: implement a safe mode that would throw a preProcesser error if key is already defined.
          return mergeRight$1(wd, new_word);
      };
      // non-FP section (candidate for refactor)
      var next_pl = __spreadArrays(pl);
      var next_wd = {};
      var def_i = findIndex$1(function (word) { return word === 'compose'; }, next_pl);
      while (def_i !== -1) {
          if (def_i >= 2) {
              var word = toPLOrNull(next_pl[def_i - 2]);
              var key = toStringOrNull(head$1(toArrOrNull(next_pl[def_i - 1])));
              next_pl.splice(def_i - 2, 3); // splice is particularly mutant
              next_wd = defineWord(next_wd, key, { "compose": word });
          }
          def_i = findIndex$1(function (word) { return word === 'compose'; }, next_pl);
      }
      return [next_pl, mergeRight$1(coreWords, next_wd)];
  };

  // an interpreter that calls purr after parsing and preprocessing, so you dont have to
  function interpreter(pl_in, opt) {
      if (opt === void 0) { opt = { logLevel: 0, yieldOnId: false }; }
      // the word dictionary 
      var wd_in = opt.wd ? opt.wd : coreWords;
      // the program list and word dictionary are preProcessed and parsed (if needed) 
      var _a = is$1(Array, pl_in) ? [toPLOrNull(pl_in), wd_in] : preProcessDefs(is$1(String, pl_in) ? parser(pl_in.toString()) : pl_in, wd_in), pl = _a[0], wd = _a[1];
      var maxCycles = opt.maxCycles || 100000;
      return purr(pl, wd, maxCycles);
  }
  // (more closer to a) production version interpreter
  // Assumes that you have run and tested the interpreter with parsed pre processed input 
  // opt:{ logLevel: 0, yieldOnId: false, preProcessed: true, wd: coreWords_merged_with_preProcessedDefs }
  //
  function purr(pl, wd, cycleLimit) {
      var s, cycles, w, wds, plist;
      var _a, _b;
      var _c;
      if (cycleLimit === void 0) { cycleLimit = 10000; }
      return __generator(this, function (_d) {
          switch (_d.label) {
              case 0:
                  s = [];
                  cycles = 0;
                  _d.label = 1;
              case 1:
                  if (!(pl.length > 0)) return [3 /*break*/, 4];
                  w = pl.shift();
                  wds = is$1(String, w) ? wd[w] : null;
                  if (wds) {
                      cycles += 1;
                      if (typeof wds.compose === 'function') {
                          _a = wds.compose(s, pl), s = _a[0], _b = _a[1], pl = _b === void 0 ? pl : _b;
                      }
                      else {
                          plist = toPLOrNull(wds.compose);
                          if (plist) {
                              pl.unshift.apply(pl, plist);
                          }
                      }
                  }
                  else if (w !== undefined && s !== null) {
                      if (is$1(Array, w)) {
                          s.push([].concat(w));
                      }
                      else {
                          s.push(w);
                      }
                  }
                  if (!(cycles >= cycleLimit)) return [3 /*break*/, 3];
                  return [4 /*yield*/, { stack: [], prog: __spreadArrays(s, [w], pl), active: true }];
              case 2:
                  cycleLimit = (_c = (_d.sent())) !== null && _c !== void 0 ? _c : 1000;
                  cycles = 0;
                  _d.label = 3;
              case 3: return [3 /*break*/, 1];
              case 4: return [2 /*return*/, { stack: s, prog: pl, active: false }];
          }
      });
  }

  ({
      'guard': {
          compose: ["leap"]
      },
      '=dt=': {
          compose: parser('[0 outAt] dip 0 outAt [swap] dip == [drop drop] dip')
      },
      'comp': {
          compose: parser("[true [[size 0 <=] dip swap] [[drop] dip] [[pop swap [==] dip swap] dip &&] [] linrec] dip [Error in composition of type] if-else")
      },
      'run': {
          compose: ["leap"]
          // compose: parse('[size 0 <=] [drop] [uncons] [] linrec')
      },
      'bind': {
          compose: function (s, pl) {
              var fo = toArrOfStrOrNull(s === null || s === void 0 ? void 0 : s.pop());
              var fi = toArrOfStrOrNull(s === null || s === void 0 ? void 0 : s.pop());
              if (fo !== null && fi !== null) {
                  var _loop_1 = function () {
                      var se = s.pop();
                      var e = fi.pop();
                      if (e === "A" || e === "C" || e === "D" || e === "E" || e === "F" || e === "G" || e === "H") {
                          fo = map$1(function (foe) { return foe === e ? se : foe; }, fo);
                      }
                  };
                  while (s.length > 0 && fi.length > 0) {
                      _loop_1();
                  }
                  if (fi.length === 0) {
                      // console.log("bind requeue fo", s, fo);
                      pl.unshift.apply(pl, fo);
                  }
                  else {
                      console.log("bind another day push 2 ", fi, fo, "comp");
                      s.push(fi, fo, "bind");
                  }
                  return [s, pl];
              }
              console.error("Type error 28");
              return [null];
          }
      }
  });

  // the Pounce language core module exposes these function
  var parse = parser;
  var interpreter$1 = interpreter;

  let interp;
  let pounceAst;
  let nextPounceAst = null;
  const rows = 16;
  const columns = 16;
  const off = 20;
  const scale = 20;
  let start_t = -1;
  let fn_of_time = false;

  const has_t = (w) => {
      if (Array.isArray(w)) {
          return w.filter(has_t);
      } 
      return (w === "t");
  };

  // parse the Pounce program
  function repl(pounceProgram, logLevel = 0) {
      start_t = -1;
      nextPounceAst = parse(pounceProgram);
      {
          window.requestAnimationFrame(step);
      }
      fn_of_time = nextPounceAst.filter(has_t).length >= 0;
  }
  const ctx = document.getElementById("output").getContext("2d");

  const step = (current_t) => {
      if (start_t === -1) { start_t = current_t; }
      const t = current_t - start_t;
      if (nextPounceAst) {
          pounceAst = nextPounceAst;
      }
      let i = 0;
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, 340, 340);
      for (var y = 0; y < rows; y++) {
          for (var x = 0; x < columns; x++) {
              let dataPlusPounce = [t / 1000, i, x, y, ['t', 'i', 'x', 'y'], pounceAst, 'pounce'];
              interp = interpreter$1(dataPlusPounce);
              let res = interp?.next?.();
              let v = res?.value?.stack?.[0] ?? 0;
              if (v !== 0) {
                  ctx.beginPath();
                  ctx.fillStyle = v < 0 ? "#124dff" : "#fff023";
                  v = Math.min(1, Math.abs(v));
                  ctx.arc(x * scale + off, y * scale + off, v * scale / 2, 0, 2 * Math.PI);
                  ctx.fill();
              }
              i++;
          }
      }
      if (!fn_of_time) {
          return;
      }
      window.requestAnimationFrame(step);
  };

  // Add event listener for code-mini-golf input
  const myPounceProgramEle = document.getElementById("user-pl");
  const exampleSelectEle = document.getElementById("examples");

  const initProgram = decodeURI(location.hash.substring(1));
  let pounceProgram = initProgram ? initProgram : 't 16 % 16 - y +';
  let logLevel = 0;

  myPounceProgramEle.addEventListener("keyup", (e) => {
      if (e.target.value !== pounceProgram) {
          pounceProgram = e.target.value;
          repl(pounceProgram, logLevel);
      }
      if (e.key == 'Enter') {
          location.hash = encodeURI(pounceProgram);
      }
  }, false);

  exampleSelectEle.addEventListener("change", (e) => {
      pounceProgram = e.target.value;
      myPounceProgramEle.value = pounceProgram;
      myPounceProgramEle.focus();
      repl(pounceProgram, logLevel);
  });

  myPounceProgramEle.value = pounceProgram;

  myPounceProgramEle.focus();

  repl(pounceProgram, logLevel);

})();
//# sourceMappingURL=bundle.js.map
