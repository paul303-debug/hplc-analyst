const messagesEl = document.getElementById("messages");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const chatContainer = document.getElementById("chat-container");

let conversationHistory = [];
let isStreaming = false;

// Auto-resize textarea
userInput.addEventListener("input", () => {
  userInput.style.height = "auto";
  userInput.style.height = userInput.scrollHeight + "px";
});

// Submit on Enter (Shift+Enter for newline)
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    chatForm.dispatchEvent(new Event("submit"));
  }
});

// Load opening message
async function loadOpeningMessage() {
  try {
    const res = await fetch("/api/opening-message");
    const data = await res.json();
    appendMessage("assistant", data.content);
  } catch {
    appendMessage(
      "assistant",
      "Welcome! I'm your HPLC analysis assistant. How can I help you today?"
    );
  }
}

// Append a message to the chat
function appendMessage(role, content) {
  const wrapper = document.createElement("div");
  wrapper.className = `flex ${role === "user" ? "justify-end" : "justify-start"}`;

  const bubble = document.createElement("div");
  bubble.className = `message-${role} rounded-2xl px-5 py-4 max-w-[85%] text-sm`;

  const label = document.createElement("div");
  label.className = "text-xs font-semibold mb-1 " +
    (role === "user" ? "text-blue-700" : "text-gray-500");
  label.textContent = role === "user" ? "You" : "HPLC Analyst";

  const body = document.createElement("div");
  body.className = "message-content text-gray-800";
  body.innerHTML = renderDiagrams(renderMarkdown(content));

  bubble.appendChild(label);
  bubble.appendChild(body);
  wrapper.appendChild(bubble);
  messagesEl.appendChild(wrapper);

  scrollToBottom();
  return body;
}

// Create a streaming message placeholder
function createStreamingMessage() {
  const wrapper = document.createElement("div");
  wrapper.className = "flex justify-start";

  const bubble = document.createElement("div");
  bubble.className = "message-assistant rounded-2xl px-5 py-4 max-w-[85%] text-sm";

  const label = document.createElement("div");
  label.className = "text-xs font-semibold mb-1 text-gray-500";
  label.textContent = "HPLC Analyst";

  const body = document.createElement("div");
  body.className = "message-content text-gray-800 streaming-cursor";

  bubble.appendChild(label);
  bubble.appendChild(body);
  wrapper.appendChild(bubble);
  messagesEl.appendChild(wrapper);

  scrollToBottom();
  return body;
}

function scrollToBottom() {
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Minimal markdown renderer
function renderMarkdown(text) {
  let html = text
    // Code blocks
    .replace(/```(\w*)\n([\s\S]*?)```/g, "<pre><code>$2</code></pre>")
    // Inline code
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    // Bold
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    // Italic
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    // Headers
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    // Blockquotes
    .replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>")
    // Unordered lists
    .replace(/^[*\-] (.+)$/gm, "<li>$1</li>")
    // Line breaks into paragraphs
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br>");

  // Wrap list items
  html = html.replace(
    /(<li>.*?<\/li>)(?:\s*<br>)*(<li>)/g,
    "$1$2"
  );
  html = html.replace(
    /(<li>[\s\S]*?<\/li>)/g,
    (match) => `<ul>${match}</ul>`
  );
  // Clean up nested uls
  html = html.replace(/<\/ul>\s*<ul>/g, "");

  return `<p>${html}</p>`;
}

// Handle form submit
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = userInput.value.trim();
  if (!text || isStreaming) return;

  // Add user message
  appendMessage("user", text);
  conversationHistory.push({ role: "user", content: text });

  userInput.value = "";
  userInput.style.height = "auto";
  isStreaming = true;
  sendBtn.disabled = true;

  // Create streaming placeholder
  const streamBody = createStreamingMessage();
  let fullResponse = "";

  try {
    const res = await fetch("/api/chat/stream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: conversationHistory }),
    });

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        const payload = line.slice(6);

        if (payload === "[DONE]") break;

        try {
          const data = JSON.parse(payload);
          if (data.error) {
            fullResponse += `\n\n**Error:** ${data.error}`;
          } else if (data.content) {
            fullResponse += data.content;
          }
          streamBody.innerHTML = renderDiagrams(renderMarkdown(fullResponse));
          scrollToBottom();
        } catch {
          // skip malformed JSON
        }
      }
    }
  } catch (err) {
    fullResponse += `\n\n**Connection error:** ${err.message}`;
    streamBody.innerHTML = renderDiagrams(renderMarkdown(fullResponse));
  }

  // Finalize
  streamBody.classList.remove("streaming-cursor");
  conversationHistory.push({ role: "assistant", content: fullResponse });
  isStreaming = false;
  sendBtn.disabled = false;
  userInput.focus();
});

// Init
loadOpeningMessage();
userInput.focus();
