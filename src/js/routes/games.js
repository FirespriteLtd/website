import AnchorNav from "../util/anchor-nav";
import HeaderBlock from "../util/headerBlock";
import SectionParallax from "../util/sectionParallax";
import fluidBox from  "../util/fluid-box-controller"
import VideoPopup from "../util/videoPopup";
import Popup from "../util/popup";

export default {
    init() {
        new AnchorNav('#sub-nav');
        new Popup();
    },
    finalize() {
        // JavaScript to be fired on all pages, after page specific JS is fire
        const section = new SectionParallax();
        const controller = section.controller();
        const trailer  = new VideoPopup();

        const master = new HeaderBlock(controller);

        const sections = []
        for(let x=0; x < ($('#container-scroll > div').length -1); x++) {
            sections.push(x);
        };
        setTimeout(()=> {
            section.init(['header', ...sections]);
        }, 1000);

        fluidBox.init();
    },
};
