const socket=io();
socket.on('carton_jaune', function(data) {
    const messageDiv = document.getElementById('messageCartonJaune');
    const messageParagraph = document.createElement('p');
    const image = document.createElement('img');
    image.src = '/img/yellow.jpg'; 
    image.alt = 'Carton jaune';
    image.width = 32; 
    messageParagraph.textContent = ` ${data.joueur}`;
    messageDiv.appendChild(image);
    messageDiv.appendChild(messageParagraph);
    localStorage.setItem('cartonJauneMessage', messageParagraph.textContent);
});


socket.on('carton_rouge', function(data) {
    const messageDiv = document.getElementById('messageCartonJaune');
    const messageParagraph = document.createElement('p');
    messageParagraph.textContent = `Carton rouge attribué à : ${data.joueur}`;
    messageDiv.appendChild(messageParagraph);

    localStorage.setItem('cartonRougeMessage', messageParagraph.textContent);
});

socket.on('butBtnClicked', function(data) {
    console.log('toz');
    
    console.log('But button clicked at:', data.time);
        console.log(data.time);
    const messageDiv = document.getElementById('messageCartonJaune');
    const messageParagraph = document.createElement('p');
var originalTime = data.time;
var timeParts = originalTime.split(":");
var minutes = parseInt(timeParts[1]); 
var seconds = timeParts[2];
var extractedTime = minutes + ":" + seconds;
messageParagraph.textContent = `BUT ${extractedTime}`;

       
        messageDiv.appendChild(messageParagraph);
    
    
   
} );

socket.on('mi-temps', () => {
    const messageDiv = document.getElementById('messageCartonJaune');
    const messageParagraph = document.createElement('p');
    messageParagraph.textContent = `Mitepms `;
    messageDiv.appendChild(messageParagraph);

    // Enregistrez le message dans le stockage local
    localStorage.setItem('but', messageParagraph.textContent);
});
socket.on('start', () => {
    const messageDiv = document.getElementById('messageCartonJaune');
    const messageParagraph = document.createElement('p');
    messageParagraph.textContent = `Debut de match `;
    messageDiv.appendChild(messageParagraph);

    // Enregistrez le message dans le stockage local
    localStorage.setItem('but', messageParagraph.textContent);
});
