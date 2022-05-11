<script lang="ts">
	import Icon from 'svelte-fa';

	import { faSort } from '@fortawesome/pro-solid-svg-icons/faSort';
	import NavRow from './_nav-row.svelte';
	import Logo from '$lib/components/logo/index.svelte';
	import Logout from '$lib/components/logout/index.svelte';

	import { faArrowRightFromBracket } from '@fortawesome/pro-light-svg-icons/faArrowRightFromBracket';
	import { faCodeSimple } from '@fortawesome/pro-light-svg-icons/faCodeSimple';
	import { faGear } from '@fortawesome/pro-light-svg-icons/faGear';
	import { faCalendarWeek } from '@fortawesome/pro-light-svg-icons/faCalendarWeek';
	import { faChartLine } from '@fortawesome/pro-light-svg-icons/faChartLine';
	import { faServer } from '@fortawesome/pro-light-svg-icons/faServer';
	import { UserData } from '$lib/stores/auth-store';
	import { routes } from '$lib/routes';

	let showProfilePic = true;

	function fixImage(e: any) {
		showProfilePic = false;
	}
</script>

<nav class="h-full border-r-2 border-gray-200 w-40 relative pt-3 pl-3 pr-2">
	<div class=""><Logo height="32px" width="32px" /></div>
	<div class="mt-16">
		<ul class="space-y-5 ">
			<NavRow class="mb-8"
				><Icon icon={faServer} scale={1.2} class="col-span-1 mt-1" />

				<div class="col-span-3">Temporal</div>
				<Icon icon={faSort} scale={0.9} class="inline-block col-span-1 ml-2 mt-1" />
			</NavRow>
			<NavRow link={routes.workflows}>
				<div class="col-span-1" />
				<div class="col-span-4">Workflows</div>
			</NavRow>
			<NavRow link={routes.observability}>
				<Icon icon={faChartLine} scale={1.2} class="col-span-1 mt-1" />
				<div class="col-span-4">Observability</div>
			</NavRow>
			<NavRow link={routes.schedules}>
				<Icon icon={faCalendarWeek} scale={1.2} class="col-span-1 mt-1" />
				<div class="col-span-4">Schedules</div>
			</NavRow>
			<NavRow link={routes.devTools}>
				<Icon icon={faCodeSimple} scale={1.2} class="col-span-1 mt-1" />
				<div class="col-span-4">Dev Tools</div>
			</NavRow>
		</ul>
	</div>
	<div class="absolute bottom-28 w-10/12">
		<ul class="space-y-5">
			<NavRow
				><Icon icon={faGear} scale={1.2} class="col-span-1 mt-1" />
				<div class="col-span-4">Settings</div>
			</NavRow>
			<NavRow>
				<Icon icon={faArrowRightFromBracket} scale={1} class="col-span-1 mt-1 text-right " />
				<div class="col-span-4"><Logout /></div>
			</NavRow>
			<NavRow>
				{#await $UserData}
					<div class="motion-safe:animate-pulse col-span-1">
						<div class="rounded-full bg-blue-200 h-full aspect-square" />
					</div>
					<div class="col-span-4"><div class="h-2 bg-blue-50 rounded mt-1" /></div>
				{:then user}<div class="col-span-1">
						{#if user?.picture}
							<img
								src={user?.picture}
								alt={user?.profile}
								class="rounded-md"
								on:error={fixImage}
								class:hidden={!showProfilePic}
							/>
							<div
								class="rounded-full bg-blue-200 h-full  aspect-square"
								class:hidden={showProfilePic}
							/>
						{/if}
					</div>
					<div class="col-span-4  ">
						{#if user?.name}
							{user?.name}
						{:else}
							Profile
						{/if}
					</div>
				{/await}
			</NavRow>
		</ul>
	</div>
</nav>
