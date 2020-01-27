import ScrollMagic from 'scrollmagic/scrollmagic/minified/ScrollMagic.min';
import {gsap, Linear, Power4, Back, Power2, Sine} from 'gsap/all';
import {ScrollToPlugin} from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

class SectionParallax {

 constructor() {
  this.previousY = 0;
  this.previousRatio = 0;
  this.currentSection = '';
  this.direction = '';
  this.active = true;
 }

 controller() {

  this.controller = new ScrollMagic.Controller({refreshInterval: 50});

  return this.controller;
 }



 init(sectionArr) {
  this.anchoreNav();
  this.sidbarReveal();
  this.containerAnim(sectionArr);
  this.contentAnim(sectionArr);
  this.snapping(sectionArr);
 }

 containerAnim(sectionArr){
  for (let i = 0; i < sectionArr.length; i++) {

   const trigger = `#trigger-${sectionArr[i]}`;
   const section = `#section-${sectionArr[i]}`;

   const tl = gsap.timeline({repeat: 0});
   tl.fromTo(section, {y: 0, z: 1}, {y: '100%', z: 1, duration: 10000, ease: Sine.easeInOut});



   new ScrollMagic.Scene({
    triggerElement: trigger,
    triggerHook: 0,
    duration: '200%'
   })
    .setTween(tl)
    .addTo(this.controller);
  }
 }

 contentAnim(sectionArr){
  for (let i = 0; i < sectionArr.length; i++) {

   const trigger = `#trigger-${sectionArr[i]}`;
   const section = `#section-${sectionArr[i]}`;

   const tl = gsap.timeline({repeat: 0});
   tl.fromTo($(section).find('.contentWrapper'), {y:0}, {y:'-200%', duration: 500, ease: Sine.easeInOut});


   new ScrollMagic.Scene({
    triggerElement: trigger,
    triggerHook: 0,
    duration: '200%'
   })
    .setTween(tl)
    .addTo(this.controller);
  }
 }

 snapping(sections) {
  let dir = '';

  const sectionList = sections.map(item => {
   return `#trigger-${item}`
  });

  const thresholdArray = steps => Array(steps + 1)
   .fill(0)
   .map((_, index) => index / steps || 0);

  let observer = new IntersectionObserver((entries, observer) => {
   entries.forEach(entry => {
    const section = entry.target.id.split('-')[1];
    let current = this.scrollDirection(entry);
     if (current !== dir) {
      dir = current;

      switch (current) {
       case 'SDE' : {
        if (section !== this.currentSection) {
         this.currentSection = section;
         this.navIndicator(section);
        }
        break;
       }
      }
     }
   })
  }, {threshold:thresholdArray(100)}); //

  document.querySelectorAll(sectionList).forEach(block => {
   observer.observe(block);
  })
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

 anchoreNav() {
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
      console.log('active', this.active)
      scroll.forEach(item => {item.classList.remove('no-snap');})
      this.active = true;
     }
    });
   })
  })
 }

 sidbarReveal(){
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


export default SectionParallax;
