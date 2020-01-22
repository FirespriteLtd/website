import ScrollMagic from 'scrollmagic/scrollmagic/minified/ScrollMagic.min';
import {gsap, Linear} from 'gsap/all';

class SectionParallax {

  constructor() {

  }

  controller() {
   this.controller = new ScrollMagic.Controller({refreshInterval:10, container: '#container-scroll'});
   return this.controller;
  }

  init(sectionArr){

   for(let i=0;i<sectionArr.length;i++) {

    const tl = gsap.timeline({repeat:0});
    tl.set(`#section-${sectionArr[i]}`, {z:0, scaleZ:1});
    tl.fromTo(`#section-${sectionArr[i]}`,{y:0, scaleZ:1}, {y:'100%', scaleZ: 1,  duration: 20,  ease: Linear.easeInOut});

    new ScrollMagic.Scene({
     triggerElement:`#trigger-${sectionArr[i]}`,
     triggerHook: 0,
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
