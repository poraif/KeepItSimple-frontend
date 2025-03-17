<script lang="ts">
	import { goto } from '$app/navigation';
    import { authToken, termStore } from '$lib/stores';
    import type { TermAndCurrentVersion } from '$lib/entity-types';
    import { apiService } from '$lib/services/api-service';

    let searchTerm = $state("");
    let token = $state("");
    authToken.subscribe((t) => (token = t));

    const doSearch = async (): Promise<void> => {
        try {
        const searchResult = await apiService.search(searchTerm);
        if (searchResult)  {
            termStore.set(searchResult);
            goto(`/term/${searchResult.name}`);
        }
        } catch (error) {
            console.error("Search failed:", error);
        }
    };

  </script>
  
  <div class="flex justify-center mt-6">
    <input bind:value={searchTerm} class="border p-2 w-96" placeholder="Enter a programming term or phrase" />
    <button onclick={doSearch} class="px-4 py-2 bg-blue-500 text-white">Search</button>
    {#if token}
    <button onclick={() => goto('/add')} class="px-4 py-2 bg-green-500 text-white">Add Term</button>
    {/if}
  </div>