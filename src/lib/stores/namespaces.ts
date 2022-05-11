import { writable } from 'svelte/store';
import { persistStore } from './persist-store';

export const lastUsedNamespace = persistStore('lastNamespace', 'default');

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const namespaceList = writable<Promise<string[]>>(new Promise(() => {}));
