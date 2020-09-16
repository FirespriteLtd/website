import 'slick-carousel';
import $ from 'jquery';
import 'fluidbox';
import HeaderBlock from "../util/headerBlock";
import SectionScrollControlls from "../util/sectionScrollControls";
import SideBarController from "../util/sideBarController";
import VideoPopup from "../util/videoPopup";


export default {
    init() {
    },
    finalize() {

        const section = new SectionScrollControlls();
        const controller = section.controller();
        const master = new HeaderBlock(controller);
        const trailer  = new VideoPopup();

        const sections = []
         for(let x=0; x < ($('#container-scroll > div').length -1); x++) {
            sections.push(x);
         };

        setTimeout(()=> {
            section.init(['header', ...sections]);
            new SideBarController('.social-menu');
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

