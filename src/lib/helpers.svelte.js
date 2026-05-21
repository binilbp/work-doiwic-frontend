export const buttonArray = $state([
    { id: ' 1', label:'Profile', onclick: () => appState.currentStep = 1 },
    { id: ' 2', label:'Objective', onclick: () => appState.currentStep = 2 },
    { id: ' 3', label:'Current State', onclick: () => appState.currentStep = 3 },
    { id: ' 4', label:'Resources', onclick: () => appState.currentStep = 4 },
    { id: ' 5', label:'Constraints', onclick: () => appState.currentStep = 6 },
    { id: ' 6', label:'Execution Plan', onclick: () => appState.currentStep = 8 },
]);

export const appState = $state({
    currentStep: 1,
    user_context: {
        profile: "",
        objectives: "",
        current_state: "",
        resources: "",
        constraints: "",
    },
});


export function updateUserContext(key, value) {
    appState.user_context[key] = value;
    console.log("User context updated");
    console.log(appState.user_context);
};


export async function fetchAndSummarize(endpoint, userInput) {
    if (!userInput.trim()) return null;

    if (endpoint === "role") {
        const response = await fetch(`http://localhost:8000/profile`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ input: userInput.trim() })
        });

        if (!response.ok) {
            throw new Error("A network or server error occurred.");
        }

        return await response.json(); 
        console.log("Recieved response");


    }
    else {
        const response = await fetch(`http://localhost:8000/${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ input: userInput.trim(), user_info: appState.user_context })
        });

        if (!response.ok) {
            throw new Error("A network or server error occurred.");
        }

        return await response.json(); 
        console.log("Recieved response");
    }

}

