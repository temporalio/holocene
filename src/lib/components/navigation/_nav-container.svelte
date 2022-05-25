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

<nav
  class="h-screen border-r-2 border-gray-200 relative flex transition-width z-0"
  data-cy="navigation-header"
>
  <div
    id="navWrapper"
    class="transition-width bg-gray-900 text-white z-50 pt-3 px-3 flex flex-col justify-between items-center"
    class:cloud={isCloud}
    class:open={$navOpen}
    class:close={!$navOpen}
  >
    <div>
      <a
        href={linkList.home}
        class="block absolute"
        style="left: 15px; top: 22px;"
      >
        <Logo height="24px" width="24px" {isCloud} />
      </a>
    </div>
    <button
      class="absolute"
      style="top: 22px; right: 0px;"
      on:click={toggleNav}
    >
      <div class={isCloud ? 'cloudNavIcon' : 'localNavIcon'}>
        <Icon name={$navOpen ? 'navCollapse' : 'navExpand'} scale={1} />
      </div>
    </button>
    <div class="mt-16 grow items-center">
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

  .transition-width {
    transition: width 0.25s linear, width 0.25s linear;
    -webkit-transition: width 0.25s linear, width 0.25s linear;
  }
</style>
