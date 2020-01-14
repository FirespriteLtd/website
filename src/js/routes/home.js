import twitterFetcher from 'twitter-fetcher';
import $ from 'jquery';
import 'slick-carousel';
import Rellax from 'rellax/rellax.min';
import YTPlayer from 'yt-player';
import { gsap, TweenMax, TweenLite, TimelineMax, Expo } from 'gsap/all';

import ScrollMagic from 'scrollmagic/scrollmagic/minified/ScrollMagic.min';
import 'scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min';
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);



import { SplitText } from 'gsap/SplitText';
import animations from "../util/animations"
gsap.registerPlugin(SplitText);

var controller = new ScrollMagic.Controller();
gsap.defaultEase = Expo.easeOut;

export default {

    animHeader() {
        const tl = gsap.timeline({repeat:0, delay: 0.2});
        const heading = $('.hero-header-inner');
        const title = new SplitText($('.hero-header-inner').find('h1'), {type:"words,chars"});
        const chars = title.words;

        tl.from(chars, {opacity:0, scaleY: 0, y:80, duration: 0.8,  ease:Expo.easeOut, stagger: 0.1});
        tl.from($('.content-subtitle-animate'),{opacity:0, duration:0.5, y: 100, ease:Expo.easeOut});

        const anim = new ScrollMagic.Scene({
            triggerElement: heading,
            triggerHook: 0.4
        })

            .addIndicators({
                name: "Heading Timeline",
                colorTrigger: "green",
                colorStart: "red",
                colorEnd: "black"
            })

            .setTween(tl)
            .addTo(controller)

    },
    init() {
        // JavaScript to be fired on all pages
        console.log('home')
    },
    finalize() {
        // JavaScript to be fired on all pages, after page specific JS is fired
        const rellax = new Rellax('.rellax');

        console.log('home')

        const player = new YTPlayer('#ytplayer-header')
        player.load('Oxlflrh_Pzw', true);
        player.setVolume(0);


        player.play();
        player.on('playing', () => {
            $('.video-foreground').addClass("playing");
            console.log('Player', player.getDuration()) // => 351.521
        })
        player.on('ended', () => {
            player.play();
        })

        this.animHeader();
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


        //this.animList();
        //this.animServices();
        //this.animBlocks();

         */
    },
};
