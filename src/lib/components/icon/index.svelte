<script lang="ts">
  import { icons } from './paths';
  import type { IconName } from './paths';

  export let name: IconName;
  export let width = 24;
  export let height = 24;
  export let rotate = 0;
  export let scale = 1;
  export let color = '';
  export let fill = '';
  export let stroke = '';

  $: icon = icons[name];

  function getStroke(path: svelte.JSX.SVGProps<SVGPathElement>) {
    if (color !== '') return color;
    if (stroke !== '') return stroke;
    return path?.stroke ?? ''
  }

  function getFill(path: svelte.JSX.SVGProps<SVGPathElement>) {
    if (color !== '') return color;
    if (fill !== '') return fill;
    return path?.fill ?? '';
  }
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
    {#each icon.paths as path (path.d)}
      <path
        {...path}
        stroke={getStroke(path)}
        fill={getFill(path)}
      />
    {/each}
  </svg>
{/if}
