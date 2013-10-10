TestCase("Test String Prototype", {

  "test String.prototype.isEmpty" : function() {
    assertTrue("".isEmpty());
    assertFalse("a".isEmpty());
  },

  "test String.prototype.nonEmpty" : function() {
    assertFalse("".nonEmpty());
    assertTrue("a".nonEmpty());
  },

  "test String.prototype.head" : function() {
    assertNoException(function() {"abc".last();});
    var actual = "abc".head();
    assertEquals("a", actual);
    assertException(function(){ "".last() });
  },

  "test String.prototype.headOption" : function() {
    var actual = "".headOption();
    assertEquals(None, actual);
  },

  "test String.prototype.last" : function() {
    assertNoException(function() {"abc".last();});
    var actual = "abc".last();
    assertEquals("c", actual);
    assertException(function(){ "".last() });
  },

  "test String.prototype.lastOption" : function() {
    var actual = "".lastOption();
    assertEquals(None, actual);
  },

  "test String.prototype.left" : function() {
    var actual = "abcd".left(2);
    assertEquals("ab", actual);
    assertEquals("", "".left(10));
  },

  "test String.prototype.right" : function() {
    var actual = "abcd".right(2);
    assertEquals("cd", actual);
    assertEquals("abcd", "abcd".right(10));
  },

  "test String.prototype.contains" : function () {
    assertTrue("abc".contains("ab"));
    assertFalse("abc".contains("d"));
  },

  "test String.prototype.startsWith" : function() {
    assertTrue("abcd".startsWith("ab"));
    assertFalse("abcd".startsWith("cd"));
  },

  "test String.prototype.endsWith" : function() {
    assertTrue("abcd".endsWith("cd"));
    assertFalse("abcd".endsWith("ab"));
  },

  "test String.prototype.format": function(){
    var actual = "{0} is Foo.{1} is Bar".format("Foo", "Bar");
    assertString(actual);
    assertEquals("Foo is Foo.Bar is Bar", actual);
  },
  "test String.prototype.format {{0}}": function(){
    var actual = "{0} is Foo.{{0}} is Bar".format("Foo");
    assertString(actual);
    assertEquals("Foo is Foo.{0} is Bar", actual);
  },
  
  "test String.prototype.format arguments is object": function(){
    var actual = "{foo} is Foo.{bar} is Bar".format({foo:"Foo",bar:"Bar"});
    assertString(actual);
    assertEquals("Foo is Foo.Bar is Bar", actual);
  },
  
  "test String.prototype.format arguments is object(2)": function(){
    var actual = "{foo} is Foo.{bar} is Bar".format({foo:"Foo"});
    assertString(actual);
    assertEquals("Foo is Foo.{bar} is Bar", actual);
  },

  "test String.prototype.toInt (NaN)" : function() {
    var actual = "NaN".toInt();
    assertNaN(actual);
  },

  "test String.prototype.toInt" : function() {
    var actual = "0123".toInt();
    assertNumber(actual);
    assertEquals(123, actual);
  },

  "test String.prototype.toFloat (NaN)" : function() {
    var actual = "NaN".toFloat();
    assertNaN(actual);
  },

  "test String.prototype.toFloat" : function() {
    var actual = "00.123".toFloat();
    assertNumber(actual);
    assertEquals(0.123, actual);
  },

  "test String.prototype.toIntOrZero" : function() {
    var actual = "0123".toIntOrZero();
    assertNumber(actual);
    assertEquals(123, actual);
  },

  "test String.prototype.toIntOrZero NaN" : function() {
    var actual = "NaN".toIntOrZero();
    assertNumber(actual);
    assertEquals(0, actual);
  },

  "test String.prototype.toFloatOrZero" : function() {
    var actual = "00.123".toFloatOrZero();
    assertNumber(actual);
    assertEquals(0.123, actual);
  },

  "test String.prototype.toFloatOrZero NaN" : function() {
    var actual = "NaN".toFloatOrZero();
    assertNumber(actual);
    assertEquals(0, actual);
  },

  "test String.prototype.toHalfNumber" : function() {
    // TODO:JsTestDriverで実行できるように対応
    // var actual = "０．２".toHalfNumber();
    // assertString(actual);
    // assertEquals("0.2", actual);  // ブラウザ上の実行結果とテストの結果が違う…？
  },
  "test String.prototype.toHalfNumber (2)" : function() {
    // TODO:JsTestDriverで実行できるように対応
    // var actual = "私．さん".toHalfNumber();
    // assertString(actual);
    // assertEquals("私．さん", actual);  // ブラウザ上の実行結果とテストの結果が違う…？
  },
  "test String.prototype.toHalfAlphabet" : function() {
    // TODO:JsTestDriverで実行できるように対応
//    var actual = "Ａ-Ｚａ-ｚ".toHalfAlphabet();
//    assertString(actual);
//    assertEquals("A-Za-Z", actual);
  },
  "test String.prototype.removeFullWidth" : function() {
    var target = "a" + String.fromCharCode(128);
    var actual = target.removeFullWidth();
    assertEquals("a", actual);
  }
});