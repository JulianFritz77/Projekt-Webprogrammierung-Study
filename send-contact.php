<?php
/* If-Statement */
/* Wurde per POST-method abgesendet? */
if ($_SERVER["REQUEST_METHOD"] == "POST") {
/* Wurde die AGB-Checkbox angeklickt? */
    if (isset($_POST['agb'])) {
/* Validierung der Eingaben und säubern dieser damit kein schädlicher Code gesendeet wird */
    if (isset($_POST['submit'])) {
        $vorname = filter_var($_POST["vorname"] ?? '', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
        $name = filter_var($_POST["name"] ?? '', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
        $mailFrom = filter_var($_POST["email"] ?? '', FILTER_VALIDATE_EMAIL);
        $message = filter_var($_POST["message"] ?? '', FILTER_SANITIZE_FULL_SPECIAL_CHARS);

/* Überprüfen, ob alle Felder korrekt ausgefüllt sind */
            if ($vorname && $name && $mailFrom && $message) {
/* Empfänger-E-Mail-Adresse  */
                $mailTo = "samantha@n-coach.org";
/* Betreff der E-Mail */
                $subject = "Neue Kontaktanfrage von $vorname $name";
/* Nachricht der E-Mail */
                $txt = "Du hast eine Nachricht von $vorname $name ($mailFrom):\n\n$message";
/* Header der E-Mail */
                $headers = "From: $mailFrom" . "\r\n" .
                           "Reply-To: $mailFrom" . "\r\n";


                   if(mail($mailTo, $subject, $txt, $headers)) {
/*Bei Erfolg auf die Bestätigungsseite mit Erfolgsstatus weiterleiten*/
               header("Location: contact_success.html");
               exit();
           } else {
/*Bei Fehler auf die Bestätigungsseite mit Fehlerstatus weiterleiten*/
               header("Location: contact_failure.html");
               exit();
           }
       } else {
/*Bei ungültigen Eingaben auf die Bestätigungsseite mit Fehlerstatus weiterleiten*/
           header("Location: contact_failure.html");
           exit();
       }
   } else {
/*Bei nicht angeklickter AGB-Checkbox auf die Bestätigungsseite mit Fehlerstatus weiterleiten*/
       header("Location: contact_failure.html");
       exit();
   }
} else {
/*Bei ungültiger Anfrage auf die Bestätigungsseite mit Fehlerstatus weiterleiten*/
header("Location: contact_failure.html");
exit();
}
}
?>