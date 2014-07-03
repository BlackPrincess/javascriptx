exports = this

class Either
  left: ->
    Either.LeftProjection this

  right: ->
    Either.RightProjection this

  fold: (fa, fb) ->
    (if (@isLeft) then fa(@a) else fb(@b))

  swap: ->
    (if (@isLeft) then Right(@a) else Left(@b))

  joinRight:  ->
    (if (@isRight) then Right(@b) else Left(Left(@a)))

  joinLeft: ->
    (if (@isLeft) then Left(@a) else Right(Right(@b)))

  @merge: (e) ->
    (if (e.isLeft) then e.a else e.b)

  @LeftProjection: (e) ->
    new LeftProjection(e)

  @RightProjection: (e) ->
    new RightProjection(e)

Left = (a) ->
  new _Left(a)

class _Left extends Either
  constructor: (@a) ->

  isLeft: true
  isRight: false

# this.b = undefined;
Right = (b) ->
  new _Right(b)

class _Right extends Either
  constructor: (@b) ->

  isLeft: false
  isRight: true

class LeftProjection
  constructor: (@e) ->

  get: ->
    unless @e.isLeft
      throw "Either.left.value on Right"
      return
    else
      @e.a


  foreach: (f) ->
    f @e.a  if @e.isLeft

  getOrElse: (or_) ->
    (if @e.isLeft then @e.a else or_)

  forall: (f) ->
    (if @e.isLeft then f(@e.a) else true)

  exists: (f) ->
    (if @e.isLeft then f(@e.a) else false)

  flatMap: (f) ->
    (if @e.isLeft then f(@e.a) else Right(@e.b))

  map: (f) ->
    (if @e.isLeft then Left(f(@e.a)) else None)

  filter: (p) ->
    if @e.isLeft
      (if (p(@e.a)) then Some(Left(@e.a)) else None)
    else
      None

  toSeq: ->
    (if @e.isLeft then [@e.a] else [])

  toOption: ->
    (if @e.isLeft then Some(@e.a) else None)


class RightProjection
  constructor: (@e) ->

  get: ->
    unless @e.isRight
      throw "Either.right.value on Left"
      return
    else
      @e.b

  foreach: (f) ->
    f @e.b  if @e.isRight

  getOrElse: (or_) ->
    (if @e.isRight then @e.b else or_)

  forall: (f) ->
    (if @e.isRight then f(@e.b) else true)

  exists: (f) ->
    (if @e.isRight then f(@e.b) else false)

  flatMap: (f) ->
    (if @e.isRight then f(@e.b) else Right(@e.a))

  map: (f) ->
    (if @e.isRight then Right(f(@e.b)) else None)

  filter: (p) ->
    if @e.isRight
      (if (p(@e.b)) then Some(Right(@e.b)) else None)
    else
      None

  toSeq: ->
    (if @e.isRight then [@e.b] else [])

  toOption: ->
    (if @e.isRight then Some(@e.b) else None)


exports.Either = Either
exports.Left = Left
exports.Right = Right
