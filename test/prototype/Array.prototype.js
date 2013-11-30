TestCase("Test Array Prototype",{
  "test Array.prototype.sum" : function() {
    var actual0 = [].sum();
    assertNumber(actual0);
    assertEquals(0, actual0);

    var actual1 = [5].sum();
    assertNumber(actual1);
    assertEquals(5, actual1);

    var actual2 = [1,2,3].sum();
    assertNumber(actual2);
    assertEquals(6, actual2);
  },

  "test Array.prototype.head" : function() {
    var actual = ["foo", "bar"].head();
    assertEquals("foo", actual);
  },

  "test Array.prototype.headOption" : function() {
    var actual = [].headOption();
    assertEquals(None, actual);
  },

  "test Array.prototype.last" : function() {
    var actual = ["foo", "bar"].last();
    assertEquals("bar", actual);
  },

  "test Array.prototype.get" : function() {
    var actual = ["foo", "bar"].get(1);
    assertEquals("bar", actual);
  },

  "test Array.prototype.getOrElse" : function() {
    var actual = ["foo", "bar"].getOrElse(2, "hoge");
    assertEquals("hoge", actual);
  },
  "test Array.prototype.getOrElseUpdate" : function() {
    var target = ["foo", "bar"];
    var actual = target.getOrElseUpdate(2, "hoge");
    assertEquals("hoge", actual);
    assertEquals(3, target.length);
  },

  "test Array.prototype.flatten" : function() {
    var actual = [[1,2],[3,4]].flatten();
    assertEquals([1,2,3,4].toString(), actual.toString());
  },

  "test Array.prototype.flatMap" : function() {
   var actual = [[1,2], [3,4]].flatMap(function(a) { return a.map(function(i){ return i * 2;}) });
   assertEquals([2,4,6,8].toString(), actual.toString())
  },

  "test Array.prototype.trimStart" : function() {
    var actual = ['a', 'b', 'c', 'd'].trimStart(2);
    assertEquals(['c', 'd'].toString(), actual.toString());
  },

  "test Array.prototype.trimEnd" : function() {
    var actual = ['a', 'b', 'c', 'd'].trimEnd(2);
    assertEquals(['a', 'b'].toString(), actual.toString());
  },

  "test Array.prototype.sliceAt" : function() {
    var actual = [0,1,2,3].sliceAt(3);
    assertEquals(3, actual[0].length);
    assertEquals(1, actual[1].length);
  },

  "test Array.prototype.insert" : function() {
    var actual = ['a','b'].insert(1, 'c');
    assertEquals(['a','c','b'].toString(), actual.toString());
    var actual2 = ['a', 'b'].insert(1, 'c', 'd');
    assertEquals(['a', 'c', 'd', 'b'].toString(), actual2.toString());
  },

  "test Array.prototype.insertAll" : function() {
    var actual = ['a', 'b'].insertAll(1, ['c','d']);
    assertEquals(['a', 'c', 'd', 'b'].toString(), actual.toString());
  },

  "test Array.prototype.remove" : function() {
    var actual = ['a', 'b', 'c', 'd'].remove(1, 2);
    assertEquals(['a', 'd'].toString(), actual.toString());
  },

  "test Array.prototype.zip" : function() {
    var target = ["foo", "bar", "hoge"];
    var actual = target.zip(["FOO", "BAR"]);
    assertEquals("foo", actual[0][0]);
    assertEquals("FOO", actual[0][1]);
    assertEquals("bar", actual[1][0]);
    assertEquals("BAR", actual[1][1]);
    assertUndefined(actual[2]);
  },

  "test Array.prototype.zipAll" : function() {
    var target = ["foo", "bar", "hoge"];
    var actual = target.zipAll(["FOO", "BAR"], "defaultA", "defaultB");
    assertEquals("foo", actual[0][0]);
    assertEquals("FOO", actual[0][1]);
    assertEquals("bar", actual[1][0]);
    assertEquals("BAR", actual[1][1]);
    assertEquals("hoge", actual[2][0]);
    assertEquals("defaultB", actual[2][1]);
    var actual = target.zipAll(["FOO", "BAR", "HOGE", "PIYO"], "defaultA", "defaultB");
    assertEquals("defaultA", actual[3][0]);
    assertEquals("PIYO", actual[3][1]);
  },

  "test Array.prototype.clone" : function() {
    var actual = [1, 2];
    actual.clone().shift();
    assertEquals(1, actual[0]);
    assertEquals(2, actual[1]);
  }
});