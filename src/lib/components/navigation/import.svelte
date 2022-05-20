<script lang="ts">
  import Icon from '$lib/components/icon/index.svelte';
  import type { Theme } from '$lib/global';

  import { navOpen } from '$lib/stores/nav-open';

  import NavRow from './_nav-row.svelte';
  import Logo from '$lib/components/logo/index.svelte';
  import Tooltip from '$lib/components/tooltip/index.svelte';

  import type { routes } from '$lib/routes';

  export let theme: Theme = 'developer';
  export let linkList: Partial<Record<keyof typeof routes, string>>;

  function toggleNav() {
    $navOpen = !$navOpen;
  }
</script>

<nav
  class="h-screen border-r-2 border-gray-200 relative flex transition-width z-0"
>
  <div
    id="navWrapper"
    class="transition-width bg-gray-900 text-white z-50 pt-3 pl-1 pr-4 flex flex-col justify-between"
    class:operator={theme === 'operator'}
    class:open={$navOpen}
    class:close={!$navOpen}
  >
    <div>
      <div class="mt-2 ml-1">
        <a href={linkList.home} class="block">
          <Logo height="36px" width="36px" {theme} />
        </a>
      </div>
      <button
        class="absolute"
        style="top: 25px; right: -2px;"
        on:click={toggleNav}
      >
        <Icon
          name={$navOpen ? 'caretLeft' : 'caretRight'}
          {theme}
          scale={1.2}
        />
      </button>
    </div>
    <div class="mt-16 grow">
      <ul class="space-y-1">
        <NavRow link={linkList.import} {theme}>
          <Tooltip right hide={$navOpen} text="Workflows">
            <div class="nav-icon">
              <Icon {theme} name="download" scale={1} />
            </div>
          </Tooltip>
          <div class="nav-title">Import</div>
        </NavRow>
      </ul>
    </div>
    <div class="grow-0">
      <ul class="space-y-1 pb-32" />
    </div>
  </div>
</nav>

<style lang="postcss">
  .operator {
    @apply bg-white text-gray-900;
  }
  .transition-width {
    transition: width 0.25s linear, width 0.25s linear;
  }
  .nav-icon {
    @apply h-6 ml-2 mr-2 mt-0 cursor-pointer;
  }
  .nav-title {
    width: 100px;
    overflow: hidden;
    transition: width 0.25s linear;
  }

  .close .nav-title {
    width: 0px;
  }
  .open .nav-title {
    width: 100px;
  }
</style>
