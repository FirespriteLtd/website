import VideoBlock from "../util/videoBlock";
import HeaderBlock from "../util/headerBlock";
import SmoothScrollbar from 'smooth-scrollbar';
import SectionParallax from "../util/sectionParallax";
import TwitterBlock from "../util/twitterBlock";

export default {
    init() {
        // JavaScript to be fired on all pages
        console.log('home');


    },
    finalize() {
        //SmoothScrollbar.init(document.querySelector('#container-scroll'));

        const section = new SectionParallax();
        const controller = section.controller();
        const master = new HeaderBlock(controller);

        setTimeout(()=> {

            const work = new VideoBlock('work', controller);
            const games = new VideoBlock('games', controller);
            const careers = new VideoBlock('careers', controller);
            const pinScene = ['header','work','games','news', 'careers'];
            section.init(pinScene)

        }, 500)

        setTimeout(()=> {
            new TwitterBlock();
        },2000)

    },
};
