<script lang="ts">
	import type { TermAndCurrentVersion } from '$lib/entity-types';
    import { currentTermStore } from '$lib/stores';
    import TermContentCard from '$lib/ui/TermContentCard.svelte';
    import TermNameCatCards from '$lib/ui/TermNameCatCards.svelte';
    import "svelte-highlight/styles/a11y-dark.css";
    import { HighlightAuto } from "svelte-highlight";
	import TermToolBar from '$lib/ui/TermToolBar.svelte';

    let term = $state<TermAndCurrentVersion | null>(null);

    currentTermStore.subscribe((value) => {
        term = value;
    });

</script>

{#if term}
    <div class="max-w-3/4 mx-auto">
        <TermNameCatCards termName={term.name} termCategory={term.category} />
        <TermContentCard text={term.shortDef} />
        <TermContentCard text={term.longDef} />
        {#if term.codeSnippet !== "" || term.codeSnippet !== null}
        <div class="card w-full px-7 py-4 mt-4 bg-secondary-600 border border-secondary-100 shadow-xl text-xl text-left">
            <HighlightAuto code={term.codeSnippet} />
          </div>
        {/if}
        <TermContentCard text={term.exampleUsage} />
        <TermToolBar/>
    </div>
{:else}
    <p>Oops! Refresh issue. Please go back to search.</p>
{/if}