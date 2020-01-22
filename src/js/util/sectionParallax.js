import ScrollMagic from 'scrollmagic/scrollmagic/minified/ScrollMagic.min';
import {gsap, Linear} from 'gsap/all';

class SectionParallax {

  constructor() {

  }

  controller() {
   this.controller = new ScrollMagic.Controller({refreshInterval:200, container: '#container-scroll'});
   return this.controller;
  }

  init(sectionArr){

   for(let i=0;i<sectionArr.length;i++) {

    const tl = gsap.timeline({repeat:0});
    tl.to(`#section-${sectionArr[i]}`, {z:-2000,scale: 3,  force3d: true, duration: 20, overwrite:false,  ease: Linear.easeInOut})

    new ScrollMagic.Scene({
     triggerElement:`#trigger-${sectionArr[i]}`,
     triggerHook: 0.5,
     duration: '200%'
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
