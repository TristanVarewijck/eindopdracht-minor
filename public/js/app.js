import {
  synth,
  speechSettings,
  SpeechSynthesisUtterance,
} from "./partials/voiceSynthesisConfig.js";

const swiper1 = new Swiper(".swiper-1", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  breakpoints: {
    400: {
      slidesPerView: 1,
      spaceBetweenSlides: 100,
    },
    499: {
      slidesPerView: 3,
      spaceBetweenSlides: 100,
    },
    999: {
      slidesPerView: 5,
      spaceBetweenSlides: 50,
    },
  },
  // If we need pagination
  pagination: {
    el: ".swiper-pagination1",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next1",
    prevEl: ".swiper-button-prev1",
  },
});

// speaking event
const cancelButton = document.querySelector(".cancelButton");
const speakButton = document.querySelector(".speakButton");
const speechText = document.querySelector(".speechText");
const helper = document.querySelector(".little-helper");
const textCloud = document.querySelector(".text-cloud");

console.log(speechText.innerHTML);
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

function overlayAnimation() {
  gsap.fromTo(".clip-text p", { x: 350 }, { x: 0, duration: 0.8, delay: 1 });
  gsap.fromTo(".clip-text p", { x: 350 }, { x: 0, duration: 0.8, delay: 1 });
  gsap.fromTo(".clip-text p", { x: 350 }, { x: 0, duration: 0.8, delay: 1 });
}

// function audio() {
//   var audio1 = new Audio("/assets/audio/detail.mp3");
//   // // audio1.muted = true;
//   // audio1.autoplay = true;
//   console.log("hoi");
//   // audio1.play();
// }
