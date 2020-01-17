import YTPlayer from 'yt-player';
import { gsap, TweenMax, TweenLite, TimelineMax, Expo, Sine } from 'gsap/all';

import ScrollMagic from 'scrollmagic/scrollmagic/minified/ScrollMagic.min';
import 'scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min';
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
import $ from "jquery";
ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(SplitText);

class VideoBlock {

  constructor(id, controller) {
    this.id = id;
    this.scenes = [];
    this.controller = controller;
    this.block = $(`#section-${id}`);
    this.image = this.block.find('.image');
    this.video = this.block.find('.video-wrapper');
    this.start(id);
  }

  start(id){
   console.log('START', id)
    if(this.block.find('.video-wrapper').length){
      this.player = this.createVideoPlayer(id);
      if(this.player){
        this.videoPlayerActiveSetting(id);
      }
    }

    this.introAnim(id);
  }

  createVideoPlayer(id){
    const playerId = `#ytplayer-${id}`
    if(this.block.find(playerId)) {
      const player = new YTPlayer(playerId);
      const videoId = $(playerId).data('video');
      player.load(videoId, false);
      player.setVolume(0);
      player.pause();
      player.on('playing', () => {
        this.block.find('.video-foreground').addClass("playing");
      })
      player.on('ended', () => {
        player.play();
      })
      player.on('playing', () =>{
        this.openAnim(id);
      })
      player.on('paused', () =>{
      })
      return player;
    } else {
      return null;
    }
  }

  videoPlayerActiveSetting(id){

    const anim = new ScrollMagic.Scene({
      triggerElement: `#trigger-${id}`,
      triggerHook:0,
      duration: '100%',
      offset:-10
    })
     .addIndicators({
       name: `Video Pin ${this.id}`,
       colorTrigger: "blue",
       colorStart: "orange",
       colorEnd: "black"
     })
     .addTo(this.controller);



    anim.on('leave', (event)=> {
      console.log('END', id)
      this.closeAnim(id)
    });

    anim.on('enter', (event)=> {
      console.log('ENTER', id)
      this.player.play();

    });

    this.scenes.push(anim);
  }


  charAnim(id, reverse){
    const header = this.block.find('.header-content');
    const title = new SplitText(header.find('h3'), {type:"words,chars"});
    const chars = title.words;
    const tl = gsap.timeline({repeat:0, reversed: reverse});
    return tl.from(chars, {opacity:0, scaleY: 0, y:80, duration: 0.8,  ease:Expo.easeOut, stagger: 0.1});
  }

  introAnim(id){
    const headerButton = this.block.find('.header-button a');
    const tl = gsap.timeline({repeat:0, delay: 0.2});
    const header = this.block.find('.header-content');

    tl.fromTo(header.find('h2'), {alpha: 0, scale:8}, {alpha:1,scale:1, duration:0.5});
    tl.add(this.charAnim(id, false));
    tl.from(headerButton, {opacity:0, y: '100%' , rotateX:.9, duration:.5, ease: Sine.easeOut}, "=-0.5");

    const anim = new ScrollMagic.Scene({
      triggerElement: `#trigger-${id}`,
      triggerHook: 1,
      offset:30
    })
     .setTween(tl)
     .addTo(this.controller);

    this.scenes.push(anim);

  }

  openAnim(id){
    const tl = gsap.timeline({repeat:0, delay: 0});
    tl.fromTo(this.video, {alpha:0},{alpha:1, duration: 1.5, ease:Expo.easeIn});
    return tl;
  }

  closeAnim(id){
    const scope = this;
    const tl = gsap.timeline({repeat:0, delay: 0, onComplete: function () {
          scope.player.pause();
      }});
    tl.to(this.video,{alpha:0, duration: 1.5, ease:Expo.easeIn});
    return tl;
  }

}

export default VideoBlock;
