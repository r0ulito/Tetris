const io = require('socket.io-client');
const socket = io('http://localhost:8180');

socket.on('connect', () => {
    console.log('Connecté au serveur');
});