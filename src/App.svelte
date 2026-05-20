<script>
    // import NavBar from './lib/NavBar.svelte';
    // import ClarityBox from './lib/ClarityBox.svelte';
    // let role = "assistant";
    import {buttonArray, appState} from './lib/helpers.svelte.js'
    import StepsNav from './lib/StepsNav.svelte'
    import MainPanel from './lib/MainPanel.svelte'


</script>
<main class="h-svh bg-white-100"> 

    <section class="flex justify-center gap-10 py-10">
        <StepsNav items = {buttonArray} state = {appState} />
    <!--     <ClarityBox/> -->
    <!--     <div class="h-screen border-dashed border-l-2 border-orange-200 "></div> -->
    <!--     <ChatBoard/> -->
    <!---->
        <MainPanel state={appState}/>
    </section>
</main>
