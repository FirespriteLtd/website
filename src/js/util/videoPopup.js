import YTPlayer from "yt-player";
import {gsap, Power2} from "gsap/all";

class VideoPopup {
   constructor() {
    this.buttons = document.querySelectorAll('[data-video]');
    if(this.buttons.length) {
     for(const bt of this.buttons) {
      this.init(bt);
     }
    }
   }

   init(bt){
    let videoId;
    if(bt.dataset.video.length){
      if(bt.dataset.video.includes('https')){
        videoId = bt.dataset.video.split('v=')[1]
      } else {
        videoId = bt.dataset.video;
      }
      this.createPopup(videoId);
      bt.addEventListener('click', ()=> {
       this.open(videoId)
      });
    }
   }

   createPopup(videoId){

    this.popupDiv = document.createElement("div");
    this.popupDiv.id = `trailer-${videoId}`;
    this.popupDiv.className = "overlay-popup";
    document.body.append(this.popupDiv);

    const holder  = document.createElement("div");
    holder.id ="videoHolder"
    this.popupDiv.append(holder);

    const closeButton = document.createElement("div");
    closeButton.classList.add('close-button')
    closeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70"><g fill="none" fill-rule="evenodd"><path stroke="#FFF" stroke-width="4" d="M2 2H68V68H2z"/><path id="x" fill="#FFF" d="M49 25.023L45.977 22 36 31.977 26.023 22 23 25.023 32.977 35 23 44.977 26.023 48 36 38.023 45.977 48 49 44.977 39.023 35z"/></g></svg>`
    holder.append(closeButton);

    const videoWrapper  = document.createElement("div");
    videoWrapper.id ="videoWrapper"
    holder.append(videoWrapper);

    const video  = document.createElement("div");
    video.className ="videoPlayer"
    videoWrapper.append(video);

    this.popupDiv.addEventListener("click", (e) => {
      this.close('.overlay-popup.is-shown')
    });

   }

   landscapeMobile(id){
    window.addEventListener("orientationchange", function() {
     const iframe =  document.getElementById(id);
     if(window.orientation === 90){
      this.player.playsInline = true;
     }
    }, false);

   }

   open(id){
    document.getElementById(`trailer-${id}`).classList.add('is-shown');
    gsap.fromTo(`#trailer-${id}`, {x:'100%'}, {x:'0', duration: 1, ease: Power2.easeInOut, onComplete: () => {
      this.createVideoPlayer(document.querySelector(`#trailer-${id} .videoPlayer`), id);
     }
    })
   }

   close(id){
    console.log('closing it')
    gsap.fromTo(`${id}`,{x:0},  {x:'100%', duration: 1, ease: Power2.easeInOut, onComplete: ()=>{
      this.destroy();
     }})
   }

   createVideoPlayer(container,id){
    this.player = new YTPlayer(container);
    this.player.load(id, true);
   }

   destroy(){
    this.player.destroy();
    this.player = null;

   }
}

export default VideoPopup;
