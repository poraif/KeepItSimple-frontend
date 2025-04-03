<script lang="ts">
	import UpdateTermForm from "./UpdateTermVersionForm.svelte";
	import { authToken, currentTermStore, usernameStore } from "$lib/stores";
	import Button from "$lib/ui/Button.svelte";
	import { goto } from "$app/navigation";
	import type { TermAndCurrentVersion } from "$lib/entity-types";

    let token = $state("");
    let username = $state("");
    let term = $state<TermAndCurrentVersion | null>(null);

        currentTermStore.subscribe((value) => {
            term = value;
        });


    authToken.subscribe((value) => {
        token = value;
    });

    usernameStore.subscribe((value) => {
        username = value;
    });

</script>

{#if token && term?.username === username}
	<UpdateTermForm />
{:else}
	<p>Term edit not available - return to home below.</p>
	<Button onClick={() => goto("/")} text="Go home" />
{/if}