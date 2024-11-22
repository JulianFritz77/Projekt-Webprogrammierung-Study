

/* IMAGE SLIDER */
document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelector(".slides");
    const images = document.querySelectorAll(".bild-impressionen");
    const prevBtn = document.getElementById("iconlinks");
    const nextBtn = document.getElementById("iconrechts");
    let currentIndex = 0;
  
  
  /* Aktuelles Slide wird angezeigt */  
    function showSlide(index) {
        slides.style.transform = `translateX(-${index * 100}%)`;
      }
  
      function prevSlide() {
        if (currentIndex > 0) {
          currentIndex--;
        } else {
          currentIndex = slides.children.length - 1; // Zum letzten Bild wechseln, wenn am Anfang
        }
        showSlide(currentIndex);
      }
  
      function nextSlide() {
        if (currentIndex < slides.children.length - 1) {
          currentIndex++;
        } else {
          currentIndex = 0; // Zum ersten Bild zurückkehren, wenn am Ende
        }
        showSlide(currentIndex);
      }
  
      prevBtn.addEventListener("click", prevSlide);
      nextBtn.addEventListener("click", nextSlide);
    });
  
  
  
  
  /* Loading */
  document.addEventListener("DOMContentLoaded", () => {
  const preload = document.querySelector(".preload");
  
  preload.classList.add("preload-hidden");
  
  preload.addEventListener("transitionend", () => {
    if (preload.parentNode) {
      preload.parentNode.removeChild(preload);
    }
  });
  });
  
  
  /********************/
  /* COOKIE MODAL */
  /****************/
  /* Hilfeseite für Angaben und Erweiterungen zu Javascript Creation von Cookies bzw wie es funktioniert:  https://www.w3schools.com/js/js_cookies.asp */
  
  
  setCookie = (cName, cValue, expDays) => {
  let date = new Date();
  date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000)); /* Angabe in Millisekunden! */
  const expires = "expires=" + date.toUTCString(); /* Convert to UTC String */
  document.cookie = cName + "=" + cValue + "; " + expires + "; path=/"; /* Der Cookie */
  };
  
  getCookies = (cName) => {
  const name = cName + "=";
  const cDecoded = decodeURIComponent(document.cookie);
  const cArr = cDecoded.split("; "); /* Cookie wird gesplittet überall dort wo sich  ein ";  " befindet */
  let value;
  cArr.forEach((val) => { /* Wir machen ein Array und gehen mit dem if-Statement durch das Array  welches auch returnt werden muss */
    if (val.indexOf(name) === 0) value = val.substring(name.length);
  });
  return value;
  };
  
  
  
  /* Entfernung der eingebetteten Google Fonts und Google Maps wenn der Nutzer die Cookies ablehnt */
  
  /* Funktion zum Entfernen von Google Fonts */
  removeGoogleFonts = () => {
  const googleFontsLink = document.querySelector('link[href*="fonts.googleapis.com"]');
  if (googleFontsLink) {
    googleFontsLink.parentNode.removeChild(googleFontsLink);
  }
  };
  
  /* Funktion zum Entfernen von Google Maps */
  removeGoogleMaps = () => {
  const googleMapIframe = document.querySelector('iframe[src*="google.com/maps"]');
  if (googleMapIframe) {
    googleMapIframe.parentNode.removeChild(googleMapIframe);
  }
  };
  
  document.querySelectorAll('#cookie-decline-btn, #cookie-accept-btn, #cookie-accept-all-btn').forEach(button => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.id === 'cookie-accept-btn' || e.target.id === 'cookie-accept-all-btn') {
      setCookie("cookie-accepted", true, 30); /* Das Cookie wird kreiert und läuft in 30 Tagen aus */
      document.querySelector('.cookie-sec').style.display = "none"; /* Cookie-Banner wird ausgeblendet */
    } else {
      removeGoogleFonts();
      removeGoogleMaps();
      setCookie("cookie-accepted", false, 1); /* Ablehnungscookie wird für 1 Tag gesetzt */
      document.querySelector('.cookie-sec').style.display = "block"; /* Cookie-Banner bleibt sichtbar */
    }
  });
  });
  
  cookieMessage = () => { /* Existiert der Cookie - Abfrage */
  if (!getCookies("cookie-accepted")) { /* Wenn der Cookie nicht existiert, zeige den Cookie-Banner an */
    document.querySelector(".cookie-sec").style.display = "block";
  } else if (getCookies("cookie-accepted") === "false") {
    removeGoogleFonts();
    removeGoogleMaps();
    document.querySelector(".cookie-sec").style.display = "block"; /* Cookie-Banner bleibt sichtbar */
  }
  };
  
  window.addEventListener("load", cookieMessage);
  /* console.log(cookieMessage);  Console-log Abfrage zur Funktionsüberprüfung */  