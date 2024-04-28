const socket = io();
socket.on("carton_jaune", function (data) {
  var clickedTime =
    pad(Math.floor(elapsedTime / 3600)) +
    ":" +
    pad(Math.floor((elapsedTime % 3600) / 60)) +
    ":" +
    pad(elapsedTime % 60);
  console.log("Clicked time: ", clickedTime);
  const messageDiv = document.getElementById("messageCartonJaune");
  const messageParagraph = document.createElement("p");
  const image = document.createElement("img");
  image.src = "/img/yellow.jpg";
  image.alt = "Carton jaune";
  image.width = 32;
  messageParagraph.textContent = ` ${data.joueur} : ${clickedTime}: ${data.equipe}`;
  messageDiv.appendChild(image);
  messageDiv.appendChild(messageParagraph);
  localStorage.setItem("cartonJauneMessage", messageParagraph.textContent);
});

socket.on("carton_rouge", function (data) {
  var clickedTime =
    pad(Math.floor(elapsedTime / 3600)) +
    ":" +
    pad(Math.floor((elapsedTime % 3600) / 60)) +
    ":" +
    pad(elapsedTime % 60);
  console.log("Clicked time: ", clickedTime);
  const messageDiv = document.getElementById("messageCartonJaune");
  const messageParagraph = document.createElement("p");
  messageParagraph.textContent = `Carton rouge attribué à : ${data.joueur} a ${clickedTime}: ${data.equipe}`;
  messageDiv.appendChild(messageParagraph);

  localStorage.setItem("cartonRougeMessage", messageParagraph.textContent);
});

socket.on("butBtnClicked", function (data) {
  const messageDiv = document.getElementById("messageCartonJaune");
  const messageParagraph = document.createElement("p");

  var originalTime = data.time;
  var timeParts = originalTime.split(":");
  var minutes = parseInt(timeParts[1]);
  var seconds = timeParts[2];
  var extractedTime = minutes + ":" + seconds;
  console.log(data.equipe);
  console.log(data.buteur);

  messageParagraph.textContent = `BUT ${extractedTime} , ${data.equipe}, ${data.buteur}`;
  messageDiv.appendChild(messageParagraph);
});

socket.on("mi-temps", () => {
  const messageDiv = document.getElementById("messageCartonJaune");
  const messageParagraph = document.createElement("p");
  messageParagraph.textContent = `Mitepms `;
  messageDiv.appendChild(messageParagraph);

  // Stop the timer by clearing the interval
  clearInterval(timerInterval);

  console.log("Timer stopped");
  document.getElementById("minutes").textContent = "45'";
  document.getElementById("seconds").textContent = "";
  document.getElementById("separator").textContent = "";
  localStorage.removeItem("elapsedTime");
});
socket.on("stop", () => {
  const messageDiv = document.getElementById("messageCartonJaune");
  const messageParagraph = document.createElement("p");
  messageParagraph.textContent = `Fin de match `;
  messageDiv.appendChild(messageParagraph);
  clearInterval(timerInterval);

  console.log("Timer stopped");
  document.getElementById("minutes").textContent = "45'";
  document.getElementById("seconds").textContent = "";
  document.getElementById("separator").textContent = "";
  localStorage.removeItem("elapsedTime");
});

socket.on("start", () => {
  const messageDiv = document.getElementById("messageCartonJaune");
  const messageParagraph = document.createElement("p");
  messageParagraph.textContent = `Debut de match `;
  messageDiv.appendChild(messageParagraph);
  startTimer();
});

socket.on("score", (data) => {
  document.getElementById("score2").textContent = data.score1;
  document.getElementById("score1").textContent = data.score2;
});

socket.on("penalty", function (data) {
  var clickedTime =
    pad(Math.floor(elapsedTime / 3600)) +
    ":" +
    pad(Math.floor((elapsedTime % 3600) / 60)) +
    ":" +
    pad(elapsedTime % 60);
  console.log("Clicked time: ", clickedTime);
  const messageDiv = document.getElementById("messageCartonJaune");
  const messageParagraph = document.createElement("p");
  messageParagraph.textContent = `penalty : ${data.penalty} a ${clickedTime}`;
  messageDiv.appendChild(messageParagraph);
});
socket.on("changement", function (data) {
  var clickedTime =
    pad(Math.floor(elapsedTime / 3600)) +
    ":" +
    pad(Math.floor((elapsedTime % 3600) / 60)) +
    ":" +
    pad(elapsedTime % 60);
  console.log("Clicked time: ", clickedTime);
  const messageDiv = document.getElementById("messageCartonJaune");
  const messageParagraph = document.createElement("p");
  messageParagraph.textContent = `changement : ${data.equipe} IN  ${data.joueurIN} OUT${data.joueurOUT} `;
  messageDiv.appendChild(messageParagraph);
});
socket.on("fin", function (data) {
  clearInterval(timerInterval);
  const messageDiv = document.getElementById("messageCartonJaune");
  const messageParagraph = document.createElement("p");
  messageParagraph.textContent = `Fin de match !!  `;
  messageDiv.appendChild(messageParagraph);

  console.log("Timer stopped fin match ");
  document.getElementById("minutes").textContent = "90'";
  document.getElementById("seconds").textContent = "";
  document.getElementById("separator").textContent = "";
  localStorage.removeItem("elapsedTime");
});

var timerInterval;
var elapsedTime = 0;
var timerStarted = false;

function pad(val) {
  return (val < 10 ? "0" : "") + val;
}

function updateTimerDisplay() {
  var hours = Math.floor(elapsedTime / 3600);
  var minutes = Math.floor((elapsedTime % 3600) / 60);
  var seconds = elapsedTime % 60;

  document.getElementById("minutes").textContent = pad(minutes);
  document.getElementById("seconds").textContent = pad(seconds);
}

function startTimer() {
  localStorage.clear();
  console.log("Timer started");
  timerInterval = setInterval(function () {
    elapsedTime++;
    updateTimerDisplay();
    localStorage.setItem("savedElapsedTime", elapsedTime.toString());
  }, 1000);

  timerStarted = true;

  updateTimerDisplay();

  window.addEventListener("beforeunload", function () {
    localStorage.setItem("timerWasStarted", timerStarted ? "true" : "false");
    console.log("Timer state saved to localStorage:", timerStarted);
  });
}

console.log("Page loaded, waiting for start event...");

// Check if the timer was previously started
if (localStorage.getItem("timerWasStarted") === "true") {
  // If the timer was started before, but there is saved elapsed time,
  // we should resume the timer with the elapsed time
  var savedElapsedTime = localStorage.getItem("savedElapsedTime");
  if (savedElapsedTime !== null) {
    elapsedTime = parseInt(savedElapsedTime);
    startTimer();
  }
}
