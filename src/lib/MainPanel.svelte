<script>
    let { state = {} } = $props();
    import StepProfile from './steps/StepProfile.svelte'
    import StepObjectives from './steps/StepObjectives.svelte'
    import StepCurrentState from './steps/StepCurrentState.svelte'
    import StepResources from './steps/StepResources.svelte'
    import StepConstraints from './steps/StepConstraints.svelte'
    import StepFeelings from './steps/StepFeelings.svelte'
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
    <StepFeelings appstate = {state}/>

{:else if state.currentStep === 7}
    <StepExecution appstate = {state}/>

{:else}
    <p class="rounded-3xl border border-white/70 bg-white/80 p-8 text-center text-base font-medium leading-7 text-slate-700 shadow-2xl shadow-slate-200/70 backdrop-blur-xl">Press next to get started</p>
{/if}
