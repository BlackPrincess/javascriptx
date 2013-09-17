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

  /* ****************************************************** 
  * LeftProjection 
  ****************************************************** */
  "test LeftProjection.get" : function() {
    var val = Either.LeftProjection(Left("test"));
    assertEquals("test", val.get());
  },

  "test LeftProjection.foreach" : function() {
    
    assertEquals("foo", Either.LeftProjection(Left("test")).foreach(function(){
      return "foo";
    }));
    assertUndefined(Either.LeftProjection(Right("test")).foreach(function(){
      return "foo";
    }));
  },

  "test LeftProjection.getOrElse" : function() {
    var val = Either.LeftProjection(Left("test")).getOrElse("a");
    assertEquals("test", Either.LeftProjection(Left("test")).getOrElse("a"));
    assertEquals("a", Either.LeftProjection(Right("test")).getOrElse("a"));
  },

  "test LeftProjection.forall" : function() {
    assertFalse(Either.LeftProjection(Left("test")).forall(function(a) {
      return a !== "test";
    }));
    assertTrue(Either.LeftProjection(Right("test")).forall(function(a) {
      return a !== "test";
    }));
  },

  "test LeftProjection.exists" : function() {
    assertTrue(Either.LeftProjection(Left("test")).exists(function(a) {
      return a === "test";
    }));
    assertFalse(Either.LeftProjection(Right("test")).exists(function(a) {
      return a === "test";
    }));
  },

  "test LeftProjection.flatMap" : function() {
    assertEquals("testfoo", Either.LeftProjection(Left("test")).flatMap(function(a) {
      return a + "foo";
    }));
    assertEquals(Right("test"), Either.LeftProjection(Right("test")).flatMap(function(a) {
      return a + "foo";
    }));
  },

  "test LeftProjection.map" : function() {
    assertEquals(Left("testfoo"), Either.LeftProjection(Left("test")).map(function(a) {
      return a + "foo";
    }));
    assertEquals(None, Either.LeftProjection(Right("test")).map(function(a) {
      return a + "foo";
    }));
  },

  "test LeftProjection.filter" : function() {
    assertEquals(Left("test"), Either.LeftProjection(Left("test")).filter(function(a) {
      return a === "test";
    }).get());
    assertEquals(None, Either.LeftProjection(Left("test")).filter(function(a) {
      return a !== "test";
    }));
    assertEquals(None, Either.LeftProjection(Right("test")).filter(function(a) {
      return a === "test";
    }));
  },

  "test LeftProjection.toSeq" : function() {
    assertEquals(["test"], Either.LeftProjection(Left("test")).toSeq());
    assertEquals([], Either.LeftProjection(Right("test")).toSeq());
  },

  "test LeftProjection.toSeq" : function() {
    assertEquals(["test"], Either.LeftProjection(Left("test")).toSeq());
    assertEquals([], Either.LeftProjection(Right("test")).toSeq());
  },

  "test LeftProjection.toOption" : function() {
    assertEquals(Some("test").get(), Either.LeftProjection(Left("test")).toOption().get());
    assertEquals(None, Either.LeftProjection(Right("test")).toOption());
  },
  /* ****************************************************** 
  * RightProjection 
  ****************************************************** */
  "test RightProjection.get" : function() {
    var val = Either.RightProjection(Right("test"));
    assertEquals("test", val.get());
  },

  "test RightProjection.foreach" : function() {
    
    assertEquals("foo", Either.RightProjection(Right("test")).foreach(function(){
      return "foo";
    }));
    assertUndefined(Either.RightProjection(Left("test")).foreach(function(){
      return "foo";
    }));
  },

  "test RightProjection.getOrElse" : function() {
    var val = Either.RightProjection(Right("test")).getOrElse("a");
    assertEquals("test", Either.RightProjection(Right("test")).getOrElse("a"));
    assertEquals("a", Either.RightProjection(Left("test")).getOrElse("a"));
  },

  "test RightProjection.forall" : function() {
    assertFalse(Either.RightProjection(Right("test")).forall(function(a) {
      return a !== "test";
    }));
    assertTrue(Either.RightProjection(Left("test")).forall(function(a) {
      return a !== "test";
    }));
  },

  "test RightProjection.exists" : function() {
    assertTrue(Either.RightProjection(Right("test")).exists(function(a) {
      return a === "test";
    }));
    assertFalse(Either.RightProjection(Left("test")).exists(function(a) {
      return a === "test";
    }));
  },

  "test RightProjection.flatMap" : function() {
    assertEquals("testfoo", Either.RightProjection(Right("test")).flatMap(function(a) {
      return a + "foo";
    }));
    assertEquals(Right("test"), Either.RightProjection(Left("test")).flatMap(function(a) {
      return a + "foo";
    }));
  },

  "test RightProjection.map" : function() {
    assertEquals(Right("testfoo"), Either.RightProjection(Right("test")).map(function(a) {
      return a + "foo";
    }));
    assertEquals(None, Either.RightProjection(Left("test")).map(function(a) {
      return a + "foo";
    }));
  },

  "test RightProjection.filter" : function() {
    assertEquals(Right("test"), Either.RightProjection(Right("test")).filter(function(a) {
      return a === "test";
    }).get());
    assertEquals(None, Either.RightProjection(Right("test")).filter(function(a) {
      return a !== "test";
    }));
    assertEquals(None, Either.RightProjection(Left("test")).filter(function(a) {
      return a === "test";
    }));
  },

  "test RightProjection.toSeq" : function() {
    assertEquals(["test"], Either.RightProjection(Right("test")).toSeq());
    assertEquals([], Either.RightProjection(Left("test")).toSeq());
  },

  "test RightProjection.toSeq" : function() {
    assertEquals(["test"], Either.RightProjection(Right("test")).toSeq());
    assertEquals([], Either.RightProjection(Left("test")).toSeq());
  },

  "test RightProjection.toOption" : function() {
    assertEquals(Some("test").get(), Either.RightProjection(Right("test")).toOption().get());
    assertEquals(None, Either.RightProjection(Left("test")).toOption());
  },
});