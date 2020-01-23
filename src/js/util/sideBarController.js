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
   console.log('entry', entries)
   entries.forEach(entry => {
    switch (this.scrollDirection(entry)) {
     case 'SDE' : {
       this.sidebar.addClass('invert');
       break;
     }
     case 'SDL' : {
       this.sidebar.removeClass('invert');
       break;
     }
     case 'SUE' : {
      this.sidebar.addClass('invert');
      break;
     }
     case 'SUL' : {
      this.sidebar.removeClass('invert');
      break;
     }
    }
   })
  }, {rootMargin: '-30% 0px -50% 0px', threshold: thresholdArray(20)});
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

export default SideBarController;
