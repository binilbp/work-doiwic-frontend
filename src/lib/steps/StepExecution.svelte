<script>
    let { appstate = {} } = $props();

    import { marked } from "marked";
    import { onMount } from "svelte";
    import DOMPurify from "dompurify";

    import { fetchExecutionPlan, previousStep } from "../helpers.svelte.js";

    let isLoading = $state(false);
    let displayMessage = $state("");
    let executionPlan = $state("");
    let isContextIncomplete = $derived(
        !appstate.user_context?.profile ||
            !appstate.user_context?.objectives ||
            !appstate.user_context?.current_state ||
            !appstate.user_context?.resources ||
            !appstate.user_context?.constraints,
    );

    async function generate_plan() {
        console.log("send execution plan request");
        isLoading = true;
        displayMessage = "";
        executionPlan = "";

        try {
            const data = await fetchExecutionPlan();
            displayMessage = data.reply_text;
            const rawMarkdown = data.execution_plan;
            const markdown = await marked.parse(rawMarkdown);
            executionPlan = DOMPurify.sanitize(markdown);
        } catch (error) {
            displayMessage = "Please try again. Connection failed";
        } finally {
            isLoading = false;
        }
    }
</script>

<div
    class="flex min-h-96 w-full flex-col items-center justify-between rounded-3xl border border-white/70 bg-white/80 p-6 text-center shadow-2xl shadow-slate-200/70 backdrop-blur-xl sm:p-10 max-w-xl"
>
    <h2 class="text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl">
        Execution Plan
    </h2>
    <p class="max-w-md text-base leading-7 text-slate-600">
        Click generate to get the execution plan
    </p>
    {#if isContextIncomplete}
        <p
            class="rounded-2xl bg-amber-50 px-4 py-3 text-sm font-medium text-amber-700"
        >
            Please complete all previous steps first
        </p>
    {:else}
        <button
            onclick={generate_plan}
            class="rounded-full bg-gradient-to-r from-indigo-500 to-sky-400 px-10 py-3 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:shadow-xl"
        >
            Generate
        </button>
    {/if}

    <div class="flex min-h-8 items-center justify-center">
        {#if isLoading}
            <p class="animate-pulse text-sm font-medium leading-6 text-indigo-600">
                AI is thinking...
            </p>
        {:else if displayMessage}
            <div>
                <p class="px-4 text-center text-sm font-medium leading-6 text-indigo-600">
                    {displayMessage}
                </p>
                <p class="px-4 text-center text-sm leading-6 text-slate-700">
                    {@html executionPlan}
                </p>
            </div>
        {/if}
    </div>
    <div class="my-2 flex w-full flex-row justify-start">
        <button
            class="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
            onclick={previousStep}
        >
            Previous
        </button>
    </div>
</div>
