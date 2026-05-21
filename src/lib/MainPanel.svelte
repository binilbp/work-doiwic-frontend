<script>
    let { state = {} } = $props();
    import StepProfile from './steps/StepProfile.svelte'
    import StepContext from './steps/StepContext.svelte'
    import StepGoal from './steps/StepGoal.svelte'
    import StepCurrentPos from './steps/StepCurrentPos.svelte'
    import StepResources from './steps/StepResources.svelte'
    import StepConstraints from './steps/StepConstraints.svelte'
    import StepFriction from './steps/StepFriction.svelte'
    import StepExecution from './steps/StepExecution.svelte'
</script>

{#if state.currentStep === 1}
    <StepProfile/>

{:else if state.currentStep === 2}
    <StepContext/>

{:else if state.currentStep === 3}
    <StepGoal/>

{:else if state.currentStep === 4}
    <StepCurrentPos/>

{:else if state.currentStep === 5}
    <StepResources/>

{:else if state.currentStep === 6}
    <StepConstraints/>

{:else if state.currentStep === 7}
    <StepFriction/>

{:else if state.currentStep === 8}
    <StepExecution/>

{:else}
    <p class="text-black">Press next to get started</p>
{/if}
