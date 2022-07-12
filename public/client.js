const socket = io()
let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
do {
    name = prompt('Please enter your name: ')
} while(!name)

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }
    // Append 
    appendMessage(msg, 'outgoing')
    textarea.value = '' //Clear text area after sending message.
    scrollToBottom()

    // Send to server
    socket.emit('message', msg)

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div') //Creating a div
    let className = type
    mainDiv.classList.add(className, 'message') //Adding class to div

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup //Adding HTML to div
    messageArea.appendChild(mainDiv) //Appending div to another parent div
}

    
// Recieve messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

//Scroll automatically to bottom when message is sent or received.
function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}

