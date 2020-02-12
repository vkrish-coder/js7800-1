js7800.web.audio = (function () {
  'use strict';

  var Sound = js7800.Sound;

  var SOUNDBUFSIZE = 8192 << 1;
  var DEFAULT_SAMPLE_RATE = 48000;  

  /** The audio context */
  var audioCtx = null;
  /** The audio node */
  var audioNode = null;

  var mixbuffer = new Array(SOUNDBUFSIZE);
  var mixhead = 0;
  var mixtail = 0;

  function storeSound(sample, length) {
    for (var i = 0; i < length; i++) {
      var v = (sample[i] / 255);
      //var v = (sample[i]-128)/128;
      mixbuffer[mixhead++] = v;
      if (mixhead == SOUNDBUFSIZE)
        mixhead = 0;
    }
  }

  function init() {
    Sound.SetStoreSoundCallback(storeSound);

    if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      console.log('init audio');
      var sampleRate = DEFAULT_SAMPLE_RATE;
      audioCtx = window.AudioContext ?
        new window.AudioContext({ sampleRate: sampleRate }) :
        new window.webkitAudioContext();      
      if (audioCtx.sampleRate) {
        sampleRate = audioCtx.sampleRate;
      }
      Sound.SetSampleRate(sampleRate);
      audioNode = audioCtx.createScriptProcessor(2048, 0, 1);
      audioNode.onaudioprocess = function (e) {
        var dst = e.outputBuffer.getChannelData(0);
        var done = 0;
        var len = dst.length;
        while ((mixtail != mixhead) && (done < len)) {
          dst[done++] = mixbuffer[mixtail++];
          if (mixtail == SOUNDBUFSIZE)
            mixtail = 0;
        }
        while (done < len) {
          dst[done++] = 0;
        }
      }
      audioNode.connect(audioCtx.destination);
      var resumeFunc =
        function () { if (audioCtx.state !== 'running') audioCtx.resume(); }
      document.documentElement.addEventListener("keydown", resumeFunc);
      document.documentElement.addEventListener("click", resumeFunc);
      window.addEventListener("gamepadconnected", resumeFunc);
    }
  }

  return {
    init: init
  }
})();

