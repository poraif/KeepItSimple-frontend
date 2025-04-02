<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
	import type { TermAndCurrentVersion } from '$lib/entity-types';
    import { currentTermStore, termStore } from '$lib/stores';
    import { apiService } from '$lib/services/api-service';
    import TermCodeSnippet from '$lib/ui/TermCodeSnippet.svelte';
    import TermContentCard from '$lib/ui/TermContentCard.svelte';
    import TermNameCatCards from '$lib/ui/TermNameCatCards.svelte';
    import "svelte-highlight/styles/a11y-dark.css";
    import { HighlightAuto } from "svelte-highlight";

    let term = $state<TermAndCurrentVersion | null>(null);

    currentTermStore.subscribe((value) => {
        term = value;
    });

    let code = $state("");
    let shortDef = $state("");

    // onMount(async () => {
    //     if (!term) {
    //         const name = $page.url.pathname.split('/').pop(); 
    //         if (name) {
    //             const fetchedTerm = await apiService.search(name); 
    //             termStore.set(fetchedTerm); 
    //             term = fetchedTerm;
    //             code = term.codeSnippet;
    //             shortDef = term.shortDef.toString();
    //         }
    //     }
    // });

</script>

{#if term}
    <div class="max-w-3/4 mx-auto">
        <TermNameCatCards termName={term.name} termCategory={term.category} />
        <TermContentCard text={term.shortDef} />
        <TermContentCard text={term.longDef} />
        {#if term.codeSnippet}
        <div class="card w-full px-7 py-4 mt-4 bg-secondary-600 border border-secondary-100 shadow-xl text-xl text-left">
            <HighlightAuto code={term.codeSnippet} />
          </div>
        {/if}
        <TermContentCard text={term.exampleUsage} />
    </div>
{:else}
    <p>Oops! Refresh issue. Please go back to search.</p>
{/if}