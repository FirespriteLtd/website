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
    document.body.removeChild(this.popupDiv);
   }
}

export default VideoPopup;
