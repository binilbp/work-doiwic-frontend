<script>
    let nav
    import NavBar from './lib/NavBar.svelte';
    import ChatCard from './lib/ChatCard.svelte';
    import ClarityBox from './lib/ClarityBox.svelte';
    let role = "assistant";
    let content = "hello from ai";

</script>
<main class="h-screen bg-orange-100"> 
    <NavBar/>

    <section class="flex justify-center gap-14">
        <ClarityBox/>
        <div class=" h-screen bg-slate-100 ">
            <ChatCard role='user', content='hello from user'/>
        </div>
        
    </section>
</main>
