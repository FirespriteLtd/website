import $ from "jquery";

class TabSlider {
  constructor(element) {

   $(window).on('change.zf.tabs', ()=> {
    console.log('tab change')
    if($(window).width() <= 768) {
     $(element).slick('refresh');
    }
   })

   $(window).on('resize', ()=> {
    this.createSlider(element)
   })

   this.createSlider(element)
  }

  createSlider(element){
   if($(window).width() <= 768){
    $(element).slick({
     arrows: false,
     dots: true,
     autoplay: false,
     infinite: true,
     fade: true,
     autoplaySpeed: 5000,
    });
   } else {
    // todo: unslick when changing size
    $(element).slick('unslick');
   }

  }
}

export default TabSlider
