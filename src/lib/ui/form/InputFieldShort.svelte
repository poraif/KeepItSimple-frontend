<script lang="ts">
let { value, placeholder, id, name }: { value: string, placeholder: string, id: string, name: string } = $props();
  </script>

    <input class="input w-full px-7 py-4 mt-4 bg-secondary-600 border border-secondary-100 shadow-xl text-s text-left" type="text" id={id} placeholder={placeholder} bind:value={value} name={name} required>