<script>
  let { onSend, placeholder = 'Type a message...', disabled = false } = $props();
  let message = $state('');

  function handleSend() {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      message = '';
    }
  }

  function handleKeydown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }
</script>

<div class="flex items-end gap-2 px-9 py-4 bg-white border-t border-gray-200">
  <textarea
    bind:value={message}
    {placeholder}
    {disabled}
    onkeydown={handleKeydown}
    rows="1"
    class="flex-1 resize-none rounded-lg border border-gray-300 px-4 py-3  text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
  ></textarea>
  
  <button
    onclick={handleSend}
    disabled={disabled || !message.trim()}
    class="rounded-lg bg-blue-500 px-4 py-3 text-sm font-medium text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
  >
    Send
  </button>
</div>
