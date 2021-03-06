// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.com/#x15.4.4.18
if ( !Array.prototype.forEach ) {
  Array.prototype.forEach = function( callback, thisArg ) {

    var T, k;

    if ( this == null ) {
      throw new TypeError( " this is null or not defined" );
    }

    // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0; // Hack to convert O.length to a UInt32

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if ( {}.toString.call(callback) != "[object Function]" ) {
      throw new TypeError( callback + " is not a function" );
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if ( thisArg ) {
      T = thisArg;
    }

    // 6. Let k be 0
    k = 0;

    // 7. Repeat, while k < len
    while( k < len ) {

      var kValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then

      if ( k in O ) {

        // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
        kValue = O[ k ];

        // ii. Call the Call internal method of callback with T as the this value and
        // argument list containing kValue, k, and O.
        callback.call( T, kValue, k, O );
      }
      // d. Increase k by 1.
      k++;
    }
    // 8. return undefined
  };
}

// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.com/#x15.4.4.19
if (!Array.prototype.map) {
  Array.prototype.map = function(callback, thisArg) {

    var T, A, k;

    if (this == null) {
      throw new TypeError(" this is null or not defined");
    }

    // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if ({}.toString.call(callback) != "[object Function]") {
      throw new TypeError(callback + " is not a function");
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if (thisArg) {
      T = thisArg;
    }

    // 6. Let A be a new array created as if by the expression new Array(len) where Array is
    // the standard built-in constructor with that name and len is the value of len.
    A = new Array(len);

    // 7. Let k be 0
    k = 0;

    // 8. Repeat, while k < len
    while(k < len) {

      var kValue, mappedValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
        kValue = O[ k ];

        // ii. Let mappedValue be the result of calling the Call internal method of callback
        // with T as the this value and argument list containing kValue, k, and O.
        mappedValue = callback.call(T, kValue, k, O);

        // iii. Call the DefineOwnProperty internal method of A with arguments
        // Pk, Property Descriptor {Value: mappedValue, Writable: true, Enumerable: true, Configurable: true},
        // and false.

        // In browsers that support Object.defineProperty, use the following:
        // Object.defineProperty(A, Pk, { value: mappedValue, writable: true, enumerable: true, configurable: true });

        // For best browser support, use the following:
        A[ k ] = mappedValue;
      }
      // d. Increase k by 1.
      k++;
    }

    // 9. return A
    return A;
  };      
}

if (!Array.prototype.reduce) {
  Array.prototype.reduce = function reduce(accumulator){
    if (this===null || this===undefined) throw new TypeError("Object is null or undefined");

    var i = 0, l = this.length >> 0, curr;

    if(typeof accumulator !== "function") // ES5 : "If IsCallable(callbackfn) is false, throw a TypeError exception."
      throw new TypeError("First argument is not callable");

    if(arguments.length < 2) {
      if (l === 0) throw new TypeError("Array length is 0 and no second argument");
      curr = this[0];
      i = 1; // start accumulating at the second element
    }
    else
      curr = arguments[1];

    while (i < l) {
      if(i in this) curr = accumulator.call(undefined, curr, this[i], i, this);
      ++i;
    }

    return curr;
  };
}

if (!Array.prototype.reduceRight) {
  Array.prototype.reduceRight = function(callbackfn /*, initialValue */) {
    "use strict";

    if (this == null) throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;

    if (typeof callbackfn != "function") throw new TypeError();

    // no value to return if no initial value, empty array
    if (len === 0 && arguments.length === 1) throw new TypeError();

    var k = len - 1;
    var accumulator;
    if (arguments.length >= 2) {
      accumulator = arguments[1];
    } else {
      do {
        if (k in this) {
          accumulator = this[k--];
          break;
        }

        // if array contains no values, no initial value to return
        if (--k < 0) throw new TypeError();
      } while (true);
    }

    while (k >= 0) {
      if (k in t) accumulator = callbackfn.call(undefined, accumulator, t[k], k, t);
      k--;
    }

    return accumulator;
  };
}

if (!Array.prototype.filter) {
  Array.prototype.filter = function(fun /*, thisp */) {
    "use strict";

    if (this == null) throw new TypeError();

    var t = Object(this),
        len = t.length >>> 0;

    if (typeof fun != "function") throw new TypeError();

    var res = [],
        thisp = arguments[1];

    for (var i = 0; i < len; i++) {
      if (i in t) {
        var val = t[i]; // fun が this を変化させた場合に備えて
        if (fun.call(thisp, val, i, t)) res.push(val);
      }
    }

    return res;
  };
}

