Function.prototype.curried = function() {
  var f = this;
  if (f.length === 0) {
    return this;
  }
  function iterate(varArgs) {
    if (varArgs.length >= f.length)
      return f.apply(null, varArgs);
    return function () {
      return iterate(varArgs.concat(Array.prototype.slice.call(arguments)));
    };
  }
  return iterate([]);
};

Function.prototype.andThen = function(g) {
	var self = this;
	return function(arg) {
		return g(self(arg));
	};
};

Function.prototype.compose = function(g) {
	var self = this;
	return function(arg) {
		return self(g(arg));
	};
};