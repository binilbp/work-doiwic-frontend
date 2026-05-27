export const buttonArray = $state([
    { id: ' 1', label:'Profile', onclick: () => appState.currentStep = 1 },
    { id: ' 2', label:'Objective', onclick: () => appState.currentStep = 2 },
    { id: ' 3', label:'Current State', onclick: () => appState.currentStep = 3 },
    { id: ' 4', label:'Resources', onclick: () => appState.currentStep = 4 },
    { id: ' 5', label:'Constraints', onclick: () => appState.currentStep = 5 },
    { id: ' 6', label:'Feelings', onclick: () => appState.currentStep = 6 },
    { id: ' 7', label:'Execution Plan', onclick: () => appState.currentStep = 7 },
]);

export const appState = $state({
    currentStep: 1,
    user_context: {
        profile: null,
        objectives: null,
        current_state: null,
        resources: null,
        constraints: null,
        mental_state: null,
    },
    raw_user_input: {
        profile: null,
        objectives: null,
        current_state: null,
        resources: null,
        constraints: null,
    }
});



export function updateUserContext(key, value) {
    appState.user_context[key] = value;
    console.log("User Context updated -> ",
        "Profile:", appState.user_context.profile,
        "Objectives:", appState.user_context.objectives,
        "Current State:", appState.user_context.current_state,
        "Resources:", appState.user_context.resources,
        "Constraints:", appState.user_context.constraints,
        "Mental State:", appState.user_context.mental_state,
    );

};

export function updateRawUserInput(key, value) {
    appState.raw_user_input[key] = value;
    console.log("Raw User Input updated -> ",
        "Profile:", appState.raw_user_input.profile,
        "Objectives:", appState.raw_user_input.objectives,
        "Current State:", appState.raw_user_input.current_state,
        "Resources:", appState.raw_user_input.resources,
        "Constraints:", appState.raw_user_input.constraints);
}

export function nextStep() {
    if (appState.currentStep < 7 ){
        appState.currentStep = appState.currentStep + 1;
    }
}

export function previousStep() {
    if (appState.currentStep > 1 ){
        appState.currentStep = appState.currentStep - 1;
    }
}

export async function fetchAndSummarize(endpoint, userInput) {
    console.log("Sending Fetch Request to /",{endpoint});
    if (!userInput.trim()) return null;
    const response = await fetch(`http://localhost:8000/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: userInput.trim(), user_info: appState.user_context })
    });

    if (!response.ok) {
        throw new Error("A network or server error occurred.");
    }

    console.log("Recieved response");
    return await response.json(); 

}

export async function fetchMotivationClassification(userInput) {
    console.log("Sending Fetch Request to /motivation");
    const response = await fetch(`http://localhost:8000/motivation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_input: userInput })
    });

    if (!response.ok) {
        throw new Error("A network or server error occurred.");
    }

    console.log("Recieved response");
    return await response.json(); 
}

export async function fetchExecutionPlan() {
        const response = await fetch(`http://localhost:8000/execution`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_info: appState.user_context, raw_user_input: appState.raw_user_input })
        });

        if (!response.ok) {
            throw new Error("A network or server error occurred.");
        }

        console.log("Recieved response");
        return await response.json(); 
}


