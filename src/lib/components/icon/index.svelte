<script lang="ts">
  import { icons } from './paths';
  import type { IconName } from './paths';

  export let name: IconName;
  export let width = 24;
  export let height = 24;
  export let rotate = 0;
  export let scale = 1;
  export let color = '';

  $: icon = icons[name];
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
      <path
        {...path}
        stroke={color !== '' ? color : path?.stroke ?? ''}
        fill={color !== '' ? color : path?.fill ?? ''}
      />
    {/each}
  </svg>
{/if}
