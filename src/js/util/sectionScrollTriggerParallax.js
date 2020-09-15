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
    scrollTrigger: {
     trigger: elem,
     pin: elem,
     anticipatePin: true,
     pinSpacing: false,
     end: (i + 1) * innerHeight,
     scrub: true,
     snap: {
      snapTo: 1,
      duration: {min: 0.2, max: .8},
      delay: 0.2,
      ease: "power1.inOut"
     }
    }

   });

    if($(elem).find('.imageWrapper')) {
     gsap.to($(elem).find('.imageWrapper'), {
      scrollTrigger: {
       trigger: elem,
       start: "top top",
       end: "+=" + (i + 1) * innerHeight,
       scrub: true,
       pinSpacing: false,
       marker: true
      },
      y: (i, target) => - (i + 1) * innerHeight / 3,
      ease: "none"
     })
    }

   if($(elem).find('.block-anim')) {
    gsap.to($(elem).find('.block-anim'), {
     scrollTrigger: {
      trigger: elem,
      start: "top top",
      end: "+=" + innerHeight * 2,
      scrub: true,
      pinSpacing: false,
      marker: true
     },
     y: (i, target) => - innerHeight / 2,
     ease: "none"
    })
   }
   }
  })

  }, 500);





 }

}

export default SectionScrollTriggerParallax;
