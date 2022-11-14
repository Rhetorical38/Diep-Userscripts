// ==UserScript==
// @name         Diep.io Custom Skin Script
// @namespace    https://diep.io
// @version      1.0
// @description  Gives your player tank a 'custom skin'
// @author       Rhetoric
// @match        *://*.diep.io/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=diep.io
// @grant        none
// ==/UserScript==

const SKIN_IMG_URL =
    "https://cdn.discordapp.com/attachments/1041606529905868904/1041606588248637470/sky-modified.png",
  IMAGE_WIDTH = 1.9;

const skinImage = new Image();
skinImage.src = SKIN_IMG_URL;

const ctx = document.getElementById("canvas").getContext("2d");

let tolerance = 50,
  playerThreshold = {
    greaterThanY: window.innerHeight / 2 - tolerance,
    lesserThanY: window.innerHeight / 2 + tolerance,
    greaterThanX: window.innerWidth / 2 - tolerance,
    lesserThanX: window.innerWidth / 2 + tolerance,
  };

if (window.onresize && typeof window.onresize === "function") {
  window.onresize = new Proxy(window.onresize, {
    apply: (t, win, args) => {
      calculateMeasurements();
      return Reflect.apply(t, win, args);
    },
  });
} else window.onresize = calculateMeasurements;

CanvasRenderingContext2D.prototype.arc = new Proxy(
  CanvasRenderingContext2D.prototype.arc,
  {
    apply: (t, thisArg, args) => {
      const tankData = thisArg.getTransform();
      if (
        tankData.a > 21 &&
        tankData.f > playerThreshold.greaterThanY &&
        tankData.f < playerThreshold.lesserThanY &&
        tankData.e > playerThreshold.greaterThanX &&
        tankData.e < playerThreshold.lesserThanX
      ) {
        ctx.drawImage(
          skinImage,
          -(IMAGE_WIDTH / 2),
          -(IMAGE_WIDTH / 2),
          IMAGE_WIDTH,
          IMAGE_WIDTH
        );
      }

      return Reflect.apply(t, thisArg, args);
    },
  }
);

function calculateMeasurements() {
  playerThreshold = {
    greaterThanY: window.innerHeight / 2 - tolerance,
    lesserThanY: window.innerHeight / 2 + tolerance,
    greaterThanX: window.innerWidth / 2 - tolerance,
    lesserThanX: window.innerWidth / 2 + tolerance,
  };
}
