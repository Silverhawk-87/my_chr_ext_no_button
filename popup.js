// ITS ALL GOOD MAN
var done_hour = 13;
var done_minutes = 54;
var done_seconds = 0;

var time_left = 0;

var d = new Date();
    hh = d.getHours();
    mm = d.getMinutes();
    ss = d.getSeconds();
    year = d.getFullYear();
    month = d.getMonth();
    date = d.getDate();
    day = d.getDay();       // of the week  0 to 6 sunday, monday, tuesday and so on, i think

 // --------------------------------------------------------------

var DEFAULT_PHRASE = "I hpe it works";
var storephrase = storephrase = localStorage.getItem('text');

 // --------------------------------------------------------------

 var options = {
    type: "basic", 
    title: "Notification", 
    message: "Epa!. This is the message, Aguamilpa", 
    iconUrl: "cfe_icon.png"
}

// ---------------------------------------------------------------

function time_to_minutes(hour, minutes, seconds){
    var time_in_minutes = hour*60 + minutes + seconds/60;
    return time_in_minutes; 
}

// ----------------------------------------------------------------

if(time_to_minutes(done_hour,done_minutes,done_seconds) > time_to_minutes(hh,mm,ss))
    time_left = time_to_minutes(done_hour,done_minutes,done_seconds) - time_to_minutes(hh,mm,ss);
else
    time_left = "Ya se te fue";

// ----------------------------------------------------------------

console.log("now " + time_to_minutes(hh,mm,ss));
console.log("then " + time_to_minutes(done_hour,done_minutes,done_seconds));

console.log(time_left);       // --------- just because

// --------------------------------------------------------------------------------------

 var options = {
    type: "basic", 
    title: "Notification",  
    message: "Epa! " + time_left + " en minutos para la mera hora. Anio " + year + " mes " + month + " dia " +  date,
    iconUrl: "cfe_icon.png"
}

// ------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
    var click =  document.getElementById("mybutton")
    click.addEventListener("click", mymessage);
});

function mymessage(){
    // store the value
    var myphrase = document.getElementById('phrase').value || DEFAULT_PHRASE;
    //                      type
    localStorage.setItem('text', myphrase);
    // pull the value
    storephrase = localStorage.getItem('text');
    document.getElementById('phrase').value = storephrase;

    var sel_hour = get_selection_current('select_h');
    var sel_ampm = get_selection_current('select_ampm');

    if(sel_ampm == 'pm')
        sel_hour = 12 + +sel_hour;

    var sel_min = get_selection_current('select_dec_m');
    sel_min = sel_min + get_selection_current('select_uni_m');

    var sel_sec = get_selection_current('select_dec_s');
    sel_sec = sel_sec + get_selection_current('select_uni_s');


    var options = {
    type: "basic", 
    title: "Notification", 
    message: "Epa!. This is the message, Aguamilpa " + storephrase + " " + sel_hour + ":" + sel_min + ":" + sel_sec, 
    iconUrl: "cfe_icon.png"
    }

    chrome.notifications.create(options, callback);
}

//--------------------------------------------------------------------------------------

function get_selection_current(html_id){
    var selection_spinner = document.getElementById(html_id);
    var current_spinner = selection_spinner.options[selection_spinner.selectedIndex].value;
    return current_spinner;
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
    document.getElementById('phrase').value = storephrase || DEFAULT_PHRASE;
    chrome.notifications.create(options, callback);
    alarmClock.setup();
});

function callback(){
    console.log('popup done');
    }