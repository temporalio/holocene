import { writable } from 'svelte/store';

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const user = writable<Promise<User | undefined | void>>(
  new Promise(() => {}),
);