if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
    "use strict";

    if (this == null) {
      throw new TypeError();
    }

    var t = Object(this);
    var len = t.length >>> 0;

    if (len === 0) {
      return -1;
    }

    var n = 0;

    if (arguments.length > 0) {
      n = Number(arguments[1]);

      if (n != n) { // shortcut for verifying if it's NaN
        n = 0;
      } else if (n != 0 && n != Infinity && n != -Infinity) {
         n = (n > 0 || -1) * Math.floor(Math.abs(n));
      }
    }

    if (n >= len) {
      return -1;
    }

    var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);

    for (; k < len; k++) {
      if (k in t && t[k] === searchElement) {
        return k;
      }
    }
    return -1;
  }
}

if (!Array.prototype.every) {
  Array.prototype.every = function(fun /*, thisp */)
  {
    "use strict";

    if (this == null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun != "function")
      throw new TypeError();

    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
      if (i in t && !fun.call(thisp, t[i], i, t))
        return false;
    }

    return true;
  };
}

if(!Array.isArray) {  
  Array.isArray = function (vArg) {  
    return Object.prototype.toString.call(vArg) === "[object Array]";  
  };  
}

if (!Array.prototype.lastIndexOf) {
  Array.prototype.lastIndexOf = function(searchElement /*, fromIndex*/) {
    "use strict";

    if (this == null)
      throw new TypeError();

    var t = Object(this),
        len = t.length >>> 0;
    if (len === 0) return -1;

    var n = len;
    if (arguments.length > 1) {
      n = Number(arguments[1]);
      if (n != n)
        n = 0;
      else if (n != 0 && n != (1 / 0) && n != -(1 / 0))
        n = (n > 0 || -1) * Math.floor(Math.abs(n));
    }

    var k = n >= 0
          ? Math.min(n, len - 1)
          : len - Math.abs(n);

    for (; k >= 0; k--) {
      if (k in t && t[k] === searchElement)
        return k;
    }
    return -1;
  };
}

