const socket = io();
var timerInterval;
var timerStarted = false;
var timeoutID;

document.addEventListener("DOMContentLoaded", function () {
  var timerInterval;
  var elapsedTime = 0;
  var timerStarted = false;
  var socket = io();
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

  function start() {
    timerInterval = setInterval(function () {
      elapsedTime++;
      updateTimerDisplay();
      localStorage.setItem("elapsedTime", elapsedTime.toString());
    }, 1000);

    timerStarted = true;

    updateTimerDisplay();
  }

  if (localStorage.getItem("elapsedTime")) {
    elapsedTime = parseInt(localStorage.getItem("elapsedTime"));
    start();
  }

  document.getElementById("startBtn").addEventListener("click", function () {
    console.log("Start button clicked");

    socket.emit("start");
    start();
  });

  document.getElementById("start2Btn").addEventListener("click", function () {
    console.log("deuxieme periode clicked");
    
    startTimer(45 * 60);  
    socket.emit("2eme_periode");
  });
  
  var timerInterval;
  var elapsedTime = 0;
  var timerStarted = false;
  var socket = io();
  
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
  
  function startTimer(initialTime) {
    elapsedTime = initialTime; // Set initial time
    updateTimerDisplay();
  
    timerInterval = setInterval(function () {
      elapsedTime++;
      updateTimerDisplay();
      localStorage.setItem("elapsedTime", elapsedTime.toString());
    }, 1000);
  
    timerStarted = true;
  }
  
  if (localStorage.getItem("elapsedTime")) {
    elapsedTime = parseInt(localStorage.getItem("elapsedTime"));
    startTimer(elapsedTime); // Start timer with elapsed time
  }
  
  

  document.getElementById("mitempsBtn").addEventListener("click", function () {
    console.log("Mi-temps button clicked");
    socket.emit("mi-temps");
    if (timerStarted) {
      localStorage.clear();
      clearInterval(timerInterval);

      console.log("Timer stopped");
      timerStarted = false;
      document.getElementById("minutes").textContent = "Mi-temps";
      document.getElementById("seconds").textContent = "";
      document.getElementById("separator").textContent = "";

      localStorage.removeItem("elapsedTime");
    }
  });

  document.getElementById("stopBtn").addEventListener("click", function () {
    console.log("stop button clicked");
    if (timerStarted) {
      localStorage.clear();
      clearInterval(timerInterval);

      console.log("Timer stopped");
      timerStarted = false;
      document.getElementById("minutes").textContent = "Fin";
      document.getElementById("seconds").textContent = "";
      document.getElementById("separator").textContent = "";

      localStorage.removeItem("elapsedTime");
    }
    socket.emit("fin");
  });

  document.getElementById("butBtn").addEventListener("click", function () {
    if (timerStarted) {
      var clickedTime =
        pad(Math.floor(elapsedTime / 3600)) +
        ":" +
        pad(Math.floor((elapsedTime % 3600) / 60)) +
        ":" +
        pad(elapsedTime % 60);
      console.log("Clicked time: ", clickedTime);
      console.log(clickedTime);

      function handleEquipeDropdownItemClick(event) {
        clickedText = event.currentTarget.textContent.trim();
        console.log("Equipe clicked text:", clickedText);
      }
      var clickedText;

      function handleJoueurDropdownItemClick(event) {
        var buteur = event.currentTarget.textContent.trim();
        console.log("Joueur clicked text:", buteur);
        socket.emit("butBtnClicked", {
          time: clickedTime,
          buteur: buteur,
          equipe: clickedText,
        });
      }

      var equipeDropdownItems = document.querySelectorAll(
        "#dropdownEquipeMenu .dropdown-item"
      );
      equipeDropdownItems.forEach(function (item) {
        item.addEventListener("click", handleEquipeDropdownItemClick);
      });

      var joueurDropdownItems = document.querySelectorAll(
        "#dropdownJoueurBMenu .dropdown-item"
      );
      joueurDropdownItems.forEach(function (item) {
        item.addEventListener("click", handleJoueurDropdownItemClick);
      });
    }
  });

  document.getElementById("penoBtn").addEventListener("click", function () {
    console.log("peno");
  });

  window.addEventListener("beforeunload", function () {
    localStorage.setItem("timerStarted", timerStarted ? "true" : "false");
  });
});



