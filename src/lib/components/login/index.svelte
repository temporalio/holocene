<script lang="ts">
  const login = async () => {
    console.log('Logging in');
  };
</script>

<button class="login-button min-w-min" on:click={login}> Login </button>

<style lang="postcss">
  .login-button {
    @apply rounded-full px-4 py-2 text-sm text-white flex items-center justify-center;
  }

  .login-button:hover {
    @apply bg-purple-100 rounded-md text-gray-900;
  }
</style>