if (!Array.prototype.some) {
  Array.prototype.some = function(fun /*, thisp */) {
    "use strict";

    if (this == null) throw new TypeError();

    var t = Object(this),
        len = t.length >>> 0;

    if (typeof fun != "function") throw new TypeError();

    var thisp = arguments[1];

    for (var i = 0; i < len; i++) {
      if (i in t && fun.call(thisp, t[i], i, t))
        return true;
    }

    return false;
  };
}
(function() {
  var Either, Left, LeftProjection, Right, RightProjection, exports, _Left, _Right,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  exports = this;

  Either = (function() {
    function Either() {}

    Either.prototype.left = function() {
      return Either.LeftProjection(this);
    };

    Either.prototype.right = function() {
      return Either.RightProjection(this);
    };

    Either.prototype.fold = function(fa, fb) {
      if (this.isLeft) {
        return fa(this.a);
      } else {
        return fb(this.b);
      }
    };

    Either.prototype.swap = function() {
      if (this.isLeft) {
        return Right(this.a);
      } else {
        return Left(this.b);
      }
    };

    Either.prototype.joinRight = function() {
      if (this.isRight) {
        return Right(this.b);
      } else {
        return Left(Left(this.a));
      }
    };

    Either.prototype.joinLeft = function() {
      if (this.isLeft) {
        return Left(this.a);
      } else {
        return Right(Right(this.b));
      }
    };

    Either.merge = function(e) {
      if (e.isLeft) {
        return e.a;
      } else {
        return e.b;
      }
    };

    Either.LeftProjection = function(e) {
      return new LeftProjection(e);
    };

    Either.RightProjection = function(e) {
      return new RightProjection(e);
    };

    return Either;

  })();

  Left = function(a) {
    return new _Left(a);
  };

  _Left = (function(_super) {
    __extends(_Left, _super);

    function _Left(a) {
      this.a = a;
    }

    _Left.prototype.isLeft = true;

    _Left.prototype.isRight = false;

    return _Left;

  })(Either);

  Right = function(b) {
    return new _Right(b);
  };

  _Right = (function(_super) {
    __extends(_Right, _super);

    function _Right(b) {
      this.b = b;
    }

    _Right.prototype.isLeft = false;

    _Right.prototype.isRight = true;

    return _Right;

  })(Either);

  LeftProjection = (function() {
    function LeftProjection(e) {
      this.e = e;
    }

    LeftProjection.prototype.get = function() {
      if (!this.e.isLeft) {
        throw "Either.left.value on Right";
      } else {
        return this.e.a;
      }
    };

    LeftProjection.prototype.foreach = function(f) {
      if (this.e.isLeft) {
        return f(this.e.a);
      }
    };

    LeftProjection.prototype.getOrElse = function(or_) {
      if (this.e.isLeft) {
        return this.e.a;
      } else {
        return or_;
      }
    };

    LeftProjection.prototype.forall = function(f) {
      if (this.e.isLeft) {
        return f(this.e.a);
      } else {
        return true;
      }
    };

    LeftProjection.prototype.exists = function(f) {
      if (this.e.isLeft) {
        return f(this.e.a);
      } else {
        return false;
      }
    };

    LeftProjection.prototype.flatMap = function(f) {
      if (this.e.isLeft) {
        return f(this.e.a);
      } else {
        return Right(this.e.b);
      }
    };

    LeftProjection.prototype.map = function(f) {
      if (this.e.isLeft) {
        return Left(f(this.e.a));
      } else {
        return None;
      }
    };

    LeftProjection.prototype.filter = function(p) {
      if (this.e.isLeft) {
        if (p(this.e.a)) {
          return Some(Left(this.e.a));
        } else {
          return None;
        }
      } else {
        return None;
      }
    };

    LeftProjection.prototype.toSeq = function() {
      if (this.e.isLeft) {
        return [this.e.a];
      } else {
        return [];
      }
    };

    LeftProjection.prototype.toOption = function() {
      if (this.e.isLeft) {
        return Some(this.e.a);
      } else {
        return None;
      }
    };

    return LeftProjection;

  })();

  RightProjection = (function() {
    function RightProjection(e) {
      this.e = e;
    }

    RightProjection.prototype.get = function() {
      if (!this.e.isRight) {
        throw "Either.right.value on Left";
      } else {
        return this.e.b;
      }
    };

    RightProjection.prototype.foreach = function(f) {
      if (this.e.isRight) {
        return f(this.e.b);
      }
    };

    RightProjection.prototype.getOrElse = function(or_) {
      if (this.e.isRight) {
        return this.e.b;
      } else {
        return or_;
      }
    };

    RightProjection.prototype.forall = function(f) {
      if (this.e.isRight) {
        return f(this.e.b);
      } else {
        return true;
      }
    };

    RightProjection.prototype.exists = function(f) {
      if (this.e.isRight) {
        return f(this.e.b);
      } else {
        return false;
      }
    };

    RightProjection.prototype.flatMap = function(f) {
      if (this.e.isRight) {
        return f(this.e.b);
      } else {
        return Right(this.e.a);
      }
    };

    RightProjection.prototype.map = function(f) {
      if (this.e.isRight) {
        return Right(f(this.e.b));
      } else {
        return None;
      }
    };

    RightProjection.prototype.filter = function(p) {
      if (this.e.isRight) {
        if (p(this.e.b)) {
          return Some(Right(this.e.b));
        } else {
          return None;
        }
      } else {
        return None;
      }
    };

    RightProjection.prototype.toSeq = function() {
      if (this.e.isRight) {
        return [this.e.b];
      } else {
        return [];
      }
    };

    RightProjection.prototype.toOption = function() {
      if (this.e.isRight) {
        return Some(this.e.b);
      } else {
        return None;
      }
    };

    return RightProjection;

  })();

  exports.Either = Either;

  exports.Left = Left;

  exports.Right = Right;

}).call(this);

