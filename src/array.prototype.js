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

Array.prototype.get = function(i) {
  return this[i];
};

Array.prototype.getOrElse = function(i, or) {
  return this[i] !== undefined ? this[i] : or;
};


/**
 * Returns a sequence formed from this sequence and another sequence 
 * by combining corresponding elements in pairs
 * if the two sequence is not same length, the length of returning sequence is same short one's.
 * @param {Array} arr
 * @return {Array} combined corresponding elements in pairs
 */
Array.prototype.zip = function(arr) {
  var ret = [];
  var base = (this.length < arr.length) ? this : arr;
  for(var i = 0, l = base.length; i < l; ++i) {
    ret[i] = [this[i], arr[i]];
  }
  return ret;
};

/**
 * Returns a sequence formed from this sequence and another sequence 
 * by combining corresponding elements in pairs
 * if the two sequence is not same length, 
 * this sequence will be padded with defaultA or another sequence will be padded with defaultB.
 * @param {Array} arr
 * @param {Object} defaultA 
 * @param {Object} defaultB
 * @return {Array} combined corresponding elements in pairs.
 */
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
