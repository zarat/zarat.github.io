---
layout: page
title: Free IPTV
permalink: /iptv/
---

Eine Liste freier IPTV Sender.

<script>
      function changeChannel(v) {
            console.log(v);
      }
</script>

<select name="channel" onchange="changeChannel(this)">
      <option value="https://vs-live-exxpress.sf.apa.at/exxpress-live1/exxpress.smil/playlist.m3u8">Exxpress</option>
      <option value="2">2</option>
</select>
<video width="100%" id="player" controls></video>

<script src="{{ site.url }}/assets/hls.js" type="text/javascript"></script>
<script>
var vurl = 'https://vs-live-exxpress.sf.apa.at/exxpress-live1/exxpress.smil/playlist.m3u8';
function loadVideo(videourl) {
      var video = document.getElementById('player');
      if (Hls.isSupported()) {
        var hls = new Hls({
          debug: true,
        });
        hls.loadSource(videourl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MEDIA_ATTACHED, function () {
          video.muted = false;
          video.play();
        });
      }
      // hls.js is not supported on platforms that do not have Media Source Extensions (MSE) enabled.
      // When the browser has built-in HLS support (check using `canPlayType`), we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video element throught the `src` property.
      // This is using the built-in support of the plain video element, without using hls.js.
      else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = videourl;
        video.addEventListener('canplay', function () {
          video.play();
        });
      }
}

//setTimeout(loadVideo, 1000);
loadVideo(vurl);
    </script>
