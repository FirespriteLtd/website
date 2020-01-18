import 'slick-carousel';
import $ from 'jquery';
import 'fluidbox';
import HeaderBlock from "../util/headerBlock";
import SectionParallax from "../util/sectionParallax";

export default {
    init() {
        // JavaScript to be fired on all pages
        console.log('about')
    },
    finalize() {

        const section = new SectionParallax();
        const controller = section.controller();

        const master = new HeaderBlock(controller);


        setTimeout(()=> {
            section.init(['header', "0", "1" , "3"]);
        }, 1000);

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

