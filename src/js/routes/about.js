//import animations from "../util/animations"
//import ScrollMagic from 'scrollmagic/scrollmagic/minified/ScrollMagic.min';
import Rellax from 'rellax/rellax.min';

export default {
    init() {
        // JavaScript to be fired on all pages
        console.log('about')
    },
    finalize() {
        const rellax = new Rellax('.rellax');
        // const controller = new ScrollMagic.Controller();
        // const blocks =[ '#about', '#values', '#stats','#video'];
        // animations.animBlock(controller, blocks);
    },
};
