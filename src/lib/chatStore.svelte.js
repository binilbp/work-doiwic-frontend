
export const appState = $state({
    chatHistory: [],
    userContext: {},
    activeSuggestions: [],
    isLoading: false
});

export async function sendMessage(userText) {
    appState.chatHistory.push({ role: "user", content: userText });
    appState.activeSuggestions = [];

    appState.isLoading = true;
    try {
        const response = await fetch("http://localhost:8000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                history: appState.chatHistory,
                current_context: appState.userContext
            })
        });

        if (!response.ok) throw new Error("Network error");
        
        const aiData = await response.json();
        
        appState.chatHistory.push({ role: "assistant", content: aiData.reply_text });
        
        appState.userContext = { ...appState.userContext, ...aiData.extracted_context };
        appState.activeSuggestions = aiData.suggestion_bubbles;

    } catch (error) {
        console.error("Error:", error);
        appState.chatHistory.push({ role: "assistant", content: "Sorry, I ran into a connection issue. Please try again" });
    } finally {
        appState.isLoading = false; 
    }
}

export function resetChat() {
    appState.chatHistory = []; 
    appState.userContext = {};
    appState.activeSuggestions = [];
    appSate.isLoading = false
}
