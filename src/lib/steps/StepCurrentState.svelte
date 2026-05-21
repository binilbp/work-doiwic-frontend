<script>
    import InputBox from '../InputBox.svelte'
    import { updateUserContext, fetchAndSummarize } from '../helpers.svelte.js'

    let isLoading = $state(false);
    let displayMessage = $state("");

    async function handleInput(userInput) {
        isLoading = true;
        displayMessage = "";
        try {
            const data = await fetchAndSummarize("current_state", userInput);
            if (data.insufficient_info) {
                displayMessage = data.reply_text;
            } else {
                updateUserContext("current_state", data.current_state);
                displayMessage = `Current State set to ${data.current_state}` ;
            }

        } catch (error) {
            displayMessage = "Please try again. Connection failed"; 
        } finally {
            isLoading = false;
        }    
    }

</script>

<div class="flex flex-col justify-between items-center">
    <h2 class="text-xl">Current State Page</h2>
    <p class="text-md">Please explain your current state or progress in brief</p>
    
    <div class="h-8 flex items-center justify-center">
        {#if isLoading}
            <p class="text-blue-500 animate-pulse text-sm">AI is thinking...</p>
        {:else if displayMessage}
            <p class="text-blue-500 text-md text-center px-4">{displayMessage}</p>
        {/if}
    </div> 
    <InputBox onSend={handleInput} placeholder="I want to.." />
</div>
