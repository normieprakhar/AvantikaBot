const API_KEY = "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";

async function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value;
  if (!message) return;

  appendMessage("You", message, "user");

  const reply = await getReplyFromGPT(message);
  appendMessage("AvantikaBot", reply, "bot");

  input.value = "";
}

function appendMessage(sender, text, cls) {
  const box = document.getElementById("chatBox");
  const div = document.createElement("div");
  div.className = `msg ${cls}`;
  div.innerText = `${sender}: ${text}`;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

async function getReplyFromGPT(message) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are AvantikaBot. A funny, flirty, Hinglish girlbot who flirts, roasts, and plays around. Make sure to be thoda tharki 😈" },
        { role: "user", content: message }
      ]
    })
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "Kya bolun baby, mujhe samajh nahi aaya 😢";
}
