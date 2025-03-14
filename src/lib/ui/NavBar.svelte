<script lang="ts">
    import { authToken } from '$lib/stores';
    let token = $state("");
    authToken.subscribe((t) => (token = t));

    const doLogout = () => {
        authToken.set("");
    };
</script>

<nav class="flex justify-end p-4">
    <a href="/about">
  <button class="px-4 py-2">About</button>
</a>
  {#if !token}
  <a href="/login">
  <button class="px-4 py-2" >Login</button>
    </a>
  {/if}
  {#if token}
  <a href="/profile">
  <button class="px-4 py-2">Profile</button>
  </a>
    <button class="px-4 py-2" onclick={doLogout}>Logout</button>
    {/if}
</nav>