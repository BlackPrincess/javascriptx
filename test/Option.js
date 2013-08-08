TestCase("Test Option",{
  "test Some" : function() {
    var actual = Some("test");
    assertFalse(actual.isEmpty);
    assertEquals("test", actual.get());
  },
  "test None" : function() {
    assertTrue(None.isEmpty);
  },

  "test Option.equals" : function() {
    assertTrue(None.equals(None));
    assertTrue(Some("foo").equals(Some("foo")));
    assertFalse(Some("foo").equals(None));
    assertFalse(Some("foo").equals(Some("bar")));
  },

  "test Option.isDefined" : function() {
    assertFalse(None.isDefined());
    assertTrue(Some("test").isDefined());
  },

  "test Option.getOrElse" : function() {
    assertEquals("foo", None.getOrElse("foo"));
    assertEquals("bar", Some("bar").getOrElse("foo"));
  },

  "test Option.orNull" : function() {
    assertNull(None.orNull());
    assertEquals("foo", Some("foo").orNull());
  },

  "test Option.orElse" : function() {
    assertTrue(Some("foo").equals(Some("foo").orElse("bar")));
    assertEquals("bar", None.orElse("bar"));
  },

  "test Option.exists" : function() {
    assertFalse(None.exists());
    assertFalse(Some("foo").exists(function(a){return a !== "foo";}));
    assertTrue(Some("foo").exists(function(a){return a === "foo";}));
  },

  "test Option.forall" : function() {
    assertTrue(None.forall());
    assertFalse(Some("foo").forall(function(a){return a !== "foo";}));
    assertTrue(Some("foo").forall(function(a){return a === "foo";}));
  },

  "test Option.map" : function() {
    assertEquals(None, None.map());
    assertTrue(Some("foobar").equals(Some("foo").map(function(a){ return a + "bar";})));
  },

  "test Option.flatMap" : function() {
    assertEquals(None, None.flatMap());
    assertEquals("foo", Some("foo").flatMap(function(a){ return a;}));
  },

  "test Option.filter" : function() {
    assertEquals(None, None.filter());
    assertTrue(Some("foo").equals(Some("foo").filter(function(a){ return a === "foo" })));
    assertFalse(Some("foo").equals(Some("bar").filter(function(a){ return a !== "bar" })));
  },

  "test Option.withFilter" : function() {
    // TODO:Test withFilter
  },

  "test Option.fold" : function() {
    assertEquals("foo", None.fold(function(){ return "foo";}));
    assertTrue(Some("foo").fold(function(){}, function(a){ return a === "foo";}));
  },

  "test Option.match" : function() {
    assertEquals("bar", None.match(function(a){return a + a;}, function(){return "bar";}));
    assertEquals("foofoo", Some("foo").match(function(a){return a + a;}, function(){return "bar";}));
  },

  "test Option.foreach" : function() {
    assertNotEquals("foo", None.foreach(function(){ return "foo";}));
    assertEquals("foobar", Some("foo").foreach(function(a){ return a + "bar";}));
  },

  "test Option.collect" : function() {
    var pf = function(a) {
      return a + a;
    };
    pf.isDefinedAt = function(b) {
      return typeof b === "string";
    };
    assertTrue(Some("foo").collect(pf).equals(Some("foofoo")));
    assertTrue(Some(123).collect(pf).equals(None));
    assertTrue(None.collect(pf).equals(None));
  },

  "test Option.iterator" : function() {
  	assertEquals([], None.iterator());
  	assertEquals(["foo"], Some("foo").iterator());
  },

  "test Option.apply" : function() {
  	assertEquals(None, Option.apply(null));
  	assertEquals(None, Option.apply());
  	assertTrue(Some("foo").equals(Option.apply("foo")));
  },

  "test Some.apply" : function() {
  	assertNotEquals(None, Some.apply(null));
  	assertEquals(None, Some.apply());
  	assertTrue(Some("foo").equals(Some.apply("foo")));
  },

  "test exsamples" : function() {
    var foo = function(a) {
      return (a === 0) ? None : Some(10 / a);
    }
    assertTrue(foo(0).isEmpty);
    assertFalse(foo(1).isEmpty);
    assertEquals(5, foo(2).get());
  },
});