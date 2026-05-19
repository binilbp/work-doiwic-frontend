<script>
    let { items = [], state = {} } = $props();
</script>

<div class="flex flex-col items-center gap-1">
  {#each items as item, i}
    
    <button
      onclick={item.onclick}
      class="relative z-10 rounded-full bg-blue-500 px-4 py-2 text-md {state.currentStep === item.id ? 'text-amber-400' : 'text-white'} font-bold hover:bg-blue-600 transition-colors"
    >
      {item.id}

      <!-- testing  -->
      <!-- current-state :{state.currentStep} -->
      <!-- /testing -->

    </button>
    <p class="text-md font-semibold text-slate-600">{item.label}</p>

    {#if i < items.length - 1}
      <div class="w-0.5 h-8 bg-blue-500"></div>
    {/if}
  {/each}
</div>
