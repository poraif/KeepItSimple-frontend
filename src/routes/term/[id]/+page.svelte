<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
	import type { TermAndCurrentVersion } from '$lib/entity-types';
    import { termStore } from '$lib/stores';
    import { apiService } from '$lib/services/api-service';
    // import { HighlightAuto } from "svelte-highlight";
    import TermCodeSnippet from '$lib/ui/TermCodeSnippet.svelte';

    let term = $state<TermAndCurrentVersion | null>(null);
    let code = $state("");

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
            }
        }
    });

</script>

{#if term}
    <h1>{term.name}</h1>
    <h2>{term.category}</h2>
    <p>{term.shortDef}</p>
    <p>{term.longDef}</p>
    <TermCodeSnippet {code} />
    <p>{term.exampleUsage}</p>
{:else}
    <p>Still loading</p>
{/if}