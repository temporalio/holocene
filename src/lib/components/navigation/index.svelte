<script lang="ts">
  import Icon from '$lib/components/icon/index.svelte';
  import type { User } from '$lib/global';

  import { navOpen } from '$lib/stores/nav-open';
  import { lastUsedNamespace } from '$lib/stores/namespaces';

  import NavRow from './_nav-row.svelte';
  import Logo from '$lib/components/logo/index.svelte';
  import Logout from '$lib/components/logout/index.svelte';
  import NamespaceList from '$lib/components/namespace-list/index.svelte';
  import Drawer from '$lib/components/navigation/_drawer.svelte';
  import Tooltip from '$lib/components/tooltip/index.svelte';
  import IsCloudGuard from '$lib/components/guard/is-cloud-guard.svelte';

  import type { routes } from '$lib/routes';
  import type { ExtraIcon, NamespaceItem } from '$lib/global';
  import { afterNavigate } from '$app/navigation';

  export let isCloud = false;
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

  afterNavigate(() => {
    if (namespaceSelectorOpen) {
      namespaceSelectorOpen = false;
    }
  });
</script>

<nav
  class="h-screen border-r-2 border-gray-200 relative flex transition-width z-0"
>
  <div
    id="navWrapper"
    class="transition-width bg-gray-900 text-white z-50 pt-3 px-3 flex flex-col justify-between items-center"
    class:cloud={isCloud}
    class:open={$navOpen}
    class:close={!$navOpen}
  >
    <div class="">
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
      style="top: 22px; right: -2px;"
      on:click={toggleNav}
    >
      <Icon name={$navOpen ? 'caretLeft' : 'caretRight'} {isCloud} scale={1} />
    </button>
    <div class="mt-16 grow items-center">
      <ul class="space-y-1">
        <NavRow {isCloud}>
          <div
            class="cursor-pointer relative items-center flex"
            on:click={toggleNamespaceSelector}
          >
            <Tooltip
              right
              hide={$navOpen}
              text={activeNamespace ?? 'Namespaces'}
            >
              <div class="nav-icon">
                <Icon {isCloud} name="namespaceSelect" scale={1.2} />
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
          </div>
        </NavRow>
        <NavRow link={linkList.workflows} {isCloud}>
          <Tooltip right hide={$navOpen} text="Workflows">
            <div class="nav-icon">
              <Icon {isCloud} name="workflow" scale={1} />
            </div>
          </Tooltip>
          <div class="nav-title">Workflows</div>
        </NavRow>
        <IsCloudGuard {isCloud}>
          <NavRow link={linkList.archive} {isCloud}>
            <Tooltip right hide={$navOpen} text="Archive">
              <div class="nav-icon">
                <Icon {isCloud} name="archive" scale={1} />
              </div>
            </Tooltip>
            <div class="nav-title">Archive</div>
          </NavRow>
        </IsCloudGuard>
      </ul>
    </div>
    <div class="grow-0">
      <ul class="space-y-1 pb-32">
        {#if extras}
          {#each extras as extra}
            <NavRow {isCloud}>
              <div class="nav-icon">
                <svelte:component this={extra.icon} />
              </div>
              <div class="nav-title">{extra.name}</div>
            </NavRow>
          {/each}
        {/if}
        <IsCloudGuard {isCloud}>
          <NavRow link={linkList.settings} {isCloud}>
            <Tooltip right hide={$navOpen} text="Settings">
              <div class="nav-icon">
                <Icon {isCloud} name="settings" scale={1} />
              </div>
            </Tooltip>
            <div class="nav-title">Settings</div>
          </NavRow>
        </IsCloudGuard>
        {#await user}
          <NavRow {isCloud}>
            <div class="motion-safe:animate-pulse" style="margin-left:1rem">
              <div class="rounded-full bg-blueGray-200 h-full aspect-square" />
            </div>
            <div class="nav-title">
              <div class="h-2 bg-blueGray-50 rounded mt-1" />
            </div>
          </NavRow>
        {:then user}
          {#if user?.email}
            <NavRow {isCloud}>
              <Tooltip right hide={$navOpen} text="Logout">
                <div class="nav-icon" on:click={logout}>
                  <Icon {isCloud} name="logout" scale={1} />
                </div>
              </Tooltip>
              <div class="nav-title"><Logout {logout} /></div>
            </NavRow>
            <div class="profile-row">
              <div>
                {#if user?.picture}
                  <img
                    src={user?.picture}
                    alt={user?.profile}
                    class="rounded-md p-1 w-8 h-8"
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
            </div>
          {/if}
        {/await}
      </ul>
    </div>
  </div>
  <Drawer
    flyin={namespaceSelectorOpen === true}
    flyout={namespaceSelectorOpen === false}
    {isCloud}
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
  .cloud {
    @apply bg-white text-gray-900;
  }
  .transition-width {
    transition: width 0.25s linear, width 0.25s linear;
    -webkit-transition: width 0.25s linear, width 0.25s linear;
  }
  .nav-icon {
    @apply h-6 ml-2 mr-2 mt-0 cursor-pointer;
  }
  .nav-title {
    width: 100px;
    overflow: hidden;
    transition: width 0.25s linear;
    -webkit-transition: width 0.25s linear;
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
  .profile-row {
    @apply flex flex-row font-secondary font-medium text-sm py-1 ml-1 rounded-lg items-center;
  }
</style>
