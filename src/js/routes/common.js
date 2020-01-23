import $ from "jquery";
import MobileDetect from "mobile-detect";
import { gsap, Power2 } from "gsap";

const offcanvasAnimation = () => {

  const tween = gsap.fromTo($('.off-canvas ul li'), {x:'100%'},{x:0, duration: .5, ease: "easeInOut", stagger: 0.1})
  tween.pause();

  $('#offCanvas').on('opened.zf.offCanvas', ()=>{
    tween.play();
  })

  $('#offCanvas').on('close.zf.offCanvas', ()=>{
    tween.reverse();
  })
}

export default {

  mobileCheck(){
    const mc = new MobileDetect(window.navigator.userAgent);
    return mc.match('mobile');
  },
  mobile(){

  },
  desktop() {
    let p_scroll = 0;
    const scrollArea = window;
    setTimeout(() => {
      $(scrollArea).scroll(function () {
        if($(scrollArea).scrollTop() !== 0) {
          if ($(scrollArea).scrollTop() > 15) {
            $('.top-bar').addClass('is-stuck');
            $('.title-bar').addClass('is-stuck');
          } else {
            $('.top-bar').removeClass('is-stuck');
            $('.title-bar').removeClass('is-stuck');
          }
          if ($(scrollArea).scrollTop() > 10) {
            if ($(scrollArea).scrollTop() < p_scroll) {
              $('.top-bar').addClass('scroll-up');
              $('.top-bar').removeClass('scroll-down');
            } else {
              $('.top-bar').addClass('scroll-down');
              $('.top-bar').removeClass('scroll-up');
            }
          }
          else{
            $('.top-bar').removeClass('is-stuck');
            $('.title-bar').removeClass('is-stuck');
            $('.top-bar').removeClass('scroll-up');
            $('.top-bar').removeClass('scroll-down');
          }
          p_scroll = $(scrollArea).scrollTop();
        }
      })
    }, 500);

    setInterval(() => {
      if($(scrollArea).scrollTop() === 0) {
        $('.top-bar').removeClass('is-stuck');
        $('.title-bar').removeClass('is-stuck');
        $('.top-bar').removeClass('scroll-up');
        $('.top-bar').removeClass('scroll-down');
      }
    },500);

  },
  init() {

    offcanvasAnimation();

    if(this.mobileCheck()){
      this.mobile();
    } else {
      console.log('start desktop menu')
      this.desktop();
    }



  },
  finalize() {

    const clipMask = 'polygon(0 0, 100% 0 , 100% 100%, 0 100% )';
    const element = document.getElementById('loader-overlay');

    console.log('browser', window.navigator.userAgent);

    const tl = gsap.timeline({repeat:0});
    tl.to('#loader-overlay',  {
      '-webkit-clip-path':'polygon(100% 0, 100% 0 , 100% 100%, 100% 100% )' ,
      clipPath:'polygon(100% 0, 100% 0 , 100% 100%, 100% 100% )',
      duration:1.5,
      ease: Power2.easeInOut
    });
    tl.set('#loader-overlay', {autoAlpha:0});

    if(document.getElementById('side-left')){
      tl.add(tl.fromTo('#side-left', {autoAlpha:0,x:-150}, {autoAlpha:1, x:0 , duration:0.5, ease: Power2.easeInOut }),'-=1')
    }
    tl.add(tl.fromTo('#side-right', {autoAlpha:0,x:300}, {autoAlpha:1, x:0 , duration:0.5, ease: Power2.easeInOut }))
  },
};
