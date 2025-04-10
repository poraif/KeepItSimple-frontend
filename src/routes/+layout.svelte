<script lang="ts">
	import '../app.css';
	import NavBar from '$lib/ui/NavBar.svelte';
	import { Toaster } from '@skeletonlabs/skeleton-svelte';
	import { toaster } from '$lib/stores';
	let { children } = $props();

</script>

<NavBar />
<Toaster {toaster} 
stateInfo="bg-blue-600 text-white"
stateSuccess="bg-green-600 text-white"
stateWarning="bg-yellow-600 text-white"
stateError="bg-red-600 text-white"
rounded="rounded-"
padding="p-4"
width="max-w-sm w-full"
messageClasses="text-sm font-small w"/>
{@render children()}
