<script>
    import { appState } from './chatStore.svelte.js';
    
    let contextEntries = $derived(Object.entries(appState.userContext));
</script>

<div class="w-xs h-auto min-h-[22rem] rounded-2xl bg-slate-800 p-6 shadow-lg border border-slate-700 flex flex-col gap-6 text-slate-300">
    
    <div>
        <h2 class="text-amber-500 font-bold text-xl mb-2 tracking-wide">Clarity Context</h2>
        <p class="text-xs text-slate-400 mb-4">What the AI currently understands about your situation.</p>
    </div>

    <div class="flex flex-col gap-3">
        {#if contextEntries.length === 0}
            <div class="text-center p-4 bg-slate-700/50 rounded-lg text-slate-500 italic text-sm">
                Awaiting details... Start chatting to build context.
            </div>
        {:else}
            {#each contextEntries as [key, value]}
                <div class="flex flex-col gap-1 border-b border-slate-700/50 pb-2 last:border-0">
                    <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {key}
                    </p>
                    <p class="text-sm font-medium text-white">
                        {value}
                    </p>
                </div>
            {/each}
        {/if}
    </div>
</div>
