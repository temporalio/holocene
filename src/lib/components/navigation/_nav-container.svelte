<script lang="ts">
  import Icon from '$lib/components/icon/index.svelte';

  import { navOpen } from '$lib/stores/nav-open';

  import Logo from '$lib/components/logo/index.svelte';

  import type { routes } from '$lib/routes';

  export let isCloud = false;
  export let linkList: Partial<Record<keyof typeof routes, string>>;

  function toggleNav() {
    $navOpen = !$navOpen;
  }
</script>

<nav class="nav-header transition-width " data-cy="navigation-header">
  <div
    class="nav-wrapper transition-width"
    class:cloud={isCloud}
    class:open={$navOpen}
    class:close={!$navOpen}
  >
    <div>
      <a
        href={linkList.home}
        class="block absolute"
        style="top: 22px; left: 18px;"
      >
        <Logo height="24px" width="24px" {isCloud} />
      </a>
    </div>
    <button
      class="nav-toggle transition-left"
      style="top: 52px;"
      on:click={toggleNav}
    >
      <div class={isCloud ? 'cloudNavIcon' : 'localNavIcon'}>
        <Icon name={$navOpen ? 'navCollapse' : 'navExpand'} scale={1} />
      </div>
    </button>
    <div class="mt-24 grow items-center">
      <ul class="flex flex-col gap-2">
        <slot name="top" />
      </ul>
    </div>
    <div class="grow-0 items-center">
      <ul class="flex flex-col gap-2 pb-32">
        <slot name="bottom" />
      </ul>
    </div>
  </div>
  <slot name="drawer" />
</nav>

<style lang="postcss">
  .nav-header {
    @apply h-screen border-r-2 border-gray-200 relative flex z-0;
  }

  .nav-wrapper {
    @apply bg-gray-900 text-white z-50 pt-3 px-3 flex flex-col justify-between items-center;
  }

  .cloud {
    @apply bg-white text-gray-900;
  }
  .localNavIcon :global(svg) {
    filter: invert(100%);
    -webkit-filter: invert(100%);
  }

  .close :global(.nav-title) {
    width: 0px;
  }
  .open :global(.nav-title) {
    width: 100px;
  }
  .open :global(.namespace) {
    width: 100px;
  }

  .nav-toggle {
    @apply absolute invisible;
  }

  .nav-header:hover .nav-toggle {
    @apply visible;
  }

  .nav-header:focus .nav-toggle {
    @apply visible;
  }

  .close .nav-toggle {
    left: 18px;
  }
  .open .nav-toggle {
    left: 132px;
  }

  .transition-left {
    transition: left 0.25s linear, width 0.25s linear;
    -webkit-transition: left 0.25s linear, width 0.25s linear;
  }

  .transition-width {
    transition: width 0.25s ease-in-out, width 0.25s ease-in-out;
    -webkit-transition: width 0.25s ease-in-out, width 0.25s ease-in-out;
  }
</style>
