import { writable } from 'svelte/store';
import type { Term, TermAndCurrentVersion, TermCollection, UserDetails, tokenPayload } from '$lib/entity-types';
import { persisted } from 'svelte-persisted-store';
import { jwtDecode } from 'jwt-decode';
import { createToaster } from '@skeletonlabs/skeleton-svelte';

export const getUserFromToken = (authToken: string): UserDetails => {
  try {
    const decodedToken = jwtDecode<tokenPayload>(authToken);
    const userDetails: UserDetails = {
      username: decodedToken.sub ?? '',
      role: decodedToken.role ?? ''
    };
    return userDetails;
  } catch (error) {
    console.error('error with token:', error);
    return { username: '', role: '' };
  }
};

// auth
export const authToken = persisted('token', ''); 

// user
export const usernameStore = persisted('username', '');
export const userRoleStore = persisted('userRole', ''); 

  // term
  export const termStore = writable<TermAndCurrentVersion | null>(null);

  export const termListStore = persisted<string[]>('termList', []);

  export const termCollectionStore = persisted<TermCollection[]>('collectionList', []);

  export const currentTermStore = persisted<TermAndCurrentVersion | null>('currentTerm', null);


  export const TermsInCollectionStore = writable<Term[]>([]);

  export const toaster = createToaster();