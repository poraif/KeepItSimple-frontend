<script lang="ts">
import { termCollectionStore, usernameStore } from "$lib/stores";
import { apiService } from "$lib/services/api-service";
import { onMount } from "svelte";
import CollectionListCard from "./CollectionListCard.svelte";
import type { TermCollection } from "$lib/entity-types";
import Button from "$lib/ui/Button.svelte";
	import { goto } from "$app/navigation";

let username = $usernameStore

let collections: TermCollection[] = $state([]);

termCollectionStore.subscribe((value) => {
        collections = value;
    });

let editedName = $state("");
let editedDescription = $state("");

onMount(async () => {
        try {
            const collectionList = await apiService.getUserCollections();
            termCollectionStore.set(collectionList);
        } catch (error) {
            console.error("Error fetching collections:", error);
        }
});

const doAddCollection = async (): Promise<void> => {
    try {
        const termCollection: TermCollection = {
            name: editedName,
            description: editedDescription,
        };

        const success = await apiService.addCollection(termCollection);

        if (success) {
            console.log(`Collection ${editedName} added successfully`);
            editedName = "";
            editedDescription = "";
            termCollectionStore.update((collections) => [...collections, termCollection]);
            goto(`/profile`);
            }
         else {
            console.error("Collection was not added, so store not updated");
        }
    } catch (error) {
        console.error("Add failed:", error);
    }
};

</script>

<div class="w-2/3 mx-auto">
<h2 class="h3"> {username} dashboard</h2>
<hr class="hr border-dashed" />
<h3 class="h3">Collections</h3>
{#if collections.length > 0}
    {#each collections as collection}
        <CollectionListCard collectionName={collection.name} collectionDescription={collection.description} />
    {/each}
{/if}
    <div class="flex flex-col gap-2 mb-4 w-1/4">
        <input class="input" type="text" id="collectionName" bind:value={editedName} required>
        <input class="input" type="text" id="collectionDescription" bind:value={editedDescription} required>
        <Button text="Save" onClick={() => doAddCollection()} />
      </div>   
</div>