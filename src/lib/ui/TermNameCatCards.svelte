<script lang="ts">
let { termName, termCategory } = $props();

</script>

    <div class="grid grid-cols-2 gap-4 w-full">
        <h1 class="card bg-black text-xl text-white px-7 py-4 w-full text-left">
            {termName}
        </h1>
        <h2 class="card preset-gradient text-xl text-white px-7 py-4 w-full text-left">
            {termCategory}
        </h2>
    </div>

    <style lang="postcss">
        .preset-gradient {
          background-image: linear-gradient(45deg, var(--color-primary-500), var(--color-tertiary-500));
          color: var(--color-primary-contrast-500);
        }
      </style>