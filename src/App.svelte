<script>
    // import NavBar from './lib/NavBar.svelte';
    // import ClarityBox from './lib/ClarityBox.svelte';
    // let role = "assistant";
    import {buttonArray, appState} from './lib/helpers.svelte.js'
    import StepsNav from './lib/StepsNav.svelte'
    import MainPanel from './lib/MainPanel.svelte'
    import ContextPanel from './lib/ContextPanel.svelte'


</script>
<main class="min-h-svh overflow-x-hidden bg-gradient-to-br from-sky-50 via-white to-indigo-50 font-sans text-slate-950 antialiased"> 

    <section class="mx-auto flex min-h-svh w-full max-w-7xl flex-col items-stretch justify-center gap-5 px-4 py-6 sm:px-6 lg:flex-row lg:gap-8 lg:py-10">
        <StepsNav items = {buttonArray} state = {appState} />
        <MainPanel state = {appState}/>
        <ContextPanel state = {appState} />
    </section>
</main>
