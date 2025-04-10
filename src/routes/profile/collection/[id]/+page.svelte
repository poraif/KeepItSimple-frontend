<script lang="ts">
    import { TermsInCollectionStore, toaster } from "$lib/stores";
    import { apiService } from "$lib/services/api-service";
    import { onMount } from "svelte";
    import type { Term } from "$lib/entity-types";
    import Button from "$lib/ui/Button.svelte";
        import { goto } from "$app/navigation";
	import { page } from "$app/state";
	import TermListCard from "./TermListCard.svelte";

    const collectionName = $derived(page.params.id);
    
    let collectionTerms: Term[] = $state([]);
    
    TermsInCollectionStore.subscribe((value) => {
        collectionTerms = value;
        });

    let termName = $state("");
    
    onMount(async () => {
            try {
                const termsInCollectionsList = await apiService.getCollectionTerms(collectionName);
                    TermsInCollectionStore.set(termsInCollectionsList);
            } catch (error) {
                console.error("Error fetching collection terms:", error);
            }
    });
    
    const doAddTermToCollection = async (): Promise<void> => {
        try {
            const termAndCat = await apiService.getTerm(termName);
            const success = await apiService.addTermtoCollection(termName, collectionName);
            if (success) {
                console.log(`${termName} added to collection successfully`);
                toaster.success({ title: 'Term added to collection' });
                termName = "";
                TermsInCollectionStore.update((collectionTerms) => [...collectionTerms, termAndCat]);
                goto(`/profile/collection/${collectionName}`);
                }
             else {
                toaster.error({ title: 'Term doesnt exist or already in collection' });
            }
        } catch (error) {
            console.error("Add failed:", error);
        }
    };
    
    </script>
    
    <div class="w-2/3 mx-auto">
    <h2 class="h3"> {collectionName} collection</h2>
    <hr class="hr border-dashed" />
    {#if collectionTerms.length > 0}
        {#each collectionTerms as collectionTerm}
            <TermListCard termName={collectionTerm.name} />
        {/each}
    {/if}
        <div class="flex flex-col gap-2 mb-4 w-1/4">
            <input class="input" type="text" id="termName" bind:value={termName} required>
            <Button text="Save" onClick={() => doAddTermToCollection()} />
          </div>   
    </div>