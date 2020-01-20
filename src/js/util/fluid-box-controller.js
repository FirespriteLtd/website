import {gsap} from "gsap/all";

export default {
  init(){
   $('.image-fancy')
    .on('closeend.fluidbox',()=>{
     gsap.to('.side-nav', {autoAlpha:1, duration:0.5})
    })
    .on('openstart.fluidbox', () => {
    setTimeout(()=>{
     $('.fluidbox__overlay').height(document.getElementById("container-scroll").scrollHeight + $('body').innerHeight());
     gsap.to('.side-nav', {autoAlpha:0, duration:0.5})
    }, 100);

   }).fluidbox();
  }
}
