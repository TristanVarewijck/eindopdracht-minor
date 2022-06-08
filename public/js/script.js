console.log("hoi");

const leeuw = document.querySelector(".leeuw");
var keuze;

if (!leeuw) {
} else {
  leeuw.addEventListener("click", () => {
    var audio1 = new Audio("audio/audio1.mp3");
    audio1.play();
    leeuw.classList.add("groterleeuw");
    document.querySelector(".secondstate").classList.add("secondopen");
  });
}

const keuzebtn = document.querySelectorAll(".keuzebtn");

for (let i = 0; i < keuzebtn.length; i++) {
  keuzebtn[i].addEventListener("click", () => {
    keuze = keuzebtn[i].value;
    console.log(keuze);
    document.querySelector(".thirdstate").classList.add("thirdopen");
    var audio2 = new Audio("audio/audio2.mp3");
    audio2.play();

    var speech = true;
    window.SpeechRecognition = window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;

    recognition.addEventListener("result", (e) => {
      const transcript = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript);
      convert_text.innerHTML = transcript;
    });

    if (speech == true) {
      setTimeout(function () {
        recognition.start();
      }, 2000);
    }
  });
}
