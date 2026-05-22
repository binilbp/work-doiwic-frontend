<script>
    let { items = [], state = {} } = $props();
</script>

<div class="flex flex-row flex-wrap items-center justify-center gap-3 rounded-3xl border border-white/70 bg-white/80 p-4 shadow-2xl shadow-slate-200/70 backdrop-blur-xl lg:w-48 lg:flex-col lg:gap-1 lg:p-6">
  {#each items as item, i}
    
    <button
      onclick={item.onclick}
      class="relative z-10 flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-sky-400 text-sm font-semibold {state.currentStep === Number(item.id) ? 'ring-4 ring-indigo-100 text-white shadow-lg shadow-indigo-200' : 'text-white shadow-md shadow-sky-100'} transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-200"
    >
      {item.id}

      <!-- testing  -->
      <!-- current-state :{state.currentStep} -->
      <!-- /testing -->

    </button>
    <p class="min-w-20 rounded-full px-3 py-1 text-center text-sm font-medium leading-5 transition-all duration-200 lg:min-w-0 {state.currentStep === Number(item.id) ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-100' : 'text-slate-600'}">{item.label}</p>

    {#if i < items.length - 1}
      <div class="hidden h-8 w-0.5 rounded-full bg-gradient-to-b from-indigo-300 to-sky-200 lg:block"></div>
    {/if}
  {/each}
</div>
