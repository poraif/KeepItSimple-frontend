import { writable } from 'svelte/store';
import type { Term, TermAndCurrentVersion, TermCollection } from '$lib/entity-types';
import { persisted } from 'svelte-persisted-store';
import { jwtDecode } from 'jwt-decode';
import { createToaster } from '@skeletonlabs/skeleton-svelte';

// made this always return a string to satisfy typescript
export const getUserFromToken = (authToken: string): string => {
  try {
    const decodedToken = jwtDecode(authToken);
    return decodedToken.sub ?? '';
  }
  catch (error) {
    console.error('error with token:', error);
    return '';
  }
}

// auth
export const authToken = persisted('token', ''); 

// user
export const usernameStore = persisted('username', '');

  // term
  export const termStore = writable<TermAndCurrentVersion | null>(null);

  export const termListStore = persisted<string[]>('termList', []);

  export const termCollectionStore = persisted<TermCollection[]>('collectionList', []);

  export const currentTermStore = persisted<TermAndCurrentVersion | null>('currentTerm', null);


  export const TermsInCollectionStore = writable<Term[]>([]);

  export const toaster = createToaster();