function Either() {
}

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

  this.foreach = function() {
    throw "Not implements Error";
  };

  this.getOrElse = function() {
    throw "Not implements Error";
  };

  this.forall = function() {
    throw "Not implements Error";
  };

  this.exists = function() {
    throw "Not implements Error";
  };

  this.flatMap = function() {
    throw "Not implements Error";
  };

  this.map = function() {
    throw "Not implements Error";
  };

  this.filter = function() {
    throw "Not implements Error";
  };

  this.toSeq = function() {
    throw "Not implements Error";
  };

  this.toOption = function() {
    throw "Not implements Error";
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

  this.foreach = function() {
    throw "Not implements Error";
  };

  this.getOrElse = function() {
    throw "Not implements Error";
  };

  this.forall = function() {
    throw "Not implements Error";
  };

  this.exists = function() {
    throw "Not implements Error";
  };

  this.flatMap = function() {
    throw "Not implements Error";
  };

  this.map = function() {
    throw "Not implements Error";
  };

  this.filter = function() {
    throw "Not implements Error";
  };

  this.toSeq = function() {
    throw "Not implements Error";
  };

  this.toOption = function() {
    throw "Not implements Error";
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


