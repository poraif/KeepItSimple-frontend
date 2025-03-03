<script lang="ts">
  import { apiService } from '$lib/services/api-service';
  import type { TermVersion } from '$lib/entity-types';
  import { page } from '$app/state';

  let shortDef = $state("");
  let longDef = $state("");
  let codeSnippet = $state("");
  let exampleUsage = $state("");

  const id = $derived(page.params.id);

  const addVersion = (): void => {
    const termVersion: TermVersion = {
      shortDef: shortDef,
      longDef: longDef,
      codeSnippet: codeSnippet,
      exampleUsage: exampleUsage
    };
    apiService.addTermVersion(id, termVersion);
  };
</script>


<form class="w-full max-w-sm">
    <div class="mb-4">
      <label for="shortDef">Short Definition</label>
      <input id="shortDef" type="text" bind:value={shortDef} name="shortDef" required>
    </div>
  
    <div class="mb-4">
      <label for="longDef">Long Definition</label>
      <textarea id="longDef" bind:value={longDef} name="longDef" rows="4" required></textarea>
    </div>
  
    <div class="mb-4">
      <label for="codeSnippet">Code Snippet</label>
      <textarea id="codeSnippet" bind:value={codeSnippet} name="codeSnippet" rows="4"></textarea>
    </div>
  
    <div class="mb-4">
      <label for="exampleUsage">Example Usage</label>
      <textarea id="exampleUsage" bind:value={exampleUsage} name="exampleUsage" rows="4"></textarea>
    </div>
  
    <button onclick={() => addVersion()}>Submit</button>
  </form>