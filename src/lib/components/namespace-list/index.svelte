<script lang="ts">
  import Icon from 'svelte-fa';
  import { faSearch } from '@fortawesome/free-solid-svg-icons';
  export let namespaceList: null | Promise<
    { namespace: string; href: string; onClick: () => void }[]
  >;
  export let lastUsedNamespace: string | null;
  $: searchValue = '';
</script>

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
          class="first:rounded-t-md first:border-t last:rounded-b-md border-b border-l border-r  p-3 flex border-collapse"
        >
          <a
            href={namespace.href}
            class={`underline ${
              lastUsedNamespace === namespace.namespace
                ? 'text-blue-900'
                : 'text-blue-400'
            }`}
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
