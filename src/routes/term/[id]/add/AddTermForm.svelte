<script lang="ts">
  import { apiService } from '$lib/services/api-service';
  import type { Term, TermVersion } from '$lib/entity-types';
  import { page } from '$app/state';

  let category = $state("");
  let shortDef = $state("");
  let longDef = $state("");
  let codeSnippet = $state("");
  let exampleUsage = $state("");

  const termName = $derived(page.params.id);

  const addTermAndVersion = (): void => {
    const term: Term = {
      name: termName,
      category: category
    }
    const termVersion: TermVersion = {
      shortDef: shortDef,
      longDef: longDef,
      codeSnippet: codeSnippet,
      exampleUsage: exampleUsage
    };
    apiService.addTerm(term);
    apiService.addTermVersion(termName, termVersion);
  };
</script>


<form class="w-full max-w-sm">
   
  <label for="category">Category</label>
  <select class="select" id="category" bind:value={category} name="category" required>
    <option value="Concept">Concept</option>
    <option value="Paradigm">Paradigm</option>
    <option value="Data Structures & Algorithms">Data Structures & Algorithms</option>
    <option value="Dev & Engineering">Dev & Engineering</option>
    <option value="Databases">Databases</option>
    <option value="Systems & Networking">Systems & Networking</option>
    <option value="Languages & Frameworks">Languages & Frameworks</option>
    <option value="Security">Security</option>
    <option value="AI & Data Science">AI & Data Science</option>
    <option value="Tooling & Infrastructure">Tooling & Infrastructure</option>
  </select>

  <div class="mb-4">
    <label for="shortDef">Short Definition</label>
    <input id="shortDef" type="text" bind:value={shortDef} name="shortDef" required>
  </div>

    <div class="mb-4">
      <label for="shortDef">Short Definition</label>
      <input id="shortDef" type="text" bind:value={shortDef} name="shortDef" placeholder="Add a short ELI5 definition!" required>
    </div>
  
    <div class="mb-4">
      <label for="longDef">Long Definition</label>
      <textarea id="longDef" bind:value={longDef} name="longDef" rows="4" placeholder="Provide a bit of extra information." required></textarea>
    </div>
  
    <div class="mb-4">
      <label for="codeSnippet">Code Snippet</label>
      <textarea class= "font-mono bg-gray-700 text-white border-gray-400 rounded-md" id="codeSnippet" bind:value={codeSnippet} name="codeSnippet" placeholder="Add a short code snippet if applicable." rows="6"></textarea>
    </div>
  
    <div class="mb-4">
      <label for="exampleUsage">Example Usage</label>
      <textarea id="exampleUsage" bind:value={exampleUsage} name="exampleUsage" rows="4"></textarea>
    </div>
  
    <button onclick={() => addTermAndVersion()}>Submit</button>
  </form>