import HeaderBlock from "../util/headerBlock";
import fluidBox from  "../util/fluid-box-controller"
import VideoPopup from "../util/videoPopup";
import Popup from "../util/popup";
import TabSlider from "../util/tabSlider";
import SectionScrollTriggerParallax from "../util/sectionScrollTriggerParallax";
import SectionScrollControls from "../util/SectionScrollControls"

export default {
    init() {
        new Popup();
    },
    finalize() {
        const section = new SectionScrollTriggerParallax();
        const trailer  = new VideoPopup();
        const master = new HeaderBlock();
        const controls =  new SectionScrollControls();
        new TabSlider('.tab-slider');

        setTimeout(()=> {
            section.init([master]);
            controls.init();

        }, 250);
        fluidBox.init();
    },
};
