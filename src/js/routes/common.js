import $ from "jquery";
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
  init() {

    offcanvasAnimation();

    let p_scroll = 0;
    setTimeout(() => {
    $('#container-scroll').scroll(function () {
      if($('#container-scroll').scrollTop() !== 0) {
        if ($('#container-scroll').scrollTop() > 15) {
          $('.top-bar').addClass('is-stuck');
          $('.title-bar').addClass('is-stuck');
        } else {
          $('.top-bar').removeClass('is-stuck');
          $('.title-bar').removeClass('is-stuck');
        }
        if ($('#container-scroll').scrollTop() > 10) {
          if ($('#container-scroll').scrollTop() < p_scroll) {
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
        p_scroll = $('#container-scroll').scrollTop();
      }
    })
    }, 500);

    setInterval(() => {
      if($('#container-scroll').scrollTop() === 0) {
        $('.top-bar').removeClass('is-stuck');
        $('.title-bar').removeClass('is-stuck');
        $('.top-bar').removeClass('scroll-up');
        $('.top-bar').removeClass('scroll-down');
      }
    },500);

  },
  finalize() {
    gsap.fromTo('#loader-overlay', {x:0}, {x:'100%' , duration:1, ease: Power2.easeInOut });
  },
};
