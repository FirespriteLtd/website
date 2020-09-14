import HeaderBlock from "../util/headerBlock";
import SectionParallax from "../util/sectionParallax";
import fluidBox from  "../util/fluid-box-controller"
import VideoPopup from "../util/videoPopup";
import Popup from "../util/popup";
import TabSlider from "../util/tabSlider";
import SectionScrollTriggerParallax from "../util/sectionScrollTriggerParallax";

export default {
    init() {
        new Popup();
    },
    finalize() {
        // JavaScript to be fired on all pages, after page specific JS is fire
        const section = new SectionScrollTriggerParallax();
        const controller = section.controller();
        const trailer  = new VideoPopup();
        const master = new HeaderBlock(controller);
        new TabSlider('.tab-slider');

        const sections = []
        for(let x=0; x < ($('#container-scroll > div').length -1); x++) {
            sections.push(x);
        };
        setTimeout(()=> {
            section.init();
        }, 1000);
        fluidBox.init();
    },
};
