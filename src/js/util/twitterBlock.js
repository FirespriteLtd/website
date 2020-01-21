import twitterFetcher from 'twitter-fetcher';

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
  }
}

export default TwitterBlock;
