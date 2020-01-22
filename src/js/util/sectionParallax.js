import ScrollMagic from 'scrollmagic/scrollmagic/minified/ScrollMagic.min';
import {gsap, Linear, Power4, Back} from 'gsap/all';
import { ScrollToPlugin} from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);

class SectionParallax {

  constructor() {

  }

  controller() {
   this.controller = new ScrollMagic.Controller({refreshInterval:50});
   return this.controller;
  }

  init(sectionArr){

   for(let i=0;i<sectionArr.length;i++) {

    const trigger = `#trigger-${sectionArr[i]}`;
    const section = `#section-${sectionArr[i]}`;

    console.log('section', sectionArr[i])

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

  snapping(trigger, section){
   new ScrollMagic.Scene({
    triggerHook: 'onLeave',
    triggerElement: trigger,
    offset: -10 // small offset added to prevent overscrolling accidentally triggering
   })
     .on('leave', function () {
      console.log('is leaving')
      gsap.to(window, 1, {scrollTo: {y: $(window).height() * (i - 1), autoKill: false}, ease: Power4.easeOut})

     })
     .addTo(this.controller);  // scene end


   new ScrollMagic.Scene({
    triggerElement: trigger,
    triggerHook: 'onEnter',
    offset: 50 // small offset added to prevent overscrolling accidentally triggering
   })
    .addTo(this.controller)
    .on('enter', function () {
     console.log('is entering')
     gsap.to(window, 1, {
      scrollTo: {
       y: section,
       autoKill: false
      }, ease: Back.easeOut.config(1.7)
     });
    }); // scene end
  }

}


export default SectionParallax;
