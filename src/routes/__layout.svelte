<script lang="ts">
  import Navigation from '$lib/components/navigation/full-nav.svelte';
  import { routes } from '$lib/routes';
  import { noop } from 'svelte/internal';
  import '../app.css';
</script>

<div class="flex h-screen w-screen flex-row">
  <div class="sticky top-0 h-screen bg-white">
    <Navigation linkList={routes} logout={noop} />
  </div>
  <div class="h-screen w-max flex-auto overflow-auto"><slot /></div>
</div>
