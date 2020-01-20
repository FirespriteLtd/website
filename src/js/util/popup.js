import {gsap, Power2} from "gsap/all";

class Popup {

 constructor() {
  this.button = document.getElementsByClassName('button-popup');
  if(this.button){
   this.popupId = this.button.dataset.popup;
   this.popup  = document.getElementById(this.popupId)
   this.button.addEventListener('click', () => {this.open()});
   this.popup.addEventListener('click', () => {this.close()})
  }
 }

 open() {
  gsap.fromTo(`#${this.popupId}`, {y: '100%'}, {y: '0', duration: 1, ease: Power2.easeInOut})
 }

 close(){
  gsap.to(`#${this.popupId}`, {y: '100%', duration: 1, ease: Power2.easeInOut})
 }
}

export default Popup;
