import twitterFetcher from 'twitter-fetcher';
import $ from 'jquery';
import 'slick-carousel';
import Rellax from 'rellax/rellax.min';
import YTPlayer from 'yt-player';
import VideoBlock from "../util/videoBlock";
import SmoothScrollbar from 'smooth-scrollbar';
import {gsap, TweenMax, TweenLite, TimelineMax, Expo, Linear, Sine} from 'gsap/all';

import ScrollMagic from 'scrollmagic/scrollmagic/minified/ScrollMagic.min';
import 'scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min';
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(SplitText);
gsap.defaultEase = Expo.easeOut;

const controller = new ScrollMagic.Controller({container: '#container-scroll'});

export default {

    createMasterVideo(){
        const player = new YTPlayer('#ytplayer-header')
        player.load($('.master-header .video-wrapper').data('video'), true);
        player.setVolume(0);
        player.seek(20);
        player.play();
        player.on('playing', () => {

            console.log('Player', player.getDuration()) // => 351.521
        })
        player.on('ended', () => {
            player.play();
        })
        player.on('playing', () =>{
            TweenLite.to($('.master-header .video-wrapper'), {opacity:1, duration: 1, overwrite: true, ease:Sine.easeIn});
        })
        return player;
    },
    animHeader() {
        const tl = gsap.timeline({repeat:0, delay: 0});
        const title = new SplitText($('.hero-header-inner').find('h1'), {type:"words,chars"});
        const chars = title.words;
        tl.from($('.parent-header'), {opacity:0, scale:2, duration: 0.5, ease:Expo.easeOut}, '-=0.5');
        tl.from(chars, {opacity:0, scaleY: 0, y:80, duration: 0.8,  ease:Expo.easeOut, stagger: 0.1});
        tl.from($('.content-subtitle-animate'),{opacity:0, duration:0.5, y: 100, ease:Expo.easeOut});
    },
    masterVideo() {
        let player = this.createMasterVideo();
        const anim = new ScrollMagic.Scene({
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

         .addTo(controller)

        anim.on('leave', (event)=> {
            player.pause();
        });

        anim.on('enter', (event)=> {
            player.play();
        });

        return anim;
    },
    init() {
        // JavaScript to be fired on all pages
        console.log('home')

    },
    finalize() {
        //SmoothScrollbar.init(document.querySelector('#container-scroll'));

        this.animHeader();

        setTimeout(()=> {
            const master = this.masterVideo();
            const work = new VideoBlock('work', controller);
            const games = new VideoBlock('games', controller);
            const careers = new VideoBlock('careers', controller);
            const pinScene = ['header','work','games','news'];

            for(let i=0;i<pinScene.length;i++) {

                const tl = gsap.timeline({repeat:0});
                tl.to(`#section-${pinScene[i]}`, {y:'100%', z:0, duration: 20, overwrite:true,  ease: Linear.easeNone})

                new ScrollMagic.Scene({
                    triggerElement:`#trigger-${pinScene[i]}`,
                    triggerHook: 0,
                    duration: '200%'
                })
                 .setTween(tl)
                 .loglevel(3)
                 .addTo(controller);
            }

        }, 1000)

        /*
        var configProfile = {
            "profile": {"screenName": 'RenaissancePRUK'},
            "domId": 'tweet-post',
            "maxTweets": 1,
            "enableLinks": true,
            "showUser": false,
            "showTime": false,
            "showImages": false,
            "lang": 'en'
        };
        twitterFetcher.fetch(configProfile);
         */


    },
};
