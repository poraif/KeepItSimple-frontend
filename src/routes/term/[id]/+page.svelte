<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
	import type { TermAndCurrentVersion } from '$lib/entity-types';
    import { termStore } from '$lib/stores';
    import { apiService } from '$lib/services/api-service';
    import TermCodeSnippet from '$lib/ui/TermCodeSnippet.svelte';
    import TermContentCard from '$lib/ui/TermContentCard.svelte';
    

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
    <div class="max-w-[75%] mx-auto">
        <div class="grid grid-cols-2 gap-4 w-full">
            <h1 class="card bg-black text-xl text-white px-7 py-4 w-full text-left">{term.name}</h1>
            <h2 class="card preset-gradient text-xl text-white px-7 py-4 w-full text-left">{term.category}</h2>
        </div>
        <TermContentCard text={term.shortDef} />
        <TermContentCard text={term.longDef} />
        {#if code}
            <TermCodeSnippet {code} /> 
        {/if}
        <TermContentCard text={term.exampleUsage} />
    </div>
{:else}
    <p>Still loading</p>
{/if}

<style lang="postcss">
    .preset-gradient {
      background-image: linear-gradient(45deg, var(--color-primary-500), var(--color-tertiary-500));
      color: var(--color-primary-contrast-500);
    }
  </style>