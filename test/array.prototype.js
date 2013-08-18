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

  "test Array.prototype.first" : function() {
    var actual = ["foo", "bar"].first();
    assertEquals("foo", actual);
  },

  "test Array.prototype.firstOption" : function() {
    var actual = [].firstOption();
    assertEquals(None, actual);
  },

  "test Array.prototype.last" : function() {
    var actual = ["foo", "bar"].last();
    assertEquals("bar", actual);
  },

  "test Array.prototype.clone" : function() {
    var actual = [1, 2];
    actual.clone().shift();
    assertEquals(1, actual[0]);
    assertEquals(2, actual[1]);
  }
});