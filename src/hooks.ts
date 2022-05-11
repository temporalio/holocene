import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Disable SSR until we have a better story for this with Auth
	const response = await resolve(event, {
		ssr: false
	});

	return response;
};
