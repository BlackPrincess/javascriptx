String::isEmpty = ->
  @length is 0

String::nonEmpty = ->
  @length isnt 0


#
# * 最初の文字を返します。空文字の場合には例外をはきます
# * @return {String} 最初の文字
#
String::head = ->
  throw "NoSuchElement"  if @isEmpty()
  @charAt 0


###
最初の文字をOptionでラップして返します
@return {Option[String]} 最初の文字
###
String::headOption = ->
  return None  if @isEmpty()
  Some @head()


#
# * 最後の文字を返します。空文字の場合には例外をはきます
# * @return {String} 最後の文字
#
String::last = ->
  throw "NoSuchElement"  if @isEmpty()
  @charAt @length - 1


###
最後の文字をOptionでラップして返します
@return {Option[String]} 最後の文字
###
String::lastOption = ->
  return None  if @isEmpty()
  Some @last()


###
文字列の左側からlength分だけきりとって返します。
lengthより文字列の長さが短い場合は、文字列がそのまま返ります。
@param length {Int}
@returm {String}
###
String::take = (length) ->
  @substring 0, length


###
文字列の右側からlength分だけきりとって返します。
lengthより文字列の長さが短い場合は、文字列そのままが返ります
@param length {Int}
@returm {String}
###
String::takeRight = (length) ->
  start = (if @length - length < 0 then 0 else @length - length)
  @substring start, @length

String::contains = (str) ->
  @indexOf(str) isnt -1


###
先頭がstrで始まっているかどうかを返します。
@param str
@returm {Boolean}
###
String::startsWith = (str) ->
  @take(str.length) is str


###
末尾がstrで終わっているかどうかを返します。
@param str
@returm {Boolean}
###
String::endsWith = (str) ->
  @takeRight(str.length) is str


###
書式付文字列
@param arg
@return {String} 文字列
###
String::format = (arg) ->
  repFn = undefined
  str = this
  if typeof arg is "object"

    # "{name}".format({name:"name"})
    repFn = (a, b) ->
      (if arg[b] then arg[b] else a)
  else

    # "{0}".format("name");
    args = arguments
    argLen = args.length - 1

    # {{0}} は {0} で出力させる。置き換えない
    str = str.replace(/(?!\{)*\{\{(\w+)\}\}/g, (a) ->
      args[++argLen] = a.replace("{{", "{").replace("}}", "}")
      ret = "{" + argLen + "}"
      ret
    )
    repFn = (a, b) ->
      args[parseInt(b, 10)]
  str.replace /(?!\{)*\{(\w+)\}/g, repFn


###
Int型へと変換します
@returns {Number} 変換した値
###
String::toInt = ->
  parseInt this, 10


###
Float型へと変換します
@returns {Number} 変換した値
###
String::toFloat = ->
  parseFloat this


###
Int型へと変換します。変換できない場合は0を返します
@returns {Number} 変換した値。または0
###
String::toIntOrZero = ->
  (if (isNaN(this)) then 0 else @toInt())


###
Float型へと変換します。変換できない場合は0.0を返します
@returns {Number} 変換した値。または0.0
###
String::toFloatOrZero = ->
  (if (isNaN(this)) then 0.0 else @toFloat())

(->
  charCode = 0xFEE0

  ###
  全角数字を半角数字へと変換します
  @returns {string} 全角数字が半角数字へと変換した文字列
  ###
  String::toHalfNumber = ->
    @replace(/[０１２３４５６７８９]/g, (a) ->
      String.fromCharCode a.charCodeAt(0) - charCode
    ).replace /\d+\．\d+/g, (a) ->
      a.replace "．", "."



  ###
  全角アルファベットを半角アルファベットへ変換します
  @returns {string} 全角アルファベットを半角アルファベットへと変換した文字列
  ###
  String::toHalfAlphabet = ->
    @replace /[Ａ-Ｚａ-ｚ]/g, (s) ->
      String.fromCharCode s.charCodeAt(0) - charCode


  return
)()

###
全角文字を取り除いた文字列を返します
@returns {string} 全角文字を取り除いた文字列
###
String::removeFullWidth = ->
  @replace /[^!-~]/g, ""
