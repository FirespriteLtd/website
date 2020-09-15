import YTPlayer from "yt-player";
import $ from "jquery";
import {Expo, gsap, Sine, TweenLite, TweenMax, TimelineMax} from "gsap/all";
import ScrollMagic from 'scrollmagic/scrollmagic/minified/ScrollMagic.min';
import 'scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min';
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);
import { SplitText } from 'gsap/SplitText';
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import MobileDetect from "mobile-detect";
gsap.registerPlugin(SplitText);
gsap.registerPlugin(CSSRulePlugin);
gsap.registerPlugin(ScrollTrigger);

gsap.defaultEase = Expo.easeOut;

class HeaderBlock {

 constructor(controller) {
   this.video = $('.master-header .video-wrapper');
   this.ready = false;
   this.controller = controller;
 }

 start(){
  const mc = new MobileDetect(window.navigator.userAgent);
  if(this.video.length){
   if(!mc.match('mobile')) {
    this.videoController();
   }
  }
  this.animHeader();
  this.scrollpointer();
 }

 createVideoPlayer(){
  const player = new YTPlayer('#ytplayer-header');
  const scope = this;
  console.log('PLAYER START')
  player.load(scope.video.data('video'), true);
  player.setPlaybackQuality('highres');
  player.setVolume(0);
  player.seek(20);
  player.play();
  player.on('ended', () => {
   console.log('IS PLAYING')
   player.play();
  })
  player.on('playing', () =>{
   console.log('IS PLAYING')
   gsap.to(scope.video, {opacity:1, duration: 1, overwrite: true, ease:Sine.easeIn});
  })
  return player;
 }

 animHeader() {
  const tl = gsap.timeline({repeat:0, delay: 1.4});
  let chars = [];
  if($('.hero-header-inner').find('h1').length) {
   const title = new SplitText($('.hero-header-inner').find('h1'), {type: "words,chars"});
   chars = [...title.words];
  }



  if($('#header-trailer').length) {
   tl.add(gsap.from('#header-trailer', {opacity: 0, duration: 0.5, scale:0.8, ease: Expo.easeOut}));
  }
  if($('#header-game-logo').length) {
   tl.add(gsap.from('#header-game-logo', {opacity: 0, duration: 0.5, scale:0.8, ease: Expo.easeOut}), '-=0.2');
  }
  if($('.parent-header').length) {
   tl.add(gsap.from($('.parent-header'), {opacity: 0, scale: 2, duration: 0.5, ease: Expo.easeOut}, '-=0.5'));
  }
  if(chars.length) {
   const rule  = CSSRulePlugin.getRule('.master-header strong:before');
   tl.add(gsap.set( rule, {cssRule: {width:0}}));
   tl.add(gsap.from(chars, {opacity: 0, scaleY: 0, y: 80, duration: 0.8, ease: Expo.easeOut, stagger: 0.1}));
   tl.add(gsap.to( rule,{cssRule: {width: '100%'},duration: 0.5, stagger: 0.5}))
  }
  if($.trim($('#header-summary').html())) {
   if(!$('#header-summary > h1').length) {
    tl.add(gsap.from('#header-summary', {opacity: 0, duration: 0.5, y: 100, ease: Expo.easeOut}));
   }
  }
  if($('#header-buy').length) {
   tl.add(gsap.from('#header-buy', {opacity: 0, duration: 0.5, y: 100, ease: Expo.easeOut}), '-=0.2');
  }

  tl.add(gsap.from('.scroll-pointer', {opacity: 0, duration: 0.5, ease: Expo.easeOut}));
 }

 videoController() {
  const scope = this;
  this.player = this.createVideoPlayer();
  this.player.on('buffering', ()=> {
   if(!scope.ready) {
    console.log('PLAYER READY')

    ScrollTrigger.create({
     trigger: $('.master-header'),
     start: "-10px top",
     end: "bottom center",
     scroller: ".smooth-scroll",
     onEnter: () => {
      console.log('ENTER')
      scope.player.seek(0)
      scope.player.play();
     },
     onEnterBack: () => {
      console.log('ENTER BACK')
      scope.player.play();
     },
     onLeave: () => {
      console.log('LEAVE')
      scope.player.pause();

     }

    });
    scope.ready = true;
   }
  })

  return null;
 }

 scrollpointer() {

  const tl = gsap.timeline({repeat: 0});
  tl.to('.scroll-pointer', {opacity: 0, duration: 2, ease: Expo.easeOut}) ;

  const anim = new ScrollMagic.Scene(
      {
       triggerElement: $('.scroll-pointer'),
       triggerHook:0.5,

       duration: 100,
      })
      .setTween(tl)
      .addTo(this.controller)
 }

}



export default HeaderBlock;
