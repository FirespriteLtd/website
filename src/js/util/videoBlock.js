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
    this.block = $(`#${id}`);
    this.image = this.block.find('.image');
    $(window).on('load', () => {
      console.log('image-loaded')
    });

    if(this.block.find('.video-wrapper')){
      this.player = this.createVideoPlayer(id);
      if(this.player){
        this.animation();
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

  animation(){
    this.anim = new ScrollMagic.Scene({
      triggerElement: this.block,
      triggerHook:"onEnter",
      duration: '100%',
    })

     .addIndicators({
       name: `Video Block ${this.id}`,
       colorTrigger: "green",
       colorStart: "red",
       colorEnd: "black"
     })

     .addTo(this.controller)

    this.anim.on('leave', (event)=> {
      console.log('END')
      this.player.pause();
    });

    this.anim.on('enter', (event)=> {
      console.log('ENTER')
      this.player.play();
    });
  }

}

export default VideoBlock;