(function() {
  var None, Option, Some, exports, _None, _Some,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  exports = this;

  Option = (function() {
    function Option() {}

    Option.prototype.equals = function(a) {
      return (this.isEmpty && a.isEmpty) || (!this.isEmpty && !a.isEmpty && this.get() === a.get());
    };

    Option.prototype.isDefined = function() {
      return !this.isEmpty;
    };

    Option.prototype.getOrElse = function(d) {
      if (this.isEmpty) {
        return d;
      } else {
        return this.get();
      }
    };

    Option.prototype.orNull = function() {
      if (this.isEmpty) {
        return null;
      } else {
        return this.get();
      }
    };

    Option.prototype.orElse = function(a) {
      if (this.isEmpty) {
        return a;
      } else {
        return this;
      }
    };

    Option.prototype.exists = function(p) {
      return !this.isEmpty && p(this.get());
    };

    Option.prototype.forall = function(p) {
      return this.isEmpty || p(this.get());
    };

    Option.prototype.map = function(f) {
      if (this.isEmpty) {
        return None;
      } else {
        return Some(f(this.get()));
      }
    };

    Option.prototype.flatMap = function(f) {
      if (this.isEmpty) {
        return None;
      } else {
        return f(this.get());
      }
    };

    Option.prototype.filter = function(p) {
      if (this.isEmpty || p(this.get())) {
        return this;
      } else {
        return None;
      }
    };

    Option.prototype.withFilter = function(a) {
      var WithFilter, self;
      WithFilter = function(p) {
        this.map = function(f) {
          return self.filter(p).map(f);
        };
        this.flatMap = function(f) {
          return self.filter(p).flatMap(f);
        };
        this.foreach = function(f) {
          return self.filter(p).foreach(f);
        };
        return this.withFilter = function(q) {
          return new WithFilter(function(x) {
            return p(x) && q(x);
          });
        };
      };
      self = this;
      return new WithFilter(a);
    };

    Option.prototype.fold = function(ifEmpty, f) {
      if (this.isEmpty) {
        return ifEmpty();
      } else {
        return f(this.get());
      }
    };

    Option.prototype.match = function(some, none) {
      if (this.isEmpty) {
        return none();
      } else {
        return some(this.get());
      }
    };

    Option.prototype.foreach = function(f) {
      if (!this.isEmpty) {
        return f(this.get());
      }
    };

    Option.prototype.collect = function(pf) {
      if (!this.isEmpty && pf.isDefinedAt(this.get())) {
        return Some(pf(this.get()));
      } else {
        return None;
      }
    };

    Option.prototype.iterator = function() {
      if (this.isEmpty) {
        return [];
      } else {
        return [this.get()];
      }
    };

    Option.apply = function(a) {
      if (a === undefined || a === null) {
        return None;
      } else {
        return Some(a);
      }
    };

    return Option;

  })();

  Some = function(a) {
    return new _Some(a);
  };

  Some.apply = function(a) {
    return _Some.apply(a);
  };

  _Some = (function(_super) {
    __extends(_Some, _super);

    function _Some(a) {
      this.a = a;
    }

    _Some.prototype.isEmpty = false;

    _Some.prototype.get = function() {
      return this.a;
    };

    _Some.apply = function(a) {
      if (a === undefined) {
        return None;
      } else {
        return Some(a);
      }
    };

    return _Some;

  })(Option);

  _None = (function(_super) {
    __extends(_None, _super);

    function _None() {}

    _None.prototype.isEmpty = true;

    _None.prototype.get = function() {
      throw "NoSuchElementException(None.get)";
    };

    return _None;

  })(Option);

  None = new _None();

  exports.Option = Option;

  exports.Some = Some;

  exports.None = None;

}).call(this);

