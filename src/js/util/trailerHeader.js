import YTPlayer from "yt-player";
import {gsap, Power2} from "gsap/all";

class TrailerHeader {
   constructor() {
    this.button = document.getElementById('header-trailer');
    if(this.button) {
      this.video = this.button.dataset.video;
      this.button.addEventListener('click', () => {this.init()});
    }
   }

   init(){
    let videoId;
    if(this.video.length){
      if(this.video.includes('https')){
        videoId = this.video.split('v=')[1]
      } else {
        videoId = this.video;
      }
      this.createPopup(videoId);
    }
   }

   createPopup(videoId){

    this.popupDiv = document.createElement("div");
    this.popupDiv.id = "trailer-popup";
    this.popupDiv.className = "overlay-popup";
    document.body.append(this.popupDiv);

    const holder  = document.createElement("div");
    holder.id ="videoHolder"
    this.popupDiv.append(holder);

    const videoWrapper  = document.createElement("div");
    videoWrapper.id ="videoWrapper"
    holder.append(videoWrapper);

    const video  = document.createElement("div");
    video.id ="videoPlayer"
    videoWrapper.append(video);

    gsap.fromTo('#trailer-popup', {x:'100%'}, {x:'0', duration: 1, ease: Power2.easeInOut, onComplete: () => {
      this.createVideoPlayer('#videoPlayer', videoId);
     }
    })

    this.popupDiv.addEventListener('click', ()=> {
       gsap.to('#trailer-popup',  {x:'100%', duration: 1, ease: Power2.easeInOut, onComplete: ()=>{
         this.destroy();
        }})
    })
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

export default TrailerHeader;
