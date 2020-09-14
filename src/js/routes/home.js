import VideoBlock from "../util/videoBlock";
import HeaderBlock from "../util/headerBlock";
import SectionParallax from "../util/sectionParallax";
import SectionScrollTriggerParallax from "../util/sectionScrollTriggerParallax";
import TwitterBlock from "../util/twitterBlock";
import scrollSnapPolyfill from 'css-scroll-snap-polyfill';
import TabSlider from "../util/tabSlider";

export default {
    init() {
        // JavaScript to be fired on all pages
       new TabSlider('.news-slider');
    },
    finalize() {
        //const section = new SectionParallax();
        //const controller = section.controller();
        //const master = new HeaderBlock(controller);
        const section = new SectionScrollTriggerParallax()

        setTimeout(()=> {

            //new VideoBlock('work', controller);
           // new VideoBlock('games', controller);
           // new VideoBlock('careers', controller);
            section.init();

            scrollSnapPolyfill();

        }, 500)

        setTimeout(()=> {
            new TwitterBlock();

        },2000);

    },
};
