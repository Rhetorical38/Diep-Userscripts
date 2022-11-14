// ==UserScript==
// @name         Diep.io Custom Crosshair Script
// @namespace    https://diep.io
// @version      1.0
// @description  Displays a 'custom cursor'
// @author       Rhetoric
// @match        *://*.diep.io/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=diep.io
// @grant        none
// ==/UserScript==

// Configurable Variables
let CROSSHAIR_IMAGE =
  "https://vignette.wikia.nocookie.net/woomyarrasio/images/1/1e/Overlord.png/revision/latest?cb=20200623085859";
let CROSSHAIR_DIMENSIONS = 20;

// Get the canvas for the crosshair
const canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d");

// Hide the normal cursor
canvas.style.cursor = "none";

// Create the actual crosshair and set its image url to CROSSHAIR_IMAGE
const crosshairImage = new Image();
crosshairImage.src = CROSSHAIR_IMAGE;

// Cursor Position
let cursorPos = { x: 0, y: 0 };

// Every time the mouse is moved, this will be executed, providing information about the mouse, (like x and y position)
window.addEventListener("mousemove", e => {
  // Set cursorPos to cursor's postion
  cursorPos.x = e.x ? e.x : 0;
  cursorPos.y = e.y ? e.y : 0;
});

// Make sure crosshair has loaded
let isImageLoaded = false;
crosshairImage.addEventListener("load", () => {
  isImageLoaded = true;
});

// Hook into the RAF, and draw the cursor
window.requestAnimationFrame = new Proxy(window.requestAnimationFrame, {
  apply: (t, win, args) => {
    // Draw crosshair
    if (isImageLoaded) {
      ctx.drawImage(
        crosshairImage,
        cursorPos.x - CROSSHAIR_DIMENSIONS / 2,
        cursorPos.y - CROSSHAIR_DIMENSIONS / 2,
        CROSSHAIR_DIMENSIONS,
        CROSSHAIR_DIMENSIONS
      );
    }

    // Apply defaults
    return Reflect.apply(t, win, args);
  },
});
