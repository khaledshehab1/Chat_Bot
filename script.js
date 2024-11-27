const sendBtn = document.querySelector(".fa-paper-plane");
const mes = document.getElementById("message");
const chatBox = document.querySelector(".chatbox");

let userMessage;
const API_KEY = "AIzaSyCjFZjrjFkWhYmjDiv40zvVfw8-Qpjc3Qk";

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "man-chat" ? `<p>${message}</p> <i class="fa-solid fa-circle-user"></i>` : ` <i class="fa-solid fa-robot"></i><p>${message}</p>`
    chatLi.innerHTML = chatContent;
    return chatLi;
}

async function generateResponse(robotLi) {
    const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`
    const messageElement = robotLi.querySelector("p");

    const requestOptions = {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            contents: [{

                role: "user",

                parts: [{
                    text: userMessage
                }]

            }]

        }),

    };


    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.candidates[0].content.parts[0].text;
    }).catch((error) => {
        console.log(error);
    })

}

sendBtn.addEventListener("click", () => {
    userMessage = mes.value;
    if (!userMessage) return;

    chatBox.appendChild(createChatLi(userMessage, "man-chat"));
    const robotLi = createChatLi("Thinking...", "robot-chat");
    setTimeout(() => {

        chatBox.appendChild(robotLi);
        generateResponse(robotLi);
    }, 200);

    mes.value = "";
})