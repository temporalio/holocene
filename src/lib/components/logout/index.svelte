<script lang="ts">
	import { AuthStore } from '$lib/stores/auth-store';

	const logout = async () => {
		(await $AuthStore).logout({
			returnTo: window.location.origin
		});
	};
</script>

<button on:click={logout} class={`${$$props.class}`}>
	{#if $$slots.default}
		<slot />
	{:else}
		Logout
	{/if}
</button>
