<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async function ({ error }) {
    return {
      props: {
        error: `${error?.message ?? ''}`,
      },
    };
  };
</script>

<script>
  export let error = '';
</script>

{error}
