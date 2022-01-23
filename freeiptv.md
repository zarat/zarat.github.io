---
layout: page
title: Free IPTV
permalink: /freeiptv/
---

Eine Liste freier IPTV Sender.

<script>
      function changeChannel(v) {
            loadVideo(v.value);
      }
</script>

<select name="channel" onchange="changeChannel(this)">
      <option selected=selected>Select</option>
      <option value="https://orf1.mdn.ors.at/out/u/orf1/qxb/manifest.m3u8">ORF 1</option>
      <option value="https://orf2.mdn.ors.at/out/u/orf2/qxb/manifest.m3u8">ORF 2</option>
      <option value="https://orf3.mdn.ors.at/out/u/orf3/qxb/manifest.m3u8">ORF 3</option>
      <option value="https://orfs.mdn.ors.at/out/u/orfs/qxb/manifest.m3u8">ORF Sport+</option>
      <option value="https://zdf-hls-18.akamaized.net/hls/live/2016501/dach/veryhigh/master.m3u8">3Sat</option>
      <option value="https://rbmn-live.akamaized.net/hls/live/2002825/geoSTVATweb/master_6692.m3u8">Servus TV</option>
      <option value="http://apasfoe24l.sf.apa.at/ipad/oe24-live1/oe24.sdp/playlist.m3u8">OE24</option>
      <option value="https://ms01.w24.at/W24/smil:liveevent.smil/playlist.m3u8">W24</option>
      <option value="https://stream1.primetv.at/rtvlive/smil:rtvlive.smil/playlist.m3u8">RTV</option>
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
//loadVideo(vurl);
    </script>
