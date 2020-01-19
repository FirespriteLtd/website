class SideBarController {


 constructor(sidebar) {
  this.sidebar = $(sidebar);
  this.previousY = 0;
  this.previousRatio = 0;
  this.controller();
 }

 controller() {
  const thresholdArray = steps => Array(steps + 1)
   .fill(0)
   .map((_, index) => index / steps || 0)
  let observer = new IntersectionObserver((entries, observer) => {
   entries.forEach(entry => {
    switch (this.scrollDirection(entry)) {
     case 'SDE' : {
      this.sidebar.addClass('invert');
      break;
     }
     case 'SDL' : {
      console.log('SDL', entry.target);
       this.sidebar.removeClass('invert');
       break;
     }
     case 'SUE' : {
      console.log('SUE', entry.target);
      this.sidebar.addClass('invert');
      break;
     }
     case 'SUL' : {
      this.sidebar.removeClass('invert');
      break
     }
    }
   })
  }, {rootMargin: '-45% 0px -45% 0px', threshold: thresholdArray(20)});
  let myDiv = document.getElementById('container-scroll');
  myDiv.querySelectorAll(":scope  .b-c-white").forEach(block => {
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
    console.log('scroll down enter');
    type = 'SDE'
   } else {
    console.log('scroll down leave');
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

export default SideBarController;
