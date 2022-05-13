<script lang="ts">
  import Icon from 'svelte-fa';
  import { faSearch } from '@fortawesome/free-solid-svg-icons';
  export let namespaces: null | Promise<string[]>;
  export let lastUsedNamespace: string | null;
  $: searchValue = '';

  function getHref(namespace: string) {
    return `https://web.${namespace}.tmprl.cloud/`;
  }
</script>

<div class="flex border rounded-full p-1 mb-5">
  <div class="mt-1 ml-4 mr-2">
    <Icon icon={faSearch} scale={1} />
  </div>
  <input class="w-full" placeholder="Search" bind:value={searchValue} />
</div>

<ul>
  {#await namespaces}
    Loading ...
  {:then namespacesResult}
    {#if namespacesResult}
      {#each namespacesResult.filter( (namespace) => namespace.includes(searchValue), ) as namespace}
        <li
          class="first:rounded-t-md first:border-t last:rounded-b-md border-b border-l border-r  p-3 flex border-collapse"
        >
          <a
            href={getHref(namespace)}
            class={`underline ${
              lastUsedNamespace === namespace
                ? 'text-blue-900'
                : 'text-blue-400'
            }`}
            target="_blank"
            rel="noreferrer noopener"
            on:click={() => {
              lastUsedNamespace = namespace;
            }}>{namespace}</a
          >
        </li>
      {/each}
    {:else}
      No Namespaces
    {/if}
  {/await}
</ul>
