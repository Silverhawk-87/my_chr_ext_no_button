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
var stored_phrase = localStorage.getItem('localst_phrase');

/*var stored_hour_index = localStorage.getItem('localst_hour');
var stored_ampm_index = localStorage.getItem('localst_ampm');
var stored_dec_min_index = localStorage.getItem('localst_dec_min');
var stored_uni_min_index = localStorage.getItem('localst_uni_min');
var stored_dec_seg_index = localStorage.getItem('localst_dec_seg');
var stored_uni_seg_index = localStorage.getItem('localst_uni_seg');
var stored_year_index = localStorage.getItem('localst_full_year');
var stored_month_index = localStorage.getItem('localst_month');
var stored_date_index = localStorage.getItem('localst_date');*/

var stored_time_picker = localStorage.getItem('localst_time_picker');
var stored_date_picker = localStorage.getItem('localst_date_picker');

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
    //  -------------------------------------------------------------------------------------
    
    var myphrase = document.getElementById('phrase').value || DEFAULT_PHRASE;
    localStorage.setItem('localst_phrase', myphrase);
    stored_phrase = localStorage.getItem('localst_phrase');
    document.getElementById('phrase').value = stored_phrase;

    //  -------------------------------------------------------------------------------------
    //var sel_full_hour = (sel_ampm == "pm")? (12 + +sel_hour):sel_hour;


    store_selection_state();

    var minutes_time_picker = document.getElementById('time_picker').value.substring(3);
    var hour_time_picker = document.getElementById('time_picker').value.substring(0,2);
    
    options.message = "Epa!. This is the message, Aguamilpa " + stored_phrase + " " + hour_time_picker + " " + minutes_time_picker + " " + document.getElementById('date_picker').value;
    chrome.notifications.create(options, callback);
}

//  ------------------------------------------------------------------------

function store_selection_state(){

    //  ---------------------------------------------------------------------

    var mytime = document.getElementById('time_picker').value;
    var mydate = document.getElementById('date_picker').value;

    //  ---------------------------------------------------------------------
    
    localStorage.setItem('localst_time_picker', mytime);
    localStorage.setItem('localst_date_picker', mydate);

    //  ---------------------------------------------------------------------

    stored_time_picker = localStorage.getItem('localst_time_picker');
    stored_date_picker = localStorage.getItem('localst_date_picker');


    //  ---------------------------------------------------------------------

    document.getElementById('time_picker').selectedIndex = stored_time_picker;
    document.getElementById('date_picker').selectedIndex = stored_date_picker;

}

//  ------------------------------------------------------------------------------

if(time_to_minutes(done_hour,done_minutes,done_seconds) > time_to_minutes(hh,mm,ss))
    time_left = time_to_minutes(done_hour,done_minutes,done_seconds) - time_to_minutes(hh,mm,ss);
else
    time_left = "Ya se te fue";

// ----------------------------------------------------------------

console.log("now " + time_to_minutes(hh,mm,ss));
console.log("then " + time_to_minutes(done_hour,done_minutes,done_seconds));

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
    
    /*document.getElementById('select_hour').selectedIndex = stored_hour_index || 0;
    document.getElementById('select_ampm').selectedIndex = stored_ampm_index || 0;

    document.getElementById('select_dec_min').selectedIndex = stored_dec_min_index || 0;
    document.getElementById('select_uni_min').selectedIndex = stored_uni_min_index || 0;

    document.getElementById('select_dec_seg').selectedIndex = stored_dec_seg_index || 0;
    document.getElementById('select_uni_seg').selectedIndex = stored_uni_seg_index || 0;

    document.getElementById('select_full_year').selectedIndex = stored_year_index || 0;
    document.getElementById('select_month').selectedIndex = stored_month_index || 0;
    document.getElementById('select_date').selectedIndex = stored_date_index || 0;
*/
    
    document.getElementById('time_picker').value = stored_time_picker;
    document.getElementById('date_picker').value = stored_date_picker;

    chrome.notifications.create(options, callback);
    alarmClock.setup();
});