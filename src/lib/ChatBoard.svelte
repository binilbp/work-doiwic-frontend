<script>
    import ChatCard from './ChatCard.svelte';
    let noChat = true;
</script>
<div class= "h-screen mb-4 mr-10 w-4xl flex flex-col justify-start">
    {#if noChat}
        <div class="flex flex-col items-center gap-3 mt-50">
            <p class="italic text-4xl text-slate-500"> start typing to get answers</p>
            <p class="italic text-2xl text-slate-500"> with</p>
            <p class="italic text-5xl text-amber-500 font-semibold"> Clarity</p>
        </div>
    {:else}
        <ChatCard role="user" content="hello from user"/>
    {/if}
</div>
