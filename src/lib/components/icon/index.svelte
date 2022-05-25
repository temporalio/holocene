<script lang="ts">
  import { iconPaths } from './paths';
  import type { IconName } from './paths';

  export let name: IconName;
  export let width = 24;
  export let height = 24;
  export let isCloud: boolean | undefined = undefined;
  export let color = isCloud === false ? '#ffffff' : '#18181b';
  export let rotate = 0;
  export let scale = 1;

  $: icon = iconPaths[name] ?? iconPaths['namespaceSelect'];
</script>

{#if icon}
  <svg
    {width}
    {height}
    fill="none"
    class={$$props.class}
    viewBox="0 0 {width} {height}"
    xmlns="http://www.w3.org/2000/svg"
    style="transform: rotate({rotate}deg) scale({scale});"
  >
    {#each icon.paths as path}
      <path {...path} />
    {/each}
  </svg>
{/if}
