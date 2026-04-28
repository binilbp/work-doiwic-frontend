const messagesEl = document.getElementById('messages');
const emptyState = document.getElementById('emptyState');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const clearBtn = document.getElementById('clearBtn');
const toastEl = document.getElementById('toast');

let isProcessing = false;
let conversationHistory = [];

// Configure marked
marked.setOptions({
  breaks: true,
  gfm: true
});

// Auto-resize textarea
chatInput.addEventListener('input', () => {
  chatInput.style.height = 'auto';
  chatInput.style.height = Math.min(chatInput.scrollHeight, 140) + 'px';
  sendBtn.disabled = chatInput.value.trim() === '' || isProcessing;
});

// Send on Enter, newline on Shift+Enter
chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    if (!sendBtn.disabled) sendMessage();
  }
});

sendBtn.addEventListener('click', sendMessage);

// Suggestion chips
document.querySelectorAll('.suggestion-chip').forEach((chip) => {
  chip.addEventListener('click', () => {
    chatInput.value = chip.dataset.msg;
    chatInput.dispatchEvent(new Event('input'));
    sendMessage();
  });
});

// Clear conversation
clearBtn.addEventListener('click', () => {
  if (isProcessing) return;
  conversationHistory = [];
  messagesEl.innerHTML = '';
  messagesEl.appendChild(emptyState);
  emptyState.style.display = 'flex';
  showToast('Conversation cleared');
});

function getTimeString() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function scrollToBottom() {
  requestAnimationFrame(() => {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function appendMessage(role, content, isError) {
  if (emptyState.style.display !== 'none') {
    emptyState.style.display = 'none';
  }

  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${role}`;

  const avatarIcon =
    role === 'user'
      ? '<i class="fa-solid fa-user"></i>'
      : '<i class="fa-solid fa-bolt"></i>';

  let bubbleContent;
  if (isError) {
    bubbleContent = `<div class="msg-bubble msg-error">${escapeHtml(content)}</div>`;
  } else if (role === 'assistant') {
    // Parse markdown for AI replies
    const parsedMd = marked.parse(content);
    bubbleContent = `<div class="msg-bubble md-content">${parsedMd}</div>`;
  } else {
    // Escape HTML for user but preserve newlines
    bubbleContent = `<div class="msg-bubble">${escapeHtml(content)}</div>`;
  }

  msgDiv.innerHTML = `
    <div class="msg-avatar">${avatarIcon}</div>
    <div class="msg-content">
      ${bubbleContent}
      <div class="msg-time">${getTimeString()}</div>
    </div>
  `;

  messagesEl.appendChild(msgDiv);
  scrollToBottom();
  return msgDiv;
}

function appendTypingIndicator() {
  if (emptyState.style.display !== 'none') {
    emptyState.style.display = 'none';
  }

  const msgDiv = document.createElement('div');
  msgDiv.className = 'message assistant';
  msgDiv.id = 'typingMsg';

  msgDiv.innerHTML = `
    <div class="msg-avatar"><i class="fa-solid fa-bolt"></i></div>
    <div class="msg-content">
      <div class="msg-bubble">
        <div class="typing-indicator">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      </div>
    </div>
  `;

  messagesEl.appendChild(msgDiv);
  scrollToBottom();
  return msgDiv;
}

function removeTypingIndicator() {
  const el = document.getElementById('typingMsg');
  if (el) el.remove();
}

let toastTimeout = null;
function showToast(message) {
  if (toastTimeout) clearTimeout(toastTimeout);
  toastEl.textContent = message;
  toastEl.classList.add('visible');
  toastTimeout = setTimeout(() => toastEl.classList.remove('visible'), 2500);
}

async function sendMessage() {
  const text = chatInput.value.trim();
  if (!text || isProcessing) return;

  isProcessing = true;
  sendBtn.disabled = true;
  chatInput.value = '';
  chatInput.style.height = 'auto';

  appendMessage('user', text);
  conversationHistory.push({ role: 'user', content: text });

  appendTypingIndicator();

  try {
    const response = await fetch('http://localhost:8000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, history: conversationHistory }),
    });

    removeTypingIndicator();

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const data = await response.json();
    const aiReply =
      data.reply || data.response || data.message || data.content || JSON.stringify(data);

    appendMessage('assistant', aiReply);
    conversationHistory.push({ role: 'assistant', content: aiReply });
  } catch (err) {
    removeTypingIndicator();
    const errorMsg =
      err.name === 'TypeError'
        ? 'Could not connect to the server. Make sure localhost:8000 is running.'
        : err.message;
    appendMessage('assistant', errorMsg, true);
  } finally {
    isProcessing = false;
    sendBtn.disabled = chatInput.value.trim() === '';
    chatInput.focus();
  }
}

chatInput.focus();
