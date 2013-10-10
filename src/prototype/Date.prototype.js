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