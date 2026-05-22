<script>
    import InputBox from "../InputBox.svelte";
    import {
        updateUserContext,
        fetchAndSummarize,
        nextStep,
        previousStep,
    } from "../helpers.svelte.js";

    let isLoading = $state(false);
    let displayMessage = $state("");

    async function handleInput(userInput) {
        isLoading = true;
        displayMessage = "";
        try {
            const data = await fetchAndSummarize("resources", userInput);
            if (data.insufficient_info) {
                displayMessage = data.reply_text;
            } else {
                updateUserContext("resources", data.resources);
                displayMessage = `Resources set to ${data.resources}`;
            }
        } catch (error) {
            displayMessage = "Please try again. Connection failed";
        } finally {
            isLoading = false;
        }
    }
</script>

<div
    class="flex w-full max-w-2xl flex-col min-h-[50rem] justify-between items-center gap-8 rounded-3xl border border-white/70 bg-white/80 p-6 text-center shadow-2xl shadow-slate-200/70 backdrop-blur-xl sm:p-12 dark:border-slate-700/50 dark:bg-slate-800/40 dark:shadow-none"
>
    <div class="space-y-3">
        <h2
            class="text-4xl font-extrabold leading-tight tracking-tighter text-slate-900 sm:text-5xl dark:text-white"
        >
            Resources
        </h2>
        <p
            class="mx-auto max-w-prose text-base leading-relaxed text-slate-500 dark:text-slate-400"
        >
            Please explain the resources you can use
        </p>
    </div>

    <div class="flex min-h-6 items-center justify-center">
        {#if isLoading}
            <p
                class="animate-pulse text-sm font-semibold tracking-wide text-indigo-500"
            >
                AI is thinking...
            </p>
        {:else if displayMessage}
            <p
                class="px-4 text-center text-sm font-medium leading-6 text-indigo-600 dark:text-indigo-400"
            >
                {displayMessage}
            </p>
        {/if}
    </div>

    <div class="w-full">
        <InputBox onSend={handleInput} placeholder="I can use ..." />
    </div>

    <div class="mt-4 flex w-full flex-row justify-between gap-4">
        <button
            class="rounded-full border border-slate-200 bg-white px-8 py-3.5 text-sm font-bold text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:bg-slate-700 dark:hover:text-white"
            onclick={previousStep}
        >
            Previous
        </button>
        <button
            class="rounded-full bg-slate-900 px-8 py-3.5 text-sm font-bold tracking-wide text-white shadow-lg shadow-slate-200 transition hover:-translate-y-0.5 hover:bg-indigo-600 hover:shadow-indigo-200 dark:bg-white dark:text-slate-900 dark:shadow-none dark:hover:bg-slate-200"
            onclick={nextStep}
        >
            Next
        </button>
    </div>
</div>
