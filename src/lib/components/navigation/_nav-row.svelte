<script lang="ts">
  export let link: string | null = null;
  export let isCloud: boolean;
  let classes = `nav-row ${$$props.class} ${isCloud ? 'cloud' : 'local'}`;
</script>

<li class={link ? '' : classes}>
  {#if link}
    <a href={link} class={classes}>
      <slot />
    </a>
  {:else}
    <slot />
  {/if}
</li>

<style lang="postcss">
  .nav-row {
    @apply flex flex-row font-secondary font-medium text-sm py-1 rounded-lg items-center truncate;
  }
  .local {
    @apply text-white;
  }
  .cloud {
    @apply text-gray-900;
  }
  .local:hover {
    @apply bg-white text-gray-900;
  }
  .cloud:hover {
    @apply bg-gray-900 text-white;
  }
  .local:hover :global(svg path) {
    stroke: #18181b;
  }
  .cloud:hover :global(svg path) {
    stroke: #ffffff;
  }
</style>
