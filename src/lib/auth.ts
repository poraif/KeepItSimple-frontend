import { writable } from 'svelte/store';

export const authToken = writable(localStorage.getItem('token') || '');

authToken.subscribe((token) => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  });