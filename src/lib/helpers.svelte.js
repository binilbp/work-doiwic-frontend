export const buttonArray = $state([
    { id: ' 1', label:'Profile', onclick: () => appState.currentStep = 1 },
    { id: ' 2', label:'Objective', onclick: () => appState.currentStep = 2 },
    { id: ' 3', label:'Current State', onclick: () => appState.currentStep = 3 },
    { id: ' 4', label:'Resources', onclick: () => appState.currentStep = 4 },
    { id: ' 5', label:'Constraints', onclick: () => appState.currentStep = 5 },
    { id: ' 6', label:'Execution Plan', onclick: () => appState.currentStep = 6 },
]);

export const appState = $state({
    currentStep: 1,
    user_context: {
        profile: null,
        objectives: null,
        current_state: null,
        resources: null,
        constraints: null,
    },
});



export function updateUserContext(key, value) {
    appState.user_context[key] = value;
    console.log("User context updated");
    console.log(appState.user_context);
};

export function nextStep() {
    if (appState.currentStep < 6 ){
        appState.currentStep = appState.currentStep + 1;
    }
}

export function previousStep() {
    if (appState.currentStep > 1 ){
        appState.currentStep = appState.currentStep - 1;
    }
}

export async function fetchAndSummarize(endpoint, userInput) {
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

export async function fetchExecutionPlan() {
        const response = await fetch(`http://localhost:8000/execution`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_info: appState.user_context })
        });

        if (!response.ok) {
            throw new Error("A network or server error occurred.");
        }

        console.log("Recieved response");
        return await response.json(); 
}


