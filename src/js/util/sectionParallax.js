import ScrollMagic from 'scrollmagic/scrollmagic/minified/ScrollMagic.min';
import {gsap, Linear} from 'gsap/all';

class SectionParallax {

  constructor() {

  }

  controller() {
   this.controller = new ScrollMagic.Controller({refreshInterval:50, container: '#container-scroll'});
   return this.controller;
  }

  init(sectionArr){

   for(let i=0;i<sectionArr.length;i++) {

    const tl = gsap.timeline({repeat:0});
    tl.set(`#trigger-${sectionArr[i]}`, {z:0, scale:1});
    tl.fromTo(`#trigger-${sectionArr[i]}`,{z:0, scale:1}, {z:-1000, scale: 2,  duration: 20,  ease: Linear.easeInOut});

    new ScrollMagic.Scene({
     triggerElement:`#trigger-${sectionArr[i]}`,
     triggerHook: 1,
     duration: '100%'
    })
     .setTween(tl)
     .addTo(this.controller);
   }

  }

  getVersion(){
   console.log('TEST')
  }

}


export default SectionParallax;
