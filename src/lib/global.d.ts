import type { SvelteComponent } from 'svelte';

type User = {
  email: string;
  name: string;
  picture: string;
};

type ExtraIcon = { icon: typeof SvelteComponent; name: string };

type NamespaceItem = { namespace: string; href: string; onClick: () => void };

type Theme = 'operator' | 'developer';
