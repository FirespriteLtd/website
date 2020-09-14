import {gsap} from 'gsap';
import {ScrollToPlugin} from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import ScrollMagic from "scrollmagic/scrollmagic/minified/ScrollMagic.min";



gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);

class SectionScrollTriggerParallax {

 constructor() {

 }

 controller() {

  this.controller = new ScrollMagic.Controller({refreshInterval: 50});

  return this.controller;
 }

 init(){
  setTimeout(()=>{
   gsap.utils.toArray('.trigger').forEach( (elem, i) => {
   if((gsap.utils.toArray('.trigger').length -1) !== i){
   gsap.to(elem, {
    y: (i, target) => -2000 * target.dataset.speed,
    ease: "none",
    scrollTrigger: {
     trigger: elem,
     pin: elem,
     anticipatePin: true,
     pinSpacing: false,
     end: "+=2000",
     scrub: true,
     markers: true
    }

   });

   if($(elem).find('.block-section')) {
    gsap.to($(elem).find('.block-section'), {
     scrollTrigger: {
      trigger: elem,
      start: "top top",
      end: "+=" + (2000 + window.innerHeight / 2 - 50),
      scrub: true,
      pinSpacing: false,
      markers: true
     },
     y: (i, target) => -2000 * .7,
     ease: "none"
    })
   }
   }
    ScrollTrigger.create({
     trigger: elem,
     snap: 1 / (gsap.utils.toArray('.trigger').length  ) // snap whole page to the closest section!
    });
  })

  }, 500);





 }

}

export default SectionScrollTriggerParallax;
