<script lang="ts">
  const logout = async () => {
    console.log('Logging out...');
    // (await $AuthStore).logout({
    // 	returnTo: window.location.origin
    // });
  };
</script>

<button on:click={logout} class={`${$$props.class}`}>
  {#if $$slots.default}
    <slot />
  {:else}
    Logout
  {/if}
</button>
