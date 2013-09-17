function Either() {}

Either.prototype.left = function() {
  return Either.LeftProjection(this);
};

Either.prototype.right = function() {
  return Either.RightProjection(this);
};

Either.prototype.fold = function(fa, fb) {
  return (this.isLeft) ? fa(this.a) : fb(this.b);
};

Either.prototype.swap = function() {
  return (this.isLeft) ? Right(this.a) : Left(this.b);
};

Either.prototype.joinRight = function() {
  return (this.isRight) ? Right(this.b) : Left(Left(this.a));
};

Either.prototype.joinLeft = function() {
  return (this.isLeft) ? Left(this.a) : Right(Right(this.b));
};

Either.merge = function(e) {
  return (e.isLeft) ? e.a : e.b;
};

Either.LeftProjection = function(e) {
  return new LeftProjection(e);
};

Either.RightProjection = function(e) {
  return new RightProjection(e);
};

function Left(a) {
  return new _Left(a);
}

function _Left(a) {
  this.isLeft = true;
  this.isRight = false;
  this.a = a;
  // this.b = undefined;
}

_Left.prototype = new Either();

function Right(b) {
  return new _Right(b);
}

function _Right(b) {
  this.isLeft = false;
  this.isRight = true;
  // this.a = undefined;
  this.b = b;
}
_Right.prototype = new Either();

function LeftProjection(e) {
  this.get = function() {
    if(!e.isLeft) {
      throw "Either.left.value on Right";
    } else {
      return e.a;
    }
  };

  this.foreach = function(f) {
    if(e.isLeft) {
      return f(e.a);
    }
  };

  this.getOrElse = function(or) {
    return e.isLeft ? e.a : or;
  };

  this.forall = function(f) {
    return e.isLeft ? f(e.a) : true;
  };

  this.exists = function(f) {
    return e.isLeft ? f(e.a) : false;
  };

  this.flatMap = function(f) {
    return e.isLeft ? f(e.a) : Right(e.b);
  };

  this.map = function(f) {
    return e.isLeft ? Left(f(e.a)) : None;
  };

  this.filter = function(p) {
    if(e.isLeft) {
      return (p(e.a)) ? Some(Left(e.a)) : None;
    } else {
      return None;
    }
  };

  this.toSeq = function() {
    return e.isLeft ? [e.a] : [];
  };

  this.toOption = function() {
    return e.isLeft ? Some(e.a) : None;
  };
}

function RightProjection(e) {
  this.get = function() {
    if(!e.isRight) {
      throw "Either.right.value on Left";
    } else {
      return e.b;
    }
  };

  this.foreach = function(f) {
    if(e.isRight) {
      return f(e.b);
    }
  };

  this.getOrElse = function(or) {
    return e.isRight ? e.b : or;
  };

  this.forall = function(f) {
    return e.isRight ? f(e.b) : true;
  };

  this.exists = function(f) {
    return e.isRight ? f(e.b) : false;
  };

  this.flatMap = function(f) {
    return e.isRight ? f(e.b) : Right(e.a);
  };

  this.map = function(f) {
    return e.isRight ? Right(f(e.b)) : None;
  };

  this.filter = function(p) {
    if(e.isRight) {
      return (p(e.b)) ? Some(Right(e.b)) : None;
    } else {
      return None;
    }
  };

  this.toSeq = function() {
    return e.isRight ? [e.b] : [];
  };

  this.toOption = function() {
    return e.isRight ? Some(e.b) : None;
  };
}