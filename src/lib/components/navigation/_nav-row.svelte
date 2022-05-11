<script lang="ts">
	export let link: string | null = null;
	let classes = `grid grid-cols-5 ${$$props.class} gap-1 font-secondary font-medium text-sm`;
</script>

<li class={link ? '' : classes}>
	{#if link}
		<a href={link} class={classes}>
			<slot />
		</a>
	{:else}
		<slot />
	{/if}
</li>
