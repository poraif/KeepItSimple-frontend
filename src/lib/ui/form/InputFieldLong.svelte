<script lang="ts">
    let { value, placeholder, id, name }: { value: string, placeholder: string, id: string, name: string } = $props();
      </script>
    
        <textarea class="input w-full px-7 py-4 mt-4 bg-secondary-600 border border-secondary-100 shadow-xl text-sm text-left" rows="3" id={id} placeholder={placeholder} bind:value={value} name={name} required></textarea>