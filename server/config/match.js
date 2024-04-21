const socket=io();



socket.on('carton_jaune', function(data) {
    const messageDiv = document.getElementById('messageCartonJaune');
    const messageParagraph = document.createElement('p');
    const image = document.createElement('img');
    
   
    image.src = '/img/yellow.jpg'; 
    image.alt = 'Carton jaune';

    
    image.width = 32; 

    messageParagraph.textContent = `Carton jaune : ${data.joueur}`;

  
    messageDiv.appendChild(image);
    messageDiv.appendChild(messageParagraph);

   
    localStorage.setItem('cartonJauneMessage', messageParagraph.textContent);
});


socket.on('carton_rouge', function(data) {
    const messageDiv = document.getElementById('messageCartonJaune');
    const messageParagraph = document.createElement('p');
    messageParagraph.textContent = `Carton rouge attribué à : ${data.joueur}`;
    messageDiv.appendChild(messageParagraph);

    // Enregistrez le message dans le stockage local
    localStorage.setItem('cartonRougeMessage', messageParagraph.textContent);
});

socket.on('but', function(data) {
    const messageDiv = document.getElementById('messageCartonJaune');
    const messageParagraph = document.createElement('p');
    messageParagraph.textContent = `BUT `;
    messageDiv.appendChild(messageParagraph);

    // Enregistrez le message dans le stockage local
    localStorage.setItem('but', messageParagraph.textContent);
});

window.onload = function() {
    const savedMessage = localStorage.getItem('cartonJauneMessage');
    if (savedMessage) {
        const messageDiv = document.getElementById('messageCartonJaune');
        const messageParagraph = document.createElement('p');
        messageParagraph.textContent = savedMessage;
        messageDiv.appendChild(messageParagraph);
    }
};