const socket=io();
    var timerInterval;
    var timerStarted = false;
    var timeoutID;


document.addEventListener('DOMContentLoaded', function () {
    var timerInterval; // Declare the timerInterval variable outside the start function so it can be accessed in the event handler
    var elapsedTime = 0; // Initialize elapsed time to 0
    var timerStarted = false; // Initialize timerStarted flag to false

    // Function to pad single digit numbers with leading zero
    function pad(val) { return (val < 10 ? "0" : "") + val; }

    // Function to update the timer display
    function updateTimerDisplay() {
        var hours = Math.floor(elapsedTime / 3600);
        var minutes = Math.floor((elapsedTime % 3600) / 60);
        var seconds = elapsedTime % 60;
        
        document.getElementById('minutes').textContent = pad(minutes);
        document.getElementById('seconds').textContent = pad(seconds);
    }

    // Define the start function
    function start() {
        // Start the timer
        timerInterval = setInterval(function () {
            elapsedTime++; // Increment elapsed time by 1 second
            updateTimerDisplay(); // Update the timer display

            // Store the elapsed time in local storage
            localStorage.setItem('elapsedTime', elapsedTime.toString());
        }, 1000); // Run the interval timer every second

        timerStarted = true; // Set timerStarted flag to true
        // Update the timer display initially
        updateTimerDisplay();
    }

    // Check if there is a saved elapsed time in local storage
    if (localStorage.getItem('elapsedTime')) {
        elapsedTime = parseInt(localStorage.getItem('elapsedTime'));
        start(); // Start the timer with the elapsed time
    }

    // Add event listener for the "Start" button
    document.getElementById('startBtn').addEventListener('click', function () {
        console.log("Start button clicked"); 
        socket.emit('start');// Debugging statement to confirm button click
        start(); // Start the timer when the "Start" button is clicked
    });

    // Add event listener for the "Mi-temps" button
    document.getElementById('mitempsBtn').addEventListener('click', function () {
        console.log("Mi-temps button clicked");
        socket.emit('mi-temps'); // Debugging statement to confirm button click
        if (timerStarted) {
            localStorage.clear();
            clearInterval(timerInterval); // Stop the timer if it was started
            console.log("Timer stopped"); // Debugging statement to confirm timer stopped
            timerStarted = false; // Reset timerStarted flag
            document.getElementById("minutes").textContent = "Mi-temps";
            document.getElementById("seconds").textContent = "";
            document.getElementById("separator").textContent = "";

            // Clear elapsed time from local storage
            localStorage.removeItem("elapsedTime");
        }
    });

    // Handle page refresh
    window.addEventListener('beforeunload', function () {
        // Store information about whether the timer was running before refresh
        localStorage.setItem('timerStarted', timerStarted ? 'true' : 'false');
    });

    // If timer was running before refreshing the page, start it again
    // if (localStorage.getItem('timerStarted') === 'true') {
    //     start();
    // }
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



    // Update the value of the hidden input fields
    $('#selectedEquipe').val(selectedEquipe);
    $('#selectedJoueur').val(selectedJoueur);
    $('#selectedpasseur').val(selectedpasseur);

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