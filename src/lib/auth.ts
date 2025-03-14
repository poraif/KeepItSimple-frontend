import { writable } from 'svelte/store';

export const authToken = writable(localStorage.getItem('token') || '');

authToken.subscribe((token) => {
    if (token) {
      localStorage.setItem('token', token);
      console.log('token returned at store subscribe: ', token);
    } else {
      localStorage.removeItem('token');
    }
  });