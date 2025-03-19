<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
	import type { TermAndCurrentVersion } from '$lib/entity-types';
    import { termStore } from '$lib/stores';
    import { apiService } from '$lib/services/api-service';
    import TermCodeSnippet from '$lib/ui/TermCodeSnippet.svelte';
    import TermContentCard from '$lib/ui/TermContentCard.svelte';
    import TermNameCatCards from '$lib/ui/TermNameCatCards.svelte';

    let term = $state<TermAndCurrentVersion | null>(null);
    let code = $state("");
    let shortDef = $state("");

    termStore.subscribe(value => {
        term = value;
        if (term) {
            code = term.codeSnippet; 
        }
        });

    onMount(async () => {
        if (!term) {
            const name = $page.url.pathname.split('/').pop(); 
            if (name) {
                const fetchedTerm = await apiService.search(name); 
                termStore.set(fetchedTerm); 
                term = fetchedTerm;
                code = term.codeSnippet;
                shortDef = term.shortDef.toString();
            }
        }
    });

</script>

{#if term}
    <div class="max-w-3/4 mx-auto">
        <TermNameCatCards termName={term.name} termCategory={term.category} />
        <TermContentCard text={term.shortDef} />
        <TermContentCard text={term.longDef} />
        {#if code}
            <TermCodeSnippet {code} /> 
        {/if}
        <TermContentCard text={term.exampleUsage} />
    </div>
{:else}
    <p>Oops! Refresh issue. Please go back to search.</p>
{/if}