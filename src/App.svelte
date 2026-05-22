<script>
    import { buttonArray, appState } from "./lib/helpers.svelte.js";
    import StepsNav from "./lib/StepsNav.svelte";
    import MainPanel from "./lib/MainPanel.svelte";
    import ContextPanel from "./lib/ContextPanel.svelte";
</script>

<main
    class="min-h-svh overflow-x-hidden font-sans antialiased selection:bg-indigo-500/30 selection:text-indigo-200 bg-slate-50 text-slate-600 dark:bg-slate-950 dark:text-slate-400"
>
    <section
        class="mx-auto flex min-h-svh w-full max-w-7xl flex-col items-start justify-center gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:gap-10 lg:py-12"
    >
        <StepsNav items={buttonArray} state={appState} />
        <MainPanel state={appState} />
        <ContextPanel state={appState} />
    </section>
</main>
