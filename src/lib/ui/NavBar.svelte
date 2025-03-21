<script lang="ts">
    import { authToken, userNameStore } from '$lib/stores';
    import { page } from '$app/state';

    let token = $state("");
    let username = $state("");

    authToken.subscribe((value) => {
        token = value;
    });

    userNameStore.subscribe((value) => {
        username = value;
    });

    const doLogout = () => {
        authToken.set("");
        userNameStore.set("");
    };
    

</script>

<nav class="flex justify-between items-center p-4">
  <div>
      {#if page.url.pathname !== "/"}
      <a href="/">
          <button class="px-4 py-2">Home</button>
      </a>
      {/if}
  </div>
  <div class="flex items-center space-x-4">
      <a href="/about">
          <button class="px-4 py-2">About</button>
      </a>
      {#if !token}
      <a href="/login">
          <button class="px-4 py-2">Login</button>
      </a>
      {/if}
      {#if token}
      <a href="/profile">
          <button class="px-4 py-2">Profile</button>
      </a>
      <button class="px-4 py-2" onclick={doLogout}>Logout</button>
      {/if}
  </div>
</nav>