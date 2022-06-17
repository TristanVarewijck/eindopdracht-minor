const leeuw = document.querySelector(".chatbotimg");
var keuze;

var audio1 = new Audio("/assets/audio/audio1.mp3");
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
          document.querySelector("#convert_text").style.display = "none";

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
                <div class="emptystate">
                 <p>Probeer het opnieuw</p>
                 <a href="/search"><img src="/assets/icons/refresh.png"></a>
                 </div>
                `;

                  html += "";
                  document.querySelector(".results").innerHTML = html;
                  document.querySelector(".results").style.display = "flex";
                  var audio3 = new Audio("/assets/audio/audio3.mp3");
                  audio3.play();
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
                  document.querySelector(".refreshbtn").style.display = "block";
                  var audio4 = new Audio("/assets/audio/audio4.mp3");
                  audio4.play();
                }
              });
          }
          handleApi();
        } else {
          console.log("is geen boek");
          document.querySelector("#convert_text").style.display = "none";

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
                  <div class="emptystate">
                 <p>Probeer het opnieuw</p>
                 <a href="/search"><img src="/assets/icons/refresh.png"></a>
                 </div>
                `;
                  html += "";
                  document.querySelector(".results").innerHTML = html;
                  document.querySelector(".results").style.display = "flex";
                  var audio3 = new Audio("/assets/audio/audio3.mp3");
                  audio3.play();
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
                  document.querySelector(".refreshbtn").style.display = "block";
                  var audio4 = new Audio("/assets/audio/audio4.mp3");
                  audio4.play();
                }
              });
          }
          handleApi();
        }
      }, 5000);
    }
  });
}

document.querySelector(".mascotte").addEventListener("click", () => {
  var lach1 = new Audio("/assets/audio/lach1.mp3");
  var lach2 = new Audio("/assets/audio/lach2.mp3");
  var lach3 = new Audio("/assets/audio/lach3.mp3");
  gelach = [lach1, lach2, lach3];
  var index = Math.floor(Math.random() * 1000) % gelach.length;
  var id = gelach[index];

  var mascotte = document.querySelector(".mascotte");

  var src = mascotte.src;

  if (src === "http://localhost:3500/assets/images/Lion.png") {
    console.log("leeuw");
    id.play();
    mascotte.src = "/assets/images/leeuwlach.gif";
    setTimeout(function () {
      mascotte.src = "/assets/images/Lion.png";
    }, 2000);
  } else if (src === "http://localhost:3500/assets/images/Robot.png") {
    console.log("robot");
    var robotlach = new Audio("/assets/audio/robotlach.mp3");
    robotlach.play();

    mascotte.src = "/assets/images/robotlach.gif";
    setTimeout(function () {
      mascotte.src = "/assets/images/Robot.png";
    }, 4000);
  } else if (src === "http://localhost:3500/assets/images/Monster.png") {
    console.log("monster");
    id.play();
    mascotte.src = "/assets/images/monsterlach.gif";
    setTimeout(function () {
      mascotte.src = "/assets/images/Monster.png";
    }, 2000);
  } else {
    console.log("undifeind");
  }
});
