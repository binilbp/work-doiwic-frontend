<script>
    let { state = {} } = $props();
</script>

<div class = "p-4">
    <h4>
        Profile : {state.user_context.profile}
    </h4>
    <h4>
        Objectives : {state.user_context.objectives}
    </h4>
    <h4>
        CurrentState : {state.user_context.current_state}
    </h4>
    <h4>
        Resources : {state.user_context.resources}
    </h4>
    <h4>
        Constraints : {state.user_context.constraints}
    </h4>
</div>
