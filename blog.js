/* SEARCHBAR */
document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('suchleiste');
    const searchInput = document.getElementById('search');
    /* Event - Listener */
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault(); /* Verhindert das Standard-Formular-Absendeverhalten! */
        /* Suchbegriff aus Eingabefeld abrufen */
        const query = searchInput.value.toLowerCase();
        /* Alle Blogbeiträge finden - mit der Klasse */
        const blogPosts = document.querySelectorAll('.blogbeitrag_outer');
        /* Über jeden Blogbeitrag iterieren und nach dem Suchbegriff filtern */
        blogPosts.forEach(post => {
            const title = post.querySelector('.headings-2').innerText.toLowerCase(); /* toLowerCase = in Kleinbuchstaben umwandeln */
            const text = post.querySelector('.paragraph-text').innerText.toLowerCase();
            /* Überprüfen, ob der Suchbegriff im Titel oder Text des Blogbeitrags enthalten ist */
            if (title.includes(query) || text.includes(query)) {
                post.style.display = 'block'; /* Blogbeitrag anzeigen, wenn der Suchbegriff enthalten ist */
            } else {
                post.style.display = 'none'; /* Blogbeitrag ausblenden, wenn der Suchbegriff nicht enthalten ist */
            }
        });
    });
  });
  
  
  
  
  
  /* PAGINATION */
  document.addEventListener("DOMContentLoaded", function() {
    const blogPostsContainer = document.querySelectorAll('[data-page]');
    const seitenwechsel = document.querySelector('.seitenwechsel');
    const weiterBtn = document.getElementById('weiter-btn');
    let currentPage = 1;
    const maxPages = 2; // Die maximale Anzahl der Seiten, die momentan verfügbar sind
  
    // Funktion zum Anzeigen der aktuellen Seite basierend auf currentPage
    function showPage(pageNumber) {
        blogPostsContainer.forEach(function(container) {
            const page = parseInt(container.getAttribute('data-page'));
            if (page === pageNumber) {
                container.style.display = 'block';
            } else {
                container.style.display = 'none';
            }
        });
    }
  
    // Initial die erste Seite anzeigen
    showPage(currentPage);
  
    
    // Event Listener für Seitennummern und Weiter-Button
    seitenwechsel.addEventListener('click', function(event) {
        event.preventDefault();
        if (event.target.classList.contains('page-number')) {
            currentPage = parseInt(event.target.textContent);
            showPage(currentPage);
        } else if (event.target.id === 'weiter-btn') {
            if (currentPage < maxPages) {
                currentPage++;
            } else {
                currentPage = 1; // Zurück zur ersten Seite, wenn keine weiteren Seiten vorhanden sind
            }
            showPage(currentPage);
        }
        updatePagination();
    });
  
    // Funktion zum Aktualisieren der Pagination-Stile basierend auf currentPage
    function updatePagination() {
        const pageNumbers = document.querySelectorAll('.page-number');
        pageNumbers.forEach(function(pageNumber) {
            pageNumber.classList.remove('active');
            if (parseInt(pageNumber.textContent) === currentPage) {
                pageNumber.classList.add('active');
            }
        });
    }
  });
  
  
  
  
  
  /* Problem - Pagination auf Smartphonegröße muss im Layout verschoben werden! - Lösbar mit Javascript da mit CSS ein großes Problem bzw. sehr aufwendig */
  
  /* Funktion, um Pagination-Element zu verschieben basierend auf der Bildschirmbreite */
  function adjustLayout() {
    var pagination = document.querySelector('.seitenwechsel'); /* Pagination-Element auswählen */
    var sidebar = document.querySelector('.sidebar'); /* Sidebar-Container auswählen */
  
    if (window.innerWidth <= 834) { /* Bildschirmgröße kleiner 834 px - mobile */
      sidebar.insertBefore(pagination, sidebar.firstChild); /* Pagination über Sidebar-Inhalt einfügen */
      pagination.style.marginTop = '-100px'; 
      pagination.style.paddingBottom = '100px';
    } else {
      /* Für größere Bildschirmgrößen */
      /* Sicherstellen, dass das Pagination-Element sichtbar ist und den Margin zurücksetzen */
      pagination.style.marginTop = '0';
      pagination.style.paddingBottom = '0'; 
      sidebar.appendChild(pagination); /* Pagination ans Ende der Sidebar einfügen */
    }
  }
  
  /* Eventlistener für dynamische Layoutanpassung je nach justierung des Layouts wie ein RESIZE stattfindet mit den media-queries*/
  window.addEventListener('resize', adjustLayout);
  
  /* Initial aufrufen, um das Layout beim ersten Laden der Seite anzupassen */
  adjustLayout();
  


  
  
/* Javascript für SVG-Heart GRUPPE AN ELEMENTEN = MEHRERE SVG auf der Seite */
  /*--Javascript-für Path */
          
  /* ANIM STROKE */
  
  /* Länge des Paths für das Dash-Offset herausfinden */
  /*
  window.addEventListener('DOMContentLoaded', () =>
  {
    const path = document.querySelector('#heart path');
    console.log(path.getTotalLength());
  })
    window.addEventListener('DOMContentLoaded', () =>
  {
    const path = document.querySelector('#share path');
    console.log(path.getTotalLength());
  })
  */
  
  /* Dynamisch like und unlike bei Heart aktivieren */
  /* wenn like-class attached - remove and add like class bzw. umgekehrt */
  document.addEventListener('DOMContentLoaded', () => {
    const iconButtonRows = document.querySelectorAll('.icon-button-row');
  
    const toggleClass = function(element, class1, class2) {
      element.classList.toggle(class1);
      element.classList.toggle(class2);
    }
  
    const handleClick = function(event) {
      event.preventDefault(); // Verhindert das Scrollen
      const element = event.target.closest('svg');
      
      if (element && element.id === 'heart') {
        toggleClass(element, 'like', 'unlike');
      } else if (element && element.id === 'share') {
        toggleClass(element, 'share', 'unshare');
      }
    }
  
    iconButtonRows.forEach(row => {
      row.addEventListener('click', handleClick);
    });
  });