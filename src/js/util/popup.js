import {gsap, Power2} from "gsap/all";

class Popup {
 constructor() {
  this.buttons = document.querySelectorAll('[data-popup]');
  if(this.buttons.length){
   for(const bt of this.buttons) {
     bt.addEventListener('click', () => {
       this.open(bt.dataset.popup)
     });

     document.addEventListener("click", (e) => {
      console.log(e.target)
      if(e.target === document.querySelector('.overlay-popup.is-shown')){
       this.close('.overlay-popup.is-shown')
      }
     })
   }
  }
 }

 open(id) {
  document.getElementById(id).classList.add('is-shown');
  gsap.fromTo(`#${id}`, { y: '100%'}, {y: '0', duration: 1, ease: Power2.easeInOut})
 }

 close(id){
  gsap.to(`${id}`, {y: '100%', duration: 1, ease: Power2.easeInOut, onComplete:()=>{
    document.querySelector(id).classList.remove('is-shown');
   }})
 }
}

export default Popup;
