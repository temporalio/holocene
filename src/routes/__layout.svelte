<script lang="ts">
  import Navigation from '$lib/components/navigation/index.svelte';
  import { routes } from '$lib/routes';
  import { noop } from 'svelte/internal';
  import '../app.css';
</script>

<div class="flex flex-row w-screen h-screen">
  <div class="sticky top-0 h-screen bg-white">
    <Navigation linkList={routes} logout={noop} />
  </div>
  <div class="flex-auto h-screen w-max overflow-auto"><slot /></div>
</div>
