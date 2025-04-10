<script lang="ts">
    import { goto } from '$app/navigation';
    import { authToken, currentTermStore, toaster } from '$lib/stores';
    import { apiService } from '$lib/services/api-service';

    let searchTerm = $state("");
    let token = $state("");

    authToken.subscribe((value) => {
        token = value;
    });

    const doSearch = async (): Promise<void> => {
        toaster.info({ title: 'Generating term...' });
        try {
            const searchResult = await apiService.search(searchTerm);
            if (searchResult === null) {
                toaster.error({ title: 'Not a programming term! Rephrase?' });
                searchTerm = "";
            } else {
                toaster.success({ title: 'Term found' });
                currentTermStore.set(searchResult);
                goto(`/term/${searchResult.name}`);
            }
        } catch (error) {
            console.error("Search failed:", error);
        }
    };

    const doAdd = async (): Promise<void> => {
        if (searchTerm === "") {
            toaster.error({ title: 'Please enter a term to add' });
            return;
        } else {
            goto(`/term/${searchTerm}/add`);
        }
    };
</script>

<div class="flex justify-center mt-6">
    <input bind:value={searchTerm} class="border p-2 w-96" placeholder="Enter a programming term or phrase" />
    <button onclick={doSearch} class="px-4 py-2 bg-blue-500 text-white">Search</button>
    {#if token}
        <button onclick={doAdd} class="px-4 py-2 bg-green-500 text-white">Add Term</button>
    {/if}
</div>
