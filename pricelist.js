/* CARD-SLIDER */
document.addEventListener('DOMContentLoaded', function () {
    const testimonials = document.querySelectorAll('.media-element'); /*Alle Testimonial-Elemente auswählen*/
    const leftIcon = document.querySelector('.icon-testimonials-left');
    const rightIcon = document.querySelector('.icon-testimonials-right');
  
    if (testimonials.length > 0 && leftIcon && rightIcon) {
      let currentIndex = 0; /*Index aktuelles Testimonial*/
  
  /*Funktion zum Anzeigen des Testimonials basierend auf dem Index*/
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle('active', i === index); /* Nur das Testimonial mit dem angegebenen Index anzeigen */
        });
    }
  
  
  /*Klickereignis für linken Icon - wenn möglich zum nächsten Testimonial wechseln und das Testimonial mit dem Index anzeigen */  
  leftIcon.addEventListener('click', function () {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : testimonials.length - 1; 
    showTestimonial(currentIndex); 
  });
  
  /*Klickereignis für rechten Icon - wenn möglich zum nächsten Testimonial wechseln und das Testimonial mit dem Index anzeigen */
  rightIcon.addEventListener('click', function () {
    currentIndex = (currentIndex < testimonials.length - 1) ? currentIndex + 1 : 0;
    showTestimonial(currentIndex); 
  });
  
  /* am Anfang  das erste Testimonial anzeigen */
      showTestimonial(currentIndex);
  }
  });