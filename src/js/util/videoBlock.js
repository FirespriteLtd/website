import YTPlayer from 'yt-player';
import MobileDetect from 'mobile-detect';
import { gsap, TweenMax, TimelineMax, Expo, Sine } from 'gsap/all';
import ScrollMagic from 'scrollmagic/scrollmagic/minified/ScrollMagic.min';
import 'scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min';
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
import $ from "jquery";
ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

class VideoBlock {

  constructor(id, controller) {
    this.id = id;
    this.scenes = [];
    this.ready = false;
    this.controller = controller;
    this.block = $(`#section-${id}`);
    this.image = this.block.find('.image');
    this.video = this.block.find('.video-wrapper');
    //this.start(id);
  }

  start(){

    if(this.mobileCheck()){
      return;
    }

    if(this.block.find('.video-wrapper').length){
      this.player = this.createVideoPlayer();
    }
    this.introAnim(this.id);
  }

  mobileCheck(){
    const mc = new MobileDetect(window.navigator.userAgent);
    return mc.match('mobile|tablet');
  }

  createVideoPlayer(){
    const playerId = `#ytplayer-${this.id}`;

    if(this.block.find(playerId)) {
      const option = {
        controls: false,
        keyboard: false,
        related: false,
        autoplay: false
      };
      const player = new YTPlayer(playerId, option);
      const videoId = $(playerId).data('video');

      player.load(videoId, false);
      player.setVolume(0);
      player.pause();
      /// here you can set quality of the player's stream
      /// player.setPlaybackQuality('hd1080')
      player.on('ended', () => {
        player.seek(0);
        player.play();
      })
      player.on('paused', () =>{

      })
      player.on('playing', () =>{
        gsap.to(this.video,{opacity:1, z:0, duration: 1, overwrite: true, ease:Sine.easeIn});
      })

      this.player = player;
      this.videoPlayerActiveSetting(player);

    } else {
      return null;
    }
  }

  videoPlayerActiveSetting(player){
    const scope = this;
    console.log('VIDEO BLOCL PLAYER READY', scope.id)
      if(!scope.ready) {
        ScrollTrigger.create({
          trigger: `#trigger-${scope.id}`,
          start: "-10px top",
          end: "bottom center",
          scroller: ".smooth-scroll",
          onEnter: () => {
            console.log('ENTER')
            player.seek(0)
            player.play();
          },
          onEnterBack: () => {
            console.log('ENTER BACK')
            player.play();
          },
          onLeave: () => {
            console.log('LEAVE')
            player.pause();

          }

        });
        scope.ready = true;
      }


    return null;
    /*
    const anim = new ScrollMagic.Scene({
      triggerElement: `#trigger-${id}`,
      triggerHook:0,
      duration: '50%',
    })
     .addTo(this.controller);

    anim.on('leave', (event)=> {
      gsap.to(this.video,{opacity:0, z:0, duration:0.5, overwrite: true, onComplete: () =>{
          this.player.pause();
        }})

    });

    anim.on('enter', (event)=> {
      this.player.seek(0)
      this.player.play();
    });

    //this.scenes.push(anim);

     */
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

    tl.fromTo([header.find('h2')], {alpha: 0, scale:8}, {alpha:1,scale:1, duration:0.5});
    tl.add(this.charAnim(id, false));
    tl.from([header.find('p'), headerButton], {opacity:0, y: '100%' , rotateX:.9, duration:.5, ease: Sine.easeOut}, "=-0.5");

    ScrollTrigger.create( {
      trigger: `#trigger-${id}`,
      start: "-=100% top",
      end: "bottom 80%",
      scroller: ".smooth-scroll",
      animation: tl,
      scrub: true,
      marker: true
     }
    )

  }

}

export default VideoBlock;
