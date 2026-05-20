export const buttonArray = $state([
    { id: ' 1', label:'Role', onclick: () => appState.currentStep = 1 },
    { id: ' 2', label:'Context', onclick: () => appState.currentStep = 2 },
    { id: ' 3', label:'Goal', onclick: () => appState.currentStep = 3 },
    { id: ' 4', label:'Current Position', onclick: () => appState.currentStep = 4 },
    { id: ' 5', label:'Resources', onclick: () => appState.currentStep = 5 },
    { id: ' 6', label:'Constraints', onclick: () => appState.currentStep = 6 },
    { id: ' 7', label:'Friction', onclick: () => appState.currentStep = 7 },
    { id: ' 8', label:'Execution Plan', onclick: () => appState.currentStep = 8 },
]);

export const appState = $state({
    currentStep: 1,
    user_context: {
        role: "",
        context: "",
        position: "",
        resources: "",
        constraints: "",
        friction: "",
    },
});


export function updateUserContext(key, value) {
    appState.user_context[key] = value;
    console.log("User context updated");
    console.log(appState.user_context);
};


export async function fetchAndSummarize(endpoint, userInput) {
    if (!userInput.trim()) return null;

    const response = await fetch(`http://localhost:8000/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: userInput.trim() })
    });

    if (!response.ok) {
        throw new Error("A network or server error occurred.");
    }

    return await response.json(); 
}

