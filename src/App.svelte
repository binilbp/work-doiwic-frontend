<script>
    let nav
    import NavBar from './lib/NavBar.svelte';
    import ClarityBox from './lib/ClarityBox.svelte';
    import ChatBoard from './lib/ChatBoard.svelte';
    let role = "assistant";
    let content = "hello from ai";

</script>
<main class="h-svh bg-white-100"> 
    <NavBar/>

    <section class="flex justify-center gap-10 py-10">
        <ClarityBox/>
        <div class="h-screen border-dashed border-l-2 border-orange-200 "></div>
        <ChatBoard/>
        
    </section>
</main>
