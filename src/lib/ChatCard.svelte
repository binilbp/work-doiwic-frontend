<script>
    let {role='user', content='' } = $props();
    let isUser = $derived(role==='user');
</script>

{#if isUser}
<p class="text-black">
    {content}
</p>
{/if}
