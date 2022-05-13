<script lang="ts">
  import Icon from 'svelte-fa';
  import NewIcon from '$lib/components/icon/index.svelte';

  import { user } from '$lib/stores/user';
  import { navOpen } from '$lib/stores/nav-open';
  import { lastUsedNamespace } from '$lib/stores/namespaces';

  import NavRow from './_nav-row.svelte';
  import Logo from '$lib/components/logo/index.svelte';
  import Logout from '$lib/components/logout/index.svelte';
  import NamespaceList from '$lib/components/namespace-list/index.svelte';

  import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
  import { faCog } from '@fortawesome/free-solid-svg-icons';
  import { faServer } from '@fortawesome/free-solid-svg-icons';
  import { faChartLine } from '@fortawesome/free-solid-svg-icons';
  import { faSort } from '@fortawesome/free-solid-svg-icons';

  import { routes } from '$lib/routes';
  import Drawer from './drawer.svelte';

  export let namespaces: null | Promise<string[]> = null;

  let showProfilePic = true;
  let namespaceSelectorOpen: boolean | null = null;
  function fixImage() {
    showProfilePic = false;
  }
  function toggleNamespaceSelector() {
    namespaceSelectorOpen = !namespaceSelectorOpen;
  }
  function toggleNav() {
    $navOpen = !$navOpen;
  }
</script>

<svelte:head>
  <script src="https://cdn.tailwindcss.com"></script>
</svelte:head>

<nav
  class="h-full border-r-2 border-gray-200 relative flex transition-width z-0"
>
  <div
    id="navWrapper"
    class="transition-width bg-gray-900 text-white overflow-hidden z-50 pt-3 pr-2"
    class:open={$navOpen}
    class:close={!$navOpen}
  >
    <div class="mt-2 ml-3">
      <Logo height="36px" width="36px" />
    </div>
    <button class="absolute right-2 top-6" on:click={toggleNav}>
      {$navOpen ? '<' : '>'}
    </button>
    <div class="mt-16">
      <ul class="space-y-5">
        <NavRow class="mb-8 ">
          <div class="cursor-pointer flex" on:click={toggleNamespaceSelector}>
            <div class="nav-icon ">
              <Icon icon={faServer} scale={1.2} />
            </div>
            <div class="nav-title namespace">Go to namespace</div>
            <div class="inline-block mr-2 mt-1">
              <Icon icon={faSort} scale={0.9} />
            </div>
          </div>
        </NavRow>
        {#if $lastUsedNamespace}
          <NavRow link={`https://web.${$lastUsedNamespace}.tmprl.cloud/`}>
            <div class="nav-icon ">
              <NewIcon name="workflow" scale={1.2} />
            </div>
            <div class="nav-title">Workflows</div>
          </NavRow>
        {/if}
        <NavRow link={routes.observability}>
          <div class="nav-icon ">
            <Icon icon={faChartLine} scale={1.2} />
          </div>
          <div class="nav-title">Observability</div>
        </NavRow>
        <NavRow link={routes.schedules}>
          <div class="nav-icon ">
            <NewIcon name="calendar" scale={1.2} />
          </div>
          <div class="nav-title">Schedules</div>
        </NavRow>
        <NavRow link={routes.devTools}>
          <div class="nav-icon ">
            <NewIcon name="bracket" scale={1.2} />
          </div>
          <div class="nav-title">Dev Tools</div>
        </NavRow>
      </ul>
    </div>
    <div class="absolute bottom-28 ">
      <ul class="space-y-5">
        <NavRow>
          <div class="nav-icon "><Icon icon={faCog} scale={1.2} /></div>
          <div class="nav-title">Settings</div>
        </NavRow>
        <NavRow>
          <div class="nav-icon ">
            <Icon
              icon={faArrowRight}
              scale={1}
              class="nav-icon mt-1 text-right "
            />
          </div>
          <div class="nav-title"><Logout /></div>
        </NavRow>
        <NavRow>
          {#await $user}
            <div
              class="motion-safe:animate-pulse nav-icon"
              style="margin-left:1rem"
            >
              <div class="rounded-full bg-blueGray-200 h-full aspect-square" />
            </div>
            <div class="nav-title">
              <div class="h-2 bg-blueGray-50 rounded mt-1" />
            </div>
          {:then user}
            <div class="nav-icon" style="margin-left:1rem">
              {#if user?.picture}
                <img
                  src={user?.picture}
                  alt={user?.profile}
                  class="rounded-md p-1"
                  on:error={fixImage}
                  class:hidden={!showProfilePic}
                />
                <div
                  class="rounded-full p-0.5 bg-blue-200 h-full aspect-square"
                  class:hidden={showProfilePic}
                >
                  {#if user?.name}
                    <div class="text-black text-center ">
                      {user?.name.trim().charAt(0)}
                    </div>
                  {/if}
                </div>
              {/if}
            </div>
            <div class="nav-title line-clamp-1 mt-2">
              {#if user?.name}
                {user?.name}
              {:else}
                Profile
              {/if}
            </div>
          {/await}
        </NavRow>
      </ul>
    </div>
  </div>
  <Drawer
    flyin={namespaceSelectorOpen === true}
    flyout={namespaceSelectorOpen === false}
  >
    <div class="prose mt-16">
      <h2>Select a namespace to navigate to</h2>
    </div>
    {#if namespaceSelectorOpen}
      <NamespaceList lastUsedNamespace={$lastUsedNamespace} {namespaces} />
    {/if}
  </Drawer>
</nav>

<style lang="postcss">
  .transition-width {
    transition: width 0.25s linear, max-width 0.25s linear;
  }
  .nav-icon {
    @apply w-8 ml-6;
  }
  .nav-title {
    max-width: 100px;
    overflow: hidden;
    transition: max-width 0.25s linear;
  }
  .close .nav-title {
    max-width: 0px;
  }
  .open .nav-title {
    max-width: 100px;
    margin-right: 15px;
  }
  .open .namespace {
    max-width: 100px;
  }
</style>
