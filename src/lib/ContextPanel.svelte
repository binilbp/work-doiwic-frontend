<script>
    let { state = {} } = $props();
</script>

<div
    class="flex flex-col gap-5 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-2xl shadow-slate-200/70 backdrop-blur-xl lg:w-80 lg:p-8 dark:border-slate-700/50 dark:bg-slate-800/40 dark:shadow-none"
>
    <div class="border-b border-slate-100 pb-4 dark:border-slate-700/50">
        <span
            class="block text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2"
            >Profile</span
        >

        {#if state.user_context.profile}
            <span
                class="block text-base font-semibold text-slate-800 dark:text-slate-200"
            >
                {state.user_context.profile}
            </span>
        {:else}
            <span
                class="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-500 ring-1 ring-slate-500/10 ring-inset dark:bg-slate-800 dark:text-slate-400 dark:ring-slate-700"
            >
                Pending...
            </span>
        {/if}
    </div>

    <div class="border-b border-slate-100 pb-4 dark:border-slate-700/50">
        <span
            class="block text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2"
            >Objectives</span
        >

        {#if state.user_context.objectives}
            <span
                class="block text-base font-semibold text-slate-800 dark:text-slate-200"
            >
                {state.user_context.objectives}
            </span>
        {:else}
            <span
                class="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-500 ring-1 ring-slate-500/10 ring-inset dark:bg-slate-800 dark:text-slate-400 dark:ring-slate-700"
            >
                Pending...
            </span>
        {/if}
    </div>

    <div class="border-b border-slate-100 pb-4 dark:border-slate-700/50">
        <span
            class="block text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2"
            >Current State</span
        >

        {#if state.user_context.current_state}
            <span
                class="block text-base font-semibold text-slate-800 dark:text-slate-200"
            >
                {state.user_context.current_state}
            </span>
        {:else}
            <span
                class="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-500 ring-1 ring-slate-500/10 ring-inset dark:bg-slate-800 dark:text-slate-400 dark:ring-slate-700"
            >
                Pending...
            </span>
        {/if}
    </div>

    <div class="border-b border-slate-100 pb-4 dark:border-slate-700/50">
        <span
            class="block text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2"
            >Resources</span
        >

        {#if state.user_context.resources}
            <span
                class="block text-base font-semibold text-slate-800 dark:text-slate-200"
            >
                {state.user_context.resources}
            </span>
        {:else}
            <span
                class="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-500 ring-1 ring-slate-500/10 ring-inset dark:bg-slate-800 dark:text-slate-400 dark:ring-slate-700"
            >
                Pending...
            </span>
        {/if}
    </div>

    <div class="border-b border-slate-100 pb-4 dark:border-slate-700/50">
        <span
            class="block text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2"
            >Constraints</span
        >

        {#if state.user_context.constraints}
            <span
                class="block text-base font-semibold text-slate-800 dark:text-slate-200"
            >
                {state.user_context.constraints}
            </span>
        {:else}
            <span
                class="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-500 ring-1 ring-slate-500/10 ring-inset dark:bg-slate-800 dark:text-slate-400 dark:ring-slate-700"
            >
                Pending...
            </span>
        {/if}
    </div>
    <div class="border-b border-slate-100 pb-4 dark:border-slate-700/50">
        <span
            class="block text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2"
            >Mental State</span
        >

        {#if state.user_context.mental_state}
            <span
                class="block text-base font-semibold text-slate-800 dark:text-slate-200"
            >
                {state.user_context.mental_state}
            </span>
        {:else}
            <span
                class="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-500 ring-1 ring-slate-500/10 ring-inset dark:bg-slate-800 dark:text-slate-400 dark:ring-slate-700"
            >
                Pending...
            </span>
        {/if}
    </div>

</div>
