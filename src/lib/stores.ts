import { writable } from 'svelte/store';

export const search_query = writable('');
export const search_results = writable<any[]>([]);
export const show_default = writable(true);
