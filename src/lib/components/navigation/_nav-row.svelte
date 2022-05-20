<script lang="ts">
  import type { Theme } from '$lib/global';

  export let link: string | null = null;
  export let theme: Theme;
  let classes = `nav-row ${$$props.class} ${
    theme === 'operator' ? 'operator' : 'developer'
  }`;
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
    @apply flex flex-row font-secondary font-medium text-sm py-1 rounded-lg items-center;
  }
  .developer {
    @apply text-white;
  }
  .operator {
    @apply text-gray-900;
  }
  .developer:hover {
    @apply bg-white text-gray-900;
  }
  .operator:hover {
    @apply bg-gray-900 text-white;
  }
  .developer:hover :global(svg path) {
    stroke: #18181b;
  }
  .operator:hover :global(svg path) {
    stroke: #ffffff;
  }
</style>
