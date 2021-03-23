const http = require('http');
const express = require('express');
const socketio = require('socket.io');
// const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const router = require('./router');

const app = express();
const server = http.createServer(app);

const io = socketio(server, {
  // origins: ["localhost:3000"],
  origins: ["https://webchat-okteto-frontend-pedroantonacio.cloud.okteto.net/"],

  // optional, useful for custom headers
  handlePreflightRequest: (req, res) => {
    res.writeHead(200, {
      // "Access-Control-Allow-Origin": "localhost:3000",
      "Access-Control-Allow-Origin": "https://webchat-okteto-frontend-pedroantonacio.cloud.okteto.net/",
      "Access-Control-Allow-Methods": "GET,POST",
      "Access-Control-Allow-Headers": "my-custom-header",
      "Access-Control-Allow-Credentials": true
    });
    res.end();
  }
});

// app.use(cors());
app.use(router);

io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return callback(error);

    socket.join(user.room);

    socket.emit('message', { user: 'Admin', text: `${user.name}, bem-vindo(a) à sala "${user.room}"`});
    socket.broadcast.to(user.room).emit('message', { user: 'Admin', text: `${user.name} entrou no chat! :)` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} saiu do chat :(` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server has started. Listening on port ${PORT}`));