import YTPlayer from "yt-player";
import $ from "jquery";
import {Expo, gsap, Sine, TweenLite, TweenMax, TimelineMax} from "gsap/all";
import ScrollMagic from 'scrollmagic/scrollmagic/minified/ScrollMagic.min';
import 'scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min';
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(SplitText);
gsap.defaultEase = Expo.easeOut;

class HeaderBlock {

 constructor(controller) {
   this.video = $('.master-header .video-wrapper');
   this.controller = controller;
   this.start();
 }

 start(){
  if(this.video.length){
   this.videoController();
  }
  this.animHeader();
 }

 createVideoPlayer(){
  const player = new YTPlayer('#ytplayer-header')
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
  const tl = gsap.timeline({repeat:0, delay: 3});
  const title = new SplitText($('.hero-header-inner').find('h1'), {type:"words,chars"});
  const chars = title.words;
  tl.from($('.parent-header'), {opacity:0, scale:2, duration: 0.5, ease:Expo.easeOut}, '-=0.5');
  tl.from(chars, {opacity:0, scaleY: 0, y:80, duration: 0.8,  ease:Expo.easeOut, stagger: 0.1});
  tl.from($('.content-subtitle-animate'),{opacity:0, duration:0.5, y: 100, ease:Expo.easeOut});
 }

 videoController() {
  let player = this.createVideoPlayer();
  const anim = new ScrollMagic.Scene(
   {
   triggerElement: $('.master-header'),
   triggerHook:"onEnter",
   duration: '50%',
  })

   .addIndicators({
    name: "Heading Timeline",
    colorTrigger: "green",
    colorStart: "blue",
    colorEnd: "black"
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
