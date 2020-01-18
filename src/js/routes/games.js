import $ from 'jquery'
// import ScrollMagic from "scrollmagic/scrollmagic/minified/ScrollMagic.min";
// import animations from "../util/animations";
import Rellax from "rellax/rellax.min";
import 'slick-carousel';
import SectionParallax from "../util/sectionParallax";
import HeaderBlock from "../util/headerBlock";


export default {
    init() {
        console.log()
    },
    finalize() {
        // JavaScript to be fired on all pages, after page specific JS is fire
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
        }, 1000);

        $('.image-fancy').fluidbox();
    },
};
