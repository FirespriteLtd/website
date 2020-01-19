import AnchorNav from "../util/anchor-nav";

export default {
    init() {
        new AnchorNav('#sub-nav');
    },
    finalize() {
        // JavaScript to be fired on all pages, after page specific JS is fire
        const section = new SectionParallax();
        const controller = section.controller();

        const master = new HeaderBlock(controller);

        const sections = []
        for(let x=0; x < ($('#container-scroll > div').length -1); x++) {
            sections.push(x);
        };

        setTimeout(()=> {
            section.init(['header', ...sections]);
        }, 1000);

        $('.image-fancy').fluidbox();
    },
};
