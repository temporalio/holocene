<script lang="ts">
  export let link: string | null = null;
  let classes = `nav-row ${$$props.class}`;
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
