<script lang="ts">
  import { iconPaths } from './paths';
  import type { IconName } from './paths';

  export let name: IconName;
  export let width = 24;
  export let height = 24;
  export let theme: 'developer' | 'operator';
  export let color = theme === 'operator' ? '#000000' : '#ffffff';
  export let rotate = 0;
  export let scale = 1;
  export let fill = 'none';

  $: paths = iconPaths[name];
</script>

{#if paths}
  <svg
    {width}
    {height}
    class={$$props.class}
    {fill}
    viewBox="0 0 {width} {height}"
    xmlns="http://www.w3.org/2000/svg"
    style="transform: rotate({rotate}deg) scale({scale});"
  >
    {#each paths as path}
      <path
        d={path}
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    {/each}
  </svg>
{/if}
