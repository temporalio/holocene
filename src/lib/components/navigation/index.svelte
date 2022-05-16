<script lang="ts">
  import type { SvelteComponent } from 'svelte';

  import Icon from 'svelte-fa';
  import NewIcon from '$lib/components/icon/index.svelte';

  import { navOpen } from '$lib/stores/nav-open';
  import { lastUsedNamespace } from '$lib/stores/namespaces';

  import NavRow from './_nav-row.svelte';
  import Logo from '$lib/components/logo/index.svelte';
  import Logout from '$lib/components/logout/index.svelte';
  import NamespaceList from '$lib/components/namespace-list/index.svelte';
  import Drawer from '$lib/components/navigation/drawer.svelte';
  import IsCloudGuard from '$lib/components/guard/is-cloud-guard.svelte';

  import {
    faArrowAltCircleRight,
    faCog,
    faHeartbeat,
    faLocationArrow,
    faRedo,
    faServer,
    faSort,
  } from '@fortawesome/free-solid-svg-icons';

  import type { routes } from '$lib/routes';

  export let isCloud: boolean;
  export let theme: 'cloud' | 'oss' = 'oss';
  export let extras: { icon: typeof SvelteComponent; name: string }[] | null =
    null;
  export let activeNamespace = 'default';
  export let namespaceList: null | Promise<
    { namespace: string; href: string; onClick: () => void }[]
  > = null;
  export let linkList: Record<keyof typeof routes, string>;
  export let user: null | Promise<User>;
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
    class="transition-width bg-gray-900 text-white overflow-hidden z-50 pt-3 pr-2"
    class:cloud={theme === 'cloud'}
    class:open={$navOpen}
    class:close={!$navOpen}
  >
    <div class="mt-2 ml-3">
      <Logo height="36px" width="36px" />
    </div>
    <button class="absolute right-2 top-6" on:click={toggleNav}>
      <NewIcon name={$navOpen ? 'caretLeft' : 'caretRight'} scale={1.2} />
    </button>
    <div class="mt-16">
      <ul class="space-y-1">
        <NavRow class="mb-8">
          <div class="cursor-pointer flex" on:click={toggleNamespaceSelector}>
            <div class="nav-icon">
              <Icon icon={faServer} scale={1.2} />
            </div>
            <div class="nav-title namespace mt-2">{activeNamespace}</div>
            <div class="inline-block mr-1 mt-2">
              <Icon icon={faSort} scale={0.9} />
            </div>
          </div>
        </NavRow>
        <NavRow link={linkList.workflows}>
          <div class="nav-icon">
            <Icon icon={faHeartbeat} scale={1.2} />
            <!-- <NewIcon name="workflow" scale={1.2} /> -->
          </div>
          <div class="nav-title">Workflows</div>
        </NavRow>
        <IsCloudGuard {isCloud}>
          <NavRow link={linkList.archive}>
            <div class="nav-icon">
              <Icon icon={faRedo} scale={1.2} />
              <!-- <NewIcon name="refresh" scale={0.8} /> -->
            </div>
            <div class="nav-title">Archive</div>
          </NavRow>
        </IsCloudGuard>
      </ul>
    </div>
    <div class="absolute bottom-28">
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
            <div class="nav-icon"><Icon icon={faCog} scale={1.2} /></div>
            <div class="nav-title">Settings</div>
          </NavRow>
        </IsCloudGuard>
        <NavRow>
          <div class="nav-icon" on:click={logout}>
            <Icon icon={faArrowAltCircleRight} scale={1.2} class="nav-icon" />
          </div>
          <div class="nav-title"><Logout {logout} /></div>
        </NavRow>
        <NavRow>
          {#await user}
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
    transition: width 0.25s linear, max-width 0.25s linear;
  }
  .nav-icon {
    @apply w-8 h-6 ml-6 mt-2 cursor-pointer;
  }
  .nav-title {
    max-width: 200px;
    overflow: hidden;
    transition: max-width 0.25s linear;
  }
  .close .nav-title {
    max-width: 0px;
  }
  .open .nav-title {
    max-width: 200px;
    margin-right: 15px;
  }
  .open .namespace {
    max-width: 180px;
  }
</style>
