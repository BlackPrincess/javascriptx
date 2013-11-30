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

Array::lastOption = () ->
  Option.apply(this[this.length - 1])


Array::get = (i) ->
  this[i]

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

Array::take = (n) ->
  this.trimStart(n)

Array::drop = (n) ->
  this.trimeEnd(n)

Array::trimStart = (n) ->
  this.slice n

Array::trimEnd = (n) ->
  this.slice 0, this.length - n

Array::sliceAt = (n) ->
  [
    this.slice(0, n),
    this.slice(n)
  ]

Array::insert = (index, value, args) ->
  args = Array.prototype.slice.call(arguments)
  args = if args.length > 2
    [value].concat(args.trimStart(2))
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

Array::clone = () ->
  Array.apply(null, this)