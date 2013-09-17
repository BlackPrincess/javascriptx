Array.prototype.sum = function() {
  if(this.length === 0) {
    return 0;
  } else if (this.length === 1){
    return parseInt(this[0], 10);
  }
  return this.reduce(function(x, y) { return x + y; });
};

Array.prototype.head = function() {
  if(this.length === 0 ) throw "NoSuchElement";
  return this[0];
};

Array.prototype.headOption = function() {
  return Option.apply(this[0]);
};

Array.prototype.last = function() {
  if(this.length === 0 ) throw "NoSuchElement";
  return this[this.length - 1];
};

Array.prototype.lastOption = function() {
  return Option.apply(this[this.length -1 ]);
};

Array.prototype.zip = function(arr) {
  var ret = [];
  var base = (this.length < arr.length) ? this : arr;
  for(var i = 0, l = base.length; i < l; ++i) {
      ret[i] = [this[i], arr[i]];
  }
  return ret;
};

Array.prototype.zipAll = function(arr, defaultA, defaultB) {
  var ret = [];
  var base = (this.length > arr.length) ? this : arr;
  for(var i = 0, l = base.length; i < l; ++i) {
      var a = (this[i] === undefined) ? defaultA : this[i];
      var b = (arr[i] === undefined) ? defaultB : arr[i];
      ret[i] = [a, b];
  }
  return ret;
};

Array.prototype.clone = function() {
  return Array.apply(null, this);
};
