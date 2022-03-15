var nbJours = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var mois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
var jours = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];


function getNbDays(month, year) {

    if (month != 1) return nbJours[month];

    // février
    if (year % 4 == 0 && year % 100 != 0) {
        return 29;
    } else if (year % 400 == 0) {
        return 29;
    } else {
        return 28;
    }
}
var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
var firstDate = new Date(2020, 6, 6);
var today = new Date();
today = new Date(today.getFullYear(), today.getMonth(), today.getDate());

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };


var start = new Date(1961, 5, 25); // default date, let's say... Ricky Gervais :)
var lifeExp = 87; // life expectancy in years

function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}


function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
}
function updateDisplay() {

    var usp = new URLSearchParams(window.location.search.slice(1));
    var bdate = usp.get("bdate");
    var lexp = parseInt(usp.get("lexp"));

    if (bdate) {
        var t = bdate.split("-");
        if (t[0] && t[1] && t[2]) {
            var d = parseInt(t[0]);
            var m = parseInt(t[1]);
            var y = parseInt(t[2]);
            var newStart = new Date("" + m + "/" + d + "/" + y);
            console.log(newStart);
            if (isValidDate(newStart)) {
                start = newStart;
            } else {
                console.log("Date from params is invalid");
            }
        }
        console.log(bdate);
    }
    if (lexp) {
        if (lexp < 130) {
            console.log("life expectancy = " + lexp);
            lifeExp = lexp;
        } else {
            console.log("invalid life expectancy fomr params");
        }
    }



    var bDate = `${pad(start.getDate(), 2)} ${mois[start.getMonth()]} ${start.getFullYear()} <a href='choosedate.html' style='text-decoration:none'>🖊️</a>, c'était un ${jours[start.getDay()]}`;
    $("#mylife").append("<p>Date de naissance : " + bDate + "</p>");

    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    var diffDays = Math.round((today.getTime() - start.getTime()) / (oneDay));
    var lastDay = new Date("" + (start.getMonth() + 1) + "/" + start.getDate() + "/" + (start.getFullYear() + lifeExp));
    var nbExpDays = Math.round((lastDay.getTime() - start.getTime()) / (oneDay));
    console.log(nbExpDays);

    $("#mylife").append("<p>Nombre de jours vécus : " + diffDays + " <span class='dimmed'> / "+nbExpDays+" = "+(Math.floor(diffDays/nbExpDays*1000)/10)+"%, reste "+(nbExpDays-diffDays)+"</span></p>");
    var age = 0;
    var nbDaysInWeek = 0;
    var numweek = 1;
    $("#mylife").append("<div class='age'>" + age + "</div>");
    function getClass(i) {
        if (i < diffDays) return "jcweek" + nbDaysInWeek;
        return "emptyweek";
    }

    start.setHours(12); // to avoid time changing days problems
    if ((start.getMonth()==1) && (start.getDate()==29)){ // to avoid feb 29th birthdays 
        start.setDate(28);
    }
    for (var i = 1; i < nbExpDays + 1; i++) {
        var curDay = new Date(start.getTime() + (i * oneDay));
        nbDaysInWeek++;

        if (nbDaysInWeek == 7) {
            $("#mylife").append("<div class='jcweek " + getClass(i) + "' alt='Semaine " + numweek + "'></div>");
            nbDaysInWeek = 0;
            numweek++;
            if ((numweek - 1) % 4 == 0) {
                $("#mylife").append("<div class='week-spacer'></div>");
            }
        }
        if (i > 0 && 
                curDay.getMonth() == start.getMonth()&&
                curDay.getDate() == start.getDate() 
            ) {
            age++;

            if (nbDaysInWeek > 0) {
                $("#mylife").append("<div class='jcweek " + getClass(i) + "' alt='Semaine " + numweek + "'></div>");
            }
            nbDaysInWeek = 0;
            numweek = 1;
            $("#mylife").append("<div class='year'>" + curDay.getFullYear() + "</div>");
            $("#mylife").append("<br>");
            if (age % 10 == 0) {
                $("#mylife").append("<div class='vert-spacer'></div>");
            }
            $("#mylife").append("<div class='age'>" + age + "</div>");

        }
    }
    if (nbDaysInWeek > 0) {
        $("#mylife").append("<div class='jcweek " + getClass(i) + "' alt='Semaine " + numweek + "'></div>");
    }

}

