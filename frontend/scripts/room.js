document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('#messageButton').onclick = () => {
        sendMessage();
    }

    createRoom();
});

const socket = io('ws://localhost:3000');
let room  = 0;

socket.on('message', (text) => {

    const el = document.createElement('li');
    el.innerHTML = text;
    document.querySelector('#messageList').appendChild(el);

});

// After joining => Create room based on the window params
function createRoom() {
    let code = window.location.href.split("/").pop();
    socket.emit('create', `${code}`);
    room = code;
}

function sendMessage() {
    const text = document.querySelector('#messageInput').value;
    const details = {
        message: text,
        room: room 
    };
    socket.emit('message', details);
}