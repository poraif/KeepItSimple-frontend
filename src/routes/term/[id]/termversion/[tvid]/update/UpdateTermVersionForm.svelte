<script lang="ts">
    import { apiService } from '$lib/services/api-service';
    import type { TermAndCurrentVersion, TermVersion } from '$lib/entity-types';
    import { page } from '$app/state';
    import { currentTermStore, toaster } from '$lib/stores';
    import Button from '$lib/ui/Button.svelte';
	import { goto } from '$app/navigation';

    let term = $state<TermAndCurrentVersion | null>(null);
  
    let shortDef = $state("");
    let longDef = $state("");
    let codeSnippet = $state("");
    let exampleUsage = $state("");

    currentTermStore.subscribe((term) => {
        shortDef = term?.shortDef || "";
        longDef = term?.longDef || "";
        codeSnippet = term?.codeSnippet || "";
        exampleUsage = term?.exampleUsage || "";
    });

  
    const termName = $derived(page.params.id);
    const termVersionId = $derived(BigInt(page.params.tvid));
  
    const doUpdateTermVersion = (): void => {
      const termVersion: TermVersion = {
        shortDef: shortDef,
        longDef: longDef,
        codeSnippet: codeSnippet,
        exampleUsage: exampleUsage
      };
        const success = apiService.updateTermVersion(termName, termVersion, termVersionId);
        if (!success) {
          toaster.error({ title: 'Failed to update!' });
          return;
        }
        toaster.success({ title: 'Term version updated!' });
        console.log("updated term version");
        goto(`/term/${termName}`);
      }
      
  </script>
  
  <form class="max-w-1/2 mx-auto items-center">
    <label for="shortDef">Short definition</label>
    <input class="input w-full px-7 py-4 mt-4 bg-secondary-600 border border-secondary-100 shadow-xl text-s text-left" type="text" id="shortDef" name="shortDef" bind:value={shortDef} required>
    <label for="longDef">Long definition</label>
    <textarea class="input w-full px-7 py-4 mt-4 bg-secondary-600 border border-secondary-100 shadow-xl text-sm text-left" id="longDef" name="longDef" rows="3" bind:value={longDef} required></textarea>
    <label for="codeSnippet">Code snippet</label>
    <textarea class="input font-mono bg-gray-700 text-white border-gray-400 rounded-md w-full px-7 py-4 mt-4 border *:shadow-xl text-s text-left text-scaling"  bind:value={codeSnippet} rows="4" id="codeSnippet" name="codeSnippet"></textarea>
    <label for="exampleUsage">Example usage</label>
    <textarea class="input w-full px-7 py-4 mt-4 bg-secondary-600 border border-secondary-100 shadow-xl text-sm text-left" id="exampleUsage" name="exampleUsage" rows="3" bind:value={exampleUsage} required></textarea>
    <Button text="Submit" onClick={() => doUpdateTermVersion()} />
    </form>