import VideoBlock from "../util/videoBlock";
import HeaderBlock from "../util/headerBlock";
import SectionParallax from "../util/sectionParallax";
import TwitterBlock from "../util/twitterBlock";
import scrollSnapPolyfill from 'css-scroll-snap-polyfill';
import $ from "jquery";

export default {
    addSlider(){
        console.log('check',$(window).width())
        if($(window).width() <= 768){
            $('.news-slider').slick({
                arrows: false,
                dots: true,
                autoplay: true,
                infinite: true,
                fade: true,
                autoplaySpeed: 5000,
            });
        } else {
            // todo: unslick when changing size
            //$('.news-slider').unslick();
        }
    },
    init() {
        // JavaScript to be fired on all pages
        $(window).on('resize', ()=> {
            this.addSlider()
        })

        this.addSlider();

    },
    finalize() {
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

    },
};
