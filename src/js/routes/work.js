import 'slick-carousel';
import $ from 'jquery';
import 'fluidbox';
import HeaderBlock from "../util/headerBlock";
import SectionParallax from "../util/sectionParallax";
import SideBarController from "../util/sideBarController";

export default {
    init() {

    },
    finalize() {

        const section = new SectionParallax();
        const controller = section.controller();
        const master = new HeaderBlock(controller);

        const sections = []
         for(let x=0; x < ($('#container-scroll > div').length -1); x++) {
            sections.push(x);
         };
        console.log('Sections', sections.length, sections)

        setTimeout(()=> {
            section.init(['header', ...sections]);
            const socialMediaNav = new SideBarController('.social-menu');
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

