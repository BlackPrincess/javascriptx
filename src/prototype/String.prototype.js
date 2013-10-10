String.prototype.head = function() {
  if(this.length === 0 ) throw "NoSuchElement";
  return this.charAt(0);
};

String.prototype.headOption = function() {
  if(this.length === 0 ) return None;
  return this.head();
};

String.prototype.last = function() {
  if(this.length === 0 ) throw "NoSuchElement";
  return this.charAt(this.length - 1);
};

/**
 * 最初の文字をOptionでラップして返します
 * @return {Option[String]} 最初の文字
 */
String.prototype.lastOption = function() {
  if(this.length === 0 ) return None;
  return this.last();
};

/**
 * 文字列の左側からlength分だけきりとって返します。
 * lengthより文字列の長さが短い場合は、文字列がそのまま返ります。
 * @param length {Int}
 * @returm {String}
 */
String.prototype.left = function(length) {
  return this.substring(0, length);
};

/**
 * 文字列の右側からlength分だけきりとって返します。
 * lengthより文字列の長さが短い場合は、文字列そのままが返ります
 * @param length {Int}
 * @returm {String}
 */
String.prototype.right = function(length) {
  var start = this.length - length < 0 ? 0 : this.length - length;
  return this.substring(start, this.length);
};

/**
 * 先頭がstrで始まっているかどうかを返します。
 * @param str
 * @returm {Boolean}
 */
String.prototype.startsWith = function(str) {
  return this.left(str.length) === str;
};

/**
 * 末尾がstrで終わっているかどうかを返します。
 * @param str
 * @returm {Boolean}
 */
String.prototype.endsWith = function(str) {
  return this.right(str.length) === str;
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


