const API_KEY = "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";

async function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  const typing = document.getElementById("typing");
  if (!message) return;

  addMessage("You", message, "user");
  input.value = "";

  typing.innerText = "AvantikaBot is typing... ✨";

  try {
    const reply = await getReplyFromGPT(message);
    typing.innerText = "";
    addMessage("AvantikaBot", reply, "bot");
  } catch (err) {
    console.error(err);
    typing.innerText = "";
    addMessage("AvantikaBot", "Oops baby 😢 kuch galti ho gayi.", "bot");
  }
}

function addMessage(sender, text, type) {
  const chatBox = document.getElementById("chatBox");
  const div = document.createElement("div");
  div.className = `bubble ${type}`;
  div.innerText = `${sender}: ${text}`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function getReplyFromGPT(message) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are AvantikaBot. A funny, flirty, thoda tharki AI girl who replies in Hinglish. Be playful, savage and cute 😘" },
        { role: "user", content: message }
      ]
    })
  });
  const data = await res.json();
  return data.choices?.[0]?.message?.content || "Kya bolun baby, mujhe samajh nahi aaya 😢";
}