<script>
    import ChatCard from './ChatCard.svelte';
    import { appState, sendMessage } from './chatStore.svelte.js';
    import { Send, Loader2 } from 'lucide-svelte'; 

    let inputValue = $state("");

    function handleSend(text = inputValue) {
        if (!text.trim() || appState.isLoading) return; 
        sendMessage(text);
        inputValue = ""; 
    }

    function handleKeydown(event) {
        if (event.key === 'Enter') {
            handleSend();
        }
    }
</script>

<div class="h-[80vh] mb-4 mr-10 w-4xl flex flex-col relative">
    
    <div class="flex-1 overflow-y-auto p-4 flex flex-col gap-4 pb-32">
        {#if appState.chatHistory.length === 0}
            <div class="flex flex-col items-center gap-3 mt-40">
                </div>
        {:else}
            {#each appState.chatHistory as msg}
                <ChatCard role={msg.role} content={msg.content} />
            {/each}

            {#if appState.isLoading}
                <div class="flex w-full justify-start">
                    <div class="bg-slate-100 text-slate-500 border border-slate-200 px-5 py-3 rounded-2xl rounded-bl-sm text-[15px] flex items-center gap-2 w-fit">
                        <span class="italic text-sm">Processing the message</span>
                        <div class="flex gap-1">
                            <div class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
                            <div class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
                            <div class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
                        </div>
                    </div>
                </div>
            {/if}
        {/if}
    </div>

    <div class="absolute bottom-0 w-full bg-white flex flex-col gap-2 pt-2 pb-1">
        
        {#if appState.activeSuggestions.length > 0}
            <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-hide px-1">
                {#each appState.activeSuggestions as suggestion}
                    <button 
                        disabled={appState.isLoading}
                        onclick={() => handleSend(suggestion)}
                        class="whitespace-nowrap px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-full text-sm font-medium transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {suggestion}
                    </button>
                {/each}
            </div>
        {/if}

        <div class="flex gap-2">
            <input 
                type="text" 
                bind:value={inputValue}
                onkeydown={handleKeydown}
                disabled={appState.isLoading}
                placeholder={appState.isLoading ? "Waiting for response..." : "Type your message..."}
                class="flex-1 bg-slate-100 rounded-xl px-4 py-3 border border-slate-300 focus:outline-none focus:border-amber-500 text-slate-800 disabled:opacity-60 disabled:bg-slate-200"
            />
            <button 
                disabled={appState.isLoading}
                onclick={() => handleSend(inputValue)}
                class="bg-amber-500 text-white p-3 rounded-xl hover:bg-amber-600 transition flex items-center justify-center min-w-[50px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {#if appState.isLoading}
                    <Loader2 size={20} class="animate-spin" />
                {:else}
                    <Send size={20} />
                {/if}
            </button>
        </div>
    </div>
</div>

<style>
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>
