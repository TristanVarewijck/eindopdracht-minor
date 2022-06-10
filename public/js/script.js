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

      setTimeout(function () {
        recognition.stop();
        var uitkomst = document.querySelector("#convert_text").innerHTML;
        console.log(keuzebtn[i].value);

        if (keuzebtn[i].value == "book") {
          console.log("is boek");
          var prentboek = "classification:prentenboek%20";

          console.log(uitkomst + keuze + prentboek);

          let data = {
            uitkomst,
            keuze,
            prentboek,
          };
          JSON.stringify(data);
          console.log(data);

          fetch("/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }).then((res) => {
            console.log("Request complete! response:", res);
          });
        } else {
          console.log("is geen boek");

          var prentboek = "";

          console.log(uitkomst + keuze + prentboek);

          let data = {
            uitkomst,
            keuze,
            prentboek,
          };
          JSON.stringify(data);
          console.log(data);

          fetch("/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }).then((res) => {
            console.log("Request complete! response:", res);
          });
        }
      }, 5000);
    }
  });
}
