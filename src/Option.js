var None, Nothing;
(function() {
  function _Nothing() {}

  function Option() {
  }
  // Option.prototype = new Product();
  Option.prototype.isDefined = function() {
    return !this.isEmpty;
  };


  Option.prototype.getOrElse = function(d) {
    return this.isEmpty() ? d : this.get();
  };

  Option.prototype.orNull = function() {
    return this.isEmpty() ? null : this.get();
  };

  Option.prototype.orElse = function(a) {
    return this.isEmpty() ? a : this;
  };

  Option.prototype.exists = function(p) {
    return this.isEmpty && p(this.get());
  };

  Option.prototype.forall = function(p) {
    return this.isEmpty || p(this.get());
  };

  Option.prototype.map = function(f) {
    return this.isEmpty ? None : Some(f(this.get()));
  };

  Option.prototype.flatMap = function(f) {
    return this.isEmpty ? None : f(this.get());
  };

  Option.prototype.filter = function(p) {
    return (this.isEmpty || p(this.get())) ? this : None;
  };

  Option.prototype.withFilter = function(a) {
    var self = this;

    function WithFilter(p){
      this.map = function(f) {
        return self.filter(p).map(f);
      };
      this.flatMap = function(f) {
        return self.filter(p).flatMap(f);
      };
      this.foreach = function(f) {
        return self.filter(p).foreach(f);
      };
      this.withFilter = function(q) {
        return new WithFilter(function(x){ return p(x) && q(x);});
      };
    }
    return new WithFilter(a);
  };

  // いらないんじゃね
  Option.prototype.fold = function(ifEmpty, f) {
    return this.isEmpty() ? ifEmpty() : f(this.get());
  };

  Option.prototype.match = function(some, none) {
    return this.isEmpty() ? none(this) : some(this.get());
  };

  Option.prototype.foreach = function(f) {
    if(this.isDefined()) {
      f(this.get());
    }
  };

  Option.prototype.collect = function(pf) {
    return (!this.isEmpty && pf.isDefinedAt(this.get())) ? Some(pf(this.get())) : None;
  };

  Option.apply = function(a) {
    if(a === undefined || a === null) {
      return None;
    } else {
      return new Some(a);
    }
  };

  Option.iterator = function() {
    return this.isEmpty ? [] : [this.get()];
  };


  function Some(a) {
    this.isEmpty = true;
    // protectedにしたいなぁ
    this.get = function() {
      return a;
    };
  }

  Some.prototype = new Option();
  Some.apply = function(a) {
    if(a === undefined) {
      return None;
    } else {
      return new Some(a);  // null can come
    }
  };

  function _None() {

    this.isEmpty = true;
    this.get = function() {
      throw "NoSuchElementException(None.get)";
    };
  }

  _None.prototype = new Option();

  None = new _None(); /*const*/
  Nothing = new _Nothing(); /*const*/

})();