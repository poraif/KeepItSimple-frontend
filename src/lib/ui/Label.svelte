<script lang="ts">
    export let forInput = "";
  </script>
  
  <label for={forInput} class="label">
    <slot></slot>
  </label>