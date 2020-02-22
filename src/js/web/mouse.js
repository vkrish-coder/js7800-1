import * as ProSystem from "../prosystem/ProSystem.js"
import * as Region from "../prosystem/Region.js"
import * as WebVideo from "./video.js"
import * as Cartridge from "../prosystem/Cartridge.js"
import * as Maria from "../prosystem/Maria.js"

var CYCLES_PER_SCANLINE = ProSystem.CYCLES_PER_SCANLINE;
var HBLANK_CYCLES = ProSystem.HBLANK_CYCLES;
var visibleArea = Maria.visibleArea;
var displayArea = Maria.displayArea;
var REGION_NTSC = Region.REGION_NTSC;
var PAL_ATARI_BLIT_TOP_Y = WebVideo.PAL_ATARI_BLIT_TOP_Y;
var NTSC_ATARI_BLIT_TOP_Y = WebVideo.NTSC_ATARI_BLIT_TOP_Y;
var NTSC_ATARI_HEIGHT = WebVideo.NTSC_ATARI_HEIGHT;
var PAL_ATARI_HEIGHT = WebVideo.PAL_ATARI_HEIGHT;
var canvas = null;
var ATARI_WIDTH = WebVideo.ATARI_WIDTH;
var ATARI_CANVAS_HEIGHT = WebVideo.ATARI_CANVAS_HEIGHT;

var lightGunScanline = 0;
var lightGunCycle = 0;
var mouseTracking = false;
var leftButtonDown = false;

// The number of cycles per scanline that the 7800 checks for a hit
var LG_CYCLES_PER_SCANLINE = 318;
// The number of cycles indented (after HBLANK) prior to checking for a hit
var LG_CYCLES_INDENT = 52;

function enableMouseTracking(enabled) {
  if (mouseTracking == enabled) {
    return;
  }
  mouseTracking = enabled;
  canvas = WebVideo.getCanvas();
  if (canvas) {
    if (mouseTracking) {
      canvas.addEventListener('mousemove', onMouseMove);
      canvas.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);
      canvas.style.cursor = 'crosshair';
    } else {
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      canvas.style.cursor = 'none';
    }
  }
}

function onMouseMove(event) {
  var rect = canvas.getBoundingClientRect();
  var x = (((event.clientX - rect.left) / (canvas.scrollWidth / ATARI_WIDTH))) | 0;
  var y = (((event.clientY - rect.top) / (canvas.scrollHeight / ATARI_CANVAS_HEIGHT))) | 0;
  //console.log("%d, %d", x, y);
  x -= Cartridge.GetCrossX();
  y -= Cartridge.GetCrossY();
  var region = Cartridge.GetRegion();
  var yoffset =
    (region == REGION_NTSC ?
      NTSC_ATARI_BLIT_TOP_Y : PAL_ATARI_BLIT_TOP_Y);
  var scanlines =
    (region == REGION_NTSC ?
      NTSC_ATARI_HEIGHT : PAL_ATARI_HEIGHT);
  var yratio = scanlines / ATARI_CANVAS_HEIGHT;
  var xratio = LG_CYCLES_PER_SCANLINE / ATARI_WIDTH;
  lightGunScanline = ((y * yratio) +
    (visibleArea.top - displayArea.top + 1) + yoffset) | 0;
  lightGunCycle =
    (HBLANK_CYCLES + LG_CYCLES_INDENT + (x * xratio)) | 0;
  if (lightGunCycle > CYCLES_PER_SCANLINE) {
    lightGunScanline++;
    lightGunCycle -= CYCLES_PER_SCANLINE;
  }
  //console.log("scanline: %d, cycle: %d", lightGunScanline, lightGunCycle);
}

function onMouseDown(event) {
  if (event.which == 1) {
    leftButtonDown = true;
  }
  event.preventDefault();
}

function onMouseUp(event) {
  if (event.which == 1) {
    leftButtonDown = false;
  }
  event.preventDefault();
}

function isLeftButtonDown() { 
  return leftButtonDown; 
}

function getLightGunScanline() { 
  return lightGunScanline; 
}

function getLightGunCycle() { 
  return lightGunCycle; 
}

function onCartridgeLoaded() {
  enableMouseTracking(false);
  leftButtonDown = false;
  lightGunScanline = 0;
  lightGunCycle = 0;
}

export {
  enableMouseTracking,
  isLeftButtonDown,
  getLightGunScanline,
  getLightGunCycle,
  onCartridgeLoaded
};
