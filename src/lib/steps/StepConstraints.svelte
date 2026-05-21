<script>
    import InputBox from '../InputBox.svelte'
    import { updateUserContext, fetchAndSummarize, nextStep, previousStep } from '../helpers.svelte.js'

    let isLoading = $state(false);
    let displayMessage = $state("");

    async function handleInput(userInput) {
        isLoading = true;
        displayMessage = "";
        try {
            const data = await fetchAndSummarize("constraints", userInput);
            if (data.insufficient_info) {
                displayMessage = data.reply_text;
            } else {
                updateUserContext("constraints", data.constraints);
                displayMessage = `Constraints set to ${data.constraints}` ;
            }

        } catch (error) {
            displayMessage = "Please try again. Connection failed"; 
        } finally {
            isLoading = false;
        }    
    }

</script>

<div class="flex flex-col justify-between items-center">
    <h2 class="text-xl">Constraints Page</h2>
    <p class="text-md">Please explain your constraints in brief</p>
    
    <div class="h-8 flex items-center justify-center">
        {#if isLoading}
            <p class="text-blue-500 animate-pulse text-sm">AI is thinking...</p>
        {:else if displayMessage}
            <p class="text-blue-500 text-md text-center px-4">{displayMessage}</p>
        {/if}
    </div> 
    <InputBox onSend={handleInput} placeholder="I can only ..." />
    <div clas="flex flex-row justify-between my-2">
        <button 
        class="px-4 py-3 rounded-lg text-black border"
        onclick = {previousStep}>
            Previous
        </button>
        <button 
        class="px-4 py-3 rounded-lg text-black border"
        onclick = {nextStep}>
            Next
        </button>

    </div>

</div>
