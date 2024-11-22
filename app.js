/* Hamburger - Aktivierung - onclick - öffnen und schließen des Menüs */
/* Erst - festlegen dass das Dokument komplett gelden sein muss bis JS startet (DOMContentLoaded) + 
Holen der verschiedenen classes mit .querySelector und festlegen mit const */
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navElements = document.querySelector('.nav-elements ul');

  hamburger.addEventListener('click', function() {
      navElements.classList.toggle('show');
      console.log('Hamburger Menu clicked');

// Überprüfe, ob die Klasse .show hinzugefügt wurde
              if (navElements.classList.contains('show')) {
// Menü ist geöffnet, Scrolling auf der Seite deaktivieren
                document.body.style.overflow = 'hidden';
            } else {
// Menü ist geschlossen, Scrolling auf der Seite wieder aktivieren
                document.body.style.overflow = '';
           }
  });
});