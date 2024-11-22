/**** Funktion zur BMI-Berechnung ****/
function berechneBMI(event) {
    event.preventDefault(); /* Verhindert, dass das Formular die Seite neu lädt */
  
    /* Eingabewerte für Größe und Gewicht aus den Formularelementen lesen */
    let groesse = document.getElementById("groesse").value;
    let gewicht = document.getElementById("gewicht").value;
  
    /* Alert anzeigen, wenn eines der Felder nicht ausgefüllt ist */
    if (!groesse || !gewicht) {
        alert("Bitte fülle alle Felder aus, um die Berechnung durchzuführen");
        return false; /* Funktion nicht weiter ausführen */
    }
  
    /* Umrechnung der Eingaben für die BMI-Berechnung (Größe in Meter umrechnen) */
    groesse = parseFloat(groesse) / 100;
    gewicht = parseFloat(gewicht);
    let bmi = gewicht / (groesse * groesse); /* BMI-Wert als numerischen Wert berechnen */
  
    /* Ergebnis auf der Seite anzeigen */
    document.getElementById("bmiErgebnis").innerText = bmi.toFixed(2);
    document.getElementById("bmiErgebnisContainer").classList.remove("hidden");
    document.getElementById("bmiChart").classList.remove("hidden");
  
    /* BMI Chart aktualisieren und anzeigen */
    updateChart(groesse, gewicht, bmi);
  
    /* Rückgabe false, um das Standardverhalten des Formulars zu verhindern (Seite neuladen) */
    return false;
}
  


/* Chartvariable */
let myChart;

/* Funktion zum Aktualisieren des BMI-Charts */
function updateChart(groesse, gewicht, bmi) { // bmi als Parameter hinzufügen
    /* Canvas-Element aus dem DOM auswählen und die 2D-Kontextmethode holen */
    var ctx = document.getElementById('bmiChart').getContext('2d');
  
    /* Falls bereits ein Chart existiert, dieses zerstören, um Überlagerungen zu vermeiden */
    if (myChart) {
        myChart.destroy();
    }

    /* Farbbereiche definieren bzw die Konstruktion eines Dartensets für die Dartstellung der Graphen in den verschiedenen Farben */
    const datasets = [
        {
            label: 'Untergewicht', /* Namenslabel damit man weiß welcher Bereich und welche Farbe was darstellt */
            data: generateLineData(10, 18.5), /* Die / der verwendete Datenpunkt für das konsturieren der Linie für den Farbbereich */
            backgroundColor: 'rgba(0, 0, 255, 0.2)', /* Hintergrundfarbe */
            borderColor: 'rgba(0, 0, 255, 0.5)', /* Rahmenfarbe */
            fill: true, /* Bereich füllen */
            showLine: true /* Linie auch anzeigen */
        },
        {
            label: 'Normalgewicht',
            data: generateLineData(18.5, 25),
            backgroundColor: 'rgba(0, 255, 0, 0.2)',
            borderColor: 'rgba(0, 255, 0, 0.5)',
            fill: true,
            showLine: true
        },
        {
            label: 'Präadipositas',
            data: generateLineData(25, 30),
            backgroundColor: 'rgba(255, 255, 0, 0.2)',
            borderColor: 'rgba(255, 255, 0, 0.5)',
            fill: true,
            showLine: true
        },
        {
            label: 'Adipositas Grad I',
            data: generateLineData(30, 35),
            backgroundColor: 'rgba(255, 165, 0, 0.2)',
            borderColor: 'rgba(255, 165, 0, 0.5)',
            fill: true,
            showLine: true
        },
        {
            label: 'Adipositas Grad II',
            data: generateLineData(35, 40),
            backgroundColor: 'rgba(255, 69, 0, 0.2)',
            borderColor: 'rgba(255, 69, 0, 0.5)',
            fill: true,
            showLine: true
        },
        {
            label: 'Adipositas Grad III',
            data: generateLineData(40, 50),
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
            borderColor: 'rgba(255, 0, 0, 0.5)',
            fill: true,
            showLine: true
        },
        {
            label: 'Dein aktueller BMI',
            data: [{
                x: gewicht,
                y: groesse,
                bmi: bmi
            }],
            backgroundColor: 'black',
            borderColor: 'black',
            pointRadius: 6,
            pointHoverRadius: 12,
            type: 'scatter',
            hoverOffset: 32, /* Abstand des Tooltips vom Punkt */
            tooltip: { /* Tooltip-Konfiguration */
                callbacks: {
                    label: function(tooltipItem) {
                        return `Dein BMI: ${tooltipItem.raw.bmi.toFixed(2)}`; /* Anzeige des BMI-Werts */
                    }
                }
            }
        }
    ];

    /* Neuen Chart erstellen mit den aktuellen BMI-Daten */
    myChart = new Chart(ctx, {
        type: 'line', /* Art des Charts: Liniendiagramm */
        data: {
            datasets: datasets /* wir verwenden die festgelegten Datensätze */
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'Gewicht in kg'
                    },
                    min: 30, /* Min und Max der x-Achse */
                    max: 150
                },
                y: {
                    title: {
                        display: true,
                        text: 'Größe in m'
                    },
                    min: 1.4, /* Min und Max der y-Achse */
                    max: 2.0
                }
            }
        }
    });
}

function generateLineData(minBMI, maxBMI) {
    const data = [];
    for (let x = 30; x <= 150; x += 1) { /* Gewicht von 30 kg bis 150 kg */
        const yMin = Math.sqrt(x / maxBMI); /* Größe für maxBMI (Adipositas) */
        const yMax = Math.sqrt(x / minBMI); /* Größe für minBMI (Untergewicht) */
        data.push({x: x, y: yMax}); /* zuerst yMax (Untergewicht) */
        data.push({x: x, y: yMin}); /* dann yMin (Adipositas) */
    return data; /* Datenpunkte werden angezeigt */
}
}