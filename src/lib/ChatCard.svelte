<script>
    let { role = 'user', content = '' } = $props();
    let isUser = $derived(role === 'user');
</script>

<div class={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
    <div class={`
        max-w-[75%] px-5 py-3 rounded-2xl text-[15px] leading-relaxed
        ${isUser 
            ? 'bg-amber-500 text-white rounded-br-sm' 
            : 'bg-slate-100 text-slate-800 border border-slate-200 rounded-bl-sm'}
    `}>
        {content}
    </div>
</div>
