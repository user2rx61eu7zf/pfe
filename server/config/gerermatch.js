

const socket=io();
    var timerInterval;
    var timerStarted = false;
    var timeoutID;

    document.addEventListener('DOMContentLoaded', function () {
        var timerInterval; 
        var elapsedTime = 0; 
        var timerStarted = false; 
        var socket = io();  
        function pad(val) { return (val < 10 ? "0" : "") + val; }
        function updateTimerDisplay() {
            var hours = Math.floor(elapsedTime / 3600);
            var minutes = Math.floor((elapsedTime % 3600) / 60);
            var seconds = elapsedTime % 60;
    
            document.getElementById('minutes').textContent = pad(minutes);
            document.getElementById('seconds').textContent = pad(seconds);
        }
    
       
        function start() {
            timerInterval = setInterval(function () {
                elapsedTime++;
                updateTimerDisplay();
                localStorage.setItem('elapsedTime', elapsedTime.toString());
            }, 1000); 
    
            timerStarted = true; 
           
            updateTimerDisplay();
        }
    
      
        if (localStorage.getItem('elapsedTime')) {
            elapsedTime = parseInt(localStorage.getItem('elapsedTime'));
            start(); 
        }
    
 
        document.getElementById('startBtn').addEventListener('click', function () {
            console.log("Start button clicked");
           
            socket.emit('start')
            start(); 
        });


    
   
        document.getElementById('mitempsBtn').addEventListener('click', function () {
            console.log("Mi-temps button clicked");
            socket.emit('mi-temps')
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
    
       
        document.getElementById('butBtn').addEventListener('click', function () {
           

            if (timerStarted) {
                var clickedTime = pad(Math.floor(elapsedTime / 3600)) + ":" + pad(Math.floor((elapsedTime % 3600) / 60)) + ":" + pad(elapsedTime % 60);
                console.log("Clicked time: ", clickedTime);
                console.log(clickedTime);
               
               
                    function handleEquipeDropdownItemClick(event) {
                         clickedText = event.currentTarget.textContent.trim();
                         console.log('Equipe clicked text:', clickedText); 
    
                    }
                            var clickedText;    

                    function handleJoueurDropdownItemClick(event) {
                            var buteur = event.currentTarget.textContent.trim();
                            console.log('Joueur clicked text:', buteur); 
                            socket.emit('butBtnClicked', { time: clickedTime, buteur: buteur,equipe:clickedText }); 
                    }


                        var equipeDropdownItems = document.querySelectorAll("#dropdownEquipeMenu .dropdown-item");
                        equipeDropdownItems.forEach(function(item) {
                            item.addEventListener("click", handleEquipeDropdownItemClick);
                        });


                        var joueurDropdownItems = document.querySelectorAll("#dropdownJoueurBMenu .dropdown-item");
                        joueurDropdownItems.forEach(function(item) {
                            item.addEventListener("click", handleJoueurDropdownItemClick);
                        });

                   
                    
    
                
                
            }
        });
    




        document.getElementById('penoBtn').addEventListener('click', function () {
            console.log("peno");
           
    ; 
        });






  
        window.addEventListener('beforeunload', function () {
            localStorage.setItem('timerStarted', timerStarted ? 'true' : 'false');
        });
    
     
    });
    

// document.addEventListener('DOMContentLoaded', function () {
//     let timeoutID; // Declare timeoutID in the outer scope

//     // Define the start function
//     function startExt() {
//         let minutes = localStorage.getItem('timerMinutes') || 90;
//         let seconds = localStorage.getItem('timerSeconds') || 0;

//         document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
//         document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');

//         function incrementCounter() {
//             if (seconds === 59) {
//                 if (minutes === 0) {
//                     // Counter reached 0, stop incrementing
//                     clearTimeout(timeoutID);
//                     return;
//                 }
//                 minutes--;
//                 seconds = 0;
//             } else {
//                 seconds++;
//             }

//             // Display the counter
//             let counterDisplay = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//             document.getElementById('timer').textContent = counterDisplay;

//             // Store the current state in local storage
//             localStorage.setItem('timerMinutes', minutes);
//             localStorage.setItem('timerSeconds', seconds);

//             timeoutID = setTimeout(incrementCounter, 1000); // Call incrementCounter again after 1 second (1000 milliseconds)
//         }

//         incrementCounter(); // Start the counter
//     }

//     // Check if the timer was previously started
//     const timerStartedBefore = localStorage.getItem('timerStarted') === 'true';
//     if (timerStartedBefore) {
//         startExt(); // Restart the timer if it was previously started
//     }

//     // Add event listener for the "Start" button
//     document.getElementById('startExtBtn').addEventListener('click', function () {
//         startExt(); // Call the function to start the timer when the "Start" button is clicked
//         localStorage.setItem('timerStarted', 'true'); // Set the flag indicating that the timer has been started
//     });

//     // Add event listener for the "Stop" button
//     document.getElementById('stopExt1Btn').addEventListener('click', function () {
//         console.log("Pause button clicked"); // Debugging statement to confirm button click
//         clearTimeout(timeoutID); // Stop the timer
//         console.log("Timer stopped"); // Debugging statement to confirm timer stopped
//         var minutes = ""; // Assign some values to minutes and seconds
//         var seconds = ""; // For example, 90 minutes and 0 seconds

//         // Format the timer display
//         document.getElementById('timer').textContent = `${minutes}  Prolongation 1 terminé ${seconds} `;

//         localStorage.removeItem("timerMinutes");
//         localStorage.removeItem("timerSeconds");
//         localStorage.removeItem("timerStarted"); // Remove the flag indicating that the timer has been started
//     });

//     // Add event listener for the "beforeunload" event to stop the timer and clear local storage when the page is refreshed
//     window.addEventListener('beforeunload', function () {
//         localStorage.setItem('timerStarted', 'true'); // Set the flag indicating that the timer has been started
//     });
// });

















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
        let counterDisplay = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('timer').textContent = counterDisplay;

        timeoutID = setTimeout(incrementCounter, 1000);// Call incrementCounter again after 1 second (1000 milliseconds)
    }
    incrementCounter(); // Start the counter
}

