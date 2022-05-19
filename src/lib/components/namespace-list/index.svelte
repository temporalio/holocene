<script lang="ts">
  import NewIcon from '$lib/components/icon/index.svelte';
  import Icon from 'svelte-fa';

  import { faSearch } from '@fortawesome/free-solid-svg-icons';
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

<div class="flex border rounded-full p-1 mb-5">
  <div class="mt-1 ml-4 mr-2">
    <Icon icon={faSearch} scale={1} />
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
          class="first:rounded-t-md first:border-t last:rounded-b-md border-b border-l border-r p-3 flex border-collapse gap-2"
        >
          <div class="w-4 h-4">
            {#if namespace.namespace === activeNamespace}
              <NewIcon name="check" color="#1d4ed8" />
            {/if}
          </div>
          <a
            href={namespace.href}
            class={`underline ml-2 ${
              activeNamespace === namespace.namespace
                ? 'text-blue-700'
                : 'text-blue-400'
            } `}
            class:active={namespace.namespace === activeNamespace}
            on:click={() => {
              namespace.onClick();
              lastUsedNamespace = namespace.namespace;
            }}>{namespace.namespace}</a
          >
        </li>
      {/each}
    {:else}
      No Namespaces
    {/if}
  {/await}
</ul>
