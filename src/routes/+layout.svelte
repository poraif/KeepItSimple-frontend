<script lang="ts">
	import '../app.css';
	import NavBar from '$lib/ui/NavBar.svelte';
	let { children } = $props();
</script>

<NavBar />
{@render children()}