(function() {
  Array.prototype.sum = function() {
    if (this.length === 0) {
      return 0;
    } else if (this.length === 1) {
      return parseInt(this[0], 10);
    } else {
      return this.reduce(function(x, y) {
        return x + y;
      });
    }
  };

  Array.prototype.head = function() {
    if (this.length === 0) {
      throw "NoSuchElement";
    } else {
      return this[0];
    }
  };

  Array.prototype.headOption = function() {
    return Option.apply(this[0]);
  };

  Array.prototype.last = function() {
    if (this.length === 0) {
      throw "NoSuchElement";
    } else {
      return this[this.length - 1];
    }
  };

  Array.prototype.lastOption = function() {
    return Option.apply(this[this.length - 1]);
  };

  Array.prototype.get = function(i) {
    return this[i];
  };

  Array.prototype.getOrElse = function(i, orV) {
    if (this[i] !== void 0) {
      return this[i];
    } else {
      return orV;
    }
  };

  Array.prototype.getOrElseUpdate = function(i, op) {
    if (this[i] !== void 0) {
      return this[i];
    } else {
      this[i] = op;
      return op;
    }
  };

  Array.prototype.flatten = function() {
    return this.reduce(function(a, b) {
      return a.concat(b);
    });
  };

  Array.prototype.flatMap = function(f) {
    return this.reduce(function(a, b) {
      return a.concat(f(b));
    }, []);
  };

  Array.prototype.mapValues = function(f) {
    var ret;
    ret = [];
    this.forEach(function(a) {
      return ret[a] = f(a);
    });
    return ret;
  };

  Array.prototype.transpose = function() {
    var a, argsLen, i, j, ret, _i, _j, _k, _len, _ref;
    argsLen = None;
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      a = this[_i];
      if (argsLen === None) {
        argsLen = a.length;
      } else if (argsLen !== a.length) {
        throw new Error("IllegalArgumentException");
      }
    }
    ret = [];
    for (i = _j = 0; 0 <= argsLen ? _j < argsLen : _j > argsLen; i = 0 <= argsLen ? ++_j : --_j) {
      ret[i] = [];
      for (j = _k = 0, _ref = this.length; 0 <= _ref ? _k < _ref : _k > _ref; j = 0 <= _ref ? ++_k : --_k) {
        ret[i][j] = this[j][i];
      }
    }
    return ret;
  };

  Array.prototype.take = function(n) {
    return this.slice(0, n);
  };

  Array.prototype.takeRight = function(n) {
    return this.slice(this.length - n, this.length);
  };

  Array.prototype.drop = function(n) {
    return this.slice(n, this.length);
  };

  Array.prototype.dropRight = function(n) {
    return this.slice(0, this.length - n);
  };

  Array.prototype.trimStart = function(n) {
    var i, _i;
    for (i = _i = 0; 0 <= n ? _i < n : _i > n; i = 0 <= n ? ++_i : --_i) {
      this.shift();
    }
    return this;
  };

  Array.prototype.trimEnd = function(n) {
    var i, _i, _ref;
    for (i = _i = 0, _ref = this.length - n; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      this.pop();
    }
    return this;
  };

  Array.prototype.distinct = function() {
    var i, ret, u, _i, _ref;
    u = {};
    ret = [];
    for (i = _i = 0, _ref = this.length; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      if (u.hasOwnProperty(this[i])) {
        continue;
      }
      ret.push(this[i]);
      u[this[i]] = true;
    }
    return ret.filter(function(a) {
      return Option.apply(a) !== None;
    });
  };

  Array.prototype.sliceAt = function(n) {
    return [this.slice(0, n), this.slice(n)];
  };

  Array.prototype.exist = function(a) {
    return this.indexOf(a) !== -1;
  };

  Array.prototype.insert = function(index, value, args) {
    var heads, tails;
    args = Array.prototype.slice.call(arguments);
    args = args.length > 2 ? [value].concat(args.drop(2)) : [value];
    heads = this.slice(0, index);
    tails = this.slice(index);
    return heads.concat(args).concat(tails);
  };

  Array.prototype.insertAll = function(index, arr) {
    var heads, tails;
    heads = this.slice(0, index);
    tails = this.slice(index);
    return heads.concat(arr).concat(tails);
  };

  /*
  #
  */


  Array.prototype.remove = function(index, count) {
    var heads, tails;
    count = Option.apply(count).getOrElse(1);
    heads = this.slice(0, index);
    tails = this.slice(index + count);
    return heads.concat(tails);
  };

  /*
  # Returns a sequence formed from this sequence and another sequence 
  # by combining corresponding elements in pairs
  # if the two sequence is not same length, the length of returning sequence is same short one's.
  # @param {Array} arr
  # @return {Array} combined corresponding elements in pairs
  */


  Array.prototype.zip = function(arr) {
    var base, _i, _ref, _results;
    base = this.length < arr.length ? this : arr;
    return (function() {
      _results = [];
      for (var _i = 0, _ref = base.length; 0 <= _ref ? _i < _ref : _i > _ref; 0 <= _ref ? _i++ : _i--){ _results.push(_i); }
      return _results;
    }).apply(this).map(function(i) {
      return [this[i], arr[i]];
    }, this);
  };

  /*
  # Returns a sequence formed from this sequence and another sequence 
  # by combining corresponding elements in pairs
  # if the two sequence is not same length, 
  # this sequence will be padded with defaultA or another sequence will be padded with defaultB.
  # @param {Array} arr
  # @param {Object} defaultA 
  # @param {Object} defaultB
  # @return {Array} combined corresponding elements in pairs.
  */


  Array.prototype.zipAll = function(arr, defaultA, defaultB) {
    var base, _i, _ref, _results;
    base = this.length > arr.length ? this : arr;
    return (function() {
      _results = [];
      for (var _i = 0, _ref = base.length; 0 <= _ref ? _i < _ref : _i > _ref; 0 <= _ref ? _i++ : _i--){ _results.push(_i); }
      return _results;
    }).apply(this).map(function(i) {
      return [this[i] === void 0 ? defaultA : this[i], arr[i] === void 0 ? defaultB : arr[i]];
    }, this);
  };

  Array.prototype.unzip = function(f) {
    var tuples;
    tuples = this.map(f);
    return [
      tuples.map(function(a) {
        return a[0];
      }), tuples.map(function(a) {
        return a[1];
      })
    ];
  };

  Array.prototype.unzip3 = function(f) {
    var tuples,
      _this = this;
    tuples = this.map(f);
    return [
      tuples.map(function(a) {
        return a[0];
      }), tuples.map(function(a) {
        return a[1];
      }), tuples.map(function(a) {
        return a[2];
      })
    ];
  };

  Array.prototype.combinations = function(n) {
    var i, _i;
    for (i = _i = 0; 0 <= n ? _i < n : _i > n; i = 0 <= n ? ++_i : --_i) {
      tree[i];
    }
    return this.filter(function(a) {
      return a;
    });
  };

  Array.prototype.clone = function() {
    return Array.apply(null, this);
  };

  Array.prototype.toMap = function() {
    var ret;
    ret = [];
    this.map(function(a) {
      return ret[a[0]] = a[1];
    });
    return ret;
  };

}).call(this);

