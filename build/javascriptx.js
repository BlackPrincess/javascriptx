function Either() {}

Either.prototype.left = function() {
  return Either.LeftProjection(this);
};

Either.prototype.right = function() {
  return Either.RightProjection(this);
};

Either.prototype.fold = function(fa, fb) {
  return (this.isLeft) ? fa(this.a) : fb(this.b);
};

Either.prototype.swap = function() {
  return (this.isLeft) ? Right(this.a) : Left(this.b);
};

Either.prototype.joinRight = function() {
  return (this.isRight) ? Right(this.b) : Left(Left(this.a));
};

Either.prototype.joinLeft = function() {
  return (this.isLeft) ? Left(this.a) : Right(Right(this.b));
};

Either.merge = function(e) {
  return (e.isLeft) ? e.a : e.b;
};

Either.LeftProjection = function(e) {
  return new LeftProjection(e);
};

Either.RightProjection = function(e) {
  return new RightProjection(e);
};

function Left(a) {
  return new _Left(a);
}

function _Left(a) {
  this.isLeft = true;
  this.isRight = false;
  this.a = a;
  // this.b = undefined;
}

_Left.prototype = new Either();

function Right(b) {
  return new _Right(b);
}

function _Right(b) {
  this.isLeft = false;
  this.isRight = true;
  // this.a = undefined;
  this.b = b;
}
_Right.prototype = new Either();

function LeftProjection(e) {
  this.get = function() {
    if(!e.isLeft) {
      throw "Either.left.value on Right";
    } else {
      return e.a;
    }
  };

  this.foreach = function(f) {
    if(e.isLeft) {
      return f(e.a);
    }
  };

  this.getOrElse = function(or) {
    return e.isLeft ? e.a : or;
  };

  this.forall = function(f) {
    return e.isLeft ? f(e.a) : true;
  };

  this.exists = function(f) {
    return e.isLeft ? f(e.a) : false;
  };

  this.flatMap = function(f) {
    return e.isLeft ? f(e.a) : Right(e.b);
  };

  this.map = function(f) {
    return e.isLeft ? Left(f(e.a)) : None;
  };

  this.filter = function(p) {
    if(e.isLeft) {
      return (p(e.a)) ? Some(Left(e.a)) : None;
    } else {
      return None;
    }
  };

  this.toSeq = function() {
    return e.isLeft ? [e.a] : [];
  };

  this.toOption = function() {
    return e.isLeft ? Some(e.a) : None;
  };
}

function RightProjection(e) {
  this.get = function() {
    if(!e.isRight) {
      throw "Either.right.value on Left";
    } else {
      return e.b;
    }
  };

  this.foreach = function(f) {
    if(e.isRight) {
      return f(e.b);
    }
  };

  this.getOrElse = function(or) {
    return e.isRight ? e.b : or;
  };

  this.forall = function(f) {
    return e.isRight ? f(e.b) : true;
  };

  this.exists = function(f) {
    return e.isRight ? f(e.b) : false;
  };

  this.flatMap = function(f) {
    return e.isRight ? f(e.b) : Right(e.a);
  };

  this.map = function(f) {
    return e.isRight ? Right(f(e.b)) : None;
  };

  this.filter = function(p) {
    if(e.isRight) {
      return (p(e.b)) ? Some(Right(e.b)) : None;
    } else {
      return None;
    }
  };

  this.toSeq = function() {
    return e.isRight ? [e.b] : [];
  };

  this.toOption = function() {
    return e.isRight ? Some(e.b) : None;
  };
}
var None;
function Option() {
}

// Option.prototype = new Product();
Option.prototype.equals = function(a) {
  return (this.isEmpty && a.isEmpty) || (!this.isEmpty && !a.isEmpty && this.get() === a.get());
};

Option.prototype.isDefined = function() {
  return !this.isEmpty;
};

Option.prototype.getOrElse = function(d) {
  return this.isEmpty ? d : this.get();
};

Option.prototype.orNull = function() {
  return this.isEmpty ? null : this.get();
};

Option.prototype.orElse = function(a) {
  return this.isEmpty ? a : this;
};

Option.prototype.exists = function(p) {
  return !this.isEmpty && p(this.get());
};

Option.prototype.forall = function(p) {
  return this.isEmpty || p(this.get());
};

Option.prototype.map = function(f) {
  return this.isEmpty ? None : Some(f(this.get()));
};

Option.prototype.flatMap = function(f) {
  return this.isEmpty ? None : f(this.get());
};

