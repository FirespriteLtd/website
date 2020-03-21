import imagesLoaded from "imagesloaded";
import {gsap, Power2} from "gsap";

class Loader {
    start(){
        const clipMask = 'polygon(0 0, 100% 0 , 100% 100%, 0 100% )';
        const element = document.getElementById('loader-overlay');

        console.log('browser', window.navigator.userAgent);

        new imagesLoaded(document.querySelector('#container-scroll'), () => {
            const isCached = performance.getEntriesByType("navigation")[0].transferSize === 0;
            console.log('isCached', isCached);
            const tl = gsap.timeline({repeat:0});
            if(!isCached) {
                tl.to('#loader-overlay', {
                    '-webkit-clip-path': 'polygon(100% 0, 100% 0 , 100% 100%, 100% 100% )',
                    clipPath: 'polygon(100% 0, 100% 0 , 100% 100%, 100% 100% )',
                    duration: 0.8,
                    ease: Power2.easeInOut
                });
            }
            tl.set('#loader-overlay', {autoAlpha:0});
            if(document.getElementById('side-left')){
                tl.add(tl.fromTo('#side-left', {autoAlpha:0,x:-150}, {autoAlpha:1, x:0 , duration:0.2, ease: Power2.easeInOut }),'-=1')
            }
            tl.add(tl.fromTo('#side-right', {autoAlpha:0,x:300}, {autoAlpha:1, x:0 , duration:0.2, ease: Power2.easeInOut }))
        });
    }

    overlayAnim(){

    }
}


export default Loader
