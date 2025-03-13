<script lang="ts">
const loggedIn = false;
</script>

<nav class="flex justify-end p-4">
    <a href="/about">
  <button class="px-4 py-2">About</button>
</a>
  {#if !loggedIn}
  <a href="/login">
  <button class="px-4 py-2" >Login</button>
    </a>
  {/if}
  {#if loggedIn}
  <button class="px-4 py-2">Profile</button>
  {/if}
</nav>