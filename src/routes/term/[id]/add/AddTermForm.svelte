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
  <SelectDropdown id="category" bind:value={category}>
    {#each categories as category}
    <option value={category}>{category}</option>
  {/each}
  </SelectDropdown>
  {/if}
  <label for="shortDef">Short definition</label>
  <InputFieldShort id="shortDef" name="shortDef" value={shortDef} placeholder="Add a short ELI5 definition!" />
  <label for="longDef">Long definition</label>
  <InputFieldLong id="longDef" name="longDef" value={longDef} placeholder="Provide a bit of extra information." />
  <label for="codeSnippet">Code snippet</label>
  <InputFieldCode id="codeSnippet" name="codeSnippet" value={codeSnippet} placeholder="Add a short code snippet if applicable." />
  <label for="exampleUsage">Example usage</label>
  <InputFieldLong id="exampleUsage" name="longDef" value={exampleUsage} placeholder="Provide practical info on the industries, scenarios, technologies etc that use this." />
  <Button text="Submit" onClick={() => addTermAndVersion()} />
  </form>