import twitterFetcher from 'twitter-fetcher';
import {gsap, Power2} from "gsap/all";

class TwitterBlock {
  constructor() {
    this.twitterblock = document.getElementById('twitter-feed');
    if(this.twitterblock){
      this.init();
    }
  }

  init(){
    const twitterPage = this.twitterblock.dataset.feed;
    console.log('INIT TWITTER', twitterPage)
    const configProfile = {
        "profile": {'screenName': twitterPage},
        "domId": 'twitter-feed',
        "maxTweets": 1,
        "enableLinks": true,
        "showUser": false,
        "showTime": false,
        "showImages": false,
        "lang": 'en'
    };
      twitterFetcher.fetch(configProfile);
      this.open();

      document.querySelector('#tweet-modal .close').addEventListener('click', (e)=> {
       this.close();
      })

   this.controller();
  }

 open() {
  document.getElementById('tweet-modal').classList.add('is-shown');
  gsap.fromTo(`#tweet-modal`, { y: '200%'}, {y: '0', duration: 1, ease: Power2.easeInOut})
 }

 close(){
  gsap.to(`#tweet-modal`, {y: '200%', duration: 1, ease: Power2.easeInOut, onComplete:()=>{
    document.getElementById('tweet-modal').classList.remove('is-shown');
   }})
 }

 controller() {
  const thresholdArray = steps => Array(steps + 1)
   .fill(0)
   .map((_, index) => index / steps || 0)
  let observer = new IntersectionObserver((entries, observer) => {
   entries.forEach(entry => {
    switch (this.scrollDirection(entry)) {
     case 'SDE' : {
      if(document.getElementById('tweet-modal').classList.contains('is-shown')) {
       gsap.to(`#tweet-modal`, {autoAlpha: 1, duration: 1, ease: Power2.easeInOut})
      }
      break;
     }
     case 'SDL' : {
      if(document.getElementById('tweet-modal').classList.contains('is-shown')) {
       gsap.to(`#tweet-modal`, {autoAlpha: 0, duration: 1, ease: Power2.easeInOut})
      }
      break;
     }
     case 'SUE' : {
      if(document.getElementById('tweet-modal').classList.contains('is-shown')) {
       gsap.to(`#tweet-modal`, {autoAlpha: 1, duration: 1, ease: Power2.easeInOut})
      }
      break;
     }
     case 'SUL' : {
      break
     }
    }
   })
  }, {rootMargin: '-45% 0px -45% 0px', threshold: thresholdArray(20)});
  let myDiv = document.getElementById('container-scroll');
  myDiv.querySelectorAll(":scope  .master-header").forEach(block => {
   observer.observe(block);
  })
 }

 scrollDirection(entry) {
  const currentY = entry.boundingClientRect.y;
  const currentRatio = entry.intersectionRatio;
  const isIntersecting = entry.isIntersecting;
  let type;

  // Scrolling down/up
  if (currentY < this.previousY) {
   if (currentRatio > this.previousRatio && isIntersecting) {
    type = 'SDE'
   } else {
    type = 'SDL'
   }
  } else if (currentY > this.previousY && isIntersecting) {
   if (currentRatio < this.previousRatio) {
    type = 'SUL'
   } else {
    type = 'SUE'
   }
  }

  this.previousY = currentY;
  this.previousRatio = currentRatio;
  return type;
 }

}

export default TwitterBlock;
