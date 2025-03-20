<script lang="ts">
  let { text, onClick }: { text: string, onClick: any } = $props();
  
  </script>
  
  <button type="button" onclick={onClick} class="btn btn-sm preset-filled-primary-500">{text}</button>