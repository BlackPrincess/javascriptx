Array::sum = () ->
  if this.length == 0
    0
  else if this.length == 1
    parseInt(this[0], 10)
  else
    this.reduce (x, y) ->
      x + y

Array::head = () ->
  if this.length == 0
    throw "NoSuchElement"
  else
    this[0]

Array::headOption = () ->
  Option.apply(this[0])

Array::last = () ->
  if this.length == 0
    throw "NoSuchElement"
  else
    this[this.length - 1]

Array::lastOption = () -> Option.apply(this[this.length - 1])


Array::get = (i) -> this[i]

Array::getOrElse = (i, orV) ->
  if this[i] != undefined
    this[i] 
  else 
    orV

Array::getOrElseUpdate = (i, op) ->
  if this[i] != undefined
    this[i] 
  else 
    this[i] = op
    op

Array::flatten = () ->
  this.reduce (a,b) ->
    a.concat b

Array::flatMap = (f) ->
  this.reduce((a,b) ->
    a.concat f(b)
  ,[])

Array::mapValues = (f) ->
  ret = []
  this.forEach (a) ->
    ret[a] = f(a)
  ret

Array::transpose = () ->
  argsLen = None
  for a in this
    if argsLen == None
      argsLen = a.length
    else if argsLen != a.length
      throw new Error("IllegalArgumentException")
  ret = []
  for i in [0...argsLen]
    ret[i] = []
    for j in [0...this.length]
      ret[i][j] = this[j][i]
  ret


Array::take = (n) -> this.slice(0, n)

Array::takeRight = (n) -> this.slice(this.length - n, this.length)

Array::drop = (n) -> this.slice(n, this.length)

Array::dropRight = (n) -> this.slice(0, this.length - n)

Array::trimStart = (n) -> 
  for i in [0...n]
    this.shift()
  this

Array::trimEnd = (n) -> 
  for i in [0...(this.length - n)]
    this.pop()
  this

Array::distinct = ->
  u = {}
  ret = []
  for i in [0..this.length]
    if u.hasOwnProperty(this[i])
      continue
    ret.push(this[i])
    u[this[i]] = true
  # think twice
  ret.filter (a) -> Option.apply(a) != None

Array::sliceAt = (n) -> [
    this.slice(0, n),
    this.slice(n)
  ]
  
Array::exist = (a) ->
  this.indexOf(a) != -1

Array::insert = (index, value, args) ->
  args = Array.prototype.slice.call(arguments)
  args = if args.length > 2
    [value].concat(args.drop(2))
  else
    [value]
  heads = this.slice 0, index
  tails = this.slice index
  heads.concat(args).concat(tails)

Array::insertAll = (index, arr) ->
  heads = this.slice 0, index
  tails = this.slice index
  heads.concat(arr).concat(tails)

###
#
###
Array::remove = (index, count) ->
  # think twice
  count = Option.apply(count).getOrElse(1)
  heads = this.slice 0, index
  tails = this.slice index + count
  heads.concat(tails)

###
# Returns a sequence formed from this sequence and another sequence 
# by combining corresponding elements in pairs
# if the two sequence is not same length, the length of returning sequence is same short one's.
# @param {Array} arr
# @return {Array} combined corresponding elements in pairs
###
Array::zip = (arr) ->
  base = if (this.length < arr.length) then this else arr
  [0...base.length].map((i) ->
    [this[i], arr[i]]
  , this)


###
# Returns a sequence formed from this sequence and another sequence 
# by combining corresponding elements in pairs
# if the two sequence is not same length, 
# this sequence will be padded with defaultA or another sequence will be padded with defaultB.
# @param {Array} arr
# @param {Object} defaultA 
# @param {Object} defaultB
# @return {Array} combined corresponding elements in pairs.
###
Array::zipAll = (arr, defaultA, defaultB) ->
  base = if (this.length > arr.length) then this else arr
  [0...base.length].map((i) ->
    [
      if this[i] == undefined then defaultA else this[i], 
      if arr[i] == undefined then defaultB else arr[i]
    ]
  , this)

Array::unzip = (f) ->
  tuples = this.map(f)
  [
    tuples.map (a) -> a[0]
    tuples.map (a) -> a[1]
  ]

Array::unzip3 = (f) ->
  tuples = this.map(f)
  [
    tuples.map (a) -> a[0]
    tuples.map (a) -> a[1]
    tuples.map (a) => a[2]
  ]

Array::combinations = (n) ->
  for i in [0...n]
    tree[i]
  this.filter (a) -> a

Array::clone = () -> Array.apply(null, this)

Array::toMap = () ->
  ret = []
  this.map (a) ->
    ret[a[0]] = a[1]
  ret
