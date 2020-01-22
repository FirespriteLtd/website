import VideoBlock from "../util/videoBlock";
import HeaderBlock from "../util/headerBlock";
import SectionParallax from "../util/sectionParallax";
import TwitterBlock from "../util/twitterBlock";

export default {
    init() {
        // JavaScript to be fired on all pages
        console.log('home');


    },
    finalize() {


        const section = new SectionParallax();
        const controller = section.controller();
        const master = new HeaderBlock(controller);

        setTimeout(()=> {

            new VideoBlock('work', controller);
            new VideoBlock('games', controller);
            new VideoBlock('careers', controller);
            section.init(['header','work','games','news', 'careers'])

        }, 500)

        setTimeout(()=> {
            new TwitterBlock();
        },2000)

    },
};
