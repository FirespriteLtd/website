import $ from 'jquery'
import ScrollMagic from "scrollmagic/scrollmagic/minified/ScrollMagic.min";
import animations from "../util/animations";
import Rellax from "rellax/rellax.min";
import 'slick-carousel';

export default {
    init() {
        console.log()
    },
    finalize() {
        // JavaScript to be fired on all pages, after page specific JS is fire
        const rellax = new Rellax('.rellax');
        $('#testimonial').slick({
            arrows: false,
            dots: true,
            autoplay: true,
            infinite: true,
            fade: true,
            autoplaySpeed: 5000,
        });
    },
};
