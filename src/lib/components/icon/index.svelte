<script lang="ts">
  const DEFAULT_WIDTH = 24;
  const DEFAULT_HEIGHT = 24;

  import { icons } from './paths';
  import type { IconName } from './paths';

  export let name: IconName;
  export let width: number | undefined = undefined;
  export let height: number | undefined = undefined;
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

  $: iconWidth =  width ?? icon?.width ?? DEFAULT_WIDTH;
  $: iconHeight = height ?? icon?.height ?? DEFAULT_HEIGHT;
</script>

{#if icon}
  <svg
    width={iconWidth}
    height={iconHeight}
    fill="none"
    class={$$props.class}
    viewBox="0 0 {iconWidth} {iconHeight}"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g transform="translate({iconWidth / 2} {iconHeight / 2})" transform-origin="{iconWidth / 4} 0">
      <g transform="scale({scale}) rotate({rotate})">
        {#each icon.paths as path (path.d)}
          <path
            {...path}
            stroke={getStroke(path)}
            fill={getFill(path)}
            transform="translate({iconWidth / -2} {iconHeight / -2})"
          />
        {/each}
      </g>
    </g>
  </svg>
{/if}