(function() {
  Boolean.unless = function(bool) {
    return function(f) {
      if (!bool) {
        return f();
      }
    };
  };

  Boolean.when = function(bool) {
    return function(f) {
      if (bool) {
        return f();
      }
    };
  };

  Boolean.prototype.unless = function(f) {
    return Boolean.unless(this.toString() === true.toString())(f);
  };

  Boolean.prototype.when = function(f) {
    return Boolean.when(this.toString() === true.toString())(f);
  };

}).call(this);

/*
該当付きに何日あるかを返します
@return {Number}
*/


(function() {
  var datePartExec, unificationDatePartName;

  Date.prototype.getMonthLength = function() {
    return this.getMonthLast().getDate();
  };

  /*
  前の付きを返します
  @return {Date}
  */


  Date.prototype.getPrevMonth = function() {
    return this.dateAdd("month", -1);
  };

  /*
  翌月を返します
  @return {Date}
  */


  Date.prototype.getNextMonth = function() {
    return this.dateAdd("month", 1);
  };

  /*
  月の初めの日を取得します
  @return {Date}
  */


  Date.prototype.getMonthFirst = function() {
    var that;
    that = this.getDatePart();
    that.setDate(1);
    return that;
  };

  /*
  月の終わりの日を取得します
  @return {Date}
  */


  Date.prototype.getMonthLast = function() {
    var ret;
    ret = this.getMonthFirst();
    ret.setMonth(ret.getMonth() + 1);
    ret.setDate(0);
    return ret;
  };

  /*
  日付の部分のみを返します。時間・分などの情報は切り捨てられます
  @return {Date}
  */


  Date.prototype.getDatePart = function() {
    var ret;
    ret = this.clone();
    ret.setHours(0);
    ret.setMinutes(0);
    ret.setSeconds(0);
    ret.setMilliseconds(0);
    return ret;
  };

  unificationDatePartName = function(datePartName) {
    switch (datePartName) {
      case "year":
      case "y":
        return "year";
      case "month":
      case "m":
        return "month";
      case "day":
      case "date":
      case "d":
        return "day";
      case "week":
        return "week";
      case "hour":
        return "hour";
      case "minute":
        return "minute";
      case "second":
        return "second";
      case "millisecond":
        return "millisecond";
    }
  };

  datePartExec = function(datePartName, varArgs) {
    switch (unificationDatePartName(datePartName)) {
      case "year":
        return this.thenYear(varArgs);
      case "month":
        return this.thenMonth(varArgs);
      case "day":
        return this.thenDay(varArgs);
      case "week":
        return this.thenWeek(varArgs);
      case "hour":
        return this.thenHour(varArgs);
      case "minute":
        return this.thenMinute(varArgs);
      case "second":
        return this.thenSecond(varArgs);
      case "millisecond":
        return this.thenMillisecond(varArgs);
    }
  };

  /*
  日付の部分を指定して加算を行います
  @param datePartName year,y,month,m,day,date,d,week,hour,minute,second,millisecondのいずれか
  @param spanCount 加算する値
  @return {Date}
  */


  Date.prototype.dateAdd = function(datePartName, spanCount) {
    var ret, self;
    self = this;
    ret = this.clone();
    return datePartExec.call((function() {
      this.thenYear = function() {
        return self.dateAdd("month", spanCount * 12);
      };
      this.thenMonth = function() {
        var d;
        d = ret.getDate();
        ret.setDate(1);
        ret.setMonth(ret.getMonth() + spanCount + 1);
        ret.setDate(0);
        ret.setDate(Math.min(d, ret.getDate()));
        return ret;
      };
      this.thenDay = function() {
        ret.setDate(ret.getDate() + spanCount);
        return ret;
      };
      this.thenWeek = function() {
        return self.dateAdd("day", spanCount * 7);
      };
      this.thenHour = function() {
        ret.setHours(ret.getHours() + spanCount);
        return ret;
      };
      this.thenMinute = function() {
        ret.setMinutes(ret.getMinutes() + spanCount);
        return ret;
      };
      this.thenSecond = function() {
        ret.setSeconds(ret.getSeconds() + spanCount);
        return ret;
      };
      this.thenMillisecond = function() {
        ret.setMilliseconds(ret.getMilliseconds() + spanCount);
        return ret;
      };
    })(), datePartName);
  };

  /*
  @param datePartName year,y,month,m,day,date,d,week,hour,minute,second,millisecondのいずれか
  @param dateTarget
  @return {Date}
  */


  Date.prototype.dateDiff = function(datePartName, dateTarget) {
    var self;
    self = this;
    return datePartExec.call((function() {
      this.thenYear = function() {
        return dateTarget.getFullYear() - self.getFullYear();
      };
      this.thenMonth = function() {
        return self.dateDiff("year", dateTarget) * 12 + dateTarget.getMonth() - self.getMonth();
      };
      this.thenDay = function() {
        var ticksBase;
        ticksBase = (new Date()).getDatePart().getTime();
        return Math.floor((dateTarget.getTime() - ticksBase) / (1000 * 60 * 60 * 24)) - Math.floor((self.getTime() - ticksBase) / (1000 * 60 * 60 * 24));
      };
      this.thenWeek = function() {
        return Math.floor(self.dateDiff("day", dateTarget) / 7);
      };
      this.thenHour = function() {
        var ticksBase;
        ticksBase = (new Date()).getDatePart().getTime();
        return Math.floor((dateTarget.getTime() - ticksBase) / (1000 * 60 * 60)) - Math.floor((self.getTime() - ticksBase) / (1000 * 60 * 60));
      };
      this.thenMinute = function() {
        var ticksBase;
        ticksBase = (new Date()).getDatePart().getTime();
        return Math.floor((dateTarget.getTime() - ticksBase) / (1000 * 60)) - Math.floor((self.getTime() - ticksBase) / (1000 * 60));
      };
      this.thenSecond = function() {
        var ticksBase;
        ticksBase = (new Date()).getDatePart().getTime();
        return Math.floor((dateTarget.getTime() - ticksBase) / 1000) - Math.floor((self.getTime() - ticksBase) / 1000);
      };
      this.thenMillisecond = function() {
        return dateTarget.getTime() - self.getTime();
      };
    })(), datePartName);
  };

  /*
  @param format
  @return {String}
  */


  Date.prototype.toFormatString = function(format) {
    var H, HH, M, MM, d, dd, ddd, f, ff, fff, h, hh, m, millis, mm, s, ss, week, yy, yyyy;
    week = new Array("Sun", "Mon", "Tue", "Web", "Tur", "Fri", "Sat");
    yyyy = this.getFullYear().toString();
    yy = yyyy.slice(2);
    M = (this.getMonth() + 1).toString();
    MM = (M.length === 1 ? "0" + M : M);
    d = this.getDate().toString();
    dd = (d.length === 1 ? "0" + d : d);
    ddd = week[this.getDay()];
    H = this.getHours().toString();
    HH = (H.length === 1 ? "0" + H : H);
    h = (this.getHours() % 12).toString();
    hh = (h.length === 1 ? "0" + h : h);
    m = this.getMinutes().toString();
    mm = (m.length === 1 ? "0" + m : m);
    s = this.getSeconds().toString();
    ss = (s.length === 1 ? "0" + s : s);
    millis = "000" + this.getMilliseconds().toString();
    f = millis.substr(millis.length - 3, 1);
    ff = millis.substr(millis.length - 3, 2);
    fff = millis.substr(millis.length - 3, 3);
    if (h === "0") {
      h = "12";
    }
    return format.replace(/yyyy/g, yyyy).replace(/yy/g, yy).replace(/MM/g, MM).replace(/M/g, M).replace(/ddd/g, ddd).replace(/dd/g, dd).replace(/d/g, d).replace(/HH/g, HH).replace(/H/g, H).replace(/hh/g, hh).replace(/h/g, h).replace(/mm/g, mm).replace(/m/g, m).replace(/ss/g, ss).replace(/s/g, s).replace(/fff/g, fff).replace(/ff/g, ff).replace(/f/g, f);
  };

  /*
  @return {Date}
  */


  Date.prototype.clone = function() {
    return new Date(this.getTime());
  };

}).call(this);

