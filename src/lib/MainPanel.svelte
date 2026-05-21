<script>
    let { state = {} } = $props();
    import StepProfile from './steps/StepProfile.svelte'
    import StepObjectives from './steps/StepObjectives.svelte'
    import StepCurrentState from './steps/StepCurrentState.svelte'
    import StepResources from './steps/StepResources.svelte'
    import StepConstraints from './steps/StepConstraints.svelte'
    import StepExecution from './steps/StepExecution.svelte'
</script>

{#if state.currentStep === 1}
    <StepProfile/>

{:else if state.currentStep === 2}
    <StepObjectives/>

{:else if state.currentStep === 3}
    <StepCurrentState/>

{:else if state.currentStep === 4}
    <StepResources/>

{:else if state.currentStep === 5}
    <StepConstraints/>

{:else if state.currentStep === 6}
    <StepExecution appstate = {state}/>

{:else}
    <p class="text-black">Press next to get started</p>
{/if}
