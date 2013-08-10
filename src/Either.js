function Either() {
}

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

  this.foreach = function() {
    throw "Not implements Error";
  };

  this.getOrElse = function() {
    throw "Not implements Error";
  };

  this.forall = function() {
    throw "Not implements Error";
  };

  this.exists = function() {
    throw "Not implements Error";
  };

  this.flatMap = function() {
    throw "Not implements Error";
  };

  this.map = function() {
    throw "Not implements Error";
  };

  this.filter = function() {
    throw "Not implements Error";
  };

  this.toSeq = function() {
    throw "Not implements Error";
  };

  this.toOption = function() {
    throw "Not implements Error";
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

  this.foreach = function() {
    throw "Not implements Error";
  };

  this.getOrElse = function() {
    throw "Not implements Error";
  };

  this.forall = function() {
    throw "Not implements Error";
  };

  this.exists = function() {
    throw "Not implements Error";
  };

  this.flatMap = function() {
    throw "Not implements Error";
  };

  this.map = function() {
    throw "Not implements Error";
  };

  this.filter = function() {
    throw "Not implements Error";
  };

  this.toSeq = function() {
    throw "Not implements Error";
  };

  this.toOption = function() {
    throw "Not implements Error";
  };
}