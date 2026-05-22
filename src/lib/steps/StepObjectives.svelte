<script>
    import InputBox from '../InputBox.svelte'
    import { updateUserContext, fetchAndSummarize, nextStep, previousStep } from '../helpers.svelte.js'

    let isLoading = $state(false);
    let displayMessage = $state("");

    async function handleInput(userInput) {
        isLoading = true;
        displayMessage = "";
        try {
            const data = await fetchAndSummarize("objectives", userInput);
            if (data.insufficient_info) {
                displayMessage = data.reply_text;
            } else {
                updateUserContext("objectives", data.objectives);
                displayMessage = `Objective set to ${data.objectives}` ;
            }

        } catch (error) {
            displayMessage = "Please try again. Connection failed"; 
        } finally {
            isLoading = false;
        }    
    }

</script>

<div class="flex min-h-96 w-full flex-col items-center justify-between rounded-3xl border border-white/70 bg-white/80 p-6 text-center shadow-2xl shadow-slate-200/70 backdrop-blur-xl sm:p-10 max-w-xl">
    <h2 class="text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl">Objectives</h2>
    <p class="max-w-md text-base leading-7 text-slate-600">Please explain your objective in brief</p>
    
    <div class="flex min-h-8 items-center justify-center">
        {#if isLoading}
            <p class="animate-pulse text-sm font-medium leading-6 text-indigo-600">AI is thinking...</p>
        {:else if displayMessage}
            <p class="px-4 text-center text-sm font-medium leading-6 text-indigo-600">{displayMessage}</p>
        {/if}
    </div> 
    <InputBox onSend={handleInput} placeholder="I want to.." />
    <div class="my-2 flex w-full flex-row justify-between gap-3">
        <button 
        class="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
        onclick = {previousStep}>
            Previous
        </button>
        <button 
        class="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-200 transition hover:-translate-y-0.5 hover:bg-indigo-600"
        onclick = {nextStep}>
            Next
        </button>

    </div>
</div>
