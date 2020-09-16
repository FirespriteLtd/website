import "./scss/app.scss";

/* ===========================================================================
 Foundation
 =========================================================================== */
import $ from 'jquery';
import 'custom-event-polyfill';

import Foundation from 'foundation-sites/dist/js/foundation.min';
/* Foundation Imports */
import 'foundation-sites/dist/js/plugins/foundation.core.min';
//import 'foundation-sites/dist/js/plugins/foundation.util.keyboard.min';
import 'foundation-sites/dist/js/plugins/foundation.accordion.min';
import 'foundation-sites/dist/js/plugins/foundation.sticky.min';
import 'foundation-sites/dist/js/plugins/foundation.util.mediaQuery.min';
import 'foundation-sites/dist/js/plugins/foundation.offcanvas.min';
import 'foundation-sites/dist/js/plugins/foundation.responsiveMenu.min';
import 'foundation-sites/dist/js/plugins/foundation.util.triggers.min';
import 'foundation-sites/dist/js/plugins/foundation.util.box.min';
import 'foundation-sites/dist/js/plugins/foundation.util.nest.min';
//import 'foundation-sites/dist/js/plugins/foundation.abide.min';
import 'foundation-sites/dist/js/plugins/foundation.util.motion.min';
import 'foundation-sites/dist/js/plugins/foundation.toggler.min';
import 'foundation-sites/dist/js/plugins/foundation.drilldown.min';
//import 'foundation-sites/dist/js/plugins/foundation.equalizer.min';
//import 'foundation-sites/dist/js/plugins/foundation.responsiveAccordionTabs.min';
//import 'foundation-sites/dist/js/plugins/foundation.smoothScroll.min';
import 'foundation-sites/dist/js/plugins/foundation.dropdown.min';
import 'foundation-sites/dist/js/plugins/foundation.interchange.min';
//import 'foundation-sites/dist/js/plugins/foundation.magellan.min';
import 'foundation-sites/dist/js/plugins/foundation.responsiveToggle.min';
import 'foundation-sites/dist/js/plugins/foundation.reveal.min';
import 'foundation-sites/dist/js/plugins/foundation.tabs.min';
//import 'foundation-sites/dist/js/plugins/foundation.tooltip.min';
//import 'foundation-sites/dist/js/plugins/foundation.util.imageLoader.min';


Foundation.addToJquery($);

$(document).foundation();
$(window).on('changed.zf.mediaquery', function(event, newSize, oldSize) {
    console.log('triggered');
});


/* ===========================================================================
 Fontawsome
 =========================================================================== */

import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faTwitter, faFacebookF, faInstagram, faYoutube} from "@fortawesome/free-brands-svg-icons";
import { faCheck , faChevronRight, faChevronLeft , faAngleDoubleRight, faAngleDoubleLeft, faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";
import { faEnvelope} from "@fortawesome/free-regular-svg-icons";

library.add(faCheck, faChevronLeft, faChevronRight, faPlus, faAngleDoubleRight, faAngleDoubleLeft, faTwitter, faTimes, faFacebookF, faInstagram, faYoutube, faEnvelope );

dom.watch();
/* ===========================================================================
 Packages
 =========================================================================== */
import LocomotiveScroll from "locomotive-scroll";

window.locoScroll = new LocomotiveScroll({
    el: document.querySelector(".smooth-scroll"),
    smooth: true
});

window.addEventListener('load', () => {
    window.locoScroll.update();
})


/* ===========================================================================
 Netlify
 =========================================================================== */

if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", (user) => {
        if (!user) {
            window.netlifyIdentity.on("login", () => {
                document.location.href = "/admin/";
            });
        }
    });
}

// DOCUMENT READY
import "./js/apps";




