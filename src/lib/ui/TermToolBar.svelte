<script lang="ts">
    import { AppBar } from '@skeletonlabs/skeleton-svelte';
    import PackageOpen from '@lucide/svelte/icons/package-open';
    import  CircleArrowUp from '@lucide/svelte/icons/circle-arrow-up';
    import  CircleArrowDown from '@lucide/svelte/icons/circle-arrow-down';
    import Pencil from '@lucide/svelte/icons/pencil';
    import Trash2 from '@lucide/svelte/icons/trash-2';
    import ChevronsLeft from '@lucide/svelte/icons/chevrons-left';
    import FlagTriangleRight from '@lucide/svelte/icons/flag-triangle-right';
    import SquarePlus from '@lucide/svelte/icons/square-plus';
    import { authToken, usernameStore, currentTermStore } from '$lib/stores';
    import type { TermAndCurrentVersion } from '$lib/entity-types';
    import { apiService } from '$lib/services/api-service';
    import { goto } from '$app/navigation';


    let token = $state("");
    let username = $state("");
    let term = $state<TermAndCurrentVersion | null>(null);

    authToken.subscribe((value) => {
        token = value;
    });

    usernameStore.subscribe((value) => {
        username = value;
    });

    currentTermStore.subscribe((value) => {
        term = value;
    });

    const termAuthorCheck = () => {
        if (term && term.username === username) {
            return true;
        } else {
            return false;
        }
    };

    const doUpvote = async (): Promise<void> => {
        try {
            if (term) {
                let vote = 0;
        if (term.loggedInUserVote === 1) {
            vote = 0;
        }
        else {
            vote = 1;
                }
                await apiService.voteTermVersion(term.name, term.id, vote);
                const updatedTerm = { ...term, loggedInUserVote: vote };
                currentTermStore.set(updatedTerm);
            }
        }
    catch (error) {
        console.error(`upvote failed the vote was ${term?.loggedInUserVote}`, error);
    }
}

const doDownVote = async (): Promise<void> => {
    try {
            if (term) {
                let vote = 0;
        if (term.loggedInUserVote === -1) {
            vote = 0;
        }
        else {
            vote = -1;
                }
                await apiService.voteTermVersion(term.name, term.id, vote);
                const updatedTerm = { ...term, loggedInUserVote: vote };
                currentTermStore.set(updatedTerm);
            }
        }
    catch (error) {
        console.error(`downvote failed the vote was ${term?.loggedInUserVote}`, error);
    }
}

    const doDelete = async (): Promise<void> => {
        try {
            if (term) {
                await apiService.deleteTermVersion(term.name, term?.id);
                console.log(`Term version ${term.id} deleted successfully`);
                goto(`/`);
            }
        } catch (error) {
            console.error("Delete failed:", error);
        }
    
    };


    
    </script>
    
    <AppBar>
        {#snippet lead()}
          <button onclick={() => goto("/")}><ChevronsLeft size={40} /></button>
          <FlagTriangleRight size={40} />
        {/snippet}
        {#snippet children()}
        {#if token}
          <PackageOpen size={35} />
        {/if}
        {/snippet}
        {#snippet trail()}
            {#if !(termAuthorCheck()) && token}
            <SquarePlus size={35} />
          <button onclick={() => doUpvote()}><CircleArrowUp size={35} /></button>
          <button onclick={() => doDownVote()}><CircleArrowDown size={35} /></button>
            {/if}
            {#if (termAuthorCheck()) && token}	
            <button onclick={() => goto(`/term/${term?.name}/termversion/${term?.id}/update`)}><Pencil size={35} /></button>
            <button onclick={() => doDelete()}><Trash2 size={35} /></button>
            {/if}
      {/snippet}
      </AppBar>

  