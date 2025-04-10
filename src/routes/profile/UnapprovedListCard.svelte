<script lang="ts">
    import X from '@lucide/svelte/icons/x';   
    import Check from '@lucide/svelte/icons/check';
  
    let { termName, author, versionId } = $props();


</script>

<div class="flex flex-col mb-4">
    <div class="flex justify-between items-start">
            <h4 class="text-2xl font-semibold">Author: {author}</h4>
        <div class="flex gap-2">
            <Check size={20} />
            <X size={20} />
            </div>
        </div>
        <p class="text-gray-600 mt-1">Term: {termName} | Version: {versionId}</p>
    </div>




