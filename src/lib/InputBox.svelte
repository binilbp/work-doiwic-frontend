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

<div class="flex w-full flex-col items-stretch gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-3 sm:flex-row sm:items-end">
  <textarea
    bind:value={message}
    {placeholder}
    {disabled}
    onkeydown={handleKeydown}
    rows="1"
    class="min-h-12 flex-1 resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm shadow-slate-100 transition focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 disabled:opacity-50"
  ></textarea>
  
  <button
    onclick={handleSend}
    disabled={disabled || !message.trim()}
    class="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-200 transition hover:-translate-y-0.5 hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
  >
    Send
  </button>
</div>
