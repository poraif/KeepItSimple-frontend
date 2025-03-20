<script>
	import AddTermForm from "./AddTermForm.svelte";
	import { authToken } from "$lib/stores";
	import Button from "$lib/ui/Button.svelte";
	import { goto } from "$app/navigation";

	let token = $state("");
	authToken.subscribe((value) => {
		token = value;
	});

	const goLogin = () => {
		goto("/login");
	};


</script>

{#if token}
	<AddTermForm />
{:else}
	<p>You need to be logged in to add a term.</p>
	<Button onClick={goLogin} text="Go to login" />
{/if}