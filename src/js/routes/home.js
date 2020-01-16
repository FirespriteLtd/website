import twitterFetcher from 'twitter-fetcher';
import $ from 'jquery';
import 'slick-carousel';
import Rellax from 'rellax/rellax.min';
import YTPlayer from 'yt-player';
import VideoBlock from "../util/videoBlock";
import SmoothScrollbar from "smooth-scrollbar";
import { gsap, TweenMax, TweenLite, TimelineMax, Expo } from 'gsap/all';

import ScrollMagic from 'scrollmagic/scrollmagic/minified/ScrollMagic.min';
import 'scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min';
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(SplitText);

var controller = new ScrollMagic.Controller({refreshInterval:0});
gsap.defaultEase = Expo.easeOut;

export default {

    createMasterVideo(){
        const player = new YTPlayer('#ytplayer-header')
        player.load($('.master-header .video-wrapper').data('video'), true);
        player.setVolume(0);
        player.seek(20);
        player.play();
        player.on('playing', () => {
            $('.video-foreground').addClass("playing");
            console.log('Player', player.getDuration()) // => 351.521
        })
        player.on('ended', () => {
            player.play();
        })
        return player;
    },
    animHeader() {
        const tl = gsap.timeline({repeat:0, delay: 1.5});
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
            duration: '100%',
        })
/*
         .addIndicators({
             name: "Heading Timeline",
             colorTrigger: "green",
             colorStart: "blue",
             colorEnd: "black"
         })
*/
         .addTo(controller)

        anim.on('leave', (event)=> {
            console.log('END')
            player.pause();
        });

        anim.on('enter', (event)=> {
            console.log('ENTER')
            player.play();
        });

        return anim;
    },
    init() {
        // JavaScript to be fired on all pages
        console.log('home')

    },
    finalize() {
        // JavaScript to be fired on all pages, after page specific JS is fired
        const rellax = new Rellax('.rellax');

        let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

        console.log('home')




        this.animHeader();
        setTimeout(()=> {
            const master = this.masterVideo();
            const work = new VideoBlock('work', controller);
            const games = new VideoBlock('games', controller);
            const careers = new VideoBlock('careers', controller);

            const scenes = [master,...work.scenes, ...games.scenes, ...careers.scenes];

            console.log('scenes', scenes);


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
