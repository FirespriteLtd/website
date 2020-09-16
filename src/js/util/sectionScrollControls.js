import {gsap, Power2} from 'gsap/all';

class SectionScrollControls {

 constructor() {
  this.previousY = 0;
  this.previousRatio = 0;
  this.direction = '';
  this.active = true;
 }

 init() {
  this.anchorNav();
  this.sidebarReveal();
 }

 scrollDirection(entry) {
  const currentY = entry.boundingClientRect.y;
  const currentRatio = entry.intersectionRatio;
  const isIntersecting = entry.isIntersecting;
  let type;
  if (currentY < this.previousY) {
   if (currentRatio > this.previousRatio && isIntersecting) {
    type = 'SDE'
   } else {
    type = 'SDL'
   }
  } else if (currentY > this.previousY && isIntersecting) {
   if (currentRatio < this.previousRatio) {
    type = 'SUL'
   } else {
    type = 'SUE'
   }
  }

  this.previousY = currentY;
  this.previousRatio = currentRatio;
  return type;
 }

 speed(element) {
  const pos = document.documentElement.scrollTop;
  const bodyRect = document.body.getBoundingClientRect(),
   elemRect = document.getElementById('trigger-' + element).getBoundingClientRect(),
   offset = elemRect.top - bodyRect.top;
  return Math.abs(offset - pos) / 800;
 }

 navIndicator(section) {
  const navigation = document.querySelectorAll('#sub-nav a');

  navigation.forEach(item => {
   if (item.getAttribute('data-section') === section) {
    item.parentElement.classList.add('is-active');
   } else {
    item.parentElement.classList.remove('is-active');
   }
  });
 }

 anchorNav() {
  const nav = document.querySelectorAll('#sub-nav a');
  nav.forEach(item => {
   const section = `#trigger-${item.getAttribute('data-section')}`;
   item.addEventListener('click', e => {
    e.preventDefault();
    let scroll= document.querySelectorAll('#container-scroll > div');
    scroll.forEach(item => {item.classList.add('no-snap');})
    this.active = false;
    gsap.to(window, {
     duration: this.speed(item.getAttribute('data-section')),
     scrollTo: section,
     overrider: true, autoKill: false,
     ease: Power2.easeInOut,
     onComplete: () => {
      scroll.forEach(item => {item.classList.remove('no-snap');})
      this.active = true;
     }
    });
   })
  })
 }

 sidebarReveal(){
  let dir = '';
  const thresholdArray = steps => Array(steps + 1)
   .fill(0)
   .map((_, index) => index / steps || 0);
  let observer = new IntersectionObserver((entries, observer) => {
   entries.forEach(entry => {
      let current = this.scrollDirection(entry);
      if(current !== dir) {
       dir = current;
       switch (current) {
        case 'SDE' : {
         this.hideSideNav();
         break;
        }
        case 'SDL' : {
         this.showSideNav();
         break;
        }
        case 'SUE' : {
         this.hideSideNav();
         break;
        }
        case 'SUL' : {
         this.showSideNav();
         break;
        }
       }
      }
   })
  }, {threshold:thresholdArray(20)});

  observer.observe(document.getElementById('footer'));

 }

 hideSideNav(){
  gsap.to('.side-nav',{autoAlpha:0, duration:.4, overrider:false, ease: Power2.easeInOut});
 }

 showSideNav(){
  gsap.to('.side-nav',{autoAlpha:1, duration:.4, override: false,ease: Power2.easeInOut});
 }
}


export default SectionScrollControls;
