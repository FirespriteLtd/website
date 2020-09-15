import VideoBlock from "../util/videoBlock";
import HeaderBlock from "../util/headerBlock";
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
        section.init([ new HeaderBlock() , new VideoBlock('games'),new VideoBlock('careers')]);


        setTimeout(()=> {
            new TwitterBlock();

        },2000);

    },
};
