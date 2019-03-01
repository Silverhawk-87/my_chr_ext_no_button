// ITS ALL GOOD MAN
var done_hour = 13;
var done_minutes = 54;

var time_left = 0;

var d = new Date();
    hh = d.getHours();
    mm = d.getMinutes();
    ss = d.getSeconds();
    year = d.getFullYear();
    month =  1 + +d.getMonth();
    date = d.getDate();
    day = d.getDay();       // of the week  0 to 6 sunday, monday, tuesday and so on, i think

 // --------------------------------------------------------------

var DEFAULT_PHRASE = "I hpe it works";
var DEFAULT_TIME = hh + ":" + mm;
var DEFAULT_DATE = year + "-" + month + "-" + date;

var stored_phrase = localStorage.getItem('localst_phrase');
var stored_time_picker = localStorage.getItem('localst_time_picker');
var stored_date_picker = localStorage.getItem('localst_date_picker');

var today = false;

 // --------------------------------------------------------------

 var options = {
    type: "basic", 
    title: "Notification", 
    message: "Epa!. This is the message, Aguamilpa", 
    iconUrl: "cfe_icon.png"
}

// ---------------------------------------------------------------

function callback(){
    console.log('popup done');
    }

// ---------------------------------------------------------------

function time_to_minutes(hour, minutes, seconds){
    var time_in_minutes = hour*60 + minutes + seconds/60;
    return time_in_minutes; 
}
//--------------------------------------------------------------------------------------

function mymessage(){
    
    store_selection_state();
    
    done_minutes = document.getElementById('time_picker').value.substring(3);
    done_hour = document.getElementById('time_picker').value.substring(0,2);
    
    options.message = "Epa!. This is the message, Aguamilpa " + stored_phrase + " " + time_left;
    chrome.notifications.create(options, callback);
}

//  ------------------------------------------------------------------------

function store_selection_state(){

    //  ---------------------------------------------------------------------

    var myphrase = document.getElementById('phrase').value || DEFAULT_PHRASE;
    var mytime = document.getElementById('time_picker').value;
    var mydate = document.getElementById('date_picker').value;

    //  ---------------------------------------------------------------------
    
    localStorage.setItem('localst_phrase', myphrase);
    localStorage.setItem('localst_time_picker', mytime);
    localStorage.setItem('localst_date_picker', mydate);

    //  ---------------------------------------------------------------------

    stored_phrase = localStorage.getItem('localst_phrase');
    stored_time_picker = localStorage.getItem('localst_time_picker');
    stored_date_picker = localStorage.getItem('localst_date_picker');


    //  ---------------------------------------------------------------------

    document.getElementById('phrase').value = stored_phrase;
    document.getElementById('time_picker').value = stored_time_picker;
    document.getElementById('date_picker').value = stored_date_picker;

}

if(year == stored_date_picker.substring(0,4))
    if(month == stored_date_picker.substring(6,7))
        if(date == stored_date_picker.substring(8,10))
            if(time_to_minutes(done_hour,done_minutes) > time_to_minutes(hh,mm))
                time_left = time_to_minutes(done_hour,done_minutes) - time_to_minutes(hh,mm);
            else
                time_left = "No, sabes que?, ya se te fue.";

//  ------------------------------------------------------------------------------

console.log("now " + time_to_minutes(hh,mm));
console.log("then " + time_to_minutes(done_hour,done_minutes));
console.log(time_left);       // --------- just because

document.addEventListener('DOMContentLoaded', function () {
    var click =  document.getElementById("mybutton")
    click.addEventListener("click", mymessage);
});

// -------------------------------------------------------------------------------------

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

    document.getElementById('phrase').value = stored_phrase || DEFAULT_PHRASE;  
    document.getElementById('time_picker').value = stored_time_picker || DEFAULT_TIME;
    document.getElementById('date_picker').value = stored_date_picker || DEFAULT_DATE;

    //chrome.notifications.create(options, callback);
    alarmClock.setup();
});