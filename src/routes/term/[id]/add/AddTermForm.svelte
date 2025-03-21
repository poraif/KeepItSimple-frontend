<script lang="ts">
  import { apiService } from '$lib/services/api-service';
  import type { Term, TermAndCurrentVersion, TermVersion } from '$lib/entity-types';
  import { page } from '$app/state';
  import { onMount } from 'svelte';
	import { termListStore } from '$lib/stores';
	import { get } from 'svelte/store';
  import InputFieldCode from '$lib/ui/form/InputFieldCode.svelte';
  import SelectDropdown from '$lib/ui/form/SelectDropdown.svelte';
	import InputFieldShort from '$lib/ui/form/InputFieldShort.svelte';
  import InputFieldLong from '$lib/ui/form/InputFieldLong.svelte';
	import Button from '$lib/ui/Button.svelte';
  
  let termNames = $state([""]);
  termListStore.subscribe((value) => {
    termNames = value;
  });



  let categories = [
    "Concept", "Paradigm", "Data Structures & Algorithms",
    "Dev & Engineering", "Databases", "Systems & Networking",
    "Languages & Frameworks", "Security", "AI & Data Science",
    "Tooling & Infrastructure"
  ];

  onMount(async () => {
    const termList = await apiService.getTermNames();
    termListStore.set(termList);
    console.log(get(termListStore));
  });

  let category = $state("");
  let shortDef = $state("");
  let longDef = $state("");
  let codeSnippet = $state("");
  let exampleUsage = $state("");

  const termName = $derived(page.params.id);

  const addTermAndVersion = (): void => {
    const termVersion: TermVersion = {
      shortDef: shortDef,
      longDef: longDef,
      codeSnippet: codeSnippet,
      exampleUsage: exampleUsage
    };
    const termAndVersion: TermAndCurrentVersion = {
      name: termName,
      category: category,
      shortDef: shortDef,
      longDef: longDef,
      codeSnippet: codeSnippet,
      exampleUsage: exampleUsage
    };
    if (termNames.includes(termName)) {
      apiService.addTermVersion(termName, termVersion);
      console.log("Added term version, term existed");
    }
    else {
      console.log("Added term version and term, term didnt exist");
      apiService.addTermAndVersion(termAndVersion);
      termListStore.update((termList) => [...termList, termName]);
    }
  };
</script>


<form class="max-w-1/2 mx-auto items-center">

  {#if (!termNames.includes(termName)) }
  <label for="category">Category</label>
  <select name="category" id="category" bind:value={category} class="select w-full px-7 py-4 mt-4 bg-secondary-600 border border-secondary-100 shadow-xl text-sm text-left" required>
    {#each categories as category}
    <option value={category}>{category}</option>
    {/each}
  </select>
  {/if}
  <label for="shortDef">Short definition</label>
  <input class="input w-full px-7 py-4 mt-4 bg-secondary-600 border border-secondary-100 shadow-xl text-s text-left" type="text" id="shortDef" name="shortDef" placeholder="Add a short ELI5 definition!" bind:value={shortDef} required>
  <label for="longDef">Long definition</label>
  <textarea class="input w-full px-7 py-4 mt-4 bg-secondary-600 border border-secondary-100 shadow-xl text-sm text-left" id="longDef" name="longDef" rows="3" placeholder="Provide a bit of extra information." bind:value={longDef} required></textarea>
  <label for="codeSnippet">Code snippet</label>
  <textarea class="input font-mono bg-gray-700 text-white border-gray-400 rounded-md w-full px-7 py-4 mt-4 border *:shadow-xl text-s text-left text-scaling"  bind:value={codeSnippet} rows="4" id="codeSnippet" name="codeSnippet" placeholder="Add a short code snippet if applicable."></textarea>
  <label for="exampleUsage">Example usage</label>
  <textarea class="input w-full px-7 py-4 mt-4 bg-secondary-600 border border-secondary-100 shadow-xl text-sm text-left" id="exampleUsage" name="exampleUsage" rows="3" placeholder="Explain practical usage / professional usage etc." bind:value={exampleUsage} required></textarea>
  <Button text="Submit" onClick={() => addTermAndVersion()} />
  </form>