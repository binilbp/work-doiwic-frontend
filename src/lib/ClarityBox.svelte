<script>
    import { appState } from './chatStore.svelte.js';
    import { fly } from 'svelte/transition';
    import { CheckCircle2 } from 'lucide-svelte';
    
    let contextEntries = $derived(Object.entries(appState.userContext));
</script>

<div class="w-xs h-auto min-h-[22rem] rounded-3xl bg-slate-900/95 backdrop-blur-xl p-7 shadow-2xl shadow-slate-900/20 border border-slate-700/50 flex flex-col gap-6 text-slate-300 transition-all duration-300 relative overflow-hidden">
    
    <div class="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl"></div>

    <div class="relative z-10">
        <h2 class="text-amber-500 font-bold text-xl mb-1.5 tracking-wide flex items-center gap-2">
            Clarity Context
        </h2>
        <p class="text-xs text-slate-400">What the AI currently understands about you.</p>
    </div>

    <div class="flex flex-col gap-4 relative z-10">
        {#if contextEntries.length === 0}
            <div in:fly={{ y: 10, duration: 300 }} class="flex flex-col items-center justify-center py-10 text-slate-500 gap-3">
                <div class="w-12 h-12 rounded-full border border-dashed border-slate-600 flex items-center justify-center">
                    <span class="text-2xl opacity-50">👀</span>
                </div>
                <p class="italic text-sm text-center">Awaiting details...<br/>Start chatting to build context.</p>
            </div>
        {:else}
            {#each contextEntries as [key, value] (key)}
                <div 
                    in:fly={{ x: -20, duration: 400 }} 
                    class="flex flex-col gap-1.5 bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/50 hover:border-amber-500/30 transition-colors"
                >
                    <div class="flex items-center gap-2">
                        <CheckCircle2 size={14} class="text-amber-500" />
                        <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            {key}
                        </p>
                    </div>
                    <p class="text-sm font-medium text-white pl-5">
                        {value}
                    </p>
                </div>
            {/each}
        {/if}
    </div>
</div>
