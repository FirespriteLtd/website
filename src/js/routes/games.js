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
        const trailer  = new VideoPopup();
        new TabSlider('.tab-slider');

        setTimeout(()=> {
            section.init([new HeaderBlock()]);
        }, 250);
        fluidBox.init();
    },
};
