var done_hour = 18;
var hour_left = 0;
var time_left = 0;
var min_left = 0;
var done_minutes = 52;

var d = new Date();
    hh = d.getHours();
    mm = d.getMinutes();
    ss = d.getSeconds() + 0.001 * d.getMilliseconds();

 // --------------------------------------------------------------

if(done_hour > hh)
    hour_left = done_hour - hh;
if(done_hour == hh)
    hour_left = 0;
if(done_hour < hh)
    hour_left = hh - done_hour;

if(done_minutes > mm)
    min_left = done_minutes - mm;
if(done_minutes == mm)
    min_left = 0;
if(done_minutes < mm)
    min_left = mm - done_minutes;

console.log(hour_left);       // --------- just because

time_left = (done_hour - hh) * 60 + min_left;

chrome.alarms.onAlarm.addListener(function(alarm) {
  alert("something else " + hh + " : " + mm + " : " + ss + " i dunno. Also " + " " + myphrase;
});