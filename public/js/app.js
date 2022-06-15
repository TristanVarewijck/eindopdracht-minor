import {
  synth,
  speechSettings,
  SpeechSynthesisUtterance,
} from "./partials/voiceSynthesisConfig.js";

import { swiper1 } from "./partials/caroussel.js";
// speaking event
const cancelButton = document.querySelector(".cancelButton");
const speakButton = document.querySelector(".speakButton");
const speechText = document.querySelector(".speechText");
const helper = document.querySelector(".little-helper");
const textCloud = document.querySelector(".text-cloud");
const overlay = document.querySelector(".overlay");
const choises = document.querySelectorAll(".choises ul li input");
const homepage = document.querySelector(".homepage");

// caroussels
swiper1;

// imgs
const mascotte = document.querySelector(".mascotte");

for (let i = 0; i < choises.length; i++) {
  window.scrollTo(0, 0);
  homepage.classList.add("noScroll");
  choises[i].addEventListener("change", function () {
    if (this.checked === true) {
      overlay.classList.add("goUp");
      console.log(this.value);
      let characther = `http://localhost:3500/assets/images/${this.value}.png`;

      // mascotte
      window.localStorage.setItem("character", characther);
      mascotte.src = characther;

      // hide overlay from UI so i get no bug with it...
      setTimeout(function () {
        overlay.classList.add("hidden");
        homepage.classList.remove("noScroll");
      }, 1500);
    }
  });
}

let characterLink = window.localStorage.getItem("character");
mascotte.src = characterLink;

// Text to voice
speakButton.addEventListener("click", () => {
  cancelButton.addEventListener("click", function () {
    synth.cancel();
  });

  // text to speak >> textInput (new utterance of nieuwe uiting)
  let utterance = new SpeechSynthesisUtterance(speechText.innerHTML);
  // voice settings
  utterance.lang = speechSettings.lang;
  utterance.pitch = speechSettings.pitch;
  utterance.rate = speechSettings.rate;
  utterance.volume = speechSettings.volume;
  // actually speak the utterance
  synth.speak(utterance);

  // add class when speaking
  utterance.addEventListener("start", function () {
    helper.classList.add("speaking");
    speakButton.classList.add("hidden");
    cancelButton.classList.remove("hidden");
    textCloud.classList.add("opacity");
    speechText.classList.add("glowing");
  });

  // remove class when speaking
  utterance.addEventListener("end", function () {
    helper.classList.remove("speaking");
    cancelButton.classList.add("hidden");
    speakButton.classList.remove("hidden");
    textCloud.classList.remove("opacity");
    speechText.classList.remove("glowing");
  });
});

// animations (gsap)
gsap.fromTo(".clip-text p", { x: 350 }, { x: 0, duration: 0.8, delay: 1 });

// gsap.to(".overlay", { top: "-100%" }, { duration: 0.8, delay: 1 });

// function audio() {
//   var audio1 = new Audio("/assets/audio/detail.mp3");
//   // // audio1.muted = true;
//   // audio1.autoplay = true;
//   console.log("hoi");
//   // audio1.play();
// }
