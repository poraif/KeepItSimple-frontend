<script lang="ts">
   import "svelte-highlight/styles/a11y-dark.css";
   import { HighlightAuto } from "svelte-highlight";
   let { code } = $props();


</script>

<HighlightAuto {code} />


