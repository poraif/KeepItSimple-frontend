<script lang="ts">
    import CircleMinus from '@lucide/svelte/icons/circle-minus';   
	import { apiService } from '$lib/services/api-service';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
  
    let { termName } = $props();

    const collectionName = $derived(page.params.id);


    const doRemove = async (): Promise<void> => {
        try {
                await apiService.removeTermFromCollection(termName, collectionName);
                console.log(`Term ${termName} removed from collection`);
                goto(`/profile/collection/${collectionName}`);

        } catch (error) {
            console.error("Remove failed:", error);
        }
    };


</script>


<div class="flex flex-col mb-4">
<div class="flex justify-between items-start">
    <a href={`/term/${termName}`} class="text-left">
        <h4 class="text-2xl font-semibold">{termName}</h4>
    </a>
    <div class="flex gap-2">
        <button onclick={doRemove}><CircleMinus size={20} /></button>
        </div>
    </div>
</div>




