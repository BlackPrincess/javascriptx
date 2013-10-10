TestCase("Test Function Prototype",{
	"test Function.prototype.curried 1" : function() {
		var target = (function(){
			return 0;
		}).curried();

		var actual = target();
		assertEquals(0, actual);
	},
	"test Function.prototype.curried 2" : function() {
		var target = (function(a){
			return a;
		}).curried();

		var actual = target(1);
		assertEquals(1, actual);
	},
	"test Function.prototype.curried 3"  : function() {
		var target = (function(a,b,c,d){
			return a + b + c + d;
		}).curried();

		var f1 = target(1);
		assertFunction(f1);

		var f2 = target(1)(1);
		assertFunction(f2);

		var actual = target(1)(2)(3)(4);
		assertNumber(actual);
		assertEquals(10, actual);
	},

	"test Function.prototype.andThen" : function() {
		var f = function(a) { return a + 10; };
		var g = function(a) { return a * 2; };
		var target = f.andThen(g);
		var actual = target(1);
		assertEquals(22, actual);
	},

	"test Function.prototype.compose" : function() {
		var f = function(a) { return a + 10; };
		var g = function(a) { return a * 2; };
		var target = f.compose(g);
		var actual = target(1);
		assertEquals(12, actual);
	},

	"test Function.prototype.tupled" : function() {
		var f = function(a,b,c) { return a + b * c}
		var g = f.tupled();
		assertEquals(f(1,2,3), g([1,2,3]));
	}
});