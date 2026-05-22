<script>
    let { state = {} } = $props();
</script>

<div class="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-2xl shadow-slate-200/70 backdrop-blur-xl lg:w-80">
    <h4 class="mb-4 border-b border-slate-100 pb-3 text-sm font-medium leading-6 text-slate-600">
        Profile : {state.user_context.profile}
    </h4>
    <h4 class="mb-4 border-b border-slate-100 pb-3 text-sm font-medium leading-6 text-slate-600">
        Objectives : {state.user_context.objectives}
    </h4>
    <h4 class="mb-4 border-b border-slate-100 pb-3 text-sm font-medium leading-6 text-slate-600">
        CurrentState : {state.user_context.current_state}
    </h4>
    <h4 class="mb-4 border-b border-slate-100 pb-3 text-sm font-medium leading-6 text-slate-600">
        Resources : {state.user_context.resources}
    </h4>
    <h4 class="text-sm font-medium leading-6 text-slate-600">
        Constraints : {state.user_context.constraints}
    </h4>
</div>
