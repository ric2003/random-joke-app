function getJoke() {
  fetch("https://official-joke-api.appspot.com/random_joke")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("jokeSetup").innerHTML = data.setup;
      document.getElementById("getPunchLineBtn").style.display = "block";
      document.getElementById("jokePunchline").style.display = "none";
      document.getElementById("getJokeBtn").style.display = "none";
      document.getElementById("getPunchLineBtn").onclick = () =>
        getPunchline(data.punchline);
    });
}

function getPunchline(punchline) {
  document.getElementById("jokePunchline").innerHTML = punchline;
  document.getElementById("jokePunchline").style.display = "block";
  document.getElementById("getPunchLineBtn").style.display = "none";
  document.getElementById("getJokeBtn").style.display = "block";
}
function randomSizeForQuestionMark() {
  return Math.floor(Math.random() * 100) + 100;
}
function addQuestionMarksToBg(amount) {
  for (let i = 0; i < amount; i++) {
    const img = document.createElement("img");
    img.src = "question-mark.svg";
    img.alt = "Question mark";
    const size = randomSizeForQuestionMark();
    img.style.width = size + "px";
    img.style.height = size + "px";
    img.style.position = "absolute";
    img.style.left = Math.random() * 100 + "%";
    img.style.top = `calc(${Math.random() * 100}% - ${size}px)`;
    img.style.zIndex = "-1";
    img.style.opacity = "0.3";

    document.body.appendChild(img);
  }
}

//addQuestionMarksToBg(50);
