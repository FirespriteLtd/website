import VideoBlock from "../util/videoBlock";
import HeaderBlock from "../util/headerBlock";
import SectionParallax from "../util/sectionParallax";
import TwitterBlock from "../util/twitterBlock";
import scrollSnapPolyfill from 'css-scroll-snap-polyfill';
import $ from "jquery";
import Foundation from "foundation-sites"

export default {
    init() {
        // JavaScript to be fired on all pages



        console.log('home', Foundation.MediaQuery.current);

        $(window).on('resize', ()=> {
            console.log('home', Foundation.MediaQuery.is('small'));
            if(Foundation.MediaQuery.is('small only')){
                $('.news-slider').slick({
                    arrows: false,
                    dots: true,
                    autoplay: true,
                    infinite: true,
                    fade: true,
                    autoplaySpeed: 5000,
                });
            } else {
                //$('.news-slider').unslick();
            }
        })

    },
    finalize() {

        if(Foundation.MediaQuery.is('small only')){
            console.log('TEST MEDIA')
        }


        const section = new SectionParallax();
        const controller = section.controller();
        const master = new HeaderBlock(controller);

        setTimeout(()=> {

            new VideoBlock('work', controller);
            new VideoBlock('games', controller);
            new VideoBlock('careers', controller);
            section.init(['header','work','games','news', 'careers'])

            scrollSnapPolyfill();

        }, 500)

        setTimeout(()=> {
            new TwitterBlock();
        },2000);

        $(window).on('resize', function(event) {
            // newSize is the name of the now-current breakpoint, oldSize is the previous breakpoint

        });

    },
};
