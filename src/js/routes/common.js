import $ from "jquery";
import imagesLoaded from "imagesloaded";
import MobileDetect from "mobile-detect";
import { gsap, Power2 } from "gsap";
import Loader from "../util/loader";

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
      this.desktop();
    } else {
      this.desktop();
    }
  },
  finalize() {

    this.loader = new Loader()
    this.loader.start();

  },
};