function ext2() {
  clearTimeout(timeoutID); //

  let minutes = 105;
  let seconds = -1;

  function incrementCounter() {
    if (seconds === 59) {
      if (minutes === 0) {
        // Counter reached 0, stop incrementing
        return;
      }
      minutes++;
      seconds = 0;
    } else {
      seconds++;
    }

    // Display the counter
    let counterDisplay = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
    document.getElementById("timer").textContent = counterDisplay;

    timeoutID = setTimeout(incrementCounter, 1000); // Call incrementCounter again after 1 second (1000 milliseconds)
  }
  incrementCounter(); // Start the counter
}

function stopext2() {
  clearTimeout(timeoutID);
  var minutes = ""; // Assign some values to minutes and seconds
  var seconds = ""; // For example, 90 minutes and 0 seconds

  // Format the timer display as "mm:min:ss lol"
  document.getElementById(
    "timer"
  ).textContent = `${minutes} TERMINÉ${seconds} `;
}

function updateSelectedValues() {
  var selectedEquipe = $("#dropdownequipe").text().trim();
  var selectedJoueur = $("#dropdownjoueur").text().trim();
  var selectedpasseur = $("#dropdownpasseur").text().trim();

  var selectedjoueurrouge = $("#dropdownjoueurrouge").text().trim();
  var selectedequiperouge = $("#dropdownrouge").text().trim();
  var selectedjoueurjaune = $("#dropdownjoueurjaune").text().trim();
  var selectedequipejaune = $("#dropdownjaune").text().trim();
  var penalty = $("#dropdownequipepeno").text().trim();
  var selectedEquipeChange = $("#dropdownequipeChange").text().trim();
  var selectedJoueurIN = $("#dropdownjoueurChangeIN").text().trim();
  var selectedJoueurOUT = $("#dropdownjoueurChangeOUT").text().trim();

  $("#selectedEquipe").val(selectedEquipe);
  $("#selectedJoueur").val(selectedJoueur);
  $("#selectedpasseur").val(selectedpasseur);
  $("#penalty").val(penalty);
  $("#selectedEquipeChange").val(selectedEquipeChange);
  $("#selectedJoueurIN").val(selectedJoueurIN);
  $("#selectedJoueurOUT").val(selectedJoueurOUT);
  $("#selectedjoueurrouge").val(selectedjoueurrouge);
  $("#selectedequiperouge").val(selectedequiperouge);
  $("#selectedjoueurjaune").val(selectedjoueurjaune);
  $("#selectedequipejaune").val(selectedequipejaune);
}

$(document).ready(function () {
  $("form").submit(function () {
    updateSelectedValues();
  });
});

function updateDropdownTextbut(text) {
  document.getElementById("dropdownequipe").textContent = text;
}
function updateDropdownTextchange(text) {
  document.getElementById("dropdownequipeChange").textContent = text;
}
function updateDropdownTextjo(text) {
  document.getElementById("dropdownjoueur").textContent = text;
}
function updateDropdownTextjoChange(text) {
  document.getElementById("dropdownjoueurChangeIN").textContent = text;
}
function updateDropdownTextjoChangeOUT(text) {
  document.getElementById("dropdownjoueurChangeOUT").textContent = text;
}
function updateDropdownTextjop(text) {
  document.getElementById("dropdownpasseur").textContent = text;
}
function updateDropdownText(text) {
  document.getElementById("dropdownequipepeno").textContent = text;
}
function updateDropdownTextjaune(text) {
  document.getElementById("dropdownjaune").textContent = text;
}
function updateDropdownTextjoueurjaune(text) {
  document.getElementById("dropdownjoueurjaune").textContent = text;
}
function updateDropdownTextrouge(text) {
  document.getElementById("dropdownrouge").textContent = text;
}
function updateDropdownTextjoueurrouge(text) {
  document.getElementById("dropdownjoueurrouge").textContent = text;
}



