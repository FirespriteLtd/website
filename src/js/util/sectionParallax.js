import ScrollMagic from 'scrollmagic/scrollmagic/minified/ScrollMagic.min';
const controller = new ScrollMagic.Controller({container: '#container-scroll'});
import {gsap, Linear} from 'gsap/all';

class SectionParallax {

  constructor() {

  }

  controller() {
   this.controller = new ScrollMagic.Controller({container: '#container-scroll'});
   return this.controller;
  }

  init(sectionArr){
   for(let i=0;i<sectionArr.length;i++) {

    const tl = gsap.timeline({repeat:0});
    tl.to(`#section-${sectionArr[i]}`, {y:'100%', z:0, duration: 20, overwrite:true,  ease: Linear.easeNone})

    new ScrollMagic.Scene({
     triggerElement:`#trigger-${sectionArr[i]}`,
     triggerHook: 0,
     duration: '200%'
    })
     .setTween(tl)
     .loglevel(3)
     .addTo(this.controller);
   }
  }

  getVersion(){
   console.log('TEST')
  }

}


export default SectionParallax;
