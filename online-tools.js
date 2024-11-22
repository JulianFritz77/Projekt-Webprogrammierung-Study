
/* UMSATZ-BERECHNUNG mit der HARRIS-BENEDICT-FORMEL*/


/* Funktion zur Umwandlung des Aktivitätslevels in MET-Werte als Voraussetzung damit sie als Zahlen gesehen werden */
function getMET(activityLevel) {
    switch (activityLevel) {
        case "uesitzend":
            return 1.5;
        case "gtsitzend":
            return 2;
        case "uestehend":
            return 3;
        case "anstrengend":
            return 4.5;
        case "sehranstrengend":
            return 8;
        default:
            return 1; /* Standardwert für den Fall, dass nichts eingegeben ist bzw. ausgewählt */
    }
  }
  
  
  
  function berechneKalorienUmsatz(event) {
    event.preventDefault(); /*Normales Neuladen wie bei Formular verhindern inkl dem return false am Ende */
  
    let geschlecht = document.getElementById("geschlecht2").value;
    let groesse = document.getElementById("groesse2").value;
    let gewicht = document.getElementById("gewicht2").value;
    let alter = document.getElementById("alter2").value;
    let aktivitaetslevel = document.getElementById("activity2").value;
  
    /* Alert wenn ein Eingabefeld fehlt */
    if (!groesse || !gewicht || !alter || !aktivitaetslevel) {
        alert("Bitte fülle alle Felder aus, damit die Berechnung durchgeführt werden kann");
        return false;
    }
  
    // Umrechnung der Zahlen für die Berechnung
    groesse = parseFloat(groesse);
    gewicht = parseFloat(gewicht);
    alter = parseInt(alter);
    aktivitaetslevel = parseFloat(aktivitaetslevel);
  
    let grundumsatz;
  
    /* Berechnung des Grundumsatzes (BMR) nach der Harris-Benedict-Formel */
    if (geschlecht === "männlich") {
        grundumsatz = 88.362 + (13.397 * gewicht) + (4.799 * groesse) - (5.677 * alter);
    } else {
        grundumsatz = 447.593 + (9.247 * gewicht) + (3.098 * groesse) - (4.330 * alter);
    }
  
  /* Gesamtumsatz */
    let gesamtumsatz = grundumsatz * getMET(aktivitaetslevel);
  
  /* Ergebnisanzeige und 2 Dezimalstellen anzeigen mit toFixed(2) */
    document.getElementById("kalorienUmsatzErgebnis").innerText = gesamtumsatz.toFixed(2) + " kcal";
    return false;
  }
  