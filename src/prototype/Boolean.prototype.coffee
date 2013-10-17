Boolean.unless = (bool) ->
  (f) -> 
    if !bool
      f() 

Boolean.when = (bool) -> 
  (f) -> 
    if bool
      f()

Boolean::unless = (f) ->
  # hack
  Boolean.unless(@.toString() == true.toString())(f)

Boolean::when = (f) ->
  # hack
  Boolean.when(@.toString() == true.toString())(f)
