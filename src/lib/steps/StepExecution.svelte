<script>
    let { appstate = {} } = $props();

    import { fetchExecutionPlan, previousStep } from '../helpers.svelte.js'

    let isLoading = $state(false);
    let displayMessage = $state("");
    let executionPlan = $state("");
    let isContextIncomplete = $derived(
        !appstate.user_context?.profile ||
        !appstate.user_context?.objectives ||
        !appstate.user_context?.current_state ||
        !appstate.user_context?.resources ||
        !appstate.user_context?.constraints
    );

    async function generate_plan() {
        console.log("send execution plan request");
        isLoading = true;
        displayMessage = "";
        executionPlan = "";

        try {
            const data = await fetchExecutionPlan();
            displayMessage = data.reply_text;
            executionPlan = data.execution_plan;

        } catch (error) {
            displayMessage = "Please try again. Connection failed"; 
        } finally {
            isLoading = false;
        }    
    }

</script>

<div class="flex flex-col justify-between items-center">
    <h2 class="text-xl">Execution Plan</h2>
    <p class="text-md">Click generate to get the execution plan</p>
    {#if isContextIncomplete}
        <p> Please complete all other steps</p>
    {:else }
        <button 
            onclick={generate_plan}
            class="rounded-lg px-12 py-3 border text-black"
        >
            Generate 
        </button>
    {/if}

    <div class="h-8 flex items-center justify-center">
        {#if isLoading}
            <p class="text-blue-500 animate-pulse text-sm">AI is thinking...</p>
        {:else if displayMessage}
            <p class="text-blue-500 text-md text-center px-4">{displayMessage}</p>
            <p class="text-blue-500 text-md text-center px-4">{executionPlan}</p>
        {/if}
        
    </div> 
    <div class="flex flex-row justify-between my-2">
    <button 
        class="px-4 py-3 rounded-lg text-black border"
        onclick = {previousStep}>
            Previous
    </button>
    </div>

</div>
