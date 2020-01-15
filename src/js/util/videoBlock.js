import YTPlayer from 'yt-player';
import { gsap, TweenMax, TweenLite, TimelineMax, Expo } from 'gsap/all';

import ScrollMagic from 'scrollmagic/scrollmagic/minified/ScrollMagic.min';
import 'scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min';
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
import $ from "jquery";
ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);

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
        this.player.play();
        if(this.player){
          this.animation(id);
          this.pin(id);
        }
      }


  }

  createVideoPlayer(id){
    const playerId = `#ytplayer-${id}`
    if(this.block.find(playerId)) {
      const player = new YTPlayer(playerId);
      const videoId = $(playerId).data('video');
      player.load(videoId, true);
      player.setVolume(0);
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

  animation(id){

    const anim = new ScrollMagic.Scene({
      triggerElement: `#section-${id}`,
      triggerHook:"onEnter",
      duration: '200%',
      offset: -300
    })

     .addIndicators({
       name: `Video Block ${this.id}`,
       colorTrigger: "green",
       colorStart: "red",
       colorEnd: "black"
     })

     .addTo(this.controller)

    anim.on('leave', (event)=> {
      console.log('END')
      this.player.pause();
    });

    anim.on('enter', (event)=> {
      console.log('ENTER')
      this.player.play();
    });
  }

  pin(id){
    const anim = new ScrollMagic.Scene({
      triggerElement: `#trigger-${id}`,
      triggerHook: "onLeave",
      duration: "100%"
    })

     .setPin(`#trigger-${id}`)

     .addIndicators({
       name: `Video Pin ${this.id}`,
       colorTrigger: "blue",
       colorStart: "orange",
       colorEnd: "black"
     })

     .addTo(this.controller)
  }

}

export default VideoBlock;
