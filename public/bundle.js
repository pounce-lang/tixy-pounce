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
       var curryN = /*#__PURE__*/_curry2(function curryN(length, fn) {
         if (length === 1) {
           return _curry1(fn);
         }
         return _arity(length, _curryN(length, [], fn));
       });

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
       var _isArrayLike = /*#__PURE__*/_curry1(function isArrayLike(x) {
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

       var XWrap = /*#__PURE__*/function () {
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
       var bind = /*#__PURE__*/_curry2(function bind(fn, thisObj) {
         return _arity(fn.length, function () {
           return fn.apply(thisObj, arguments);
         });
       });

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
         return xf['@@transducer/result'](obj[methodName](bind(xf['@@transducer/step'], xf), acc));
       }

       var symIterator = typeof Symbol !== 'undefined' ? Symbol.iterator : '@@iterator';

       function _reduce(fn, acc, list) {
         if (typeof fn === 'function') {
           fn = _xwrap(fn);
         }
         if (_isArrayLike(list)) {
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

       var XMap = /*#__PURE__*/function () {
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

       var _xmap = /*#__PURE__*/_curry2(function _xmap(f, xf) {
         return new XMap(f, xf);
       });

       function _has(prop, obj) {
         return Object.prototype.hasOwnProperty.call(obj, prop);
       }

       var toString = Object.prototype.toString;
       var _isArguments = /*#__PURE__*/function () {
         return toString.call(arguments) === '[object Arguments]' ? function _isArguments(x) {
           return toString.call(x) === '[object Arguments]';
         } : function _isArguments(x) {
           return _has('callee', x);
         };
       }();

       // cover IE < 9 keys issues
       var hasEnumBug = ! /*#__PURE__*/{ toString: null }.propertyIsEnumerable('toString');
       var nonEnumerableProps = ['constructor', 'valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];
       // Safari bug
       var hasArgsEnumBug = /*#__PURE__*/function () {

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
       var keys = typeof Object.keys === 'function' && !hasArgsEnumBug ? /*#__PURE__*/_curry1(function keys(obj) {
         return Object(obj) !== obj ? [] : Object.keys(obj);
       }) : /*#__PURE__*/_curry1(function keys(obj) {
         if (Object(obj) !== obj) {
           return [];
         }
         var prop, nIdx;
         var ks = [];
         var checkArgsLength = hasArgsEnumBug && _isArguments(obj);
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
       var map = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['fantasy-land/map', 'map'], _xmap, function map(fn, functor) {
         switch (Object.prototype.toString.call(functor)) {
           case '[object Function]':
             return curryN(functor.length, function () {
               return fn.call(this, functor.apply(this, arguments));
             });
           case '[object Object]':
             return _reduce(function (acc, key) {
               acc[key] = fn(functor[key]);
               return acc;
             }, {}, keys(functor));
           default:
             return _map(fn, functor);
         }
       }));

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
        * @see R.prop
        * @example
        *
        *      R.path(['a', 'b'], {a: {b: 2}}); //=> 2
        *      R.path(['a', 'b'], {c: {b: 2}}); //=> undefined
        */
       var path = /*#__PURE__*/_curry2(function path(paths, obj) {
         var val = obj;
         var idx = 0;
         while (idx < paths.length) {
           if (val == null) {
             return;
           }
           val = val[paths[idx]];
           idx += 1;
         }
         return val;
       });

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
       var slice = /*#__PURE__*/_curry3( /*#__PURE__*/_checkForMethod('slice', function slice(fromIndex, toIndex, list) {
         return Array.prototype.slice.call(list, fromIndex, toIndex);
       }));

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
       var tail = /*#__PURE__*/_curry1( /*#__PURE__*/_checkForMethod('tail', /*#__PURE__*/slice(1, Infinity)));

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
       var reverse = /*#__PURE__*/_curry1(function reverse(list) {
         return _isString(list) ? list.split('').reverse().join('') : Array.prototype.slice.call(list, 0).reverse();
       });

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
       var nth = /*#__PURE__*/_curry2(function nth(offset, list) {
         var idx = offset < 0 ? list.length + offset : offset;
         return _isString(list) ? list.charAt(idx) : list[idx];
       });

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
       var head = /*#__PURE__*/nth(0);

       function _filter(fn, list) {
         var idx = 0;
         var len = list.length;
         var result = [];

         while (idx < len) {
           if (fn(list[idx])) {
             result[result.length] = list[idx];
           }
           idx += 1;
         }
         return result;
       }

       function _isObject(x) {
         return Object.prototype.toString.call(x) === '[object Object]';
       }

       var XFilter = /*#__PURE__*/function () {
         function XFilter(f, xf) {
           this.xf = xf;
           this.f = f;
         }
         XFilter.prototype['@@transducer/init'] = _xfBase.init;
         XFilter.prototype['@@transducer/result'] = _xfBase.result;
         XFilter.prototype['@@transducer/step'] = function (result, input) {
           return this.f(input) ? this.xf['@@transducer/step'](result, input) : result;
         };

         return XFilter;
       }();

       var _xfilter = /*#__PURE__*/_curry2(function _xfilter(f, xf) {
         return new XFilter(f, xf);
       });

       /**
        * Takes a predicate and a `Filterable`, and returns a new filterable of the
        * same type containing the members of the given filterable which satisfy the
        * given predicate. Filterable objects include plain objects or any object
        * that has a filter method such as `Array`.
        *
        * Dispatches to the `filter` method of the second argument, if present.
        *
        * Acts as a transducer if a transformer is given in list position.
        *
        * @func
        * @memberOf R
        * @since v0.1.0
        * @category List
        * @sig Filterable f => (a -> Boolean) -> f a -> f a
        * @param {Function} pred
        * @param {Array} filterable
        * @return {Array} Filterable
        * @see R.reject, R.transduce, R.addIndex
        * @example
        *
        *      const isEven = n => n % 2 === 0;
        *
        *      R.filter(isEven, [1, 2, 3, 4]); //=> [2, 4]
        *
        *      R.filter(isEven, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
        */
       var filter = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['filter'], _xfilter, function (pred, filterable) {
         return _isObject(filterable) ? _reduce(function (acc, key) {
           if (pred(filterable[key])) {
             acc[key] = filterable[key];
           }
           return acc;
         }, {}, keys(filterable)) :
         // else
         _filter(pred, filterable);
       }));

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
       var defaultTo = /*#__PURE__*/_curry2(function defaultTo(d, v) {
         return v == null || v !== v ? d : v;
       });

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
       var last = /*#__PURE__*/nth(-1);

       var XFindIndex = /*#__PURE__*/function () {
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

       var _xfindIndex = /*#__PURE__*/_curry2(function _xfindIndex(f, xf) {
         return new XFindIndex(f, xf);
       });

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
       var findIndex = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable([], _xfindIndex, function findIndex(fn, list) {
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
       var init = /*#__PURE__*/slice(0, -1);

       // Based on https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
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
       var is = /*#__PURE__*/_curry2(function is(Ctor, val) {
         return val != null && val.constructor === Ctor || val instanceof Ctor;
       });

       /**
        * Create a new object with the own properties of the first object merged with
        * the own properties of the second object. If a key exists in both objects,
        * the value from the second object will be used.
        *
        * @func
        * @memberOf R
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
       var mergeRight = /*#__PURE__*/_curry2(function mergeRight(l, r) {
         return _objectAssign$1({}, l, r);
       });

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
       var omit = /*#__PURE__*/_curry2(function omit(names, obj) {
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
       var pathOr = /*#__PURE__*/_curry3(function pathOr(d, p, obj) {
         return defaultTo(d, path(p, obj));
       });

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
       var propOr = /*#__PURE__*/_curry3(function propOr(val, p, obj) {
         return pathOr(val, [p], obj);
       });

       /**
        * Creates a new object out of a list of keys and a list of values.
        * Key/value pairing is truncated to the length of the shorter of the two lists.
        * Note: `zipObj` is equivalent to `pipe(zip, fromPairs)`.
        *
        * @func
        * @memberOf R
        * @since v0.3.0
        * @category List
        * @sig [String] -> [*] -> {String: *}
        * @param {Array} keys The array that will be properties on the output object.
        * @param {Array} values The list of values on the output object.
        * @return {Object} The object made by pairing up same-indexed elements of `keys` and `values`.
        * @example
        *
        *      R.zipObj(['a', 'b', 'c'], [1, 2, 3]); //=> {a: 1, b: 2, c: 3}
        */
       var zipObj = /*#__PURE__*/_curry2(function zipObj(keys, values) {
         var idx = 0;
         var len = Math.min(keys.length, values.length);
         var out = {};
         while (idx < len) {
           out[keys[idx]] = values[idx];
           idx += 1;
         }
         return out;
       });

       /*! *****************************************************************************
       Copyright (c) Microsoft Corporation.

       Permission to use, copy, modify, and/or distribute this software for any
       purpose with or without fee is hereby granted.

       THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
       REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
       AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
       INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
       LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
       OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
       PERFORMANCE OF THIS SOFTWARE.
       ***************************************************************************** */
       /* global Reflect, Promise */



























       function __spreadArrays() {
           for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
           for (var r = Array(s), k = 0, i = 0; i < il; i++)
               for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                   r[k] = a[j];
           return r;
       }

       /**
        * @desc 解决浮动运算问题，避免小数点后产生多位数和计算精度损失。
        * 问题示例：2.3 + 2.4 = 4.699999999999999，1.0 - 0.9 = 0.09999999999999998
        */
       /**
        * 把错误的数据转正
        * strip(0.09999999999999998)=0.1
        */
       function strip(num, precision) {
           if (precision === void 0) { precision = 15; }
           return +parseFloat(Number(num).toPrecision(precision));
       }
       /**
        * Return digits length of a number
        * @param {*number} num Input number
        */
       function digitLength(num) {
           // Get digit length of e
           var eSplit = num.toString().split(/[eE]/);
           var len = (eSplit[0].split('.')[1] || '').length - +(eSplit[1] || 0);
           return len > 0 ? len : 0;
       }
       /**
        * 把小数转成整数，支持科学计数法。如果是小数则放大成整数
        * @param {*number} num 输入数
        */
       function float2Fixed(num) {
           if (num.toString().indexOf('e') === -1) {
               return Number(num.toString().replace('.', ''));
           }
           var dLen = digitLength(num);
           return dLen > 0 ? strip(Number(num) * Math.pow(10, dLen)) : Number(num);
       }
       /**
        * 检测数字是否越界，如果越界给出提示
        * @param {*number} num 输入数
        */
       function checkBoundary(num) {
           if (_boundaryCheckingState) {
               if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
                   console.warn(num + " is beyond boundary when transfer to integer, the results may not be accurate");
               }
           }
       }
       /**
        * 精确乘法
        */
       function times(num1, num2) {
           var others = [];
           for (var _i = 2; _i < arguments.length; _i++) {
               others[_i - 2] = arguments[_i];
           }
           if (others.length > 0) {
               return times.apply(void 0, __spreadArrays([times(num1, num2), others[0]], others.slice(1)));
           }
           var num1Changed = float2Fixed(num1);
           var num2Changed = float2Fixed(num2);
           var baseNum = digitLength(num1) + digitLength(num2);
           var leftValue = num1Changed * num2Changed;
           checkBoundary(leftValue);
           return leftValue / Math.pow(10, baseNum);
       }
       /**
        * 精确加法
        */
       function plus(num1, num2) {
           var others = [];
           for (var _i = 2; _i < arguments.length; _i++) {
               others[_i - 2] = arguments[_i];
           }
           if (others.length > 0) {
               return plus.apply(void 0, __spreadArrays([plus(num1, num2), others[0]], others.slice(1)));
           }
           var baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
           return (times(num1, baseNum) + times(num2, baseNum)) / baseNum;
       }
       /**
        * 精确减法
        */
       function minus(num1, num2) {
           var others = [];
           for (var _i = 2; _i < arguments.length; _i++) {
               others[_i - 2] = arguments[_i];
           }
           if (others.length > 0) {
               return minus.apply(void 0, __spreadArrays([minus(num1, num2), others[0]], others.slice(1)));
           }
           var baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
           return (times(num1, baseNum) - times(num2, baseNum)) / baseNum;
       }
       /**
        * 精确除法
        */
       function divide(num1, num2) {
           var others = [];
           for (var _i = 2; _i < arguments.length; _i++) {
               others[_i - 2] = arguments[_i];
           }
           if (others.length > 0) {
               return divide.apply(void 0, __spreadArrays([divide(num1, num2), others[0]], others.slice(1)));
           }
           var num1Changed = float2Fixed(num1);
           var num2Changed = float2Fixed(num2);
           checkBoundary(num1Changed);
           checkBoundary(num2Changed);
           // fix: 类似 10 ** -4 为 0.00009999999999999999，strip 修正
           return times(num1Changed / num2Changed, strip(Math.pow(10, digitLength(num2) - digitLength(num1))));
       }
       /**
        * 四舍五入
        */
       function round(num, ratio) {
           var base = Math.pow(10, ratio);
           return divide(Math.round(times(num, base)), base);
       }
       var _boundaryCheckingState = true;
       /**
        * 是否进行边界检查，默认开启
        * @param flag 标记开关，true 为开启，false 为关闭，默认为 true
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

       var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

       function unwrapExports (x) {
       	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
       }

       function createCommonjsModule(fn, module) {
       	return module = { exports: {} }, fn(module, module.exports), module.exports;
       }

       var check_1 = createCommonjsModule(function (module, exports) {
       Object.defineProperty(exports, "__esModule", { value: true });
       var check = function (_a, value, genericsMap, checkerMap) {
           var type = _a.type, data = _a.data;
           switch (type) {
               case 'literal':
                   return value === data;
               case 'primitive': {
                   if (data === 'any' && value !== null
                       || data === 'void' && value === undefined)
                       return true;
                   var valueType = typeof value;
                   return data === 'bool' && valueType === 'boolean'
                       || data === 'char' && valueType === 'string' && value.length === 1
                       || data === 'float' && valueType === 'number'
                       || data === 'int' && valueType === 'number' && (value | 0) === value
                       || data === 'string' && valueType === 'string';
               }
               case 'generic': {
                   var _b = data, extendsType = _b.extends, name_1 = _b.name;
                   if (genericsMap) {
                       var generic = genericsMap[name_1];
                       if (generic)
                           return check(generic, value, genericsMap, checkerMap);
                   }
                   return !extendsType || check(extendsType, value, genericsMap, checkerMap);
               }
               case 'tuple': {
                   if (!Array.isArray(value))
                       return false;
                   var length_1 = value.length;
                   return data ?
                       length_1 === data.length
                           && !~data.findIndex(function (currentType, index) {
                               return !check(currentType, value[index], genericsMap, checkerMap);
                           })
                       : !length_1;
               }
               case 'array': {
                   if (!Array.isArray(value))
                       return false;
                   var size = data.size, valueType_1 = data.type;
                   return value.length === size
                       && !~value.findIndex(function (currentValue) {
                           return !check(valueType_1, currentValue, genericsMap, checkerMap);
                       });
               }
               case 'list':
                   if (!Array.isArray(value))
                       return false;
                   return !~value.findIndex(function (currentValue) {
                       return !check(data, currentValue, genericsMap, checkerMap);
                   });
               case 'struct': {
                   if (typeof value !== 'object' || Array.isArray(value))
                       return false;
                   return !data
                       || !~Object.keys(data).findIndex(function (key) {
                           var pair = data[key];
                           var currentValue = value[key];
                           return !(pair.optional && currentValue === undefined
                               || check(pair.type, currentValue, genericsMap, checkerMap));
                       });
               }
               case 'map': {
                   if (typeof value !== 'object' || Array.isArray(value))
                       return false;
                   var _c = data, keyType_1 = _c.keyType, valueType_2 = _c.type;
                   return !~Object.keys(value).findIndex(function (key) {
                       return !(check(keyType_1, key, genericsMap, checkerMap)
                           && check(valueType_2, value[key], genericsMap, checkerMap));
                   });
               }
               case 'named': {
                   var valueType = data.type;
                   if (valueType && !check(valueType, value, genericsMap, checkerMap))
                       return false;
                   if (checkerMap) {
                       var checker = checkerMap[data.name];
                       return !checker || checker(value);
                   }
                   return true;
               }
               case 'nullable':
                   return value === null
                       || check(data, value, genericsMap, checkerMap);
               case 'intersection':
                   return check(data.type, value, genericsMap, checkerMap)
                       && check(data.type2, value, genericsMap, checkerMap);
               case 'union':
                   return check(data.type, value, genericsMap, checkerMap)
                       || check(data.type2, value, genericsMap, checkerMap);
           }
           return false;
       };
       exports.default = check;

       });

       unwrapExports(check_1);

       var grammar = createCommonjsModule(function (module, exports) {
       Object.defineProperty(exports, "__esModule", { value: true });
       function id(d) { return d[0]; }
       var unpack = function (data) { return data[0]; };
       var Fragment = (function () {
           function Fragment(type, data) {
               this.type = type;
               this.data = data;
           }
           return Fragment;
       }());
       exports.default = Fragment;
       exports.Lexer = undefined;
       exports.ParserRules = [
           { "name": "_$ebnf$1", "symbols": [] },
           { "name": "_$ebnf$1", "symbols": ["_$ebnf$1", "wschar"], "postprocess": function (d) { return d[0].concat([d[1]]); } },
           { "name": "_", "symbols": ["_$ebnf$1"], "postprocess": function () { return null; } },
           { "name": "__$ebnf$1", "symbols": ["wschar"] },
           { "name": "__$ebnf$1", "symbols": ["__$ebnf$1", "wschar"], "postprocess": function (d) { return d[0].concat([d[1]]); } },
           { "name": "__", "symbols": ["__$ebnf$1"], "postprocess": function () { return null; } },
           { "name": "wschar", "symbols": [/[ \t\n\v\f]/], "postprocess": id },
           { "name": "nullLiteral$string$1", "symbols": [{ "literal": "n" }, { "literal": "u" }, { "literal": "l" }, { "literal": "l" }], "postprocess": function (d) { return d.join(''); } },
           { "name": "nullLiteral", "symbols": ["nullLiteral$string$1"], "postprocess": function () { return null; } },
           { "name": "boolean$string$1", "symbols": [{ "literal": "t" }, { "literal": "r" }, { "literal": "u" }, { "literal": "e" }], "postprocess": function (d) { return d.join(''); } },
           { "name": "boolean", "symbols": ["boolean$string$1"], "postprocess": function () { return true; } },
           { "name": "boolean$string$2", "symbols": [{ "literal": "f" }, { "literal": "a" }, { "literal": "l" }, { "literal": "s" }, { "literal": "e" }], "postprocess": function (d) { return d.join(''); } },
           { "name": "boolean", "symbols": ["boolean$string$2"], "postprocess": function () { return false; } },
           { "name": "char", "symbols": [{ "literal": "'" }, "sstrchar", { "literal": "'" }], "postprocess": function (data) { return data[1]; } },
           { "name": "number$ebnf$1", "symbols": [{ "literal": "-" }], "postprocess": id },
           { "name": "number$ebnf$1", "symbols": [], "postprocess": function () { return null; } },
           { "name": "number$ebnf$2", "symbols": [/[0-9]/] },
           { "name": "number$ebnf$2", "symbols": ["number$ebnf$2", /[0-9]/], "postprocess": function (d) { return d[0].concat([d[1]]); } },
           { "name": "number$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/] },
           { "name": "number$ebnf$3$subexpression$1$ebnf$1", "symbols": ["number$ebnf$3$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function (d) { return d[0].concat([d[1]]); } },
           { "name": "number$ebnf$3$subexpression$1", "symbols": [{ "literal": "." }, "number$ebnf$3$subexpression$1$ebnf$1"] },
           { "name": "number$ebnf$3", "symbols": ["number$ebnf$3$subexpression$1"], "postprocess": id },
           { "name": "number$ebnf$3", "symbols": [], "postprocess": function () { return null; } },
           { "name": "number", "symbols": ["number$ebnf$1", "number$ebnf$2", "number$ebnf$3"], "postprocess": function (data) {
                   return parseFloat("" + (data[0] || '') + data[1].join('') + (data[2] ? '.' + data[2][1].join('') : ''));
               }
           },
           { "name": "unsigned_int$ebnf$1", "symbols": [/[0-9]/] },
           { "name": "unsigned_int$ebnf$1", "symbols": ["unsigned_int$ebnf$1", /[0-9]/], "postprocess": function (d) { return d[0].concat([d[1]]); } },
           { "name": "unsigned_int", "symbols": ["unsigned_int$ebnf$1"], "postprocess": function (data) { return parseInt(data[0].join('')); } },
           { "name": "string", "symbols": ["dqstring"] },
           { "name": "string", "symbols": ["sqstring"], "postprocess": unpack },
           { "name": "dqstring$ebnf$1", "symbols": [] },
           { "name": "dqstring$ebnf$1", "symbols": ["dqstring$ebnf$1", "dstrchar"], "postprocess": function (d) { return d[0].concat([d[1]]); } },
           { "name": "dqstring", "symbols": [{ "literal": "\"" }, "dqstring$ebnf$1", { "literal": "\"" }], "postprocess": function (data) { return data[1].join(''); } },
           { "name": "sqstring$ebnf$1", "symbols": [] },
           { "name": "sqstring$ebnf$1", "symbols": ["sqstring$ebnf$1", "sstrchar"], "postprocess": function (d) { return d[0].concat([d[1]]); } },
           { "name": "sqstring", "symbols": [{ "literal": "'" }, "sqstring$ebnf$1", { "literal": "'" }], "postprocess": function (data) { return data[1].join(''); } },
           { "name": "dstrchar", "symbols": [/[^\\"\n]/], "postprocess": id },
           { "name": "dstrchar", "symbols": [{ "literal": "\\" }, "strescape"], "postprocess": function (data) { return JSON.parse("\"" + data.join('') + "\""); } },
           { "name": "sstrchar", "symbols": [/[^\\'\n]/], "postprocess": id },
           { "name": "sstrchar", "symbols": [{ "literal": "\\" }, "strescape"], "postprocess": function (data) { return JSON.parse("\"" + data.join('') + "\""); } },
           { "name": "sstrchar$string$1", "symbols": [{ "literal": "\\" }, { "literal": "'" }], "postprocess": function (d) { return d.join(''); } },
           { "name": "sstrchar", "symbols": ["sstrchar$string$1"], "postprocess": function () { return '\''; } },
           { "name": "strescape", "symbols": [/["\\\/bfnrt]/], "postprocess": id },
           { "name": "strescape", "symbols": [{ "literal": "u" }, /[a-fA-F0-9]/, /[a-fA-F0-9]/, /[a-fA-F0-9]/, /[a-fA-F0-9]/], "postprocess": function (data) { return data.join(''); } },
           { "name": "grammar", "symbols": ["fragment"], "postprocess": unpack },
           { "name": "fragment", "symbols": ["union"], "postprocess": unpack },
           { "name": "union", "symbols": ["intersection"], "postprocess": unpack },
           { "name": "union", "symbols": ["union", "_", { "literal": "|" }, "_", "intersection"], "postprocess": function (data) {
                   return new Fragment('union', { type: data[0], type2: data[4] });
               }
           },
           { "name": "intersection", "symbols": ["nullable"], "postprocess": unpack },
           { "name": "intersection", "symbols": ["intersection", "_", { "literal": "&" }, "_", "nullable"], "postprocess": function (data) {
                   return new Fragment('intersection', { type: data[0], type2: data[4] });
               }
           },
           { "name": "nullable", "symbols": ["type"], "postprocess": unpack },
           { "name": "nullable", "symbols": [{ "literal": "?" }, "type"], "postprocess": function (data) { return new Fragment('nullable', data[1]); } },
           { "name": "type", "symbols": ["simpleType"], "postprocess": unpack },
           { "name": "type$ebnf$1", "symbols": ["typeList"], "postprocess": id },
           { "name": "type$ebnf$1", "symbols": [], "postprocess": function () { return null; } },
           { "name": "type", "symbols": [{ "literal": "[" }, "_", "type$ebnf$1", "_", { "literal": "]" }], "postprocess": function (data) { return new Fragment('tuple', data[2]); } },
           { "name": "type", "symbols": ["type", { "literal": "[" }, "_", "unsigned_int", "_", { "literal": "]" }], "postprocess": function (data) {
                   return new Fragment('array', { type: data[0], size: data[3] });
               }
           },
           { "name": "type$string$1", "symbols": [{ "literal": "[" }, { "literal": "]" }], "postprocess": function (d) { return d.join(''); } },
           { "name": "type", "symbols": ["type", "type$string$1"], "postprocess": function (data) { return new Fragment('list', data[0]); } },
           { "name": "type$ebnf$2", "symbols": ["keyedTypeList"], "postprocess": id },
           { "name": "type$ebnf$2", "symbols": [], "postprocess": function () { return null; } },
           { "name": "type", "symbols": [{ "literal": "{" }, "_", "type$ebnf$2", "_", { "literal": "}" }], "postprocess": function (data) {
                   var object = null;
                   var pairs = data[2];
                   pairs && pairs.forEach(function (pair) {
                       if (!object)
                           object = {};
                       object[pair.key] = pair;
                   });
                   return new Fragment('struct', object);
               } },
           { "name": "type$string$2", "symbols": [{ "literal": "]" }, { "literal": ":" }], "postprocess": function (d) { return d.join(''); } },
           { "name": "type", "symbols": [{ "literal": "{" }, "_", { "literal": "[" }, "_", "simpleType", "_", "type$string$2", "_", "fragment", "_", { "literal": "}" }], "postprocess": function (data) {
                   return new Fragment('map', { keyType: data[4], type: data[8] });
               }
           },
           { "name": "type$ebnf$3", "symbols": [] },
           { "name": "type$ebnf$3", "symbols": ["type$ebnf$3", /[a-zA-Z0-9]/], "postprocess": function (d) { return d[0].concat([d[1]]); } },
           { "name": "type$ebnf$4", "symbols": ["fragment"], "postprocess": id },
           { "name": "type$ebnf$4", "symbols": [], "postprocess": function () { return null; } },
           { "name": "type", "symbols": [/[a-z]/, "type$ebnf$3", { "literal": "{" }, "_", "type$ebnf$4", "_", { "literal": "}" }], "postprocess": function (data) {
                   return new Fragment('named', { name: "" + data[0] + data[1].join(''), type: data[4] });
               }
           },
           { "name": "type", "symbols": [{ "literal": "(" }, "_", "fragment", "_", { "literal": ")" }], "postprocess": function (data) { return data[2]; } },
           { "name": "keyedTypeList", "symbols": ["keyTypePair"] },
           { "name": "keyedTypeList", "symbols": ["keyTypePair", "_", { "literal": "," }], "postprocess": function (data) { return [data[0]]; } },
           { "name": "keyedTypeList", "symbols": ["keyTypePair", "_", { "literal": "," }, "_", "keyedTypeList"], "postprocess": function (data) { return [data[0]].concat(data[4]); } },
           { "name": "keyTypePair$ebnf$1", "symbols": [/[a-zA-Z0-9_]/] },
           { "name": "keyTypePair$ebnf$1", "symbols": ["keyTypePair$ebnf$1", /[a-zA-Z0-9_]/], "postprocess": function (d) { return d[0].concat([d[1]]); } },
           { "name": "keyTypePair$ebnf$2", "symbols": [{ "literal": "?" }], "postprocess": id },
           { "name": "keyTypePair$ebnf$2", "symbols": [], "postprocess": function () { return null; } },
           { "name": "keyTypePair", "symbols": ["keyTypePair$ebnf$1", "_", "keyTypePair$ebnf$2", { "literal": ":" }, "_", "fragment"], "postprocess": function (data) {
                   return ({ key: data[0].join(''), optional: Boolean(data[2]), type: data[5] });
               }
           },
           { "name": "typeList", "symbols": ["type"] },
           { "name": "typeList", "symbols": ["type", "_", { "literal": "," }], "postprocess": function (data) { return [data[0]]; } },
           { "name": "typeList", "symbols": ["type", "_", { "literal": "," }, "_", "typeList"], "postprocess": function (data) { return [data[0]].concat(data[4]); } },
           { "name": "simpleType$subexpression$1", "symbols": ["nullLiteral"] },
           { "name": "simpleType$subexpression$1", "symbols": ["boolean"] },
           { "name": "simpleType$subexpression$1", "symbols": ["char"] },
           { "name": "simpleType$subexpression$1", "symbols": ["number"] },
           { "name": "simpleType$subexpression$1", "symbols": ["dqstring"] },
           { "name": "simpleType", "symbols": ["simpleType$subexpression$1"], "postprocess": function (data) {
                   return new Fragment('literal', data[0][0]);
               }
           },
           { "name": "simpleType$subexpression$2$string$1", "symbols": [{ "literal": "a" }, { "literal": "n" }, { "literal": "y" }], "postprocess": function (d) { return d.join(''); } },
           { "name": "simpleType$subexpression$2", "symbols": ["simpleType$subexpression$2$string$1"] },
           { "name": "simpleType$subexpression$2$string$2", "symbols": [{ "literal": "b" }, { "literal": "o" }, { "literal": "o" }, { "literal": "l" }], "postprocess": function (d) { return d.join(''); } },
           { "name": "simpleType$subexpression$2", "symbols": ["simpleType$subexpression$2$string$2"] },
           { "name": "simpleType$subexpression$2$string$3", "symbols": [{ "literal": "c" }, { "literal": "h" }, { "literal": "a" }, { "literal": "r" }], "postprocess": function (d) { return d.join(''); } },
           { "name": "simpleType$subexpression$2", "symbols": ["simpleType$subexpression$2$string$3"] },
           { "name": "simpleType$subexpression$2$string$4", "symbols": [{ "literal": "f" }, { "literal": "l" }, { "literal": "o" }, { "literal": "a" }, { "literal": "t" }], "postprocess": function (d) { return d.join(''); } },
           { "name": "simpleType$subexpression$2", "symbols": ["simpleType$subexpression$2$string$4"] },
           { "name": "simpleType$subexpression$2$string$5", "symbols": [{ "literal": "i" }, { "literal": "n" }, { "literal": "t" }], "postprocess": function (d) { return d.join(''); } },
           { "name": "simpleType$subexpression$2", "symbols": ["simpleType$subexpression$2$string$5"] },
           { "name": "simpleType$subexpression$2$string$6", "symbols": [{ "literal": "s" }, { "literal": "t" }, { "literal": "r" }, { "literal": "i" }, { "literal": "n" }, { "literal": "g" }], "postprocess": function (d) { return d.join(''); } },
           { "name": "simpleType$subexpression$2", "symbols": ["simpleType$subexpression$2$string$6"] },
           { "name": "simpleType$subexpression$2$string$7", "symbols": [{ "literal": "v" }, { "literal": "o" }, { "literal": "i" }, { "literal": "d" }], "postprocess": function (d) { return d.join(''); } },
           { "name": "simpleType$subexpression$2", "symbols": ["simpleType$subexpression$2$string$7"] },
           { "name": "simpleType", "symbols": ["simpleType$subexpression$2"], "postprocess": function (data) {
                   return new Fragment('primitive', data[0][0]);
               }
           },
           { "name": "simpleType", "symbols": ["genericName"], "postprocess": function (data) { return new Fragment('generic', { name: data[0] }); } },
           { "name": "simpleType$string$1", "symbols": [{ "literal": "e" }, { "literal": "x" }, { "literal": "t" }, { "literal": "e" }, { "literal": "n" }, { "literal": "d" }, { "literal": "s" }], "postprocess": function (d) { return d.join(''); } },
           { "name": "simpleType", "symbols": ["genericName", "_", "simpleType$string$1", "_", "nullable"], "postprocess": function (data) {
                   return new Fragment('generic', { name: data[0], extends: data[4] });
               }
           },
           { "name": "genericName$ebnf$1", "symbols": [] },
           { "name": "genericName$ebnf$1", "symbols": ["genericName$ebnf$1", /[a-zA-Z0-9_]/], "postprocess": function (d) { return d[0].concat([d[1]]); } },
           { "name": "genericName", "symbols": [/[A-Z_]/, "genericName$ebnf$1"], "postprocess": function (data) { return "" + data[0] + data[1].join(''); } }
       ];
       exports.ParserStart = "grammar";

       });

       unwrapExports(grammar);
       var grammar_1 = grammar.Lexer;
       var grammar_2 = grammar.ParserRules;
       var grammar_3 = grammar.ParserStart;

       var utils = createCommonjsModule(function (module, exports) {
       Object.defineProperty(exports, "__esModule", { value: true });
       exports.convertNull = function (value, removeUndefinedFields) {
           if (value === undefined || value === null)
               return null;
           if (Array.isArray(value)) {
               return value.map(function (currentValue) {
                   return exports.convertNull(currentValue, removeUndefinedFields);
               });
           }
           if (typeof value === 'object') {
               var res_1 = {};
               Object.keys(value).forEach(function (key) {
                   var currentValue = value[key];
                   if (!removeUndefinedFields || currentValue !== undefined) {
                       res_1[key] = exports.convertNull(currentValue, removeUndefinedFields);
                   }
               });
               return res_1;
           }
           return value;
       };
       exports.isNullable = function (_a) {
           var type = _a.type, data = _a.data;
           switch (type) {
               case 'nullable':
                   return true;
               case 'literal':
                   return data === null;
               case 'named':
                   return exports.isNullable(data.type);
               case 'intersection':
                   return exports.isNullable(data.type) && exports.isNullable(data.type2);
               case 'union':
                   return exports.isNullable(data.type) || exports.isNullable(data.type2);
           }
           return false;
       };

       });

       unwrapExports(utils);
       var utils_1 = utils.convertNull;
       var utils_2 = utils.isNullable;

       var match_1 = createCommonjsModule(function (module, exports) {
       var __assign = (commonjsGlobal && commonjsGlobal.__assign) || Object.assign || function(t) {
           for (var s, i = 1, n = arguments.length; i < n; i++) {
               s = arguments[i];
               for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                   t[p] = s[p];
           }
           return t;
       };
       Object.defineProperty(exports, "__esModule", { value: true });



       var nullableAny = new grammar.default('nullable', new grammar.default('primitive', 'any'));
       var match = function (receivingType, receivedType, genericsMap, context) {
           if (context === void 0) { context = { readonlyGenerics: true }; }
           var data = receivingType.data, type = receivingType.type;
           var data2 = receivedType.data, type2 = receivedType.type;
           if (type2 === 'nullable') {
               if (data2.type === 'union') {
                   var subData = data2.data;
                   return match(receivingType, new grammar.default('nullable', subData.type), genericsMap, context)
                       && match(receivingType, new grammar.default('nullable', subData.type2), genericsMap, context);
               }
               else if (data2.type === 'intersection') {
                   var subData = data2.data;
                   return match(receivingType, new grammar.default('nullable', subData.type), genericsMap, context)
                       || match(receivingType, new grammar.default('nullable', subData.type2), genericsMap, context);
               }
           }
           else if (type2 === 'union') {
               return match(receivingType, data2.type, genericsMap, context)
                   && match(receivingType, data2.type2, genericsMap, context);
           }
           switch (type) {
               case 'primitive':
                   if (data === 'any'
                       && !(type2 === 'literal' && data2 === null)
                       && type2 !== 'generic'
                       && type2 !== 'named'
                       && type2 !== 'nullable'
                       && type2 !== 'intersection')
                       return true;
                   break;
               case 'generic':
                   if (genericsMap) {
                       var generic = genericsMap[data.name];
                       if (context.readonlyGenerics) {
                           if (generic)
                               return match(generic, receivedType, genericsMap, context);
                       }
                       else {
                           if (data.extends
                               && !match(data.extends, receivedType, genericsMap, context))
                               return false;
                           if (generic) {
                               if (!match(generic, receivedType, genericsMap, context)) {
                                   genericsMap[data.name] = new grammar.default('union', {
                                       type: generic,
                                       type2: receivedType,
                                   });
                               }
                           }
                           else {
                               genericsMap[data.name] = receivedType;
                           }
                           return true;
                       }
                   }
                   return !data.extends || match(data.extends, receivedType, genericsMap, context);
               case 'nullable':
                   return match(data, receivedType, genericsMap, __assign({}, context, { nullable: true }));
               case 'intersection':
                   return match(data.type, receivedType, genericsMap, context)
                       && match(data.type2, receivedType, genericsMap, context);
               case 'union':
                   var newContext = utils.isNullable(data.type) || utils.isNullable(data.type2) ? __assign({}, context, { nullable: true }) : context;
                   return match(data.type, receivedType, genericsMap, newContext)
                       || match(data.type2, receivedType, genericsMap, newContext);
           }
           switch (type2) {
               case 'literal':
                   return type === type2 ? data === data2
                       : data2 === null && context.nullable
                           || check_1.default(receivingType, data2, genericsMap);
               case 'primitive':
                   return type === type2 && data === data2;
               case 'generic':
                   return data2.extends ? match(receivingType, data2.extends, genericsMap, context)
                       : match(receivingType, nullableAny, genericsMap, context);
               case 'tuple':
                   return type === type2
                       && (data === data2
                           || data && data2 && data.length === data2.length &&
                               !~data.findIndex(function (valueType, index) {
                                   var valueType2 = data2[index];
                                   return !(valueType2 && match(valueType, valueType2));
                               }));
               case 'array':
                   return type === type2
                       && data.size === data2.size
                       && match(data.type, data2.type, genericsMap);
               case 'list':
                   return type === type2
                       && match(data, data2, genericsMap);
               case 'struct':
                   return type === type2
                       && (data === null
                           || data2 !== null && !~Object.keys(data).findIndex(function (key) {
                               var pair = data[key];
                               var pair2 = data2[key];
                               return !(pair2 ?
                                   (pair.optional || !pair2.optional)
                                       && match(pair.type, pair2.type, genericsMap, context)
                                   : pair.optional);
                           }));
               case 'map':
                   return type === type2
                       && match(data.keyType, data2.keyType, genericsMap)
                       && match(data.type, data2.type, genericsMap);
               case 'named':
                   return type === type2 ?
                       (data.name === data2.name
                           && (data.type === data2.type
                               || data.type && data2.type && match(data.type, data2.type, genericsMap, context)))
                       : match(receivingType, data2.type, genericsMap, context);
               case 'nullable':
                   return Boolean(context.nullable
                       && match(receivingType, data2, genericsMap, context));
               case 'intersection': {
                   var newContext = context;
                   if (!context.nullable) {
                       var null1 = utils.isNullable(data2.type);
                       var null2 = utils.isNullable(data2.type2);
                       if (!(null1 && null2) && (null1 || null2))
                           newContext = __assign({}, context, { nullable: true });
                   }
                   return match(receivingType, data2.type, genericsMap, newContext)
                       || match(receivingType, data2.type2, genericsMap, newContext);
               }
           }
           return false;
       };
       exports.default = match;

       });

       unwrapExports(match_1);

       var infer_1 = createCommonjsModule(function (module, exports) {
       Object.defineProperty(exports, "__esModule", { value: true });


       var infer = function (value) {
           if (value === undefined)
               return new grammar.default('primitive', 'void');
           if (value === null)
               return new grammar.default('literal', null);
           switch (typeof value) {
               case 'boolean':
                   return new grammar.default('primitive', 'bool');
               case 'number':
                   return new grammar.default('primitive', 'float');
               case 'string':
                   return new grammar.default('primitive', 'string');
               case 'object':
                   if (Array.isArray(value)) {
                       var length_1 = value.length;
                       if (!length_1)
                           return new grammar.default('tuple', null);
                       var types = value.map(infer);
                       var firstType_1 = types[0];
                       if (~types.findIndex(function (type) {
                           return !(type.type === 'primitive' && type.data === 'void' || match_1.default(firstType_1, type));
                       })) {
                           return new grammar.default('tuple', types);
                       }
                       return new grammar.default('array', { type: firstType_1, size: length_1 });
                   }
                   var keys = Object.keys(value);
                   if (!keys.length)
                       return new grammar.default('struct', null);
                   var object_1 = {};
                   keys.forEach(function (key) {
                       object_1[key] = { type: infer(value[key]) };
                   });
                   return new grammar.default('struct', object_1);
           }
           return new grammar.default('primitive', 'any');
       };
       exports.default = infer;

       });

       unwrapExports(infer_1);

       var nearley = createCommonjsModule(function (module) {
       (function(root, factory) {
           if ( module.exports) {
               module.exports = factory();
           } else {
               root.nearley = factory();
           }
       }(commonjsGlobal, function() {

           function Rule(name, symbols, postprocess) {
               this.id = ++Rule.highestId;
               this.name = name;
               this.symbols = symbols;        // a list of literal | regex class | nonterminal
               this.postprocess = postprocess;
               return this;
           }
           Rule.highestId = 0;

           Rule.prototype.toString = function(withCursorAt) {
               var symbolSequence = (typeof withCursorAt === "undefined")
                                    ? this.symbols.map(getSymbolShortDisplay).join(' ')
                                    : (   this.symbols.slice(0, withCursorAt).map(getSymbolShortDisplay).join(' ')
                                        + " ● "
                                        + this.symbols.slice(withCursorAt).map(getSymbolShortDisplay).join(' ')     );
               return this.name + " → " + symbolSequence;
           };


           // a State is a rule at a position from a given starting point in the input stream (reference)
           function State(rule, dot, reference, wantedBy) {
               this.rule = rule;
               this.dot = dot;
               this.reference = reference;
               this.data = [];
               this.wantedBy = wantedBy;
               this.isComplete = this.dot === rule.symbols.length;
           }

           State.prototype.toString = function() {
               return "{" + this.rule.toString(this.dot) + "}, from: " + (this.reference || 0);
           };

           State.prototype.nextState = function(child) {
               var state = new State(this.rule, this.dot + 1, this.reference, this.wantedBy);
               state.left = this;
               state.right = child;
               if (state.isComplete) {
                   state.data = state.build();
                   // Having right set here will prevent the right state and its children
                   // form being garbage collected
                   state.right = undefined;
               }
               return state;
           };

           State.prototype.build = function() {
               var children = [];
               var node = this;
               do {
                   children.push(node.right.data);
                   node = node.left;
               } while (node.left);
               children.reverse();
               return children;
           };

           State.prototype.finish = function() {
               if (this.rule.postprocess) {
                   this.data = this.rule.postprocess(this.data, this.reference, Parser.fail);
               }
           };


           function Column(grammar, index) {
               this.grammar = grammar;
               this.index = index;
               this.states = [];
               this.wants = {}; // states indexed by the non-terminal they expect
               this.scannable = []; // list of states that expect a token
               this.completed = {}; // states that are nullable
           }


           Column.prototype.process = function(nextColumn) {
               var states = this.states;
               var wants = this.wants;
               var completed = this.completed;

               for (var w = 0; w < states.length; w++) { // nb. we push() during iteration
                   var state = states[w];

                   if (state.isComplete) {
                       state.finish();
                       if (state.data !== Parser.fail) {
                           // complete
                           var wantedBy = state.wantedBy;
                           for (var i = wantedBy.length; i--; ) { // this line is hot
                               var left = wantedBy[i];
                               this.complete(left, state);
                           }

                           // special-case nullables
                           if (state.reference === this.index) {
                               // make sure future predictors of this rule get completed.
                               var exp = state.rule.name;
                               (this.completed[exp] = this.completed[exp] || []).push(state);
                           }
                       }

                   } else {
                       // queue scannable states
                       var exp = state.rule.symbols[state.dot];
                       if (typeof exp !== 'string') {
                           this.scannable.push(state);
                           continue;
                       }

                       // predict
                       if (wants[exp]) {
                           wants[exp].push(state);

                           if (completed.hasOwnProperty(exp)) {
                               var nulls = completed[exp];
                               for (var i = 0; i < nulls.length; i++) {
                                   var right = nulls[i];
                                   this.complete(state, right);
                               }
                           }
                       } else {
                           wants[exp] = [state];
                           this.predict(exp);
                       }
                   }
               }
           };

           Column.prototype.predict = function(exp) {
               var rules = this.grammar.byName[exp] || [];

               for (var i = 0; i < rules.length; i++) {
                   var r = rules[i];
                   var wantedBy = this.wants[exp];
                   var s = new State(r, 0, this.index, wantedBy);
                   this.states.push(s);
               }
           };

           Column.prototype.complete = function(left, right) {
               var copy = left.nextState(right);
               this.states.push(copy);
           };


           function Grammar(rules, start) {
               this.rules = rules;
               this.start = start || this.rules[0].name;
               var byName = this.byName = {};
               this.rules.forEach(function(rule) {
                   if (!byName.hasOwnProperty(rule.name)) {
                       byName[rule.name] = [];
                   }
                   byName[rule.name].push(rule);
               });
           }

           // So we can allow passing (rules, start) directly to Parser for backwards compatibility
           Grammar.fromCompiled = function(rules, start) {
               var lexer = rules.Lexer;
               if (rules.ParserStart) {
                 start = rules.ParserStart;
                 rules = rules.ParserRules;
               }
               var rules = rules.map(function (r) { return (new Rule(r.name, r.symbols, r.postprocess)); });
               var g = new Grammar(rules, start);
               g.lexer = lexer; // nb. storing lexer on Grammar is iffy, but unavoidable
               return g;
           };


           function StreamLexer() {
             this.reset("");
           }

           StreamLexer.prototype.reset = function(data, state) {
               this.buffer = data;
               this.index = 0;
               this.line = state ? state.line : 1;
               this.lastLineBreak = state ? -state.col : 0;
           };

           StreamLexer.prototype.next = function() {
               if (this.index < this.buffer.length) {
                   var ch = this.buffer[this.index++];
                   if (ch === '\n') {
                     this.line += 1;
                     this.lastLineBreak = this.index;
                   }
                   return {value: ch};
               }
           };

           StreamLexer.prototype.save = function() {
             return {
               line: this.line,
               col: this.index - this.lastLineBreak,
             }
           };

           StreamLexer.prototype.formatError = function(token, message) {
               // nb. this gets called after consuming the offending token,
               // so the culprit is index-1
               var buffer = this.buffer;
               if (typeof buffer === 'string') {
                   var lines = buffer
                       .split("\n")
                       .slice(
                           Math.max(0, this.line - 5), 
                           this.line
                       );

                   var nextLineBreak = buffer.indexOf('\n', this.index);
                   if (nextLineBreak === -1) nextLineBreak = buffer.length;
                   var col = this.index - this.lastLineBreak;
                   var lastLineDigits = String(this.line).length;
                   message += " at line " + this.line + " col " + col + ":\n\n";
                   message += lines
                       .map(function(line, i) {
                           return pad(this.line - lines.length + i + 1, lastLineDigits) + " " + line;
                       }, this)
                       .join("\n");
                   message += "\n" + pad("", lastLineDigits + col) + "^\n";
                   return message;
               } else {
                   return message + " at index " + (this.index - 1);
               }

               function pad(n, length) {
                   var s = String(n);
                   return Array(length - s.length + 1).join(" ") + s;
               }
           };

           function Parser(rules, start, options) {
               if (rules instanceof Grammar) {
                   var grammar = rules;
                   var options = start;
               } else {
                   var grammar = Grammar.fromCompiled(rules, start);
               }
               this.grammar = grammar;

               // Read options
               this.options = {
                   keepHistory: false,
                   lexer: grammar.lexer || new StreamLexer,
               };
               for (var key in (options || {})) {
                   this.options[key] = options[key];
               }

               // Setup lexer
               this.lexer = this.options.lexer;
               this.lexerState = undefined;

               // Setup a table
               var column = new Column(grammar, 0);
               var table = this.table = [column];

               // I could be expecting anything.
               column.wants[grammar.start] = [];
               column.predict(grammar.start);
               // TODO what if start rule is nullable?
               column.process();
               this.current = 0; // token index
           }

           // create a reserved token for indicating a parse fail
           Parser.fail = {};

           Parser.prototype.feed = function(chunk) {
               var lexer = this.lexer;
               lexer.reset(chunk, this.lexerState);

               var token;
               while (true) {
                   try {
                       token = lexer.next();
                       if (!token) {
                           break;
                       }
                   } catch (e) {
                       // Create the next column so that the error reporter
                       // can display the correctly predicted states.
                       var nextColumn = new Column(this.grammar, this.current + 1);
                       this.table.push(nextColumn);
                       var err = new Error(this.reportLexerError(e));
                       err.offset = this.current;
                       err.token = e.token;
                       throw err;
                   }
                   // We add new states to table[current+1]
                   var column = this.table[this.current];

                   // GC unused states
                   if (!this.options.keepHistory) {
                       delete this.table[this.current - 1];
                   }

                   var n = this.current + 1;
                   var nextColumn = new Column(this.grammar, n);
                   this.table.push(nextColumn);

                   // Advance all tokens that expect the symbol
                   var literal = token.text !== undefined ? token.text : token.value;
                   var value = lexer.constructor === StreamLexer ? token.value : token;
                   var scannable = column.scannable;
                   for (var w = scannable.length; w--; ) {
                       var state = scannable[w];
                       var expect = state.rule.symbols[state.dot];
                       // Try to consume the token
                       // either regex or literal
                       if (expect.test ? expect.test(value) :
                           expect.type ? expect.type === token.type
                                       : expect.literal === literal) {
                           // Add it
                           var next = state.nextState({data: value, token: token, isToken: true, reference: n - 1});
                           nextColumn.states.push(next);
                       }
                   }

                   // Next, for each of the rules, we either
                   // (a) complete it, and try to see if the reference row expected that
                   //     rule
                   // (b) predict the next nonterminal it expects by adding that
                   //     nonterminal's start state
                   // To prevent duplication, we also keep track of rules we have already
                   // added

                   nextColumn.process();

                   // If needed, throw an error:
                   if (nextColumn.states.length === 0) {
                       // No states at all! This is not good.
                       var err = new Error(this.reportError(token));
                       err.offset = this.current;
                       err.token = token;
                       throw err;
                   }

                   // maybe save lexer state
                   if (this.options.keepHistory) {
                     column.lexerState = lexer.save();
                   }

                   this.current++;
               }
               if (column) {
                 this.lexerState = lexer.save();
               }

               // Incrementally keep track of results
               this.results = this.finish();

               // Allow chaining, for whatever it's worth
               return this;
           };

           Parser.prototype.reportLexerError = function(lexerError) {
               var tokenDisplay, lexerMessage;
               // Planning to add a token property to moo's thrown error
               // even on erroring tokens to be used in error display below
               var token = lexerError.token;
               if (token) {
                   tokenDisplay = "input " + JSON.stringify(token.text[0]) + " (lexer error)";
                   lexerMessage = this.lexer.formatError(token, "Syntax error");
               } else {
                   tokenDisplay = "input (lexer error)";
                   lexerMessage = lexerError.message;
               }
               return this.reportErrorCommon(lexerMessage, tokenDisplay);
           };

           Parser.prototype.reportError = function(token) {
               var tokenDisplay = (token.type ? token.type + " token: " : "") + JSON.stringify(token.value !== undefined ? token.value : token);
               var lexerMessage = this.lexer.formatError(token, "Syntax error");
               return this.reportErrorCommon(lexerMessage, tokenDisplay);
           };

           Parser.prototype.reportErrorCommon = function(lexerMessage, tokenDisplay) {
               var lines = [];
               lines.push(lexerMessage);
               var lastColumnIndex = this.table.length - 2;
               var lastColumn = this.table[lastColumnIndex];
               var expectantStates = lastColumn.states
                   .filter(function(state) {
                       var nextSymbol = state.rule.symbols[state.dot];
                       return nextSymbol && typeof nextSymbol !== "string";
                   });

               if (expectantStates.length === 0) {
                   lines.push('Unexpected ' + tokenDisplay + '. I did not expect any more input. Here is the state of my parse table:\n');
                   this.displayStateStack(lastColumn.states, lines);
               } else {
                   lines.push('Unexpected ' + tokenDisplay + '. Instead, I was expecting to see one of the following:\n');
                   // Display a "state stack" for each expectant state
                   // - which shows you how this state came to be, step by step.
                   // If there is more than one derivation, we only display the first one.
                   var stateStacks = expectantStates
                       .map(function(state) {
                           return this.buildFirstStateStack(state, []) || [state];
                       }, this);
                   // Display each state that is expecting a terminal symbol next.
                   stateStacks.forEach(function(stateStack) {
                       var state = stateStack[0];
                       var nextSymbol = state.rule.symbols[state.dot];
                       var symbolDisplay = this.getSymbolDisplay(nextSymbol);
                       lines.push('A ' + symbolDisplay + ' based on:');
                       this.displayStateStack(stateStack, lines);
                   }, this);
               }
               lines.push("");
               return lines.join("\n");
           };
           
           Parser.prototype.displayStateStack = function(stateStack, lines) {
               var lastDisplay;
               var sameDisplayCount = 0;
               for (var j = 0; j < stateStack.length; j++) {
                   var state = stateStack[j];
                   var display = state.rule.toString(state.dot);
                   if (display === lastDisplay) {
                       sameDisplayCount++;
                   } else {
                       if (sameDisplayCount > 0) {
                           lines.push('    ^ ' + sameDisplayCount + ' more lines identical to this');
                       }
                       sameDisplayCount = 0;
                       lines.push('    ' + display);
                   }
                   lastDisplay = display;
               }
           };

           Parser.prototype.getSymbolDisplay = function(symbol) {
               return getSymbolLongDisplay(symbol);
           };

           /*
           Builds a the first state stack. You can think of a state stack as the call stack
           of the recursive-descent parser which the Nearley parse algorithm simulates.
           A state stack is represented as an array of state objects. Within a
           state stack, the first item of the array will be the starting
           state, with each successive item in the array going further back into history.

           This function needs to be given a starting state and an empty array representing
           the visited states, and it returns an single state stack.

           */
           Parser.prototype.buildFirstStateStack = function(state, visited) {
               if (visited.indexOf(state) !== -1) {
                   // Found cycle, return null
                   // to eliminate this path from the results, because
                   // we don't know how to display it meaningfully
                   return null;
               }
               if (state.wantedBy.length === 0) {
                   return [state];
               }
               var prevState = state.wantedBy[0];
               var childVisited = [state].concat(visited);
               var childResult = this.buildFirstStateStack(prevState, childVisited);
               if (childResult === null) {
                   return null;
               }
               return [state].concat(childResult);
           };

           Parser.prototype.save = function() {
               var column = this.table[this.current];
               column.lexerState = this.lexerState;
               return column;
           };

           Parser.prototype.restore = function(column) {
               var index = column.index;
               this.current = index;
               this.table[index] = column;
               this.table.splice(index + 1);
               this.lexerState = column.lexerState;

               // Incrementally keep track of results
               this.results = this.finish();
           };

           // nb. deprecated: use save/restore instead!
           Parser.prototype.rewind = function(index) {
               if (!this.options.keepHistory) {
                   throw new Error('set option `keepHistory` to enable rewinding')
               }
               // nb. recall column (table) indicies fall between token indicies.
               //        col 0   --   token 0   --   col 1
               this.restore(this.table[index]);
           };

           Parser.prototype.finish = function() {
               // Return the possible parsings
               var considerations = [];
               var start = this.grammar.start;
               var column = this.table[this.table.length - 1];
               column.states.forEach(function (t) {
                   if (t.rule.name === start
                           && t.dot === t.rule.symbols.length
                           && t.reference === 0
                           && t.data !== Parser.fail) {
                       considerations.push(t);
                   }
               });
               return considerations.map(function(c) {return c.data; });
           };

           function getSymbolLongDisplay(symbol) {
               var type = typeof symbol;
               if (type === "string") {
                   return symbol;
               } else if (type === "object") {
                   if (symbol.literal) {
                       return JSON.stringify(symbol.literal);
                   } else if (symbol instanceof RegExp) {
                       return 'character matching ' + symbol;
                   } else if (symbol.type) {
                       return symbol.type + ' token';
                   } else if (symbol.test) {
                       return 'token matching ' + String(symbol.test);
                   } else {
                       throw new Error('Unknown symbol type: ' + symbol);
                   }
               }
           }

           function getSymbolShortDisplay(symbol) {
               var type = typeof symbol;
               if (type === "string") {
                   return symbol;
               } else if (type === "object") {
                   if (symbol.literal) {
                       return JSON.stringify(symbol.literal);
                   } else if (symbol instanceof RegExp) {
                       return symbol.toString();
                   } else if (symbol.type) {
                       return '%' + symbol.type;
                   } else if (symbol.test) {
                       return '<' + String(symbol.test) + '>';
                   } else {
                       throw new Error('Unknown symbol type: ' + symbol);
                   }
               }
           }

           return {
               Parser: Parser,
               Grammar: Grammar,
               Rule: Rule,
           };

       }));
       });

       var parse = createCommonjsModule(function (module, exports) {
       Object.defineProperty(exports, "__esModule", { value: true });


       var parser = new nearley.Parser(grammar.ParserRules, grammar.ParserStart);
       var initialParserState = parser.save();
       var parseType = function (type) {
           var result = parser.feed(type).results[0];
           if (process.env.NODE_ENV === 'test' && parser.results.length !== 1) {
               throw new Error("Deterministic parse failed: " + JSON.stringify(parser.results));
           }
           if (!parser.results.length)
               throw new Error('Invalid input string');
           parser.restore(initialParserState);
           return result;
       };
       exports.default = parseType;

       });

       unwrapExports(parse);

       var print_1 = createCommonjsModule(function (module, exports) {
       Object.defineProperty(exports, "__esModule", { value: true });
       exports.ensureParentheses = function (typeAST) {
           var type = typeAST.type;
           return type === 'union' || type === 'intersection' || type === 'nullable' ?
               "(" + print(typeAST) + ")"
               : print(typeAST);
       };
       var print = function (_a) {
           var type = _a.type, data = _a.data;
           switch (type) {
               case 'literal':
                   return JSON.stringify(data);
               case 'primitive':
                   return data;
               case 'generic': {
                   var extendsType = data.extends;
                   return "" + data.name + (extendsType ? " extends " + exports.ensureParentheses(extendsType) : '');
               }
               case 'tuple':
                   return data ? "[" + data.map(print).join(', ') + "]" : '[]';
               case 'array':
                   return exports.ensureParentheses(data.type) + "[" + data.size + "]";
               case 'list':
                   return exports.ensureParentheses(data) + "[]";
               case 'struct':
                   return data ? "{ " + Object.keys(data).map(function (key) {
                       return "" + key + (data[key].optional ? '?' : '') + ": " + print(data[key].type);
                   }).join(', ') + " }" : '{}';
               case 'map':
                   return "{ [" + print(data.keyType) + "]: " + print(data.type) + " }";
               case 'named':
                   return data.name + "{" + (data.type ? print(data.type) : '') + "}";
               case 'nullable':
                   return "?" + exports.ensureParentheses(data);
               case 'intersection':
                   return print(data.type) + " & " + print(data.type2);
               case 'union':
                   return print(data.type) + " | " + print(data.type2);
           }
           return '?any';
       };
       exports.default = print;

       });

       unwrapExports(print_1);
       var print_2 = print_1.ensureParentheses;

       var types = createCommonjsModule(function (module, exports) {
       Object.defineProperty(exports, "__esModule", { value: true });

       exports.fragments = grammar;

       });

       unwrapExports(types);
       var types_1 = types.fragments;

       var fbpTypes = createCommonjsModule(function (module, exports) {
       Object.defineProperty(exports, "__esModule", { value: true });

       exports.check = check_1.default;

       exports.infer = infer_1.default;

       exports.match = match_1.default;

       exports.parse = parse.default;

       exports.print = print_1.default;

       exports.types = types;

       exports.convertNull = utils.convertNull;
       exports.isNullable = utils.isNullable;

       });

       unwrapExports(fbpTypes);
       var fbpTypes_1 = fbpTypes.check;
       var fbpTypes_2 = fbpTypes.infer;
       var fbpTypes_3 = fbpTypes.match;
       var fbpTypes_4 = fbpTypes.parse;
       var fbpTypes_5 = fbpTypes.print;
       var fbpTypes_6 = fbpTypes.types;
       var fbpTypes_7 = fbpTypes.convertNull;
       var fbpTypes_8 = fbpTypes.isNullable;

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
                       if (chunk0 !== null && /^[a-zA-Z0-9\_\-\+\=\/\~\!\@\$\%\^\&\*\?\<\>]/.test(chunk0)) {
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
                               this._expected.push('[a-zA-Z0-9\\_\\-\\+\\=\\/\\~\\!\\@\\$\\%\\^\\&\\*\\?\\<\\>]');
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
               if (is(Array, pl)) {
                   return pl.map(function (i) {
                       if (is(String, i)) {
                           if (i === 'true')
                               return true;
                           if (i === 'false')
                               return false;
                           var cbaN = cbaNumber(i); // cbaNumber(strip_quotes(i));
                           return is(String, cbaN) ? strip_quotes(i) : cbaN;
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

       function __spreadArrays$1() {
           for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
           for (var r = Array(s), k = 0, i = 0; i < il; i++)
               for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                   r[k] = a[j];
           return r;
       }

       var toNumOrNull = function (u) {
           return is(Number, u) ? u : null;
       };
       var toArrOrNull = function (u) {
           return is(Array, u) ? u : null;
       };
       var toArrOfStrOrNull = function (u) {
           return is(Array, u) ? u : null;
       };
       var toStringOrNull = function (u) {
           return is(String, u) ? u : null;
       };
       var toPLOrNull = function (u) {
           return is(Array, u) ? u : null;
       };
       var toBoolOrNull = function (u) {
           return is(Boolean, u) ? u : null;
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
           if (is(Object, u) !== null) {
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
           if (is(String, w)) {
               var newW = toWordOrNull(propOr(w, w, localWD));
               return newW !== null ? newW : w;
           }
           var subList = toPLOrNull(w);
           if (is(Array, subList)) {
               return subInWD(localWD, __spreadArrays$1(subList));
           }
           return w;
       }; };
       var subInWD = function (localWD, words) {
           var resolveWord = consReslover(localWD);
           return map(resolveWord, words);
       };
       var coreWords = {
           'words': {
               sig: [[], [{ type: 'list' }]],
               compose: function (s) {
                   s.push(introspectWords());
                   return [s];
               }
           },
           // introspectWord
           'word': {
               sig: [[{ type: 'list<string>)' }], [{ type: 'record' }]],
               compose: function (s) {
                   var _a;
                   var phrase = toArrOfStrOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   var wordName = toStringOrNull(phrase[0]);
                   if (wordName) {
                       s.push(introspectWord(wordName));
                       return [s];
                   }
                   return [null];
               }
           },
           'dup': {
               sig: [[{ type: 'A', use: 'observe' }], [{ type: 'A' }]],
               compose: function (s) { s.push(s[s.length - 1]); return [s]; }
           },
           //    'dup': s => { s.push(JSON.parse(JSON.stringify(s[s.length - 1]))); return [s]; },
           'swap': {
               sig: [[{ type: 'A' }, { type: 'B' }], [{ type: 'B' }, { type: 'A' }]],
               compose: function (s) {
                   var _a, _b;
                   var top = (_a = s) === null || _a === void 0 ? void 0 : _a.pop();
                   var under = (_b = s) === null || _b === void 0 ? void 0 : _b.pop();
                   s.push(top);
                   s.push(under);
                   return [s];
               }
           },
           'drop': {
               sig: [[{ type: 'any' }], []],
               compose: function (s) { var _a; (_a = s) === null || _a === void 0 ? void 0 : _a.pop(); return [s]; }
           },
           'round': {
               sig: [[{ type: 'number' }, { type: 'number' }], [{ type: 'number' }]],
               compose: function (s) {
                   var _a, _b;
                   // const b = <number | null>toTypeOrNull<number | null>(s?.pop(), '(int | float)');
                   var b = toNumOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   var a = toNumOrNull((_b = s) === null || _b === void 0 ? void 0 : _b.pop());
                   if (a !== null && b !== null) {
                       s.push(index.round(a, b));
                       return [s];
                   }
                   return [null];
               }
           },
           '+': {
               sig: [[{ type: 'number' }, { type: 'number' }], [{ type: 'number' }]],
               compose: function (s) {
                   var _a, _b;
                   // const b = <number | null>toTypeOrNull<number | null>(s?.pop(), '(int | float)');
                   var b = toNumOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   var a = toNumOrNull((_b = s) === null || _b === void 0 ? void 0 : _b.pop());
                   if (a !== null && b !== null) {
                       s.push(index.plus(a, b));
                       return [s];
                   }
                   return [null];
               }
           },
           '-': {
               sig: [[{ type: 'number' }, { type: 'number' }], [{ type: 'number' }]],
               compose: function (s) {
                   var _a, _b;
                   var b = toNumOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   var a = toNumOrNull((_b = s) === null || _b === void 0 ? void 0 : _b.pop());
                   if (a !== null && b !== null) {
                       s.push(index.minus(a, b));
                       return [s];
                   }
                   return [null];
               }
           },
           '/': {
               sig: [[{ type: 'number' }, { type: 'number', gaurd: [0, '!='] }], [{ type: 'number' }]],
               compose: function (s) {
                   var _a, _b;
                   var b = toNumOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   var a = toNumOrNull((_b = s) === null || _b === void 0 ? void 0 : _b.pop());
                   if (a !== null && b !== null && b !== 0) {
                       s.push(index.divide(a, b));
                       return [s];
                   }
                   return [null];
               }
           },
           '%': {
               sig: [[{ type: 'number' }, { type: 'number', gaurd: [0, '!='] }], [{ type: 'number' }]],
               compose: function (s) {
                   var _a, _b;
                   var b = toNumOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   var a = toNumOrNull((_b = s) === null || _b === void 0 ? void 0 : _b.pop());
                   if (a !== null && b !== null && b !== 0) {
                       s.push(a % b);
                       return [s];
                   }
                   return [null];
               }
           },
           '*': {
               sig: [[{ type: 'number' }, { type: 'number' }], [{ type: 'number' }]],
               compose: function (s) {
                   var _a, _b;
                   var b = toNumOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   var a = toNumOrNull((_b = s) === null || _b === void 0 ? void 0 : _b.pop());
                   if (a !== null && b !== null) {
                       s.push(index.times(a, b));
                       return [s];
                   }
                   return [null];
               }
           },
           // bitwise on integers
           '&': {
               sig: [[{ type: 'number' }, { type: 'number' }], [{ type: 'number' }]],
               compose: function (s) {
                   var _a, _b;
                   var b = toNumOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   var a = toNumOrNull((_b = s) === null || _b === void 0 ? void 0 : _b.pop());
                   if (a !== null && b !== null) {
                       s.push(a & b);
                       return [s];
                   }
                   return [null];
               }
           },
           '|': {
               sig: [[{ type: 'number' }, { type: 'number' }], [{ type: 'number' }]],
               compose: function (s) {
                   var _a, _b;
                   var b = toNumOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   var a = toNumOrNull((_b = s) === null || _b === void 0 ? void 0 : _b.pop());
                   if (a !== null && b !== null) {
                       s.push(a | b);
                       return [s];
                   }
                   return [null];
               }
           },
           '^': {
               sig: [[{ type: 'number' }, { type: 'number' }], [{ type: 'number' }]],
               compose: function (s) {
                   var _a, _b;
                   var b = toNumOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   var a = toNumOrNull((_b = s) === null || _b === void 0 ? void 0 : _b.pop());
                   if (a !== null && b !== null) {
                       s.push(a ^ b);
                       return [s];
                   }
                   return [null];
               }
           },
           '~': {
               sig: [[{ type: 'number' }], [{ type: 'number' }]],
               compose: function (s) {
                   var _a;
                   var a = toNumOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   if (a !== null) {
                       s.push(~a);
                       return [s];
                   }
                   return [null];
               }
           },
           '&&': {
               sig: [[{ type: 'boolean' }, { type: 'boolean' }], [{ type: 'boolean' }]],
               compose: function (s) {
                   var _a, _b;
                   var b = toNumOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   var a = toNumOrNull((_b = s) === null || _b === void 0 ? void 0 : _b.pop());
                   if (a !== null && b !== null) {
                       s.push(a && b);
                       return [s];
                   }
                   return [null];
               }
           },
           '||': {
               sig: [[{ type: 'boolean' }, { type: 'boolean' }], [{ type: 'boolean' }]],
               compose: function (s) {
                   var _a, _b;
                   var b = toNumOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   var a = toNumOrNull((_b = s) === null || _b === void 0 ? void 0 : _b.pop());
                   if (a !== null && b !== null) {
                       s.push(a || b);
                       return [s];
                   }
                   return [null];
               }
           },
           '!': {
               sig: [[{ type: 'boolean' }], [{ type: 'boolean' }]],
               compose: function (s) {
                   var _a;
                   var a = toNumOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   if (a !== null) {
                       s.push(!a);
                       return [s];
                   }
                   return [null];
               }
           },
           // Math.E
           'E': {
               sig: [[], [{ type: 'number' }]],
               compose: function (s) {
                   s.push(Math.E);
                   return [s];
               }
           },
           // Math.LN10
           'LN10': {
               sig: [[], [{ type: 'number' }]],
               compose: function (s) {
                   s.push(Math.LN10);
                   return [s];
               }
           },
           // Math.LN2
           'LN2': {
               sig: [[], [{ type: 'number' }]],
               compose: function (s) {
                   s.push(Math.LN2);
                   return [s];
               }
           },
           // Math.LOG10E
           'LOG10E': {
               sig: [[], [{ type: 'number' }]],
               compose: function (s) {
                   s.push(Math.LOG10E);
                   return [s];
               }
           },
           // Math.LOG2E
           'LOG2E': {
               sig: [[], [{ type: 'number' }]],
               compose: function (s) {
                   s.push(Math.LOG2E);
                   return [s];
               }
           },
           // Math.PI
           'PI': {
               sig: [[], [{ type: 'number' }]],
               compose: function (s) {
                   s.push(Math.PI);
                   return [s];
               }
           },
           // Math.SQRT1_2
           'SQRT1_2': {
               sig: [[], [{ type: 'number' }]],
               compose: function (s) {
                   s.push(Math.SQRT1_2);
                   return [s];
               }
           },
           // Math.SQRT2
           'SQRT2': {
               sig: [[], [{ type: 'number' }]],
               compose: function (s) {
                   s.push(Math.SQRT2);
                   return [s];
               }
           },
           // Math.abs()
           'abs': {
               sig: [[{ type: 'number' }], [{ type: 'number' }]],
               compose: function (s) {
                   var _a;
                   var a = toNumOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   if (a !== null) {
                       s.push(Math.abs(a));
                       return [s];
                   }
                   return [null];
               }
           },
           // Math.acos()
           'acos': {
               sig: [[{ type: 'number' }], [{ type: 'number' }]],
               compose: function (s) {
                   var _a;
                   var a = toNumOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   if (a !== null) {
                       s.push(Math.acos(a));
                       return [s];
                   }
                   return [null];
               }
           },
           // Math.acosh()
           'acosh': {
               sig: [[{ type: 'number' }], [{ type: 'number' }]],
               compose: function (s) {
                   var _a;
                   var a = toNumOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   if (a !== null) {
                       s.push(Math.acosh(a));
                       return [s];
                   }
                   return [null];
               }
           },
           // Math.asin()
           'asin': {
               sig: [[{ type: 'number' }], [{ type: 'number' }]],
               compose: function (s) {
                   var _a;
                   var a = toNumOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   if (a !== null) {
                       s.push(Math.asin(a));
                       return [s];
                   }
                   return [null];
               }
           },
           // Math.asinh()
           'asinh': {
               sig: [[{ type: 'number' }], [{ type: 'number' }]],
               compose: function (s) {
                   var _a;
                   var a = toNumOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   if (a !== null) {
                       s.push(Math.asinh(a));
                       return [s];
                   }
                   return [null];
               }
           },
           // Math.atan()
           'atan': {
               sig: [[{ type: 'number' }], [{ type: 'number' }]],
               compose: function (s) {
                   var _a;
                   var a = toNumOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   if (a !== null) {
                       s.push(Math.atan(a));
                       return [s];
                   }
                   return [null];
               }
           },
           // Math.atan2()
           'atan2': {
               sig: [[{ type: 'number' }], [{ type: 'number' }]],
               compose: function (s) {
                   var _a, _b;
                   var a = toNumOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   var b = toNumOrNull((_b = s) === null || _b === void 0 ? void 0 : _b.pop());
                   if (a !== null && b !== null) {
                       s.push(Math.atan2(b, a));
                       return [s];
                   }
                   return [null];
               }
           },
           // Math.atanh()
           'atanh': {
               sig: [[{ type: 'number' }], [{ type: 'number' }]],
               compose: function (s) {
                   var _a;
                   var a = toNumOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   if (a !== null) {
                       s.push(Math.atanh(a));
                       return [s];
                   }
                   return [null];
               }
           },
           // Math.cbrt()
           'cbrt': {
               sig: [[{ type: 'number' }], [{ type: 'number' }]],
               compose: function (s) {
                   var _a;
                   var a = toNumOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   if (a !== null) {
                       s.push(Math.cbrt(a));
                       return [s];
                   }
                   return [null];
               }
           },
           // Math.ceil()
           'ceil': {
               sig: [[{ type: 'number' }], [{ type: 'number' }]],
               compose: function (s) {
                   var _a;
                   var a = toNumOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   if (a !== null) {
                       s.push(Math.ceil(a));
                       return [s];
                   }
                   return [null];
               }
           },
           // Math.cos()
           'cos': {
               sig: [[{ type: 'number' }], [{ type: 'number' }]],
               compose: function (s) {
                   var _a;
                   var a = toNumOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   if (a !== null) {
                       s.push(Math.cos(a));
                       return [s];
                   }
                   return [null];
               }
           },
           // Math.cosh()
           'cosh': {
               sig: [[{ type: 'number' }], [{ type: 'number' }]],
               compose: function (s) {
                   var _a;
                   var a = toNumOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   if (a !== null) {
                       s.push(Math.cosh(a));
                       return [s];
                   }
                   return [null];
               }
           },
           // Math.exp()
           'exp': {
               sig: [[{ type: 'number' }], [{ type: 'number' }]],
               compose: function (s) {
                   var _a;
                   var a = toNumOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   if (a !== null) {
                       s.push(Math.exp(a));
                       return [s];
                   }
                   return [null];
               }
           },
           // Math.expm1()
           'expm1': {
               sig: [[{ type: 'number' }], [{ type: 'number' }]],
               compose: function (s) {
                   var _a;
                   var a = toNumOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   if (a !== null) {
                       s.push(Math.expm1(a));
                       return [s];
                   }
                   return [null];
               }
           },
           // Math.floor()
           'floor': {
               sig: [[{ type: 'number' }], [{ type: 'number' }]],
               compose: function (s) {
                   var _a;
                   var a = toNumOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   if (a !== null) {
                       s.push(Math.floor(a));
                       return [s];
                   }
                   return [null];
               }
           },
           // Math.hypot()
           'hypot': {
               sig: [[{ type: 'number' }], [{ type: 'number' }]],
               compose: function (s) {
                   var _a;
                   var a = toNumOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   if (a !== null) {
                       s.push(Math.hypot(a));
                       return [s];
                   }
                   return [null];
               }
           },
           // Math.log()
           'log': {
               sig: [[{ type: 'number' }], [{ type: 'number' }]],
               compose: function (s) {
                   var _a;
                   var a = toNumOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   if (a !== null) {
                       s.push(Math.log(a));
                       return [s];
                   }
                   return [null];
               }
           },
           // Math.log10()
           'log10': {
               sig: [[{ type: 'number' }], [{ type: 'number' }]],
               compose: function (s) {
                   var _a;
                   var a = toNumOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   if (a !== null) {
                       s.push(Math.log10(a));
                       return [s];
                   }
                   return [null];
               }
           },
           // Math.log1p()
           'log1p': {
               sig: [[{ type: 'number' }], [{ type: 'number' }]],
               compose: function (s) {
                   var _a;
                   var a = toNumOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   if (a !== null) {
                       s.push(Math.log1p(a));
                       return [s];
                   }
                   return [null];
               }
           },
           // Math.log2()
           'log2': {
               sig: [[{ type: 'number' }], [{ type: 'number' }]],
               compose: function (s) {
                   var _a;
                   var a = toNumOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   if (a !== null) {
                       s.push(Math.log2(a));
                       return [s];
                   }
                   return [null];
               }
           },
           // Math.max()
           'max': {
               sig: [[{ type: 'number' }], [{ type: 'number' }]],
               compose: function (s) {
                   var _a;
                   var a = toNumOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   if (a !== null) {
                       s.push(Math.max(a));
                       return [s];
                   }
                   return [null];
               }
           },
           // Math.min()
           'min': {
               sig: [[{ type: 'number' }], [{ type: 'number' }]],
               compose: function (s) {
                   var _a;
                   var a = toNumOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   if (a !== null) {
                       s.push(Math.min(a));
                       return [s];
                   }
                   return [null];
               }
           },
           // Math.pow()
           'pow': {
               sig: [[{ type: 'number' }, { type: 'number' }], [{ type: 'number' }]],
               compose: function (s) {
                   var _a, _b;
                   var a = toNumOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   var b = toNumOrNull((_b = s) === null || _b === void 0 ? void 0 : _b.pop());
                   if (a !== null && b !== null) {
                       s.push(Math.pow(b, a));
                       return [s];
                   }
                   return [null];
               }
           },
           // Math.random()
           'random': {
               sig: [[], [{ type: 'number' }]],
               compose: function (s) {
                   s.push(Math.random());
                   return [s];
               }
           },
           // Math.sign()
           'sign': {
               sig: [[{ type: 'number' }], [{ type: 'number' }]],
               compose: function (s) {
                   var _a;
                   var a = toNumOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   if (a !== null) {
                       s.push(Math.sign(a));
                       return [s];
                   }
                   return [null];
               }
           },
           // Math.sin()
           'sin': {
               sig: [[{ type: 'number' }], [{ type: 'number' }]],
               compose: function (s) {
                   var _a;
                   var a = toNumOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   if (a !== null) {
                       s.push(Math.sin(a));
                       return [s];
                   }
                   return [null];
               }
           },
           // Math.sinh()
           'sinh': {
               sig: [[{ type: 'number' }], [{ type: 'number' }]],
               compose: function (s) {
                   var _a;
                   var a = toNumOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   if (a !== null) {
                       s.push(Math.sinh(a));
                       return [s];
                   }
                   return [null];
               }
           },
           // Math.sqrt()
           'sqrt': {
               sig: [[{ type: 'number' }], [{ type: 'number' }]],
               compose: function (s) {
                   var _a;
                   var a = toNumOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   if (a !== null) {
                       s.push(Math.sqrt(a));
                       return [s];
                   }
                   return [null];
               }
           },
           // Math.tan()
           'tan': {
               sig: [[{ type: 'number' }], [{ type: 'number' }]],
               compose: function (s) {
                   var _a;
                   var a = toNumOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   if (a !== null) {
                       s.push(Math.tan(a));
                       return [s];
                   }
                   return [null];
               }
           },
           // Math.tanh()
           'tanh': {
               sig: [[{ type: 'number' }], [{ type: 'number' }]],
               compose: function (s) {
                   var _a;
                   var a = toNumOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   if (a !== null) {
                       s.push(Math.tanh(a));
                       return [s];
                   }
                   return [null];
               }
           },
           // Math.trunc()
           'trunc': {
               sig: [[{ type: 'number' }], [{ type: 'number' }]],
               compose: function (s) {
                   var _a;
                   var a = toNumOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   if (a !== null) {
                       s.push(Math.trunc(a));
                       return [s];
                   }
                   return [null];
               }
           },
           'play': {
               sig: [[{ type: 'P extends (list<words>)', use: 'run!' }], [{ type: 'result(P)' }]],
               compose: function (s, pl) {
                   var _a;
                   var block = toPLOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   if (block) {
                       pl = block.concat(pl);
                   }
                   else {
                       pl.unshift(block);
                   }
                   return [s, pl];
               }
           },
           'pounce': {
               sig: [[{ type: 'Args extends (list<string>)', use: 'pop-each!' }, { type: 'P extends (list<words>)', use: 'run!' }], [{ type: 'result(P)' }]],
               compose: function (s, pl) {
                   var _a, _b;
                   var words = toPLOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   var argList = toArrOfStrOrNull((_b = s) === null || _b === void 0 ? void 0 : _b.pop());
                   if (words !== null && argList) {
                       var values = map(function () { var _a; return (_a = s) === null || _a === void 0 ? void 0 : _a.pop(); }, argList);
                       var localWD = zipObj(reverse(argList), values);
                       var newWords = toPLOrNull(subInWD(localWD, words));
                       if (newWords) {
                           pl = newWords.concat(pl);
                       }
                   }
                   return [s, pl];
               }
           },
           'dip': {
               sig: [[{ type: 'A' }, { type: 'list<word>', use: 'run' }], [{ type: 'run-result' }, { type: 'A' }]],
               compose: function (s, pl) {
                   var _a, _b;
                   var block = toPLOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   var item = (_b = s) === null || _b === void 0 ? void 0 : _b.pop();
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
               sig: [[{ type: 'a' }, { type: 'b' }, { type: 'list<word>', use: 'run' }], [{ type: 'run-result' }, { type: 'a' }, { type: 'b' }]],
               compose: function (s, pl) {
                   var _a, _b, _c;
                   var block = toPLOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   var item2 = (_b = s) === null || _b === void 0 ? void 0 : _b.pop();
                   pl = [item2].concat(pl);
                   var item1 = (_c = s) === null || _c === void 0 ? void 0 : _c.pop();
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
               sig: [[{ type: 'A' }, { type: 'B' }, { type: 'C' }], [{ type: 'C' }, { type: 'B' }, { type: 'A' }]],
               compose: ['swap', ['swap'], 'dip', 'swap']
           },
           'rollup': {
               sig: [[{ type: 'A' }, { type: 'B' }, { type: 'C' }], [{ type: 'C' }, { type: 'A' }, { type: 'B' }]],
               compose: ['swap', ['swap'], 'dip']
           },
           'rolldown': {
               sig: [[{ type: 'A' }, { type: 'B' }, { type: 'C' }], [{ type: 'B' }, { type: 'C' }, { type: 'A' }]],
               compose: [['swap'], 'dip', 'swap']
           },
           'if-else': {
               compose: function (s, pl) {
                   var _a, _b, _c;
                   var else_block = toPLOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   var then_block = toPLOrNull((_b = s) === null || _b === void 0 ? void 0 : _b.pop());
                   var condition = toBoolOrNull((_c = s) === null || _c === void 0 ? void 0 : _c.pop());
                   if (condition === null || then_block === null || else_block === null) {
                       return [null];
                   }
                   if (condition) {
                       if (is(Array, then_block)) {
                           pl = then_block.concat(pl);
                       }
                       else {
                           pl.unshift(then_block);
                       }
                   }
                   else {
                       if (is(Array, else_block)) {
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
               // expects: [{ desc: 'conditional', ofType: 'list' }, { desc: 'then clause', ofType: 'list' }, { desc: 'then clause', ofType: 'list' }], effects: [-3], tests: [], desc: 'conditionally play the first or second quotation',
               compose: [['play'], 'dip2', 'if-else']
           },
           '=': {
               compose: function (s) {
                   var _a;
                   var top = (_a = s) === null || _a === void 0 ? void 0 : _a.pop();
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
                   }
                   return [s];
               }
           },
           '==': {
               compose: function (s) {
                   var _a, _b;
                   var b = (_a = s) === null || _a === void 0 ? void 0 : _a.pop();
                   var a = (_b = s) === null || _b === void 0 ? void 0 : _b.pop();
                   var num_b = toNumOrNull(b);
                   var num_a = toNumOrNull(a);
                   if (num_a !== null && num_b !== null) {
                       s.push(num_a === num_b);
                   }
                   else {
                       var str_b = toStringOrNull(b);
                       var str_a = toStringOrNull(a);
                       if (str_a !== null && str_b !== null) {
                           s.push(str_a === str_b);
                       }
                   }
                   return [s];
               }
           },
           '!=': {
               compose: function (s) {
                   var _a, _b;
                   var b = toNumOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   var a = toNumOrNull((_b = s) === null || _b === void 0 ? void 0 : _b.pop());
                   if (a !== null && b !== null) {
                       s.push(a !== b);
                   }
                   return [s];
               }
           },
           '>': {
               compose: function (s) {
                   var _a, _b;
                   var b = toNumOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   var a = toNumOrNull((_b = s) === null || _b === void 0 ? void 0 : _b.pop());
                   if (a !== null && b !== null) {
                       s.push(a > b);
                   }
                   return [s];
               }
           },
           '<': {
               compose: function (s) {
                   var _a, _b;
                   var b = toNumOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   var a = toNumOrNull((_b = s) === null || _b === void 0 ? void 0 : _b.pop());
                   if (a !== null && b !== null) {
                       s.push(a < b);
                   }
                   return [s];
               }
           },
           '>=': {
               compose: function (s) {
                   var _a, _b;
                   var b = toNumOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   var a = toNumOrNull((_b = s) === null || _b === void 0 ? void 0 : _b.pop());
                   if (a !== null && b !== null) {
                       s.push(a >= b);
                   }
                   return [s];
               }
           },
           '<=': {
               compose: function (s) {
                   var _a, _b;
                   var b = toNumOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   var a = toNumOrNull((_b = s) === null || _b === void 0 ? void 0 : _b.pop());
                   if (a !== null && b !== null) {
                       s.push(a <= b);
                   }
                   return [s];
               }
           },
           'concat': {
               compose: function (s) {
                   var _a, _b;
                   var b = toArrOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   var a = toArrOrNull((_b = s) === null || _b === void 0 ? void 0 : _b.pop());
                   if (a && b) {
                       s.push(__spreadArrays$1(a, b));
                   }
                   return [s];
               }
           },
           'cons': {
               compose: function (s) {
                   var _a, _b;
                   var b = toArrOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   var a = (_b = s) === null || _b === void 0 ? void 0 : _b.pop();
                   if (b) {
                       s.push(__spreadArrays$1([a], b));
                   }
                   return [s];
               }
           },
           'uncons': {
               compose: function (s) {
                   var _a;
                   var arr = toArrOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   if (arr) {
                       s.push(head(arr), tail(arr));
                   }
                   return [s];
               }
           },
           'push': {
               compose: function (s) {
                   var _a, _b;
                   var item = (_a = s) === null || _a === void 0 ? void 0 : _a.pop();
                   var arr = toArrOrNull((_b = s) === null || _b === void 0 ? void 0 : _b.pop());
                   if (arr) {
                       s.push(__spreadArrays$1(arr, [item]));
                   }
                   return [s];
               }
           },
           'pop': {
               compose: function (s) {
                   var _a;
                   var arr = toArrOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   if (arr) {
                       s.push(init(arr), last(arr));
                   }
                   return [s];
               }
           },
           'constrec': {
               sig: [[
                       { type: 'Initial extends (list<words>)' },
                       { type: 'Increment extends (list<words>)' },
                       { type: 'Condition extends (list<words>)' },
                       { type: 'Recurse extends (list<words>)' },
                       { type: 'Final extends (list<words>)' }
                   ], []],
               compose: function (s, pl) {
                   var _a, _b, _c, _d, _e;
                   // initial increment condition recurse final constrec
                   var final = toPLOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   var recurse = toPLOrNull((_b = s) === null || _b === void 0 ? void 0 : _b.pop());
                   var condition = toPLOrNull((_c = s) === null || _c === void 0 ? void 0 : _c.pop());
                   var increment = toPLOrNull((_d = s) === null || _d === void 0 ? void 0 : _d.pop());
                   var initial = toPLOrNull((_e = s) === null || _e === void 0 ? void 0 : _e.pop());
                   if (initial && increment && condition && recurse && final) {
                       var nextRec = [[], increment, condition, recurse, final, 'constrec'];
                       pl = __spreadArrays$1(initial, increment, condition, [__spreadArrays$1(recurse, nextRec), final, 'if-else']).concat(pl);
                   }
                   return [s, pl];
               }
           },
           'linrec': {
               sig: [[
                       { type: 'TermTest extends (list<words>)' },
                       { type: 'Terminal extends (list<words>)' },
                       { type: 'Recurse extends (list<words>)' },
                       { type: 'Final extends (list<words>)' }
                   ], []],
               compose: function (s, pl) {
                   var _a, _b, _c, _d;
                   // termtest && terminal && recurse && final linrec 
                   var final = toPLOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   var recurse = toPLOrNull((_b = s) === null || _b === void 0 ? void 0 : _b.pop());
                   var terminal = toPLOrNull((_c = s) === null || _c === void 0 ? void 0 : _c.pop());
                   var termtest = toPLOrNull((_d = s) === null || _d === void 0 ? void 0 : _d.pop());
                   if (termtest && terminal && recurse && final) {
                       var nextRec = __spreadArrays$1([termtest, terminal, recurse, final, 'linrec'], final);
                       pl = __spreadArrays$1(termtest, [terminal, __spreadArrays$1(recurse, nextRec), 'if-else']).concat(pl);
                   }
                   else {
                       console.log("some stack value(s) not found");
                       // throw new Error("stack value(s) not found");
                   }
                   // console.log('*** s pl ***', s, pl);
                   return [s, pl];
               }
           },
           'linrec5': {
               sig: [[
                       { type: 'Init extends (list<words>)' },
                       { type: 'TermTest extends (list<words>)' },
                       { type: 'Terminal extends (list<words>)' },
                       { type: 'Recurse extends (list<words>)' },
                       { type: 'Final extends (list<words>)' }
                   ], []],
               compose: function (s, pl) {
                   var _a, _b, _c, _d, _e;
                   // termtest && terminal && recurse && final linrec 
                   var final = toPLOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   var recurse = toPLOrNull((_b = s) === null || _b === void 0 ? void 0 : _b.pop());
                   var terminal = toPLOrNull((_c = s) === null || _c === void 0 ? void 0 : _c.pop());
                   var termtest = toPLOrNull((_d = s) === null || _d === void 0 ? void 0 : _d.pop());
                   var init = toPLOrNull((_e = s) === null || _e === void 0 ? void 0 : _e.pop());
                   if (init && termtest && terminal && recurse && final) {
                       var nextRec = __spreadArrays$1([termtest, terminal, recurse, final, 'linrec'], final);
                       pl = __spreadArrays$1(init, termtest, [terminal, __spreadArrays$1(recurse, nextRec), 'if-else']).concat(pl);
                   }
                   else {
                       console.log("some stack value(s) not found");
                       // throw new Error("stack value(s) not found");
                   }
                   // console.log('*** s pl ***', s, pl);
                   return [s, pl];
               }
           },
           'binrec': {
               sig: [[
                       { type: 'TermTest extends (list<words>)' },
                       { type: 'Terminal extends (list<words>)' },
                       { type: 'Recurse extends (list<words>)' },
                       { type: 'Final extends (list<words>)' }
                   ], []],
               compose: function (s, pl) {
                   var _a, _b, _c, _d;
                   // termtest && terminal && recurse && final binrec 
                   var final = toPLOrNull((_a = s) === null || _a === void 0 ? void 0 : _a.pop());
                   var recurse = toPLOrNull((_b = s) === null || _b === void 0 ? void 0 : _b.pop());
                   var terminal = toPLOrNull((_c = s) === null || _c === void 0 ? void 0 : _c.pop());
                   var termtest = toPLOrNull((_d = s) === null || _d === void 0 ? void 0 : _d.pop());
                   if (termtest && terminal && recurse && final) {
                       var nextRec = [termtest, terminal, recurse, final, 'binrec'];
                       pl = __spreadArrays$1(termtest, [terminal, __spreadArrays$1(recurse, [__spreadArrays$1(nextRec), 'dip'], nextRec, final), 'if-else']).concat(pl);
                   }
                   else {
                       console.log("some stack value(s) not found");
                       // throw new Error("stack value(s) not found");
                   }
                   // console.log('*** s pl ***', s, pl);
                   return [s, pl];
               }
           },
           'dup2': {
               sig: [[{ type: 'A', use: 'observe' }, { type: 'B', use: 'observe' }], [{ type: 'A' }, { type: 'B' }]],
               compose: [['dup'], 'dip', 'dup', ['swap'], 'dip']
           },
           'times': {
               sig: [[{ type: 'P extends (list<words>)', use: 'runs' }, { type: 'int as n' }], [{ type: 'P n times' }]],
               compose: ['dup', 0, '>', [1, '-', 'swap', 'dup', 'dip2', 'swap', 'times'], ['drop', 'drop'], 'if-else']
           },
           'map': {
               sig: [
                   [{ type: 'ValueList extends (list<words>)' },
                       { type: 'Phrase extends (list<words>)' }],
                   [{ type: 'ResultValueList extends (list<words>)' }]
               ],
               compose: [["list", "phrase"], [
                       [[], "list"],
                       ['size', 0, '<='],
                       ['drop'],
                       ['uncons', ["swap", ["phrase", 'play'], 'dip', "swap", 'push'], 'dip'],
                       [], 'linrec5'
                   ], "pounce"]
           },
           'filter': {
               sig: [
                   [{ type: 'ValueList extends (list<words>)' },
                       { type: 'Phrase extends (list<words>)' }],
                   [{ type: 'ResultValueList extends (list<words>)' }]
               ],
               compose: [["list", "phrase"], [
                       [[], "list"],
                       ['size', 0, '<='],
                       ['drop'],
                       ['uncons', ["swap", ["dup", "phrase", 'play'], 'dip', "rollup", ['push'], ['drop'], 'if-else'], 'dip'],
                       [], 'linrec5'
                   ], "pounce"]
           },
           'reduce': {
               sig: [
                   [{ type: 'ValueList extends (list<words>)' },
                       { type: 'Accumulater (word)' },
                       { type: 'Phrase extends (list<words>)' }],
                   [{ type: 'ResultValueList extends (list<words>)' }]
               ],
               compose: [["list", "acc", "phrase"], [
                       ["acc", "list"],
                       ['size', 0, '<='],
                       ['drop'],
                       ['uncons', ["phrase", "play"], 'dip'],
                       [], 'linrec5'
                   ], "pounce"]
           },
           'split': {
               compose: [["cutVal", "theList", "operator"], [
                       [], [], "cutVal", "theList",
                       'size',
                       ['uncons',
                           ['dup2', "operator", "play",
                               ['swap', ['swap', ['push'], 'dip'], 'dip'],
                               ['swap', ['push'], 'dip'], 'if-else'], 'dip',
                       ], 'swap', 'times', 'drop', 'swap', ['push'], 'dip'
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
           'depth': {
               compose: function (s) {
                   s.push(s.length);
                   return [s];
               }
           },
           'stack-copy': {
               compose: function (s) {
                   s.push(__spreadArrays$1(s));
                   return [s];
               }
           },
           'popInternalCallStack': {
               compose: []
           }
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
           // // 'abs': {
           // //     definition: function (s: Json[]) {
           // //         const n = s?.pop();
           // //         s.push(Math.abs(n));
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
           // // 'depth': {
           // //     expects: [], effects: [1], tests: [], desc: 'stack depth',
           // //     definition: function (s: Json[], pl: PL) {
           // //         s.push(s.length);
           // //         return [s, pl];
           // //     }
           // // },
           // // 'and': {
           // //     expects: [{ desc: 'a', ofType: 'boolean' }, { desc: 'b', ofType: 'boolean' }], effects: [-1], tests: [], desc: 'logical and',
           // //     definition: function (s: Json[]) {
           // //         const b = toBoolean(s?.pop());
           // //         const a = toBoolean(s?.pop());
           // //         s.push(a && b);
           // //         return [s, pl];
           // //     }
           // // },
           // // 'or': {
           // //     expects: [{ desc: 'a', ofType: 'boolean' }, { desc: 'b', ofType: 'boolean' }], effects: [-1], tests: [], desc: 'logical or',
           // //     definition: function (s: Json[]) {
           // //         const b = toBoolean(s?.pop());
           // //         const a = toBoolean(s?.pop());
           // //         s.push(a || b);
           // //         return [s, pl];
           // //     }
           // // },
           // // 'not': {
           // //     expects: [{ desc: 'a', ofType: 'boolean' }], effects: [0], tests: [], desc: 'logical not',
           // //     definition: function (s: Json[]) {
           // //         const a = toBoolean(s?.pop());
           // //         s.push(!a);
           // //         return [s, pl];
           // //     }
           // // },
           // // 'bubble-up': {
           // //     'requires': 'list_module',
           // //     'named-args': ['c'],
           // //     'local-words': {
           // //     },
           // //     'definition': [[], ['cons'], 'c', 'repeat', 'swap', [['uncons'], 'c', 'repeat', 'drop'], 'dip']
           // // },
           // // 'case': {
           // //     expects: [{ desc: 'key', ofType: 'word' }, { desc: 'a', ofType: 'record' }], effects: [-2], tests: [], desc: 'play a matching case',
           // //     definition: function (s: Json[], pl: PL) {
           // //         const case_record = s?.pop();
           // //         let key = s?.pop();
           // //         if (key === " ") {
           // //             key = "' '";
           // //         }
           // //         if (case_record[key]) {
           // //             if (isArray(case_record[key])) {
           // //                 pl = [case_record[key]].concat(pl);
           // //             }
           // //             else {
           // //                 pl.unshift(case_record[key]);
           // //             }
           // //         }
           // //         else {
           // //             s.push(false);
           // //         }
           // //         return [s, pl];
           // //     }
           // // },
           // // 'floor': ['dup', 1, '%', '-'],
           // // 'filter': {
           // //     'requires': 'list_module',
           // //     'local-words': {
           // //         'setup-filter': [[]],
           // //         'process-filter': [
           // //             ["size"], "dip2", "rolldown", 0, ">",
           // //             ["rotate", "pop", "rolldown", ["dup"], "dip", "dup", ["play"], "dip", "swap",
           // //                 [["swap"], "dip2", ["prepend"], "dip"],
           // //                 [["swap"], "dip2", ["drop"], "dip"], "if-else", "swap", "process-filter"],
           // //             [["drop", "drop"], "dip"], "if-else"]
           // //     },
           // //     'definition': ['setup-filter', 'process-filter']
           // // },
           // // 'reduce': {
           // //     'requires': 'list_module',
           // //     'local-words': {
           // //         'more?': ['rolldown', 'size', 0, '>', ['rollup'], 'dip'],
           // //         'process-reduce': ['more?', ['reduce-step', 'process-reduce'], 'if'],
           // //         'reduce-step': [['pop'], 'dip2', 'dup', [['swap'], 'dip', 'play'], 'dip'],
           // //         'teardown-reduce': ['drop', ['drop'], 'dip'],
           // //     },
           // //     'definition': ['process-reduce', 'teardown-reduce']
           // // }
       };

       var preProcessDefs = function (pl, coreWords) {
           var defineWord = function (wd, key, val) {
               var new_word = {};
               new_word[key] = val;
               // ToDo: implement a safe mode that would throw a preProcesser error if key is already defined.
               return mergeRight(wd, new_word);
           };
           // non-FP section (candidate for refactor)
           var next_pl = __spreadArrays$1(pl);
           var next_wd = {};
           var def_i = findIndex(function (word) { return word === 'compose'; }, next_pl);
           while (def_i !== -1) {
               if (def_i >= 2) {
                   var word = toPLOrNull(next_pl[def_i - 2]);
                   var key = toStringOrNull(head(toArrOrNull(next_pl[def_i - 1])));
                   next_pl.splice(def_i - 2, 3); // splice is particularly mutant
                   next_wd = defineWord(next_wd, key, { "compose": word });
               }
               def_i = findIndex(function (word) { return word === 'compose'; }, next_pl);
           }
           return [next_pl, mergeRight(coreWords, next_wd)];
       };

       var parse$1 = parser;
       var debugLevel = function (ics, logLevel) { return (ics.length <= logLevel); };
       // user debug sessions do not need to see the housekeeping words (e.g. popInternalCallStack) 
       var debugCleanPL = function (pl) { return filter(function (w) { return (w !== "popInternalCallStack"); }, pl); };
       // purr
       function interpreter(pl_in, opt) {
           var wd_in, internalCallStack, _a, pl, wd, s, _b, w, maxCycles, cycles, wds, _d, plist, _f;
           var _g, _h;
           if (opt === void 0) { opt = { logLevel: 0, yieldOnId: false }; }
           var _j, _k, _l, _m, _o;
           return __generator(this, function (_p) {
               switch (_p.label) {
                   case 0:
                       wd_in = opt.wd ? opt.wd : coreWords;
                       internalCallStack = [];
                       _a = is(Array, pl_in) ? [toPLOrNull(pl_in), wd_in] : preProcessDefs(is(String, pl_in) ? parse$1(pl_in.toString()) : pl_in, wd_in), pl = _a[0], wd = _a[1];
                       s = [];
                       if (!((_j = opt) === null || _j === void 0 ? void 0 : _j.logLevel)) return [3 /*break*/, 2];
                       return [4 /*yield*/, { stack: s, prog: pl, active: true }];
                   case 1:
                       _b = _p.sent();
                       return [3 /*break*/, 3];
                   case 2:
                       _b = null;
                       _p.label = 3;
                   case 3:
                       maxCycles = opt.maxCycles || 1000000;
                       cycles = 0;
                       _p.label = 4;
                   case 4:
                       if (!(cycles < maxCycles && internalCallStack.length < 1000
                           && (w = pl.shift()) !== undefined
                           && !(((_k = s) === null || _k === void 0 ? void 0 : _k.length) === 1 && s[0] === null))) return [3 /*break*/, 17];
                       cycles += 1;
                       wds = is(String, w) ? wd[w] : null;
                       if (!wds) return [3 /*break*/, 10];
                       if (!(opt.logLevel && !opt.yieldOnId)) return [3 /*break*/, 8];
                       if (!debugLevel(internalCallStack, opt.logLevel)) return [3 /*break*/, 6];
                       return [4 /*yield*/, { stack: s, prog: debugCleanPL([w].concat(pl)), active: true, internalCallStack: __spreadArrays$1(internalCallStack) }];
                   case 5:
                       _d = _p.sent();
                       return [3 /*break*/, 7];
                   case 6:
                       _d = null;
                       _p.label = 7;
                   case 7:
                       return [3 /*break*/, 9];
                   case 8:
                       _p.label = 9;
                   case 9:
                       if (typeof wds.compose === 'function') {
                           _g = wds.compose(s, pl), s = _g[0], _h = _g[1], pl = _h === void 0 ? pl : _h;
                           // if(r.isNil(s_ret)) {
                           //   cycles = maxCycles;
                           // }
                           // else {
                           //   s = s_ret;
                           // }
                       }
                       else {
                           if (w === "popInternalCallStack") {
                               internalCallStack.pop();
                           }
                           else {
                               plist = toPLOrNull(wds.compose);
                               if (plist) {
                                   internalCallStack.push(toStringOrNull(w));
                                   pl = __spreadArrays$1(plist, ["popInternalCallStack"], pl);
                               }
                           }
                       }
                       return [3 /*break*/, 16];
                   case 10:
                       if (!(w !== undefined)) return [3 /*break*/, 16];
                       if (is(Array, w)) {
                           (_l = s) === null || _l === void 0 ? void 0 : _l.push([].concat(w));
                       }
                       else {
                           (_m = s) === null || _m === void 0 ? void 0 : _m.push(w);
                       }
                       if (!(opt.logLevel && opt.yieldOnId)) return [3 /*break*/, 14];
                       if (!(debugLevel(internalCallStack, opt.logLevel))) return [3 /*break*/, 12];
                       return [4 /*yield*/, { stack: s, prog: debugCleanPL([w].concat(pl)), active: true, internalCallStack: __spreadArrays$1(internalCallStack) }];
                   case 11:
                       _f = _p.sent();
                       return [3 /*break*/, 13];
                   case 12:
                       _f = null;
                       _p.label = 13;
                   case 13:
                       return [3 /*break*/, 15];
                   case 14:
                       _p.label = 15;
                   case 15:
                       _p.label = 16;
                   case 16: return [3 /*break*/, 4];
                   case 17:
                       if (!(((_o = s) === null || _o === void 0 ? void 0 : _o.length) === 1 && s[0] === null)) return [3 /*break*/, 19];
                       console.log("s has null");
                       return [4 /*yield*/, { stack: [], prog: pl, active: false, internalCallStack: __spreadArrays$1(internalCallStack), error: "a word did not find required data on the stack" }];
                   case 18:
                       _p.sent();
                       _p.label = 19;
                   case 19:
                       if (!(cycles >= maxCycles || internalCallStack.length >= 1000)) return [3 /*break*/, 21];
                       return [4 /*yield*/, { stack: s, prog: pl, active: false, internalCallStack: __spreadArrays$1(internalCallStack), error: "maxCycles or callStack size exceeded: this may be an infinite loop" }];
                   case 20:
                       _p.sent();
                       _p.label = 21;
                   case 21: return [4 /*yield*/, { stack: s, prog: pl, active: false }];
                   case 22:
                       _p.sent();
                       return [2 /*return*/];
               }
           });
       }
       var introspectWords = function () { return keys(omit(['popInternalCallStack'], coreWords)); };
       var introspectWord = function (wn) { return JSON.parse(JSON.stringify(path([wn], coreWords))); };

       // the Pounce language core module exposes these function
       var parse$1$1 = parser;
       var interpreter$1 = interpreter;

       // const stackEle = document.querySelector('#canvas');
       let interp;
       let pounceAst;
       let nextPounceAst = null;
       const rows = 16;
       const columns = 16;
       const off = 20;
       const scale = 20;
       let start_t = Date.now();
       const frame_int = 100;
       let next = 0;
       let fn_of_time = false;

       // parse the Pounce program
       function repl(pounceProgram, logLevel = 0) {
           start_t = Date.now();
           nextPounceAst = parse$1$1(pounceProgram);
           if (!next || !fn_of_time) {
               window.requestAnimationFrame(step);
           }
           fn_of_time = pounceProgram.indexOf("t") >= 0;
       }
       const ctx = document.getElementById("output").getContext("2d");

       const step = () => {
           const t = Date.now() - start_t;
           if (nextPounceAst) {
               pounceAst = nextPounceAst;
           }
           let i = 0;
           ctx.fillStyle = "#000";
           ctx.fillRect(0, 0, 340, 340);
           for (var y = 0; y < rows; y++) {
               for (var x = 0; x < columns; x++) {
                   let dataPlusPounce = [t/1000, i, x, y, ['t', 'i', 'x', 'y'], pounceAst, 'pounce'];
                   interp = interpreter$1(dataPlusPounce);
                   let res = interp?.next?.();
                   let v = res?.value?.stack?.[0] ?? 0;
                   // ctx.scale(1, 1);
                   ctx.beginPath();
                   ctx.fillStyle = v < 0 ? "#F24" : "#FFF";
                   v = Math.min(1, Math.abs(v));
                   // ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
                   ctx.arc(x * scale + off, y * scale + off, v * scale / 2, 0, 2 * Math.PI);
                   ctx.fill();
                   i++;
               }
           }
           if (!fn_of_time) {
               return;
           }
           const post_work_t = Date.now() - start_t;
           // work_time = post_work_t - t;
           next = t + frame_int;
           const time_till_next = next - post_work_t;
           if (time_till_next > 10) {
               setTimeout(() => {
                   window.requestAnimationFrame(step);
               }, time_till_next);
           }
           else {
               window.requestAnimationFrame(step);
           }
       };

       // even though Rollup is bundling all your files together, errors and
       // logs will still point to your original source modules
       console.log('if you have sourcemaps enabled in your devtools, click on main.js:5 -->');

       // Add event listener for programmer input
       const myPounceProgramEle = document.getElementById("user-pl");
       // const exampleSelectEle = document.getElementById("example");

       let pounceProgram = '8 x - 8 /';
       let logLevel = 0;

       myPounceProgramEle.addEventListener("keyup", (e) => {
           if (e.target.value !== pounceProgram) {
               pounceProgram = e.target.value;
               repl(pounceProgram, logLevel);
           }
       }, false);


       // exampleSelectEle.addEventListener('change', (e) => {
       //     pounceProgram = e.target.value;
       //     myPounceProgramEle.innerText = pounceProgram;
       //     myPounceProgramEle.value = pounceProgram;
       //     repl(pounceProgram, logLevel);
       // });


       myPounceProgramEle.value = pounceProgram;

       myPounceProgramEle.focus();

       repl(pounceProgram, logLevel);

}());
//# sourceMappingURL=bundle.js.map
