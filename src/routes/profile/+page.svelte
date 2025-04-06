<script lang="ts">
import { termCollectionStore, usernameStore } from "$lib/stores";
import { apiService } from "$lib/services/api-service";
import { onMount } from "svelte";
import CollectionListCard from "./CollectionListCard.svelte";
import { goto } from "$app/navigation";
import type { TermCollection } from "$lib/entity-types";
import { authToken } from "$lib/stores";
	import { on } from "svelte/events";
	import Button from "$lib/ui/Button.svelte";

let username = $usernameStore

let collections = $termCollectionStore;

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
        await apiService.addCollection(termCollection);
        console.log(`Collection ${editedName} added successfully`);
        editedName = "";
        editedDescription = "";
        termCollectionStore.update((collections) => [...collections, termCollection]);
    } catch (error) {
        console.error("Add failed:", error);
    }
};

</script>

<h2 class="h2"> {username} dashboard</h2>
<hr class="hr border-dashed" />
<h3 class="h3">Collections</h3>

{#if collections.length > 0}
    {#each collections as collection}
        <CollectionListCard collectionName={collection.name} collectionDescription={collection.description} />
    {/each}
    <div class="flex flex-col gap-2 mb-4 w-1/4">
        <input class="input" type="text" id="collectionName" bind:value={editedName} required>
        <input class="input" type="text" id="collectionDescription" bind:value={editedDescription} required>
        <Button text="Save" onClick={() => doAddCollection()} />
      </div>   
{:else}
    <div class="flex flex-col gap-2 mb-4 w-1/4">
        <input class="input" type="text" id="collectionName" bind:value={editedName} required>
        <input class="input" type="text" id="collectionDescription" bind:value={editedDescription} required>
        <Button text="Save" onClick={() => doAddCollection()} />
      </div>   
{/if}