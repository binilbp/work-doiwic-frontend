<script>
    import InputBox from '../InputBox.svelte'
    import { updateUserContext, fetchAndSummarize, nextStep } from '../helpers.svelte.js'

    function handleBtnInput(role_selected) {
        updateUserContext("profile", role_selected); 
    }

    let isLoading = $state(false);
    let displayMessage = $state("");

    async function handleInput(userInput) {
        isLoading = true;
        displayMessage = "";
        try {
            const data = await fetchAndSummarize("profile", userInput);
            if (data.insufficient_info) {
                displayMessage = data.reply_text;
            } else {
                updateUserContext("profile", data.profile);
                displayMessage = `Profile set to ${data.profile}` ;
            }

        } catch (error) {
            displayMessage = "Please try again. Connection failed"; 
        } finally {
            isLoading = false;
        }    
    }

</script>

<div class="flex min-h-96 w-full flex-col items-center justify-between rounded-3xl border border-white/70 bg-white/80 p-6 text-center shadow-2xl shadow-slate-200/70 backdrop-blur-xl sm:p-10 max-w-xl">
    <h2 class="text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl">Profile</h2>
    
    <div class="grid w-full max-w-md grid-cols-1 gap-3 sm:grid-cols-2">
        <button 
            onclick={() => handleBtnInput("Student")}
            class="rounded-2xl border border-slate-200 bg-white px-10 py-4 font-semibold text-slate-800 shadow-sm shadow-slate-100 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 hover:shadow-md"
        >
            Student 
        </button>

        <button 
            onclick={() => handleBtnInput("Founder")}
            class="rounded-2xl border border-slate-200 bg-white px-10 py-4 font-semibold text-slate-800 shadow-sm shadow-slate-100 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 hover:shadow-md"
        >
            Founder 
        </button>

        <button 
            onclick={() => handleBtnInput("Leader")}
            class="rounded-2xl border border-slate-200 bg-white px-10 py-4 font-semibold text-slate-800 shadow-sm shadow-slate-100 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 hover:shadow-md"
        >
            Leader 
        </button>

        <button 
            onclick={() => handleBtnInput("Creator")}
            class="rounded-2xl border border-slate-200 bg-white px-10 py-4 font-semibold text-slate-800 shadow-sm shadow-slate-100 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 hover:shadow-md"
        >
            Creator 
        </button>
    </div>
    
   <div class="flex min-h-8 items-center justify-center">
        {#if isLoading}
            <p class="animate-pulse text-sm font-medium leading-6 text-indigo-600">AI is thinking...</p>
        {:else if displayMessage}
            <p class="px-4 text-center text-sm font-medium leading-6 text-indigo-600">{displayMessage}</p>
        {/if}
    </div> 
    <InputBox onSend={handleInput} placeholder="I am a ..." />

    <div class="my-2 flex w-full flex-row justify-end">
        <button 
        class="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-200 transition hover:-translate-y-0.5 hover:bg-indigo-600"
        onclick = {nextStep}>
            Next
        </button>
    </div>
</div>