Option.prototype.filter = function(p) {
  return (this.isEmpty || p(this.get())) ? this : None;
};

Option.prototype.withFilter = function(a) {
  var self = this;

  function WithFilter(p){
    this.map = function(f) {
      return self.filter(p).map(f);
    };
    this.flatMap = function(f) {
      return self.filter(p).flatMap(f);
    };
    this.foreach = function(f) {
      return self.filter(p).foreach(f);
    };
    this.withFilter = function(q) {
      return new WithFilter(function(x){ return p(x) && q(x);});
    };
  }
  return new WithFilter(a);
};

// いらないんじゃね
Option.prototype.fold = function(ifEmpty, f) {
  return this.isEmpty ? ifEmpty() : f(this.get());
};

Option.prototype.match = function(some, none) {
  return this.isEmpty ? none() : some(this.get());
};

Option.prototype.foreach = function(f) {
  if(!this.isEmpty) {
    return f(this.get());
  }
};

Option.prototype.collect = function(pf) {
  return (!this.isEmpty && pf.isDefinedAt(this.get())) ? Some(pf(this.get())) : None;
};

Option.prototype.iterator = function() {
  return this.isEmpty ? [] : [this.get()];
};

// apply is not good?
Option.apply = function(a) {
  if(a === undefined || a === null) {
    return None;
  } else {
    return Some(a);
  }
};

function Some(a) {
  return new _Some(a);
}

function _Some(a) {
  this.isEmpty = false;
  this.get = function() {
    return a;
  };
}
_Some.prototype = new Option();


Some.apply = function(a) {
  if(a === undefined) {
    return None;
  } else {
    return new Some(a);  // null can come
  }
};

function _None() {
  this.isEmpty = true;
  this.get = function() {
    throw "NoSuchElementException(None.get)";
  };
}

_None.prototype = new Option();

None = new _None(); /*const*/
Array.prototype.sum = function() {
  if(this.length === 0) {
    return 0;
  } else if (this.length === 1){
    return parseInt(this[0], 10);
  }
  return this.reduce(function(x, y) { return x + y; });
};

Array.prototype.head = function() {
  if(this.length === 0 ) throw "NoSuchElement";
  return this[0];
};

Array.prototype.headOption = function() {
  return Option.apply(this[0]);
};

Array.prototype.last = function() {
  if(this.length === 0 ) throw "NoSuchElement";
  return this[this.length - 1];
};

Array.prototype.lastOption = function() {
  return Option.apply(this[this.length -1 ]);
};

Array.prototype.get = function(i) {
  return this[i];
};

Array.prototype.getOrElse = function(i, or) {
  return this[i] !== undefined ? this[i] : or;
};


/**
 * Returns a sequence formed from this sequence and another sequence 
 * by combining corresponding elements in pairs
 * if the two sequence is not same length, the length of returning sequence is same short one's.
 * @param {Array} arr
 * @return {Array} combined corresponding elements in pairs
 */
Array.prototype.zip = function(arr) {
  var ret = [];
  var base = (this.length < arr.length) ? this : arr;
  for(var i = 0, l = base.length; i < l; ++i) {
    ret[i] = [this[i], arr[i]];
  }
  return ret;
};

/**
 * Returns a sequence formed from this sequence and another sequence 
 * by combining corresponding elements in pairs
 * if the two sequence is not same length, 
 * this sequence will be padded with defaultA or another sequence will be padded with defaultB.
 * @param {Array} arr
 * @param {Object} defaultA 
 * @param {Object} defaultB
 * @return {Array} combined corresponding elements in pairs.
 */
Array.prototype.zipAll = function(arr, defaultA, defaultB) {
  var ret = [];
  var base = (this.length > arr.length) ? this : arr;
  for(var i = 0, l = base.length; i < l; ++i) {
    var a = (this[i] === undefined) ? defaultA : this[i];
    var b = (arr[i] === undefined) ? defaultB : arr[i];
    ret[i] = [a, b];
  }
  return ret;
};

