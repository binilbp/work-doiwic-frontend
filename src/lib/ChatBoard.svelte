<script>
    import ChatCard from './ChatCard.svelte';
    import { appState, sendMessage } from './chatStore.svelte.js';
    import { Send, Loader2 } from 'lucide-svelte';
    import { fly } from 'svelte/transition';

    let inputValue = $state("");

    function handleSend(text = inputValue) {
        if (!text.trim() || appState.isLoading) return;
        sendMessage(text);
        inputValue = ""; // Clear the input field
    }

    function handleKeydown(event) {
        if (event.key === 'Enter') {
            handleSend();
        }
    }
</script>

<div class="h-[80vh] mb-4 mr-10 w-4xl flex flex-col relative">
    
    <div class="flex-1 overflow-y-auto p-4 flex flex-col gap-5 pb-40">
        
        {#if appState.chatHistory.length === 0}
            <div class="flex flex-col items-center gap-3 mt-40" in:fly={{ y: 20, duration: 500 }}>
                <p class="italic text-4xl text-slate-500">start typing to get answers</p>
                <p class="italic text-2xl text-slate-500">with</p>
                <p class="italic text-5xl text-amber-500 font-semibold drop-shadow-sm">Clarity</p>
            </div>
        {:else}
            {#each appState.chatHistory as msg}
                <ChatCard role={msg.role} content={msg.content} />
            {/each}

            {#if appState.isLoading}
                <div class="flex w-full justify-start" in:fly={{ y: 10, duration: 200 }}>
                    <div class="bg-white text-slate-500 border border-slate-200 px-5 py-3.5 rounded-2xl rounded-bl-sm text-[15px] flex items-center gap-3 w-fit shadow-sm shadow-slate-200/50 ml-11">
                        <span class="italic text-sm font-medium">Clarity is thinking</span>
                        <div class="flex gap-1.5 mt-1">
                            <div class="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
                            <div class="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
                            <div class="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
                        </div>
                    </div>
                </div>
            {/if}
        {/if}
    </div>

    <div class="absolute bottom-0 w-full pt-10 pb-6 bg-gradient-to-t from-white via-white to-transparent flex flex-col gap-3">
        
        {#if appState.activeSuggestions.length > 0}
            <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-hide px-2" in:fly={{ y: 20, duration: 400, delay: 100 }}>
                {#each appState.activeSuggestions as suggestion, i}
                    <button 
                        in:fly={{ y: 10, duration: 300, delay: i * 100 }}
                        disabled={appState.isLoading}
                        onclick={() => handleSend(suggestion)}
                        class="whitespace-nowrap px-5 py-2.5 bg-white hover:bg-slate-50 text-amber-600 border border-amber-200 hover:border-amber-400 rounded-full text-sm font-semibold transition-all shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {suggestion}
                    </button>
                {/each}
            </div>
        {/if}

        <div class="flex gap-2 shadow-lg shadow-slate-200/50 rounded-2xl bg-white border border-slate-200 p-1.5 mx-1">
            <input 
                type="text" 
                bind:value={inputValue}
                onkeydown={handleKeydown}
                disabled={appState.isLoading}
                placeholder={appState.isLoading ? "Clarity is thinking..." : "Message Clarity..."}
                class="flex-1 bg-transparent px-4 py-2.5 focus:outline-none text-slate-800 disabled:opacity-60 placeholder:text-slate-400"
            />
            <button 
                disabled={appState.isLoading}
                onclick={() => handleSend(inputValue)}
                class="bg-amber-500 text-white w-12 h-12 rounded-xl hover:bg-amber-600 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-amber-500/20"
            >
                {#if appState.isLoading}
                    <Loader2 size={20} class="animate-spin" />
                {:else}
                    <Send size={20} class="ml-1" />
                {/if}
            </button>
        </div>
    </div>
</div>

<style>
    /* Hides the scrollbar for the suggestion bubbles while keeping it scrollable horizontally */
    .scrollbar-hide::-webkit-scrollbar {
        display: none;
    }
    .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
</style>
