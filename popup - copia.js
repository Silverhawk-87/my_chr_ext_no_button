var done_hour = 21;
var hour_left = 0;
var time_left = 0;
var min_left = 0;
var done_minutes = 49;
var sec_left = 0;
var done_seconds = 0;

var d = new Date();
    hh = d.getHours();
    mm = d.getMinutes();
    ss = d.getSeconds();

 // --------------------------------------------------------------

 var options = {
    type: "basic", 
    title: "Notification", 
    message: "Epa!. This is the message, Aguamilpa "+ hh + ":" + mm + ":" + ss, 
    iconUrl: "cfe_icon.png"
}

// ----------------------------------------------------------------

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

if(done_seconds > ss)
    sec_left = done_seconds - ss;
if(done_seconds == ss)
    sec_left = 0;
if(done_seconds < ss)
    sec_left = ss - done_seconds;

sec_left = sec_left/60;

console.log(time_left);       // --------- just because

time_left = hour_left * 60 + min_left + sec_left;


 var options = {
    type: "basic", 
    title: "Notification", 
    message: "Epa!. This is the message, Aguamilpa "+ hour_left + ":" + min_left + ":" + sec_left + "Aaaaaand " + time_left, 
    iconUrl: "cfe_icon.png"
}


//--------------------------------------------------------------------------------------


var alarmClock = {

        onHandler : function(e) {
            chrome.alarms.create("myAlarm", {delayInMinutes: 0.1, periodInMinutes: 0.2} );
                    window.close();
        },

        offHandler : function(e) {
            chrome.alarms.clear("myAlarm");
                    window.close();
        },

        setup: function() {
            var a = document.getElementById('alarmOn');
            a.addEventListener('click',  alarmClock.onHandler );
            var a = document.getElementById('alarmOff');
            a.addEventListener('click',  alarmClock.offHandler );
        }
};

document.addEventListener('DOMContentLoaded', function () {
    chrome.notifications.create(options, callback);
    alarmClock.setup();
});

function callback(){
    console.log('popup done');
    }