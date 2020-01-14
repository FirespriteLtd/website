import $ from "jquery";
import { gsap } from "gsap";

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
  init() {

    offcanvasAnimation();

    let p_scroll = 0;
    setTimeout(() => {
    $(window).scroll(function () {
      if($(window).scrollTop() !== 0) {
        if ($(window).scrollTop() > 15) {
          $('.top-bar').addClass('is-stuck');
          $('.title-bar').addClass('is-stuck');
        } else {
          $('.top-bar').removeClass('is-stuck');
          $('.title-bar').removeClass('is-stuck');
        }
        if ($(window).scrollTop() > 10) {
          if ($(window).scrollTop() < p_scroll) {
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
        p_scroll = $(window).scrollTop();
      }
    })
    }, 500);

    setInterval(() => {
      if($(window).scrollTop() === 0) {
        $('.top-bar').removeClass('is-stuck');
        $('.title-bar').removeClass('is-stuck');
        $('.top-bar').removeClass('scroll-up');
        $('.top-bar').removeClass('scroll-down');
      }
    },500);

  },
  finalize() {

  },
};
