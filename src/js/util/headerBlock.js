import YTPlayer from "yt-player";
import $ from "jquery";
import {Expo, gsap, Sine, TweenLite, TweenMax, TimelineMax} from "gsap/all";
import ScrollMagic from 'scrollmagic/scrollmagic/minified/ScrollMagic.min';
import 'scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min';
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);
import { SplitText } from 'gsap/SplitText';
import MobileDetect from "mobile-detect";
gsap.registerPlugin(SplitText);
gsap.defaultEase = Expo.easeOut;

class HeaderBlock {

 constructor(controller) {
   this.video = $('.master-header .video-wrapper');

   this.controller = controller;
   this.start();
 }

 start(){
  const mc = new MobileDetect(window.navigator.userAgent);
  if(this.video.length){
   if(!mc.match('mobile')) {
    this.videoController();
   }
  }
  this.animHeader();
 }

 createVideoPlayer(){
  console.log('Create video')
  const player = new YTPlayer('#ytplayer-header');
  player.load(this.video.data('video'), true);
  player.setVolume(0);
  player.seek(20);
  player.play();
  player.on('ended', () => {
   player.play();
  })
  player.on('playing', () =>{
   TweenLite.to(this.video,
    {opacity:1, duration: 1, overwrite: true, ease:Sine.easeIn});
  })
  return player;
 }

 animHeader() {
  const tl = gsap.timeline({repeat:0, delay: 2});
  let chars = [];
  if($('.hero-header-inner').find('h1').length) {
   const title = new SplitText($('.hero-header-inner').find('h1'), {type: "words,chars"});
   chars = [...title.words];
  }

  if($('#header-trailer').length) {
   console.log('trailer')
   tl.add(gsap.from('#header-trailer', {opacity: 0, duration: 0.5, scale:0.8, ease: Expo.easeOut}));
  }
  if($('#header-game-logo').length) {
   console.log('logo')
   tl.add(gsap.from('#header-game-logo', {opacity: 0, duration: 0.5, scale:0.8, ease: Expo.easeOut}), '-=0.2');
  }
  if($('.parent-header').length) {
   console.log('parent')
   tl.add(gsap.from($('.parent-header'), {opacity: 0, scale: 2, duration: 0.5, ease: Expo.easeOut}, '-=0.5'));
  }
  if(chars.length) {
   console.log('words')
   tl.add(gsap.from(chars, {opacity: 0, scaleY: 0, y: 80, duration: 0.8, ease: Expo.easeOut, stagger: 0.1}));
  }
  if($.trim($('#header-summary').html())) {
   console.log('sum', $('#header-summary'))
   if(!$('#header-summary > h1').length) {
    tl.add(gsap.from('#header-summary', {opacity: 0, duration: 0.5, y: 100, ease: Expo.easeOut}));
   }
  }
  if($('#header-buy').length) {
   console.log('buy')
   tl.add(gsap.from('#header-buy', {opacity: 0, duration: 0.5, y: 100, ease: Expo.easeOut}), '-=0.2');
  }
 }

 videoController() {
  let player = this.createVideoPlayer();
  const anim = new ScrollMagic.Scene(
   {
   triggerElement: $('.master-header'),
    triggerHook:0,
    duration: '90%',
    offset: -10
  })


   .addTo(this.controller)

  anim.on('leave', (event)=> {
   gsap.to(this.video,
    {opacity:0, duration:1, overwrite: true, onComplete: () =>{
      player.pause();
     }})
  });

  anim.on('enter', (event)=> {
   player.play();
  });

  return anim;
 }

}

export default HeaderBlock;
