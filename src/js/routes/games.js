import HeaderBlock from "../util/headerBlock";
import fluidBox from  "../util/fluid-box-controller"
import VideoPopup from "../util/videoPopup";
import Popup from "../util/popup";
import TabSlider from "../util/tabSlider";
import SectionScrollTriggerParallax from "../util/sectionScrollTriggerParallax";
import SectionScrollControls from "../util/sectionScrollControls";


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

        const sections = []

        for(let x=0; x < ($('#container-scroll > div').length -1); x++) {
            sections.push(x);
        };

        console.log('SECTION', sections)

        controls.navIndicator(sections);

        setTimeout(()=> {
            section.init([master]);
            controls.init();

        }, 250);
        fluidBox.init();
    },
};
