import { writable } from 'svelte/store';
import type { TermAndCurrentVersion } from '$lib/entity-types';


// auth
export const authToken = writable(localStorage.getItem('token') || '');

authToken.subscribe((token) => {
    if (token) {
      localStorage.setItem('token', token);
      console.log('token returned at store subscribe: ', token);
    } else {
      localStorage.removeItem('token');
    }
  });

  // term
  export const termStore = writable<TermAndCurrentVersion | null>(null);

  // all terms
  // export const termListStore = writable<Arr