import VideoBlock from "../util/videoBlock";
import HeaderBlock from "../util/headerBlock";
import SectionParallax from "../util/sectionParallax";
import SectionScrollTriggerParallax from "../util/sectionScrollTriggerParallax";
import TwitterBlock from "../util/twitterBlock";
import TabSlider from "../util/tabSlider";

export default {
    init() {
        // JavaScript to be fired on all pages
       new TabSlider('.news-slider');
    },
    finalize() {
        const section = new SectionScrollTriggerParallax()
        const controller = section.controller();



        setTimeout(()=> {
            const master = new HeaderBlock(controller);
            //new VideoBlock('work', controller);

           // new VideoBlock('careers', controller);
            section.init([  new VideoBlock('games', controller)]);




        }, 500)

        setTimeout(()=> {
            new TwitterBlock();

        },2000);

    },
};
