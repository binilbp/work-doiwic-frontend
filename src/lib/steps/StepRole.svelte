<script>
    import InputBox from '../InputBox.svelte'
    import { updateUserContext } from '../data.svelte.js'

    function handleBtnInput(role_selected) {
        updateUserContext("role", role_selected); 
    }

    function getRole(message_to_send) {
        
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
    
    <InputBox onSend={getRole} placeholder="Other roles" />
</div>
