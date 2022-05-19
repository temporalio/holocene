<script lang="ts">
  import Icon from 'svelte-fa';
  import NewIcon from '$lib/components/icon/index.svelte';

  import { navOpen } from '$lib/stores/nav-open';
  import { lastUsedNamespace } from '$lib/stores/namespaces';

  import NavRow from './_nav-row.svelte';
  import Logo from '$lib/components/logo/index.svelte';
  import Logout from '$lib/components/logout/index.svelte';
  import NamespaceList from '$lib/components/namespace-list/index.svelte';
  import Drawer from '$lib/components/navigation/drawer.svelte';
  import Tooltip from '$lib/components/tooltip/index.svelte';
  import IsCloudGuard from '$lib/components/guard/is-cloud-guard.svelte';

  import {
    faArrowAltCircleRight,
    faCog,
    faHeartbeat,
    faRedo,
    faServer,
    faSort,
  } from '@fortawesome/free-solid-svg-icons';

  import type { routes } from '$lib/routes';
  import type { ExtraIcon, NamespaceItem } from '$lib/global';

  export let isCloud = false;
  export let theme: Theme = 'developer';
  export let extras: ExtraIcon[] | null = null;
  export let activeNamespace: string | null | undefined = 'default';
  export let namespaceList: null | Promise<NamespaceItem[]> = null;
  export let linkList: Partial<Record<keyof typeof routes, string>>;
  export let user: null | Promise<User> = null;
  export let logout: () => void;

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

<nav
  class="h-full border-r-2 border-gray-200 relative flex transition-width z-0"
>
  <div
    id="navWrapper"
    class="transition-width bg-gray-900 text-white z-50 pt-3 pl-1 pr-4"
    class:operator={theme === 'operator'}
    class:open={$navOpen}
    class:close={!$navOpen}
  >
    <div class="mt-2 ml-1">
      <a href={linkList.home} class="block">
        <Logo height="36px" width="36px" {theme} />
      </a>
    </div>
    <button class="absolute right-0 top-6" on:click={toggleNav}>
      <NewIcon
        name={$navOpen ? 'caretLeft' : 'caretRight'}
        {theme}
        scale={1.2}
      />
    </button>
    <div class="flex h-full flex-col justify-between pb-32">
      <div class="mt-16">
        <ul class="space-y-1">
          <NavRow>
            <div
              class="cursor-pointer relative items-center flex"
              on:click={toggleNamespaceSelector}
            >
              <Tooltip
                right
                hide={$navOpen}
                text={activeNamespace || 'Namespaces'}
              >
                <div class="nav-icon">
                  <Icon icon={faServer} scale={1.2} />
                </div>
              </Tooltip>
              <div class="nav-title namespace">
                <Tooltip
                  right
                  hide={!$navOpen ||
                    Boolean(activeNamespace && activeNamespace.length < 12)}
                  text="Archive"
                >
                  {activeNamespace}
                </Tooltip>
              </div>
              <div class="absolute transition-position selector">
                <Icon icon={faSort} scale={0.9} />
              </div>
            </div>
          </NavRow>
          <NavRow link={linkList.workflows}>
            <Tooltip right hide={$navOpen} text="Workflows">
              <div class="nav-icon">
                <Icon icon={faHeartbeat} scale={1.2} />
                <!-- <NewIcon name="workflow" scale={1.2} /> -->
              </div>
            </Tooltip>
            <div class="nav-title">Workflows</div>
          </NavRow>
          <IsCloudGuard {isCloud}>
            <NavRow link={linkList.archive}>
              <Tooltip right hide={$navOpen} text="Archive">
                <div class="nav-icon">
                  <Icon icon={faRedo} scale={1.2} />
                  <!-- <NewIcon name="refresh" scale={0.8} /> -->
                </div>
              </Tooltip>
              <div class="nav-title">Archive</div>
            </NavRow>
          </IsCloudGuard>
        </ul>
      </div>
      <div class="">
        <ul class="space-y-1">
          {#if extras}
            {#each extras as extra}
              <NavRow>
                <div class="nav-icon">
                  <svelte:component this={extra.icon} />
                </div>
                <div class="nav-title">{extra.name}</div>
              </NavRow>
            {/each}
          {/if}
          <IsCloudGuard {isCloud}>
            <NavRow link={linkList.settings}>
              <Tooltip right hide={$navOpen} text="Settings">
                <div class="nav-icon"><Icon icon={faCog} scale={1.2} /></div>
              </Tooltip>
              <div class="nav-title">Settings</div>
            </NavRow>
          </IsCloudGuard>
          {#await user}
            <NavRow>
              <div class="motion-safe:animate-pulse" style="margin-left:1rem">
                <div
                  class="rounded-full bg-blueGray-200 h-full aspect-square"
                />
              </div>
              <div class="nav-title">
                <div class="h-2 bg-blueGray-50 rounded mt-1" />
              </div>
            </NavRow>
          {:then user}
            {#if user?.email}
              <NavRow>
                <Tooltip right hide={$navOpen} text="Logout">
                  <div class="nav-icon" on:click={logout}>
                    <Icon
                      icon={faArrowAltCircleRight}
                      scale={1.2}
                      class="nav-icon"
                    />
                  </div>
                </Tooltip>
                <div class="nav-title"><Logout {logout} /></div>
              </NavRow>
              <NavRow>
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
                  {/if}
                </div>
              </NavRow>
            {/if}
          {/await}
        </ul>
      </div>
    </div>
  </div>
  <Drawer
    flyin={namespaceSelectorOpen === true}
    flyout={namespaceSelectorOpen === false}
    onClose={() => {
      if (namespaceSelectorOpen === true) namespaceSelectorOpen = false;
    }}
  >
    {#if namespaceSelectorOpen}
      <NamespaceList
        {namespaceList}
        {activeNamespace}
        lastUsedNamespace={$lastUsedNamespace}
      />
    {/if}
  </Drawer>
</nav>

<style lang="postcss">
  .operator {
    @apply bg-white text-gray-900;
  }
  .transition-width {
    transition: width 0.25s linear, width 0.25s linear;
  }
  .nav-icon {
    @apply w-8 h-6 ml-6 mt-2 cursor-pointer;
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
  .open .namespace {
    width: 80px;
  }
  .transition-position {
    transition: right 0.25s ease-in;
  }
  .open .selector {
    @apply -right-4;
  }
  .close .selector {
    @apply right-0 mr-1;
  }
</style>
