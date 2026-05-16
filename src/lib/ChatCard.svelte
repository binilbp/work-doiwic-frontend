<script>
    import { fly } from 'svelte/transition';
    import { User, Sparkles } from 'lucide-svelte';

    let { role = 'user', content = '' } = $props();
    let isUser = $derived(role === 'user');
</script>

<div 
    in:fly={{ y: 20, duration: 300 }}
    class={`flex w-full gap-3 ${isUser ? 'justify-end' : 'justify-start'} group`}
>
    {#if !isUser}
        <div class="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-amber-500 shadow-sm shrink-0 mt-1">
            <Sparkles size={16} />
        </div>
    {/if}

    <div class={`
        max-w-[75%] px-5 py-3.5 text-[15px] leading-relaxed shadow-sm
        ${isUser 
            ? 'bg-gradient-to-br from-amber-400 to-amber-500 text-white rounded-2xl rounded-br-sm shadow-amber-500/20' 
            : 'bg-white text-slate-700 border border-slate-100 rounded-2xl rounded-bl-sm shadow-slate-200/50'}
    `}>
        {content}
    </div>

    {#if isUser}
        <div class="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 shadow-sm shrink-0 mt-1">
            <User size={16} />
        </div>
    {/if}
</div>
