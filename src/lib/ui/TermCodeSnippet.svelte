<script lang="ts">
   import "svelte-highlight/styles/a11y-dark.css";
   import { HighlightAuto } from "svelte-highlight";
   let { code } = $props();


</script>

<div class="card w-full px-7 py-4 mt-4 bg-secondary-600 border border-secondary-100 shadow-xl text-xl text-left">
   <HighlightAuto {code} />
 </div>



