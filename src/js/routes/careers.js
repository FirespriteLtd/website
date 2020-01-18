import $ from 'jquery'
import 'slick-carousel';
import SectionParallax from "../util/sectionParallax";
import HeaderBlock from "../util/headerBlock";

export default {
    init() {
        console.log()
    },
    finalize() {

        const section = new SectionParallax();
        const controller = section.controller();
        const master = new HeaderBlock(controller);

        setTimeout(()=> {
            section.init(['header']);
        }, 1000);

        // JavaScript to be fired on all pages, after page specific JS is fire
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
