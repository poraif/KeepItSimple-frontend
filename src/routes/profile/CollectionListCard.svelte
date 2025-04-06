<script lang="ts">
    import Pencil from '@lucide/svelte/icons/pencil';
    import Trash2 from '@lucide/svelte/icons/trash-2';
	import { apiService } from '$lib/services/api-service';
	import { goto } from '$app/navigation';
	import Button from '$lib/ui/Button.svelte';
    import type { TermCollection } from '$lib/entity-types';

    let { collectionName, collectionDescription } = $props();

    let updating = $state(false);
    let editedName = $state(collectionName);
	let editedDescription = $state(collectionDescription);


    const doDelete = async (): Promise<void> => {
        try {
                await apiService.deleteCollection(collectionName);
                console.log(`Collection ${collectionName} deleted successfully`);
                goto(`/profile`);

        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    const doPencilClick = () => {
		updating = true;
	};

    const doUpdateCollection = async (): Promise<void> => {
        try {
            const termCollection: TermCollection = {
                name: editedName,
                description: editedDescription,
            };
            await apiService.updateCollection(termCollection, collectionName);
            console.log(`Collection ${editedName} updated successfully`);
            goto(`/profile`);
            updating = false;
        } catch (error) {
            console.error("Update failed:", error);
        }
    };
    

</script>

{#if !updating}
<div class="flex flex-col mb-4">
<div class="flex justify-between items-start">
    <a href={`/profile/collection/${collectionName}`} class="text-left">
        <h4 class="text-2xl font-semibold">{collectionName}</h4>
    </a>
    <div class="flex gap-2">
        <button onclick={doPencilClick}><Pencil size={20} /></button>
        <button onclick={doDelete}><Trash2 size={20} /></button>
        </div>
    </div>
    <p class="text-gray-600 mt-1">{collectionDescription}</p>
</div>
{/if}
{#if updating}
<div class="flex flex-col gap-2 mb-4">
<input class="input" type="text" id="collectionName"  bind:value={editedName} required>
<input class="input" type="text" id="collectionDescription" bind:value={editedDescription} required>
<Button text="Save" onClick={() => doUpdateCollection()} />
</div>
{/if}


