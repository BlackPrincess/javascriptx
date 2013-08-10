TestCase("Test Either",{
  "test Left" : function() {
    var actual = Left("test");
    assertTrue(actual.isLeft);
    assertFalse(actual.isRight);
    assertEquals("test", actual.a);
  },

  "test Right" : function() {
    var actual = Right("test");
    assertTrue(actual.isRight);
    assertFalse(actual.isLeft);
    assertEquals("test", actual.b);
  },

  "test Either.fold" : function() {
    var testmethod = function(a, isLeft) {
      var target = (isLeft) ? Left(a) : Right(a);
      return target.fold(function(a) {
        return a * a;
      }, function(b) {
        return b + b;
      });
    };
    
    assertEquals(9, testmethod(3, true));
    assertEquals(6, testmethod(3, false));
  },

  "test Either.swap" : function() {
    var actual = Left("test").swap();
    assertTrue(actual.isRight);
    assertFalse(actual.isLeft);
    assertEquals("test", actual.b);
  },

  "test Either.swap 2" : function() {
    var actual = Right("test").swap();
    assertTrue(actual.isLeft);
    assertFalse(actual.isRight);
    assertEquals("test", actual.a);
  },

  "test Either.joinLeft" : function() {
    var actual = Left("test").joinLeft();
    var actual2 = Right("test").joinLeft();
    assertEquals("test", actual.a);
    assertEquals("test", actual2.b.b);
  },
  "test Either.joinRight" : function() {
    var actual = Right("test").joinRight();
    var actual2 = Left("test").joinRight();
    assertEquals("test", actual.b);
    assertEquals("test", actual2.a.a);
  },

  "test Either.merge" : function() {
    var val = "test";
    var actual = Either.merge(Left(val));
    var excepted = Either.merge(Right(val));
    assertEquals(excepted, actual);
  },
});