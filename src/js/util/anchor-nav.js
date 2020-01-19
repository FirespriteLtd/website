import {gsap, Power2} from 'gsap/all';
import { ScrollToPlugin} from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);

class AnchorNav {
  constructor(nav) {
    this.nav = $(`${nav} a`);
    this.init();
  }

  init(){

   this.nav.on('click', (e)=>{
      e.preventDefault();
      const section = `#section-${$(e.currentTarget).data('section')}`;
      gsap.to('#container-scroll', {duration:1, scrollTo: section, ease:  Power2.easeInOut});
   })

  }
}

export default AnchorNav;
