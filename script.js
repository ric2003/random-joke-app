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
    })
    .then(() => {
      clearBackground();
      addSVGsToBg(50, "question-mark.svg");
    });
}

function getPunchline(punchline) {
  document.getElementById("jokePunchline").innerHTML = punchline;
  document.getElementById("jokePunchline").style.display = "block";
  document.getElementById("getPunchLineBtn").style.display = "none";
  document.getElementById("getJokeBtn").style.display = "block";
  document.getElementById("getJokeBtn").innerHTML = "Give me another joke";
  clearBackground();
  addSVGsToBg(30, "laugh.svg");
}
function randomSizeForQuestionMark() {
  console.log(Math.random());
  return Math.floor(Math.random() * 150) + 50;
}
function addSVGsToBg(amount, svgName) {
  const questionMarks = [];

  for (let i = 0; i < amount; i++) {
    const img = document.createElement("img");
    img.src = svgName;
    img.alt = "Question mark";
    const size = randomSizeForQuestionMark();
    img.style.width = size + "px";
    img.style.height = size + "px";
    img.style.position = "absolute";

    const position = findPositionWithSpacing(questionMarks, size);
    img.style.left = position.left + "%";
    img.style.top = `calc(${Math.random() * 100}% - ${size}px)`;
    img.style.zIndex = "-1";
    img.style.opacity = "0.3";

    questionMarks.push({
      x: position.left,
      y: position.top,
      size: size,
    });

    document.body.appendChild(img);
  }
}

function findPositionWithSpacing(existingMarks, size) {
  const minSpacing = 10;
  let attempts = 0;
  const maxAttempts = 100;

  while (attempts < maxAttempts) {
    const x = Math.random() * 100;
    const y = Math.random() * 100;

    let hasEnoughSpacing = true;
    for (let mark of existingMarks) {
      const distance = Math.sqrt(
        Math.pow(x - mark.x, 2) + Math.pow(y - mark.y, 2)
      );
      const requiredSpacing = minSpacing + (size + mark.size) / 20; // Adjust based on sizes

      if (distance < requiredSpacing) {
        hasEnoughSpacing = false;
        break;
      }
    }

    if (hasEnoughSpacing) {
      return { left: x, top: y };
    }

    attempts++;
  }

  // If we can't find a good position after max attempts, just place it randomly
  return {
    left: Math.random() * 100,
    top: Math.random() * 100,
  };
}

function clearBackground() {
  const questionMarks = document.querySelectorAll("img");
  questionMarks.forEach((img) => img.remove());
}

addSVGsToBg(20, "hello.svg");
