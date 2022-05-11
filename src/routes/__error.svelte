<script context="module" lang="ts">
  import type { ErrorLoad, Load } from '@sveltejs/kit';

  export const load: ErrorLoad = async function ({ url, fetch, error }) {
    return {
      props: {
        err: `${status}: ${error?.message}`,
      },
    };
  };
</script>

<script>
  export let err;
</script>

{err}
