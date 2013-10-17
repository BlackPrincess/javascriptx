TestCase("Test Boolean Prototype",{
  "test Boolean.unless" : function() {
    Boolean.unless(true)(function() {
        fail();
    });
    var passed = false;
    Boolean.unless(false)(function() {
        passed = true;
    });
    assertTrue(passed);
  },
  "test Boolean.when" : function () {
    Boolean.when(false)(function(){
        fail();
    });
    var passed = false;
    Boolean.when(true)(function() {
        passed = true;
    });
    assertTrue(passed);
  },
  "test Boolean.prototype.unless" : function() {
    true.unless(function() {
        fail();
    });
    var passed = false;
    false.unless(function() {
        passed = true;
    });
    assertTrue(passed);
  },
  "test Boolean.prototype.when" : function () {
    false.when(function(){
        fail();
    });
    var passed = false;
    true.when(function() {
        passed = true;
    });
    assertTrue(passed);
  }
});