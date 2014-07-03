exports = this

class Option
  equals: (a) ->
    (@isEmpty and a.isEmpty) or (not @isEmpty and not a.isEmpty and @get() is a.get())

  isDefined: ->
    not @isEmpty

  getOrElse: (d) ->
    (if @isEmpty then d else @get())

  orNull: ->
    (if @isEmpty then null else @get())

  orElse: (a) ->
    (if @isEmpty then a else this)

  exists: (p) ->
    not @isEmpty and p(@get())

  forall: (p) ->
    @isEmpty or p(@get())

  map: (f) ->
    (if @isEmpty then None else Some(f(@get())))

  flatMap: (f) ->
    (if @isEmpty then None else f(@get()))

  filter: (p) ->
    (if (@isEmpty or p(@get())) then this else None)

  withFilter: (a) ->
    WithFilter = (p) ->
      @map = (f) ->
        self.filter(p).map f

      @flatMap = (f) ->
        self.filter(p).flatMap f

      @foreach = (f) ->
        self.filter(p).foreach f

      @withFilter = (q) ->
        new WithFilter((x) ->
          p(x) and q(x)
        )

    self = this
    new WithFilter(a)

  fold: (ifEmpty, f) ->
    (if @isEmpty then ifEmpty() else f(@get()))

  match: (some, none) ->
    (if @isEmpty then none() else some(@get()))

  foreach: (f) ->
    f @get() unless @isEmpty

  collect: (pf) ->
    (if (not @isEmpty and pf.isDefinedAt(@get())) then Some(pf(@get())) else None)

  iterator: ->
    (if @isEmpty then [] else [@get()])

  @apply: (a) ->
    if a is `undefined` or a is null
      None
    else
      Some a

Some = (a) ->
  new _Some(a)

Some.apply = (a) ->
  _Some.apply(a)

class _Some extends Option
  constructor: (@a) ->

  isEmpty: false
  get: ->
    @a

  @apply = (a) ->
    if a is `undefined`
      None
    else
      Some(a)


# null can come
class _None extends Option
  constructor: ->

  isEmpty: true
  get: ->
    throw "NoSuchElementException(None.get)"

None = new _None()

exports.Option = Option
exports.Some = Some
exports.None = None #const
