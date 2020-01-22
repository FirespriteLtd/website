import ScrollMagic from 'scrollmagic/scrollmagic/minified/ScrollMagic.min';
import {gsap, Linear, Power4, Back, Power2} from 'gsap/all';
import { ScrollToPlugin} from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);

class SectionParallax {

  constructor() {
   this.previousY = 0;
   this.previousRatio = 0;
   this.currentSection = '';
   this.active = false;
  }

  controller() {

   this.controller = new ScrollMagic.Controller({refreshInterval:50});

   return this.controller;
  }

  init(sectionArr){
   this.snapping(sectionArr);
   for(let i=0;i<sectionArr.length;i++) {

    const trigger = `#trigger-${sectionArr[i]}`;
    const section = `#section-${sectionArr[i]}`;

    const tl = gsap.timeline({repeat: 0});
    tl.set(section, {z: 0, scaleZ: 1});
    tl.fromTo(section, {y: 0, scaleZ: 1}, {y: '100%', scaleZ: 1, duration: 20, ease: Linear.easeInOut});

    new ScrollMagic.Scene({
     triggerElement: trigger,
     triggerHook: 0,
     duration: '200%'
    })
     .setTween(tl)
     .addTo(this.controller);
   }
  }

  snapping(sections){

   const sectionList = sections.map(item => {
    return `#trigger-${item}`
   });

   const thresholdArray = steps => Array(steps + 1)
    .fill(0)
    .map((_, index) => index / steps || 0);

   let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
     const section = entry.target.id.split('-')[1];
     console.log('is', this.active)

     switch (this.scrollDirection(entry)) {
      case 'SDE' : {

       console.log('D ENTER SECTION', section)

       //this.active = true;
       if(section !== this.currentSection ) {
        this.currentSection = section;

        gsap.to(window, {
         duration:  this.speed(section),
         scrollTo: `#trigger-${section}`,
         autoKill: false,
         ease: Power4.easeOut,
         onComplete: () => {
          this.active = false;
         }
        });
       }
       break;
      }
      case 'SDL' : {
       break;
      }
      case 'SUE' : {
       console.log('U ENTER SECTION', section)
       this.active = true;
       if(section !== this.currentSection ) {
        this.currentSection = section;
        gsap.to(window, {
         duration: this.speed(section),
         scrollTo: `#trigger-${section}`,
         autoKill: false,
         ease: Power4.easeOut,
         onComplete: () => {
          this.active = false;
         }});
       }
       break;
      }
      case 'SUL' : {
       console.log('U ENTER SECTION', section)
       break
      }
     }
    })
   }, { rootMargin: '-10% 0px -50% 0px'});

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

 speed(element){
   const pos = document.documentElement.scrollTop;
   const bodyRect = document.body.getBoundingClientRect(),
   elemRect = document.getElementById('trigger-'+element).getBoundingClientRect(),
   offset   = elemRect.top - bodyRect.top;
   console.log('pos',offset, pos ,'speed',Math.abs(offset - pos)/1000)
   return Math.abs(offset- pos)/1000;

 }
}


export default SectionParallax;
