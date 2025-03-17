<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
	import type { TermAndCurrentVersion } from '$lib/entity-types';
    import { termStore } from '$lib/stores';
    import { apiService } from '$lib/services/api-service';
    import type { PageProps } from './$types';

    let term: TermAndCurrentVersion | null;
    $: termStore.subscribe(value => term = value);

    onMount(async () => {
        if (!term) {
            const name = $page.url.pathname.split('/').pop(); 
            if (name) {
                const fetchedTerm = await apiService.search(name); 
                termStore.set(fetchedTerm); 
                term = fetchedTerm;
            }
        }
    });

</script>

{#if term}
    <h1>{term.name}</h1>
    <h2>{term.category}</h2>
    <p>{term.shortDef}</p>
    <p>{term.longDef}</p>
    <pre>{term.codeSnippet}</pre>
    <p>{term.exampleUsage}</p>
{:else}
    <p>Loading...</p>
{/if}