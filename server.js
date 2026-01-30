const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Faz o servidor ler a pasta "public"
app.use(express.static(__dirname + '/public'));

let players = {};

io.on('connection', (socket) => {
    // Cria um jogador com uma carta aleatória de 1 a 10
    players[socket.id] = { 
        id: socket.id, 
        card: Math.floor(Math.random() * 10) + 1 
    };

    io.emit('updatePlayers', players);

    socket.on('disconnect', () => {
        delete players[socket.id];
        io.emit('updatePlayers', players);
    });
});

server.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});