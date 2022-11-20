(() => {
   let youtubeLeftControls, youtubePlayer, currentVideo = "";

   chrome.runtime.onMessage.addLIstener((obj, sender, response) => {
      const { type, value, videoId } = obj;
      if (type === "NEW") {
         currentVideo = videoId;
         newVideoLoaded()
      }
   })
})();