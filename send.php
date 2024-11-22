<?php

/* If-Statement */
/* Wurde korrekt per POST-method abgesendet? */
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['submit'])) {
/* Wurde auch eine E-Mail-Adresse eingegeben? */
    if (isset($_POST['email'])) {
/*E-Mail-Adresse aus dem Formular extrahieren  */
        $email = $_POST['email'];


/*E-Mail-Adresse validieren  */
if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
/*Hierhin werden die validierten Email Adressen für die Newsletteranmeldujng gespeichert -- als Alternative zu einer Speicherung in einer Datenbank */
    $datei = 'newsletter_subscriptions.txt';
    file_put_contents($datei, $email . PHP_EOL, FILE_APPEND);

}
/* Wenn die Anmeldung erfolgreich an den Webseitenbetreiber übermittelt wurde - Bestätigungsnachricht // Wenn nciht Fehlernachricht  */
        header("Location: newsletter_success.html");
        exit();
    } else {
/*Fehlerbehandlung bei ungültiger E-Mail-Adresse, keine E-Mail eingegeben wurde oder die Anfrage Methode nicht POST war */
    header("Location: newsletter_failure.html");
    exit();
    }
}
?>