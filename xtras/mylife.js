var nbJours = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var mois = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
var jours = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];


function getNbJours(month, year) {

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