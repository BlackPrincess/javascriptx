Function::curried = ->
  iterate = (varArgs) ->
    return f.apply(null, varArgs)  if varArgs.length >= f.length
    ->
      iterate varArgs.concat(Array::slice.call(arguments))
  f = this
  return this  if f.length is 0
  iterate []

Function::andThen = (g) ->
  self = this
  (arg) ->
    g self(arg)

Function::compose = (g) ->
  self = this
  (arg) ->
    self g(arg)

Function::tupled = (g) ->
  self = this
  (args) ->
    self.apply self, args