function stopext2() {
    clearTimeout(timeoutID);
    var minutes = ""; // Assign some values to minutes and seconds
    var seconds = ""; // For example, 90 minutes and 0 seconds

    // Format the timer display as "mm:min:ss lol"
    document.getElementById('timer').textContent = `${minutes} TERMINÉ${seconds} `;
}

function updateSelectedValues() {
    var selectedEquipe = $('#dropdownequipe').text().trim();
    var selectedJoueur = $('#dropdownjoueur').text().trim();
    var selectedpasseur = $('#dropdownpasseur').text().trim();

    var selectedjoueurrouge = $('#dropdownjoueurrouge').text().trim();
    var selectedequiperouge = $('#dropdownrouge').text().trim();
    var selectedjoueurjaune = $('#dropdownjoueurjaune').text().trim();
    var selectedequipejaune = $('#dropdownjaune').text().trim();
    var penalty = $('#dropdownequipepeno').text().trim();



   
    $('#selectedEquipe').val(selectedEquipe);
    $('#selectedJoueur').val(selectedJoueur);
    $('#selectedpasseur').val(selectedpasseur);
    $('#penalty').val(penalty);

    $('#selectedjoueurrouge').val(selectedjoueurrouge)
    $('#selectedequiperouge').val(selectedequiperouge)
    $('#selectedjoueurjaune').val(selectedjoueurjaune)
    $('#selectedequipejaune').val(selectedequipejaune)
   
}


$(document).ready(function () {
    $('form').submit(function () {
        updateSelectedValues();
    });
});



























































function updateDropdownTextbut(text) {
    document.getElementById("dropdownequipe").textContent = text;
}
function updateDropdownTextjo(text) {
    document.getElementById("dropdownjoueur").textContent = text;
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