(function() {
  Function.prototype.curried = function() {
    var f, iterate;
    iterate = function(varArgs) {
      if (varArgs.length >= f.length) {
        return f.apply(null, varArgs);
      }
      return function() {
        return iterate(varArgs.concat(Array.prototype.slice.call(arguments)));
      };
    };
    f = this;
    if (f.length === 0) {
      return this;
    }
    return iterate([]);
  };

  Function.prototype.andThen = function(g) {
    var self;
    self = this;
    return function(arg) {
      return g(self(arg));
    };
  };

  Function.prototype.compose = function(g) {
    var self;
    self = this;
    return function(arg) {
      return self(g(arg));
    };
  };

  Function.prototype.tupled = function(g) {
    var self;
    self = this;
    return function(args) {
      return self.apply(self, args);
    };
  };

}).call(this);

(function() {
  String.prototype.isEmpty = function() {
    return this.length === 0;
  };

  String.prototype.nonEmpty = function() {
    return this.length !== 0;
  };

  String.prototype.head = function() {
    if (this.isEmpty()) {
      throw "NoSuchElement";
    }
    return this.charAt(0);
  };

  /*
  最初の文字をOptionでラップして返します
  @return {Option[String]} 最初の文字
  */


  String.prototype.headOption = function() {
    if (this.isEmpty()) {
      return None;
    }
    return Some(this.head());
  };

  String.prototype.last = function() {
    if (this.isEmpty()) {
      throw "NoSuchElement";
    }
    return this.charAt(this.length - 1);
  };

  /*
  最後の文字をOptionでラップして返します
  @return {Option[String]} 最後の文字
  */


  String.prototype.lastOption = function() {
    if (this.isEmpty()) {
      return None;
    }
    return Some(this.last());
  };

  /*
  文字列の左側からlength分だけきりとって返します。
  lengthより文字列の長さが短い場合は、文字列がそのまま返ります。
  @param length {Int}
  @returm {String}
  */


  String.prototype.take = function(length) {
    return this.substring(0, length);
  };

  /*
  文字列の右側からlength分だけきりとって返します。
  lengthより文字列の長さが短い場合は、文字列そのままが返ります
  @param length {Int}
  @returm {String}
  */


  String.prototype.takeRight = function(length) {
    var start;
    start = (this.length - length < 0 ? 0 : this.length - length);
    return this.substring(start, this.length);
  };

  String.prototype.contains = function(str) {
    return this.indexOf(str) !== -1;
  };

  /*
  先頭がstrで始まっているかどうかを返します。
  @param str
  @returm {Boolean}
  */


  String.prototype.startsWith = function(str) {
    return this.take(str.length) === str;
  };

  /*
  末尾がstrで終わっているかどうかを返します。
  @param str
  @returm {Boolean}
  */


  String.prototype.endsWith = function(str) {
    return this.takeRight(str.length) === str;
  };

  /*
  書式付文字列
  @param arg
  @return {String} 文字列
  */


  String.prototype.format = function(arg) {
    var argLen, args, repFn, str;
    repFn = void 0;
    str = this;
    if (typeof arg === "object") {
      repFn = function(a, b) {
        if (arg[b]) {
          return arg[b];
        } else {
          return a;
        }
      };
    } else {
      args = arguments;
      argLen = args.length - 1;
      str = str.replace(/(?!\{)*\{\{(\w+)\}\}/g, function(a) {
        var ret;
        args[++argLen] = a.replace("{{", "{").replace("}}", "}");
        ret = "{" + argLen + "}";
        return ret;
      });
      repFn = function(a, b) {
        return args[parseInt(b, 10)];
      };
    }
    return str.replace(/(?!\{)*\{(\w+)\}/g, repFn);
  };

  /*
  Int型へと変換します
  @returns {Number} 変換した値
  */


  String.prototype.toInt = function() {
    return parseInt(this, 10);
  };

  /*
  Float型へと変換します
  @returns {Number} 変換した値
  */


  String.prototype.toFloat = function() {
    return parseFloat(this);
  };

  /*
  Int型へと変換します。変換できない場合は0を返します
  @returns {Number} 変換した値。または0
  */


  String.prototype.toIntOrZero = function() {
    if (isNaN(this)) {
      return 0;
    } else {
      return this.toInt();
    }
  };

  /*
  Float型へと変換します。変換できない場合は0.0を返します
  @returns {Number} 変換した値。または0.0
  */


  String.prototype.toFloatOrZero = function() {
    if (isNaN(this)) {
      return 0.0;
    } else {
      return this.toFloat();
    }
  };

  (function() {
    var charCode;
    charCode = 0xFEE0;
    /*
    全角数字を半角数字へと変換します
    @returns {string} 全角数字が半角数字へと変換した文字列
    */

    String.prototype.toHalfNumber = function() {
      return this.replace(/[０１２３４５６７８９]/g, function(a) {
        return String.fromCharCode(a.charCodeAt(0) - charCode);
      }).replace(/\d+\．\d+/g, function(a) {
        return a.replace("．", ".");
      });
    };
    /*
    全角アルファベットを半角アルファベットへ変換します
    @returns {string} 全角アルファベットを半角アルファベットへと変換した文字列
    */

    String.prototype.toHalfAlphabet = function() {
      return this.replace(/[Ａ-Ｚａ-ｚ]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) - charCode);
      });
    };
  })();

  /*
  全角文字を取り除いた文字列を返します
  @returns {string} 全角文字を取り除いた文字列
  */


  String.prototype.removeFullWidth = function() {
    return this.replace(/[^!-~]/g, "");
  };

}).call(this);