Array.prototype.clone = function() {
  return Array.apply(null, this);
};

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
  /**
   * 該当付きに何日あるかを返します
   * @return {Number}
   */
  Date.prototype.getMonthLength = function() {
    return this.getMonthLast().getDate();
  };

  /**
   * 前の付きを返します
   * @return {Date}
   */
  Date.prototype.getPrevMonth = function() {
    return this.dateAdd("month", -1);
  };

  /**
   * 翌月を返します
   * @return {Date}
   */
  Date.prototype.getNextMonth = function() {
    return this.dateAdd("month", 1);
  };

  /**
   * 月の初めの日を取得します
   * @return {Date}
   */
  Date.prototype.getMonthFirst = function() {
    var that = this.getDatePart();
    that.setDate(1);
    return that;
  };

  /**
   * 月の終わりの日を取得します
   * @return {Date}
   */
  Date.prototype.getMonthLast = function() {
    var ret = this.getMonthFirst();
    ret.setMonth(ret.getMonth() + 1);
    ret.setDate(0);
    return ret;
  };

  /**
   * 日付の部分のみを返します。時間・分などの情報は切り捨てられます
   * @return {Date}
   */
  Date.prototype.getDatePart = function(){
    var ret = this.clone();
    ret.setHours(0);
    ret.setMinutes(0);
    ret.setSeconds(0);
    ret.setMilliseconds(0);
    return ret;
  };

  // TODO: Hack me
  var unificationDatePartName = function(datePartName) {
    switch(datePartName) {
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

  // TODO:Hack me
  var datePartExec = function(datePartName, varArgs) {
    switch(unificationDatePartName(datePartName)) {
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

  /**
   * 日付の部分を指定して加算を行います
   * @param datePartName year,y,month,m,day,date,d,week,hour,minute,second,millisecondのいずれか
   * @param spanCount 加算する値
   * @return {Date}
   */
  Date.prototype.dateAdd = function(datePartName, spanCount) {
    var self = this;
    var ret = this.clone();
    return datePartExec.call(
      (function() {
        this.thenYear = function() {
          return self.dateAdd("month", spanCount * 12);
        };
        this.thenMonth = function() {
          var d = ret.getDate();
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

  /**
   *
   * @param datePartName year,y,month,m,day,date,d,week,hour,minute,second,millisecondのいずれか
   * @param dateTarget
   * @return {Date}
   */
  Date.prototype.dateDiff = function(datePartName, dateTarget) {
    var self = this;
    return datePartExec.call(
      (function() {
        this.thenYear = function() {
          return dateTarget.getFullYear() - self.getFullYear();
        };
        this.thenMonth = function() {
          return self.dateDiff("year", dateTarget) * 12 + dateTarget.getMonth() - self.getMonth();
        };
        this.thenDay = function() {
          var ticksBase = (new Date()).getDatePart().getTime();
          return Math.floor((dateTarget.getTime() - ticksBase) / (1000*60*60*24)) -
            Math.floor((self.getTime() - ticksBase) / (1000*60*60*24));
        };
        this.thenWeek = function() {
          return Math.floor(self.dateDiff("day", dateTarget) / 7);
        };
        this.thenHour = function() {
          var ticksBase = (new Date()).getDatePart().getTime();
          return Math.floor((dateTarget.getTime() - ticksBase) / (1000*60*60)) -
            Math.floor((self.getTime() - ticksBase) / (1000*60*60));
        };
        this.thenMinute = function() {
          var ticksBase = (new Date()).getDatePart().getTime();
          return Math.floor((dateTarget.getTime() - ticksBase) / (1000*60)) -
            Math.floor((self.getTime() - ticksBase) / (1000*60));
        };
        this.thenSecond = function() {
          var ticksBase = (new Date()).getDatePart().getTime();
          return Math.floor((dateTarget.getTime() - ticksBase) / 1000) -
            Math.floor((self.getTime() - ticksBase) / 1000);
        };
        this.thenMillisecond = function() {
          return dateTarget.getTime() - self.getTime();
        };
      })(), datePartName);
  };

  /**
   * @param format
   * @return {String}
   */
  Date.prototype.toFormatString = function(format) {
    // TODO:言語別に変更可能にする
    var week = new Array("Sun","Mon","Tue","Web","Tur","Fri","Sat");

    var yyyy = this.getFullYear().toString();
    var yy = yyyy.slice(2);
    var M = (this.getMonth() + 1).toString();
    var MM = M.length === 1 ? "0" + M : M;
    var d = this.getDate().toString();
    var dd = d.length === 1 ? "0" + d : d;
    var ddd = week[this.getDay()];
    var H = this.getHours().toString();
    var HH = H.length === 1 ? "0" + H : H;
    var h = (this.getHours() % 12).toString();
    var hh = h.length === 1 ? "0" + h : h;
    var m = this.getMinutes().toString();
    var mm = m.length === 1 ? "0" + m : m;
    var s = this.getSeconds().toString();
    var ss = s.length === 1 ? "0" + s : s;
    var millis = "000" + this.getMilliseconds().toString();
    var f = millis.substr(millis.length - 3, 1);
    var ff = millis.substr(millis.length - 3, 2);
    var fff = millis.substr(millis.length - 3, 3);

    if(h === "0") {
      h = "12";
    }

    return format
      .replace(/yyyy/g, yyyy)
      .replace(/yy/g, yy)
      .replace(/MM/g, MM)
      .replace(/M/g, M)
      .replace(/ddd/g, ddd)
      .replace(/dd/g, dd)
      .replace(/d/g, d)
      .replace(/HH/g, HH)
      .replace(/H/g, H)
      .replace(/hh/g, hh)
      .replace(/h/g, h)
      .replace(/mm/g, mm)
      .replace(/m/g, m)
      .replace(/ss/g, ss)
      .replace(/s/g, s)
      .replace(/fff/g, fff)
      .replace(/ff/g, ff)
      .replace(/f/g, f);
  };

  /**
   *
   * @return {Date}
   */
  Date.prototype.clone = function() {
    return new Date(this.getTime());
  };

})();
Function.prototype.curried = function() {
  var f = this;
  if (f.length === 0) {
    return this;
  }
  function iterate(varArgs) {
    if (varArgs.length >= f.length)
      return f.apply(null, varArgs);
    return function () {
      return iterate(varArgs.concat(Array.prototype.slice.call(arguments)));
    };
  }
  return iterate([]);
};

Function.prototype.andThen = function(g) {
	var self = this;
	return function(arg) {
		return g(self(arg));
	};
};

Function.prototype.compose = function(g) {
	var self = this;
	return function(arg) {
		return self(g(arg));
	};
};
/**
 * 書式付文字列
 * @param arg
 * @return {String} 文字列
 */
String.prototype.format = function(arg) {
  var repFn;
  var str = this;
  
  if (typeof arg === "object") {
    // "{name}".format({name:"name"})
    repFn = function(a, b) { return arg[b] ? arg[b] : a; };
  } else {
    // "{0}".format("name");
    var args = arguments;
    var argLen = args.length - 1;
    // {{0}} は {0} で出力させる。置き換えない
    str = str.replace(/(?!\{)*\{\{(\w+)\}\}/g, function(a) {
      args[++argLen] = a.replace("{{", "{").replace("}}", "}");
      var ret = "{" + argLen + "}";
      return ret;
    });
    repFn = function(a, b) { return args[ parseInt(b, 10) ]; };
  }
  
  return str.replace( /(?!\{)*\{(\w+)\}/g, repFn );
};

/**
 * Int型へと変換します
 * @returns {Number} 変換した値
 */
String.prototype.toInt = function() {
  return parseInt(this, 10);
};

/**
 * Float型へと変換します
 * @returns {Number} 変換した値
 */
String.prototype.toFloat = function() {
  return parseFloat(this);
};

/**
 * Int型へと変換します。変換できない場合は0を返します
 * @returns {Number} 変換した値。または0
 */
String.prototype.toIntOrZero = function() {
  return (isNaN(this)) ? 0 : this.toInt();
};

/**
 * Float型へと変換します。変換できない場合は0.0を返します
 * @returns {Number} 変換した値。または0.0
 */
String.prototype.toFloatOrZero = function() {
  return (isNaN(this)) ? 0.0 : this.toFloat();
};


(function(){
  var charCode = 0xFEE0;
  /**
   * 全角数字を半角数字へと変換します
   * @returns {string} 全角数字が半角数字へと変換した文字列
   */
  String.prototype.toHalfNumber = function() {
    return this.replace(/[０１２３４５６７８９]/g, function(a){
      return String.fromCharCode(a.charCodeAt(0) - charCode);
    }).replace(/\d+\．\d+/g, function(a) {
      return a.replace("．", ".");
    });
  };

  /**
   * 全角アルファベットを半角アルファベットへ変換します
   * @returns {string} 全角アルファベットを半角アルファベットへと変換した文字列
   */
  String.prototype.toHalfAlphabet = function() {
    return this.replace(/[Ａ-Ｚａ-ｚ]/g, function(s){
      return String.fromCharCode(s.charCodeAt(0) - charCode);
    });
  };
})();

/**
 * 全角文字を取り除いた文字列を返します
 * @returns {string} 全角文字を取り除いた文字列
 */
String.prototype.removeFullWidth = function() {
  return this.replace(/[^!-~]/g, "");
};


