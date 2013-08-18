Array.prototype.sum = function() {
  if(this.length === 0) {
    return 0;
  } else if (this.length === 1){
    return parseInt(this[0], 10);
  }
  return this.reduce(function(x, y) { return x + y; });
};

Array.prototype.first = function() {
  if(this.length === 0 ) throw "NoSuchElement";
  return this[0];
};

Array.prototype.firstOption = function() {
  return Option.apply(this[0]);
};

Array.prototype.last = function() {
  if(this.length === 0 ) throw "NoSuchElement";
  return this[this.length - 1];
};

Array.prototype.lastOption = function() {
  return Option.apply(this[this.length -1 ]);
};

Array.prototype.clone = function() {
  return Array.apply(null, this);
};