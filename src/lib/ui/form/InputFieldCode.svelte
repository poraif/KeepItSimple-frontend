<script lang="ts">
    let { value, placeholder, id, name }: { value: string, placeholder: string, id: string, name: string } = $props();
      </script>
    
        <textarea class="input font-mono bg-gray-700 text-white border-gray-400 rounded-md w-full px-7 py-4 mt-4 border *:shadow-xl text-s text-left text-scaling" rows="4" id={id} placeholder={placeholder} bind:value={value} name={name}></textarea>