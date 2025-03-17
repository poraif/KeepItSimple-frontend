<script lang="ts">
    import HeroBanner from "$lib/ui/HeroBanner.svelte";
    import SearchBar from "$lib/ui/SearchBar.svelte";
  </script>
  
  <div class="flex flex-col items-center h-screen">
    <HeroBanner title="Keep It Simple" tagline="A programming dictionary by and for programmers" />
    <SearchBar />
  </div>