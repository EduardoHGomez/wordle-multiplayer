document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('#makeRoom').onclick = () => {
        makeRoom();
    }

    document.querySelector('#joinRoom').onclick = () => {
        var roomId = document.querySelector('#roomId').value;
        joinRoom(roomId);
    }

});

// Join room
function joinRoom(code) {

    window.location.href = `${code}`;
}

// Create room
function makeRoom() {
    
    let code = randomCode();
    console.log(code);
    // After being generated, go to that room
    window.location.href = `${code}`;
}

function randomCode() {
    // String in the form 000
    let result = "";
    for(let i = 0; i < 3; i++) {
        var x = Math.floor(Math.random() * 9);
        result = result + x;
    }

    return result;
}