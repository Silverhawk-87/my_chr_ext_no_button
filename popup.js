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

var stored_hour = localStorage.getItem('localst_hour');
var stored_ampm = localStorage.getItem('localst_ampm');
var stored_dec_min = localStorage.getItem('localst_dec_min');
var stored_uni_min = localStorage.getItem('localst_uni_min');
var stored_dec_seg = localStorage.getItem('localst_dec_seg');
var stored_uni_seg = localStorage.getItem('localst_uni_seg');

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

function get_selection_current(html_id){
    var selection_spinner = document.getElementById(html_id);
    var index_spinner = selection_spinner.options[selection_spinner.selectedIndex].index;
    var current_spinner = selection_spinner.options[selection_spinner.selectedIndex].value;

    let sel_current_and_index = [current_spinner,index_spinner]
    return current_spinner;
}

//--------------------------------------------------------------------------------------

function mymessage(){
    //  -------------------------------------------------------------------------------------
    
    var myphrase = document.getElementById('phrase').value || DEFAULT_PHRASE;
    localStorage.setItem('localst_phrase', myphrase);
    stored_phrase = localStorage.getItem('localst_phrase');
    document.getElementById('phrase').value = stored_phrase;

    //  -------------------------------------------------------------------------------------

    var sel_hour = get_selection_current('select_hour');
    var sel_ampm = get_selection_current('select_ampm');

    var sel_full_hour = (sel_ampm == "pm")? (12 + +sel_hour):sel_hour;

    store_selection_state();
    
    options.message = "Epa!. This is the message, Aguamilpa " + stored_phrase + " " + sel_full_hour;
    chrome.notifications.create(options, callback);
}

//  ------------------------------------------------------------------------

function store_selection_state(){

    //  ---------------------------------------------------------------------

    var myhour = document.getElementById('select_hour').selectedIndex;
    var myampm = document.getElementById('select_ampm').selectedIndex;

    var mydec_min = document.getElementById('select_dec_min').selectedIndex;
    var myuni_min = document.getElementById('select_uni_min').selectedIndex;

    var mydec_seg = document.getElementById('select_dec_seg').selectedIndex;
    var myuni_seg = document.getElementById('select_uni_seg').selectedIndex;

    //  ---------------------------------------------------------------------
    
    localStorage.setItem('localst_hour', myhour);
    localStorage.setItem('localst_ampm', myampm);

    localStorage.setItem('localst_dec_min', mydec_min);
    localStorage.setItem('localst_uni_min', myuni_min);

    localStorage.setItem('localst_dec_seg', mydec_seg);
    localStorage.setItem('localst_uni_seg', myuni_seg);

    //  ---------------------------------------------------------------------

    stored_hour = localStorage.getItem('localst_hour');
    stored_ampm = localStorage.getItem('localst_ampm');

    stored_dec_min = localStorage.getItem('localst_dec_min');
    stored_uni_min = localStorage.getItem('localst_uni_min');

    stored_dec_seg = localStorage.getItem('localst_dec_seg');
    stored_uni_seg = localStorage.getItem('localst_uni_seg');

    //  ---------------------------------------------------------------------

    document.getElementById('select_hour').selectedIndex = stored_hour || 0;
    document.getElementById('select_ampm').selectedIndex = stored_ampm || 0;

    document.getElementById('select_dec_min').selectedIndex = stored_dec_min || 0;
    document.getElementById('select_uni_min').selectedIndex = stored_uni_min || 0;

    document.getElementById('select_dec_seg').selectedIndex = stored_dec_seg || 0;
    document.getElementById('select_uni_seg').selectedIndex = stored_uni_seg || 0;

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
    
    document.getElementById('select_hour').selectedIndex = stored_hour || 0;
    document.getElementById('select_ampm').selectedIndex = stored_ampm || 0;

    document.getElementById('select_dec_min').selectedIndex = stored_dec_min || 0;
    document.getElementById('select_uni_min').selectedIndex = stored_uni_min || 0;

    document.getElementById('select_dec_seg').selectedIndex = stored_dec_seg || 0;
    document.getElementById('select_uni_seg').selectedIndex = stored_uni_seg || 0;

    console.log("is this the current index " + document.getElementById('select_ampm').selectedIndex);

    chrome.notifications.create(options, callback);
    alarmClock.setup();
});