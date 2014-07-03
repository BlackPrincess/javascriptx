
###
該当付きに何日あるかを返します
@return {Number}
###
Date::getMonthLength = ->
  @getMonthLast().getDate()


###
前の付きを返します
@return {Date}
###
Date::getPrevMonth = ->
  @dateAdd "month", -1


###
翌月を返します
@return {Date}
###
Date::getNextMonth = ->
  @dateAdd "month", 1


###
月の初めの日を取得します
@return {Date}
###
Date::getMonthFirst = ->
  that = @getDatePart()
  that.setDate 1
  that


###
月の終わりの日を取得します
@return {Date}
###
Date::getMonthLast = ->
  ret = @getMonthFirst()
  ret.setMonth ret.getMonth() + 1
  ret.setDate 0
  ret


###
日付の部分のみを返します。時間・分などの情報は切り捨てられます
@return {Date}
###
Date::getDatePart = ->
  ret = @clone()
  ret.setHours 0
  ret.setMinutes 0
  ret.setSeconds 0
  ret.setMilliseconds 0
  ret


# TODO: Hack me
unificationDatePartName = (datePartName) ->
  switch datePartName
    when "year", "y"
      "year"
    when "month", "m"
      "month"
    when "day", "date", "d"
      "day"
    when "week"
      "week"
    when "hour"
      "hour"
    when "minute"
      "minute"
    when "second"
      "second"
    when "millisecond"
      "millisecond"


# TODO:Hack me
datePartExec = (datePartName, varArgs) ->
  switch unificationDatePartName(datePartName)
    when "year"
      @thenYear varArgs
    when "month"
      @thenMonth varArgs
    when "day"
      @thenDay varArgs
    when "week"
      @thenWeek varArgs
    when "hour"
      @thenHour varArgs
    when "minute"
      @thenMinute varArgs
    when "second"
      @thenSecond varArgs
    when "millisecond"
      @thenMillisecond varArgs


###
日付の部分を指定して加算を行います
@param datePartName year,y,month,m,day,date,d,week,hour,minute,second,millisecondのいずれか
@param spanCount 加算する値
@return {Date}
###
Date::dateAdd = (datePartName, spanCount) ->
  self = this
  ret = @clone()
  datePartExec.call (->
    @thenYear = ->
      self.dateAdd "month", spanCount * 12

    @thenMonth = ->
      d = ret.getDate()
      ret.setDate 1
      ret.setMonth ret.getMonth() + spanCount + 1
      ret.setDate 0
      ret.setDate Math.min(d, ret.getDate())
      ret

    @thenDay = ->
      ret.setDate ret.getDate() + spanCount
      ret

    @thenWeek = ->
      self.dateAdd "day", spanCount * 7

    @thenHour = ->
      ret.setHours ret.getHours() + spanCount
      ret

    @thenMinute = ->
      ret.setMinutes ret.getMinutes() + spanCount
      ret

    @thenSecond = ->
      ret.setSeconds ret.getSeconds() + spanCount
      ret

    @thenMillisecond = ->
      ret.setMilliseconds ret.getMilliseconds() + spanCount
      ret

    return
  )(), datePartName


###
@param datePartName year,y,month,m,day,date,d,week,hour,minute,second,millisecondのいずれか
@param dateTarget
@return {Date}
###
Date::dateDiff = (datePartName, dateTarget) ->
  self = this
  datePartExec.call (->
    @thenYear = ->
      dateTarget.getFullYear() - self.getFullYear()

    @thenMonth = ->
      self.dateDiff("year", dateTarget) * 12 + dateTarget.getMonth() - self.getMonth()

    @thenDay = ->
      ticksBase = (new Date()).getDatePart().getTime()
      Math.floor((dateTarget.getTime() - ticksBase) / (1000 * 60 * 60 * 24)) - Math.floor((self.getTime() - ticksBase) / (1000 * 60 * 60 * 24))

    @thenWeek = ->
      Math.floor self.dateDiff("day", dateTarget) / 7

    @thenHour = ->
      ticksBase = (new Date()).getDatePart().getTime()
      Math.floor((dateTarget.getTime() - ticksBase) / (1000 * 60 * 60)) - Math.floor((self.getTime() - ticksBase) / (1000 * 60 * 60))

    @thenMinute = ->
      ticksBase = (new Date()).getDatePart().getTime()
      Math.floor((dateTarget.getTime() - ticksBase) / (1000 * 60)) - Math.floor((self.getTime() - ticksBase) / (1000 * 60))

    @thenSecond = ->
      ticksBase = (new Date()).getDatePart().getTime()
      Math.floor((dateTarget.getTime() - ticksBase) / 1000) - Math.floor((self.getTime() - ticksBase) / 1000)

    @thenMillisecond = ->
      dateTarget.getTime() - self.getTime()

    return
  )(), datePartName


###
@param format
@return {String}
###
Date::toFormatString = (format) ->

  # TODO:言語別に変更可能にする
  week = new Array("Sun", "Mon", "Tue", "Web", "Tur", "Fri", "Sat")
  yyyy = @getFullYear().toString()
  yy = yyyy.slice(2)
  M = (@getMonth() + 1).toString()
  MM = (if M.length is 1 then "0" + M else M)
  d = @getDate().toString()
  dd = (if d.length is 1 then "0" + d else d)
  ddd = week[@getDay()]
  H = @getHours().toString()
  HH = (if H.length is 1 then "0" + H else H)
  h = (@getHours() % 12).toString()
  hh = (if h.length is 1 then "0" + h else h)
  m = @getMinutes().toString()
  mm = (if m.length is 1 then "0" + m else m)
  s = @getSeconds().toString()
  ss = (if s.length is 1 then "0" + s else s)
  millis = "000" + @getMilliseconds().toString()
  f = millis.substr(millis.length - 3, 1)
  ff = millis.substr(millis.length - 3, 2)
  fff = millis.substr(millis.length - 3, 3)
  h = "12"  if h is "0"
  format.replace(/yyyy/g, yyyy).replace(/yy/g, yy).replace(/MM/g, MM).replace(/M/g, M).replace(/ddd/g, ddd).replace(/dd/g, dd).replace(/d/g, d).replace(/HH/g, HH).replace(/H/g, H).replace(/hh/g, hh).replace(/h/g, h).replace(/mm/g, mm).replace(/m/g, m).replace(/ss/g, ss).replace(/s/g, s).replace(/fff/g, fff).replace(/ff/g, ff).replace /f/g, f


###
@return {Date}
###
Date::clone = ->
  new Date(@getTime())
