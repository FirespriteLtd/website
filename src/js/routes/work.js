//import animations from "../util/animations"
//import ScrollMagic from 'scrollmagic/scrollmagic/minified/ScrollMagic.min';
import Rellax from 'rellax/rellax.min';
import 'slick-carousel';
import $ from 'jquery';
import 'fluidbox';
import SmoothScrollbar from "smooth-scrollbar";

export default {
    init() {
        // JavaScript to be fired on all pages
        console.log('about')
    },
    finalize() {
        const rellax = new Rellax('.rellax');
        // const controller = new ScrollMagic.Controller();
        // const blocks =[ '#about', '#values', '#stats','#video'];
        // animations.animBlock(controller, blocks);
        $('#testimonial').slick({
            arrows: false,
            dots: true,
            autoplay: true,
            infinite: true,
            fade: true,
            autoplaySpeed: 5000,
        });

        $('.image-fancy').fluidbox();
    },
};

