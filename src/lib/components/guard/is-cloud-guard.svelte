<script lang="ts">
  export let isCloud: boolean;
</script>

{#if isCloud}
  <slot name="fallback" />
{:else}
  <slot />
{/if}
