<script>
    import InputBox from '../InputBox.svelte'
    import { updateUserContext, fetchAndSummarize } from '../helpers.svelte.js'

    function handleBtnInput(role_selected) {
        updateUserContext("role", role_selected); 
    }

    let isLoading = $state(false);
    let displayMessage = $state("");

    async function handleInput(userInput) {
        isLoading = true;
        displayMessage = "";
        try {
            const data = await fetchAndSummarize("role", userInput);
            if (data.insufficient_info) {
                displayMessage = data.reply_text;
            } else {
                updateUserContext("role", data.role);
                displayMessage = `Role set to ${data.role}` ;
            }

        } catch (error) {
            displayMessage = "Please try again. Connection failed"; 
        } finally {
            isLoading = false;
        }    
    }

</script>

<div class="flex flex-col justify-between items-center">
    <h2 class="text-xl">Role Page</h2>
    
    <div class="flex flex-col justify-between items-center gap-5">
        <button 
            onclick={() => handleBtnInput("Student")}
            class="rounded-lg px-12 py-3 border text-black"
        >
            Student 
        </button>

        <button 
            onclick={() => handleBtnInput("Founder")}
            class="rounded-lg px-12 py-3 border text-black"
        >
            Founder 
        </button>

        <button 
            onclick={() => handleBtnInput("Leader")}
            class="rounded-lg px-12 py-3 border text-black"
        >
            Leader 
        </button>

        <button 
            onclick={() => handleBtnInput("Creator")}
            class="rounded-lg px-12 py-3 border text-black"
        >
            Creator 
        </button>
    </div>
    
   <div class="h-8 flex items-center justify-center">
        {#if isLoading}
            <p class="text-blue-500 animate-pulse text-sm">AI is thinking...</p>
        {:else if displayMessage}
            <p class="text-blue-500 text-md text-center px-4">{displayMessage}</p>
        {/if}
    </div> 
    <InputBox onSend={handleInput} placeholder="Other roles" />
</div>
