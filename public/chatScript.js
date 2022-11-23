
const socket = io();

const userNameInput = document.getElementById("userNameInput")

const sendButton = document.getElementById("userNameInput")

const textInput = document.getElementById("textInput")

const textPlace = document.getElementById("textPlace")

socket.on("write the text to all clients", ({ data, userName }) => {

  textPlace.value = data
  console.log(data)
  const p = document.createElement('p')

  p.textContent = userName + ': ' + data
  document.body.append(p)
})

// sendButton.addEventListener("click", (event) => {
//   console.log('send button clicked')
//   console.log("userNameInput: " + userNameInput.value)
//   socket.emit("a client wrote some text", { data: event.target.value, userName: userNameInput.value })
// })

textInput.addEventListener("change", (event) => {
  console.log("userNameInput.value: " + userNameInput.value)
  socket.emit("a client wrote some text", { data: event.target.value, userName: userNameInput.value })
})
