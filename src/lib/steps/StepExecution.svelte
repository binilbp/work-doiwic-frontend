<script>
    let { appstate = {} } = $props();

    import { marked } from "marked";
    import DOMPurify from "dompurify";
    import { fetchExecutionPlan, updateUserContext, previousStep } from "../helpers.svelte.js";

    let isLoading = $state(false);
    let displayMessage = $state("");
    let executionPlan = $state("");

    let isContextIncomplete = $derived(
        !appstate.user_context?.profile ||
        !appstate.user_context?.objectives ||
        !appstate.user_context?.current_state ||
        !appstate.user_context?.resources ||
        !appstate.user_context?.constraints ||
        !appstate.user_context?.mental_state,
    );

    async function generate_plan() {
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
            console.error("Failed to generate plan:", error);
            displayMessage = "Please try again. Connection failed.";
        } finally {
            isLoading = false; // Ensures loading state is cleared whether successful or not
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
            Execution Plan
        </h2>
        <p
            class="mx-auto max-w-prose text-base leading-relaxed text-slate-500 dark:text-slate-400"
        >
            Click generate to get the execution plan
        </p>
    </div>

    {#if isContextIncomplete}
        <p
            class="rounded-2xl bg-amber-50 px-6 py-4 text-sm font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
        >
            Please complete all previous steps first
        </p>
    {:else}
        <button
            onclick={generate_plan}
            disabled={isLoading}
            class="rounded-full bg-gradient-to-r from-indigo-500 to-sky-400 px-10 py-3.5 font-bold tracking-wide text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:shadow-xl dark:shadow-none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
            Generate
        </button>
    {/if}

    <div class="flex min-h-8 w-full flex-col items-center justify-center">
        {#if isLoading}
            <p
                class="animate-pulse text-sm font-semibold tracking-wide text-indigo-500"
            >
                AI is thinking...
            </p>
        {:else if displayMessage}
            <div class="w-full">
                <p
                    class="mb-4 px-4 text-center text-sm font-medium leading-6 text-indigo-600 dark:text-indigo-400"
                >
                    {displayMessage}
                </p>
                {#if executionPlan}
                    <div
                        class="prose prose-sm sm:prose-base lg:prose-lg prose-slate prose-indigo mx-auto max-h-[500px] w-full max-w-none overflow-y-auto rounded-2xl border border-slate-200/60 bg-slate-50/50 p-6 text-left shadow-inner prose-headings:font-bold prose-headings:tracking-tight prose-a:font-semibold dark:prose-invert dark:border-slate-700/50 dark:bg-slate-900/50"
                    >
                        {@html executionPlan}
                    </div>
                {/if}
            </div>
        {/if}
    </div>

    <div class="mt-4 flex w-full flex-row justify-start gap-4">
        <button
            class="rounded-full border border-slate-200 bg-white px-8 py-3.5 text-sm font-bold text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:bg-slate-700 dark:hover:text-white"
            onclick={previousStep}
        >
            Previous
        </button>
    </div>
</div>
