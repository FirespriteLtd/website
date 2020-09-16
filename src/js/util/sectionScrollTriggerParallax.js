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

 init(addScrolls){

  setTimeout(()=>{

   window.locoScroll.on("scroll", ScrollTrigger.update);

   ScrollTrigger.scrollerProxy(".smooth-scroll", {
    scrollTop(value) {
     return arguments.length ? window.locoScroll.scrollTo(value, 0, 0) : window.locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
     return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    pinType: document.querySelector(".smooth-scroll").style.transform ? "transform" : "fixed"
   });


   gsap.utils.toArray('.trigger').forEach( (elem, i) => {

   if((gsap.utils.toArray('.trigger').length -1 ) !== i){
   gsap.to(elem, {
    scrollTrigger: {
     trigger: elem,
     pin: true,
     start: "top top",
     scroller: ".smooth-scroll",
     anticipatePin: true,
     pinSpacing: false,
     end: "+=100%",
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
       scroller: ".smooth-scroll",
       end: "+=" + (i + 1) * innerHeight,
       scrub: true,
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
      scroller: ".smooth-scroll",
      marker: false
     },
     y: (i, target) => - innerHeight / 2,
     ease: "none"
    })
   }
   } else {
     if(gsap.utils.toArray('.trigger').length === 1 ){

       gsap.to(elem, {
        ease: "none",
        transformOrigin: 'bottom bottom',
        transformStyle:"preserve-3d",
        scrollTrigger: {
         trigger: elem,
         start: "top top",
         scroller: ".smooth-scroll",
         end: "bottom top",
         pin: true,
         anticipatePin: true,
         pinSpacing: false,
         scrub: true
        }
       });


      if($(elem).find('.hero-header')) {
       gsap.to($(elem).find('.contentWrapper'), {
        scrollTrigger: {
         trigger: elem,
         start: "top top",
         end: "+=" + innerHeight * 2,
         scrub: true,
         scroller: ".smooth-scroll",
         marker: false
        },
        y: (i, target) => - innerHeight * 2.5,
        ease: "none"
       })
      }
     }
   }
  })

   if(addScrolls.length){
    addScrolls.forEach(v => {
      v.start();
    })
   }

   window.locoScroll.update();

   ScrollTrigger.addEventListener("refresh", () => window.locoScroll.update());
   ScrollTrigger.refresh();

  }, 250);

 }

}

export default SectionScrollTriggerParallax;
