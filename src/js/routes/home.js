import VideoBlock from "../util/videoBlock";
import HeaderBlock from "../util/headerBlock";
import SmoothScrollbar from 'smooth-scrollbar';
import SectionParallax from "../util/sectionParallax";

export default {
    init() {
        // JavaScript to be fired on all pages
        console.log('home')

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
            const pinScene = ['header','work','games','news'];
            section.init(pinScene)

        }, 1000)

        /*
        var configProfile = {
            "profile": {"screenName": 'RenaissancePRUK'},
            "domId": 'tweet-post',
            "maxTweets": 1,
            "enableLinks": true,
            "showUser": false,
            "showTime": false,
            "showImages": false,
            "lang": 'en'
        };
        twitterFetcher.fetch(configProfile);
         */


    },
};
