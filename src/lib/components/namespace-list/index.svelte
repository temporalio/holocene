<script lang="ts">
  import Icon from '$lib/components/icon/index.svelte';

  export let namespaceList: null | Promise<
    { namespace: string; href: string; onClick: () => void }[]
  >;
  export let activeNamespace: string | undefined | null;
  export let lastUsedNamespace: string | null;

  $: searchValue = '';
</script>

<div class="prose mt-16 mb-8">
  <h2 class="text-2xl">Select a namespace</h2>
  {#if activeNamespace}
    <p>You are currently viewing {activeNamespace}</p>
  {/if}
</div>

<div class="flex border rounded-full p-1 pr-4 mb-5">
  <div class="mt-1 ml-4 mr-2">
    <Icon name="search" scale={1} color="#18181b" />
  </div>
  <input class="w-full" placeholder="Search" bind:value={searchValue} />
</div>

<ul>
  {#await namespaceList}
    Loading ...
  {:then namespacesResult}
    {#if namespacesResult}
      {#each namespacesResult.filter( ({ namespace }) => namespace.includes(searchValue), ) as namespace}
        <li
          class="first:rounded-t-md first:border-t last:rounded-b-md border-b border-l border-r p-3 flex border-collapse gap-2 hover:bg-gray-50 cursor-pointer"
          on:click={() => {
            namespace.onClick();
            lastUsedNamespace = namespace.namespace;
          }}
        >
          <div class="w-4 h-4">
            {#if namespace.namespace === activeNamespace}
              <Icon name="check" color="#1d4ed8" scale={1.2} />
            {/if}
          </div>
          <a
            href={namespace.href}
            class="link"
            class:active={activeNamespace === namespace.namespace}
            >{namespace.namespace}</a
          >
        </li>
      {/each}
    {:else}
      No Namespaces
    {/if}
  {/await}
</ul>

<style lang="postcss">
  .link {
    @apply ml-2 text-gray-900 truncate;
  }

  .link:hover {
    @apply underline;
  }
  .active {
    @apply text-blue-700;
  }
</style>
