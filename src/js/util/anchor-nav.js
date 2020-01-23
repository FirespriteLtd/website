import {gsap, Power2} from 'gsap/all';
import { ScrollToPlugin} from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);

class AnchorNav {
  constructor(nav) {
    this.nav = $(`${nav} a`);
    //this.init();
  }

  init(){
   this.nav.on('click', (e)=>{
      e.preventDefault();
      const section = `#trigger-${$(e.currentTarget).data('section')}`;
      gsap.to(window, {duration:1, scrollTo: section, overrider: true, autoKill: false, ease:  Power2.easeInOut});
   })

  }
}

export default AnchorNav;
