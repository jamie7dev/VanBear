const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const chatHistory = document.querySelector(".chat-history");
const spinner = document.querySelector(".spinner");
const chatContainer = document.querySelector(".chat-container");

document.addEventListener("DOMContentLoaded", function () {
  let userMessages = [];
  let assistantMessages = [];

  // scroll to bottom
  const scrollToBottom = () => {
    chatHistory.scrollTop = chatHistory.scrollHeight;
  };

  // send message
  function sendMessage() {
    const message = messageInput.value;

    if (message.trim() === "") {
      return;
    }

    spinner.classList.remove("hide-spinner");

    addUserMessage(message);
    messageInput.value = "";
    sendMessageToChatbot(message);
  }

  sendButton.addEventListener("click", sendMessage);

  // keydown event 'enter'
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      sendButton.click();
      scrollToBottom();
    }
  }
  messageInput.addEventListener("keydown", handleKeyDown);

  async function sendMessageToChatbot(message) {
    try {
      const response = await fetch(
        "https://zj6g5pxykfux3jhpeshemel7za0bblye.lambda-url.ca-central-1.on.aws/vanbear",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userMessages: userMessages,
            assistantMessages: assistantMessages,
          }),
        }
      );

      const data = await response.json();

      // console.log(data);

      const chatbotResponse =
        data.assistant ||
        "Oops! Something went wrong. Please refresh your browser!";

      // add chat to assistantMessage
      addChatbotMessage(chatbotResponse);
      assistantMessages.push(chatbotResponse);
    } catch (error) {
      addChatbotMessage(
        "Oops! Something went wrong. Please refresh your browser!"
      );
      console.log(error);
    } finally {
      spinner.classList.add("hide-spinner");
      scrollToBottom();
    }
  }

  function addMessage(className, text, isUserMessage) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", className);

    if (isUserMessage) {
      messageElement.classList.add("user-message");
    } else {
      messageElement.classList.add("chatbot-message");
    }

    const messageContent = document.createElement("p");
    messageContent.innerText = text;
    messageElement.appendChild(messageContent);

    const messageWrapper = document.createElement("div");
    messageWrapper.classList.add("message-wrapper");
    messageWrapper.appendChild(messageElement);

    chatHistory.appendChild(messageWrapper);

    if (!isUserMessage) {
      const botIcon = document.createElement("img");
      botIcon.setAttribute("src", "./images/VanBear.png");
      botIcon.style.width = "35px";
      botIcon.style.marginRight = "10px";
      botIcon.style.marginTop = "10px";
      messageWrapper.style.display = "flex";
      messageWrapper.style.alignItems = "flex-start";
      messageWrapper.insertBefore(botIcon, messageElement);
    }

    // add chat to userMessage
    userMessages.push(messageInput.value);
    scrollToBottom();
  }

  function addUserMessage(message) {
    addMessage("outgoing", message, true);
  }
  function addChatbotMessage(message) {
    addMessage("incoming", message, false);
  }
});

// intro page

const startBtn = document.querySelector(".start-btn");
const introContainer = document.querySelector(".intro-container");
const weatherContainer = document.querySelector(".weather-container");
startBtn.addEventListener("click", function () {
  introContainer.classList.add("hide-container");
  chatContainer.classList.remove("hide-container");
  weatherContainer.classList.remove("hide-container");
});
