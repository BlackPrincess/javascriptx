TestCase("Test Date Prototype",{
  "test Date.prototype.getMonthLength": function(){
    var actual = new Date(2013, 0, 1).getMonthLength();
    assertEquals(31, actual);
  },
  "test Date.prototype.getPrevMonth": function(){
    var actual = new Date(2013, 1, 1).getPrevMonth();
    var excepted = new Date(2013, 0, 1);
    assertEquals(excepted, actual);
  },
  "test Date.prototype.getNextMonth": function(){
    var actual = new Date(2013, 0, 1).getNextMonth();
    var excepted = new Date(2013, 1, 1);
    assertEquals(excepted, actual);
  },
  "test Date.prototype.getMonthFirst": function(){
    var actual = new Date(2013, 0, 31).getMonthFirst();
    var excepted = new Date(2013, 0, 1);
    assertEquals(excepted, actual);
  },
  "test Date.prototype.getMonthLast": function(){
    var actual = new Date(2013, 0, 1).getMonthLast();
    var excepted = new Date(2013, 0, 31);
    assertEquals(excepted, actual);
  },
  "test Date.prototype.getDatePart": function(){
    var actual = new Date(2013, 0, 1, 1, 1, 1).getDatePart();
    var excepted = new Date(2013, 0, 1);
    assertEquals(excepted, actual);
  },
  "test Date.prototype.dateAdd": function(){
    var baseDate = new Date(2013, 0, 1, 0, 0, 0);
    
    assertEquals(new Date(2014, 0, 1, 0, 0, 0), baseDate.dateAdd("year", 1));
    assertEquals(new Date(2014, 0, 1, 0, 0, 0), baseDate.dateAdd("y", 1));
    assertEquals(new Date(2013, 1, 1, 0, 0, 0), baseDate.dateAdd("month", 1));
    assertEquals(new Date(2013, 1, 1, 0, 0, 0), baseDate.dateAdd("m", 1));
    assertEquals(new Date(2013, 0, 2, 0, 0, 0), baseDate.dateAdd("day", 1));
    assertEquals(new Date(2013, 0, 2, 0, 0, 0), baseDate.dateAdd("date", 1));
    assertEquals(new Date(2013, 0, 2, 0, 0, 0), baseDate.dateAdd("d", 1));
    assertEquals(new Date(2013, 0, 8, 0, 0, 0), baseDate.dateAdd("week", 1));
    assertEquals(new Date(2013, 0, 1, 1, 0, 0), baseDate.dateAdd("hour", 1));
    assertEquals(new Date(2013, 0, 1, 0, 1, 0), baseDate.dateAdd("minute", 1));
    assertEquals(new Date(2013, 0, 1, 0, 0, 1), baseDate.dateAdd("second", 1));
    assertEquals(new Date(2013, 0, 1, 0, 0, 0, 1), baseDate.dateAdd("millisecond", 1));
  },
  "test Date.prototype.dateDiff": function(){
    var baseDate = new Date(2013, 0, 1);

    assertEquals(1, baseDate.dateDiff("year", new Date(2014, 0, 1)));
    assertEquals(1, baseDate.dateDiff("y", new Date(2014, 0, 1)));
    assertEquals(2, baseDate.dateDiff("month", new Date(2013, 2, 1)));
    assertEquals(12 + 2, baseDate.dateDiff("month", new Date(2014, 2, 1)));
    assertEquals(2, baseDate.dateDiff("m", new Date(2013, 2, 1)));
    assertEquals(1, baseDate.dateDiff("day", new Date(2013, 0, 2)));  
    assertEquals(31 + 1, baseDate.dateDiff("day", new Date(2013, 1, 2)));
    assertEquals(1, new Date(2013,0 ,1 ,21).dateDiff("day", new Date(2013, 0, 2, 20)));
    assertEquals(1, baseDate.dateDiff("date", new Date(2013, 0, 2)));  
    assertEquals(1, baseDate.dateDiff("d", new Date(2013, 0, 2)));  
    assertEquals(0, baseDate.dateDiff("week", new Date(2013, 0, 7)));  
    assertEquals(1, baseDate.dateDiff("week", new Date(2013, 0, 8)));
    assertEquals(1, baseDate.dateDiff("hour", new Date(2013, 0, 1, 1)));  
    assertEquals(24 + 1, baseDate.dateDiff("hour", new Date(2013, 0, 2, 1)));  
    assertEquals(1, baseDate.dateDiff("minute", new Date(2013, 0, 1, 0, 1)));
    assertEquals(1, baseDate.dateDiff("second", new Date(2013, 0, 1, 0, 0, 1)));  
    assertEquals(1, baseDate.dateDiff("millisecond", new Date(2013, 0, 1, 0, 0, 0, 1)));  
    assertEquals(null, baseDate.dateDiff("foo", new Date()));
  },
  "test Date.prototype.toFormatString": function(){
    var baseDate = new Date(2013, 0, 2, 13, 4, 5, 67);
    var baseDate2 = new Date(2013, 0, 2, 1, 4, 5, 67);
    
    assertEquals("2013-01-02 01:04:05 067", baseDate.toFormatString("yyyy-MM-dd hh:mm:ss fff"));
    assertEquals("13-1-2 1:4:5 06", baseDate.toFormatString("yy-M-d h:m:s ff"));
    assertEquals("01 0 Web", baseDate2.toFormatString("HH f ddd"));
    assertEquals("1", baseDate2.toFormatString("H"));
  },
  "test Date.prototype.clone": function(){
    var actual = new Date(2013, 0, 1, 1, 1, 1).clone();
    var excepted = new Date(2013, 0, 1, 1, 1, 1);
    assertEquals(excepted, actual);
  },
});