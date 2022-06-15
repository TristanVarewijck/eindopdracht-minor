const leeuw = document.querySelector(".chatbotimg");
var keuze;

var audio1 = new Audio("/assets/audio/audio2.mp2");
audio1.play();

const keuzebtn = document.querySelectorAll(".keuzebtn");

for (let i = 0; i < keuzebtn.length; i++) {
  keuzebtn[i].addEventListener("click", () => {
    keuze = keuzebtn[i].value;
    console.log(keuze);
    document.querySelector(".thirdstate").classList.add("thirdopen");
    var audio2 = new Audio("/assets/audio/audio2.mp3");
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

        if (keuzebtn[i].value == "book") {
          console.log("is boek");
          var prentboek = "classification:prentenboek%20";

          console.log(uitkomst + keuze + prentboek);

          async function handleApi() {
            const endpoint = "https://zoeken.oba.nl/api/v1/search/?q=";
            const key = "cdb8415c172ec6178b63451e222891a6";
            const detail = "Default";
            const resultaat = `${endpoint}${prentboek}${uitkomst}&authorization=${key}&refine=true&facet=type(${keuze})&output=json`;
            console.log("api: " + resultaat);
            const obaApi = await fetch(resultaat)
              .then((res) => res.json())
              .then((json) => {
                let dataArray = [];
                let data = json.results;
                var dataResults = data;
                console.log(dataResults);

                if (dataResults.length === 0) {
                  console.log("niks");

                  let html = "";

                  html += ` 
                 <p>Ik heb niets gevonden</p>
                `;

                  html += "";
                  document.querySelector(".results").innerHTML = html;
                  document.querySelector(".results").style.display = "flex";
                } else {
                  let html = "";

                  for (let i = 0; i < dataResults.length; i++) {
                    html += ` 
                  <a href="/boek/${dataResults[i].id}">
                    <ul>
                      <li><h3>${dataResults[i].titles[0]}</h3></li>
                      <li><img src="${dataResults[i].coverimages[1]}"/></li>
                    </ul>
                  </a>
                `;
                  }

                  html += "";
                  document.querySelector(".results").innerHTML = html;
                  document.querySelector(".results").style.display = "flex";
                }
              });
          }
          handleApi();
        } else {
          console.log("is geen boek");
          var prentboek = "";
          console.log(uitkomst + keuze + prentboek);
          async function handleApi() {
            const endpoint = "https://zoeken.oba.nl/api/v1/search/?q=";
            const key = "cdb8415c172ec6178b63451e222891a6";
            const detail = "Default";
            const resultaat = `${endpoint}${prentboek}${uitkomst}&authorization=${key}&refine=true&facet=type(${keuze})&output=json`;
            console.log("api: " + resultaat);
            const obaApi = await fetch(resultaat)
              .then((res) => res.json())
              .then((json) => {
                let dataArray = [];
                let data = json.results;
                var dataResults = data;
                console.log(dataResults);

                if (dataResults.length === 0) {
                  let html = "";
                  html += ` 
                  <p>Ik heb niets gevonden</p>
                `;
                  html += "";
                  document.querySelector(".results").innerHTML = html;
                  document.querySelector(".results").style.display = "flex";
                } else {
                  let html = "";
                  for (let i = 0; i < dataResults.length; i++) {
                    html += ` 
                  <a href="/boek/${dataResults[i].id}">
                    <ul>
                      <li><h3>${dataResults[i].titles[0]}</h3></li>
                      <li><img src="${dataResults[i].coverimages[1]}"/></li>
                    </ul>
                  </a>
                `;
                  }
                  html += "";
                  document.querySelector(".results").innerHTML = html;
                  document.querySelector(".results").style.display = "flex";
                }
              });
          }
          handleApi();
        }
      }, 5000);
    }
  });
}
