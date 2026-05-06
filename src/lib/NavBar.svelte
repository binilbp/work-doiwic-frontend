<script>
    import { RefreshCw } from 'lucide-svelte';
</script>
<div class = "flex justify-around items-center bg-transparent py-8 border-dashed border-b-2 border-orange-200">
    <h1 class="text-3xl font-bold text-slate-900 ">
        withClarity.
    </h1>
    <button 
    class="text-white px-3 py-2 font-semibold bg-slate-800 rounded-full flex justify-around items-center gap-2 hover:bg-amber-600 hover:shadow-md" 
    >
        <RefreshCw size={20} class="m-0" />
        <p class="text-center">Reload</p> 
    </button>
</div>
