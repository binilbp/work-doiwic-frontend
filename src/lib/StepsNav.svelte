<script>
    let { items = [], state = {} } = $props();
</script>

<div
    class="flex flex-row flex-wrap items-center justify-center gap-3 rounded-3xl border border-white/70 bg-white/80 p-4 shadow-2xl shadow-slate-200/70 backdrop-blur-xl lg:w-48 lg:flex-col lg:gap-1 lg:p-6 dark:border-slate-700/50 dark:bg-slate-800/40 dark:shadow-none"
>
    {#each items as item, i}
        <button
            onclick={item.onclick}
            class="relative z-10 flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-sky-400 text-sm font-semibold {state.currentStep ===
            Number(item.id)
                ? 'ring-4 ring-indigo-100 text-white shadow-lg shadow-indigo-200 dark:ring-indigo-500/30'
                : 'text-white shadow-md shadow-sky-100 dark:shadow-none'} transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-200 dark:hover:shadow-none"
        >
            {item.id}
        </button>
        <p
            class="min-w-20 rounded-full px-3 py-1 text-center text-sm font-medium leading-5 transition-all duration-200 lg:min-w-0 {state.currentStep ===
            Number(item.id)
                ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-100 dark:bg-indigo-500/20 dark:text-indigo-300 dark:ring-indigo-500/50'
                : 'text-slate-600 dark:text-slate-400'}"
        >
            {item.label}
        </p>

        {#if i < items.length - 1}
            <div
                class="hidden h-8 w-0.5 rounded-full bg-gradient-to-b from-indigo-300 to-sky-200 dark:from-slate-700 dark:to-slate-800 lg:block"
            ></div>
        {/if}
    {/each}
</div>
