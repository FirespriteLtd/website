import YTPlayer from 'yt-player';
import { gsap, TweenMax, TweenLite, TimelineMax, Expo } from 'gsap/all';

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
    this.controller = controller
    this.block = $(`#section-${id}`);
    this.image = this.block.find('.image');
    $(window).on('load', () => {
      console.log('image-loaded')
    });
    console.log(this.block.find('.image').height());

      console.log('check', id, this.block.position(), this.block.height())
      if(this.block.find('.video-wrapper').length){
        this.player = this.createVideoPlayer(id);
        if(this.player){
          this.videoPlayerActiveSetting(id);
          this.pin(id);
          this.headerAnim(id);
          this.introAnim(id);
          //this.outAnim(id);
        }
      }


  }

  createVideoPlayer(id){
    const playerId = `#ytplayer-${id}`
    if(this.block.find(playerId)) {
      const player = new YTPlayer(playerId);
      const videoId = $(playerId).data('video');
      player.load(videoId, false);
      player.setVolume(0);
      player.seek(5)
      player.on('playing', () => {
        this.block.find('.video-foreground').addClass("playing");
      })
      player.on('ended', () => {
        player.play();
      })
      return player;
    } else {
      return null;
    }
  }

  videoPlayerActiveSetting(id){

    const anim = new ScrollMagic.Scene({
      triggerElement: `#section-${id}`,
      triggerHook:.15,
      duration: '50%',
    })
/*
     .addIndicators({
       name: `Video Block ${this.id}`,
       colorTrigger: "green",
       colorStart: "red",
       colorEnd: "black"
     })
*/
     .addTo(this.controller)

    anim.on('leave', (event)=> {
      console.log('END')
      this.closeAnim(id, this.player.pause);
    });

    anim.on('enter', (event)=> {
      console.log('ENTER')
      this.openAnim(id);
      this.player.play();
    });
  }

  pin(id){
    const anim = new ScrollMagic.Scene({
      triggerElement: `#trigger-${id}`,
      triggerHook: 0,
      duration: "80%"
    })

     .setPin(`#trigger-${id}`)

/*
     .addIndicators({
       name: `Video Pin ${this.id}`,
       colorTrigger: "blue",
       colorStart: "orange",
       colorEnd: "black"
     })
*/
     .addTo(this.controller)
  }

  revealAnim(id){

    const tl = gsap.timeline({repeat:0, delay: 0});
    tl.fromTo(this.block.find('.revealCover'), {x:'-100%'}, {x:'200%', duration: 0.5, ease: Expo.easeIn})
  }

  headerAnim(id){
    const header = this.block.find('.header-content');
    const tl = gsap.timeline({repeat:0, delay: 0});
    tl.fromTo(header.find('h2'), {alpha: 1, scale:8, y:'-200%', color:'rgba(255, 255,255, 1)'}, {alpha:1,scale:1, y:'0%', color:'rgba(255, 255,255, 1)', duration:5});


    const anim = new ScrollMagic.Scene({
      triggerElement: `#trigger-${id}`,
      triggerHook: "onEnter",
      duration: "100%",
    })
     .reverse(true)
     .setTween(tl)
     .addTo(this.controller)

  }

  charAnim(id, reverse){
    const header = this.block.find('.header-content');
    const title = new SplitText(header.find('h3'), {type:"words,chars"});
    const chars = title.words;
    const tl = gsap.timeline({repeat:0, reversed: reverse, delay: 1});
    return tl.from(chars, {opacity:0, scaleY: 0, y:80, duration: 0.8,  ease:Expo.easeOut, stagger: 0.1});
  }

  introAnim(id){
    const headerButton = this.block.find('.header-button a');
    const tl = gsap.timeline({repeat:0, delay: 1});
    tl.add(this.charAnim(id, false));

    tl.from(headerButton, {opacity:0, y: '100%', duration:.5, ease: Expo.easeIn})

    const anim = new ScrollMagic.Scene({
      triggerElement: `#trigger-${id}`,
      triggerHook: 0.5,
    })

     .setTween(tl)
     .addTo(this.controller)

  }

  outAnim(id){
    const tl = gsap.timeline({repeat:0, delay: 0});
    tl.add(this.charAnim(id, true));


    const anim = new ScrollMagic.Scene({
      triggerElement: `#trigger-${id}`,
      triggerHook: 1.2,
    })

     .setTween(tl)
     .addTo(this.controller)
  }

  openAnim(id){
    const header = this.block.find('.header-content');
    const tl = gsap.timeline({repeat:0, delay: 0});
    tl.fromTo(this.block.find('.revealCover'), {x:0}, {x:'300%', duration: 1.5, ease:Expo.easeIn})
    tl.to(header.find('h2'), {color:'rgba(231, 79 ,79, 1)'}, '-=0.5');
    return tl;
  }

  closeAnim(id, callback){
    const tl = gsap.timeline({repeat:0, delay: 0, onComplete: callback});
    const header = this.block.find('.header-content');
    tl.fromTo(this.block.find('.revealCover'), {x:'300%'}, {x:0, duration: 1.5, ease:Expo.easeIn})
    tl.to(header.find('h2'), {color:'rgba(255, 255,255, 1)'});
    return tl;
  }

}

export default VideoBlock;
