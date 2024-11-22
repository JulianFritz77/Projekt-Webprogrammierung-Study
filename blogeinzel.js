/* Javascript für SVG-Heart Einzel */

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
    const heart = document.getElementById('heart'); 
   
    const likeUnlikePost = function() {
      if(heart.classList.contains('like')) {
        heart.classList.remove('like');
        heart.classList.add('unlike');
      } else {
        heart.classList.remove('unlike');
        heart.classList.add('like');
      }
    }
   
    heart.addEventListener('click', likeUnlikePost); 
   });
   
   /* Dynamisch share und unshare bei Heart aktivieren */
   /* wenn share class attached - remove and add unshare class bzw. umgekehrt */
   document.addEventListener('DOMContentLoaded', () => {
    const heart = document.getElementById('share'); 
   
    const sharePost = function() {
      if(heart.classList.contains('share')) {
        heart.classList.remove('share');
        heart.classList.add('unshare');
      } else {
        heart.classList.remove('unshare');
        heart.classList.add('share');
      }
    }
   
    heart.addEventListener('click', sharePost); 
   });
   
   
   /* Image Slider Einzel für Blogbeitrag Einzel - Nummer 4 */
   const buttons = document.querySelectorAll("[data-carousel-button]")
   
   buttons.forEach(button => {
     button.addEventListener("click", () => {
       const offset = button.dataset.carouselButton === "next" ? 1 : -1 /* ist das data-attribute next? wenn ja plus 1 - wenn nein -1 was prev also 1 zurück entspricht*/
       const slides = button
         .closest("[data-carousel]")
         .querySelector("[data-slides]")
   
       const activeSlide = slides.querySelector("[data-active]") /* aktiver Slide zum Start = der erste bzw der mit data-active */
       let newIndex = [...slides.children].indexOf(activeSlide) + offset /* ...slides.children ist die Konvertierung zu einem Array */
       if (newIndex < 0) newIndex = slides.children.length - 1 
       if (newIndex >= slides.children.length) newIndex = 0 /* zum letzten bzw zum ersten Bild springen damit ein unendlicher Bilderloop entsteht */
   
       slides.children[newIndex].dataset.active = true /* das active-attribut wird mehr oder weniger an den nächsten Slide weitergegeben damit das Bild wechselt */
       delete activeSlide.dataset.active /* data-active attribute wird vom letzten slide beim weitreklicken gelöscht */
     })
   })
   
   
   