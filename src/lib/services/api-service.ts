import axios from 'axios';
import type { Term, TermVersion, UserLogin, UserSignup, TermAndCurrentVersion } from '$lib/entity-types';
import { authToken, userNameStore, getUserFromToken } from '$lib/stores';
// import { persisted } from 'svelte-persisted-store';
import { get } from 'svelte/store';

export const apiService = {
    baseUrl: import.meta.env.VITE_API_URL,

    async addTerm(term: Term): Promise<void> {
        try {
            axios.post(`${this.baseUrl}/term/add`, term)
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('adding term error:', error.response ? error.response.data : error.message);
            }
        }
    },
    
    async addTermVersion(termName: string, termVersion: TermVersion): Promise<boolean> {
        try {
            const token = get(authToken);
            const response = await axios.post(`${this.baseUrl}/term/${termName}/termversions`, termVersion,  {
                headers: {
                    Authorization: `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                }
            });
            return response.data.success === true;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    },

    async addTermAndVersion(termAndCurrentVersion: TermAndCurrentVersion): Promise<boolean> {
        try {
            const token = get(authToken);
            const response = await axios.post(`${this.baseUrl}/term/addtermandversion`, termAndCurrentVersion, {
                headers: {
                    Authorization: `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                }
            });
            return response.data.success === true;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    },

    async signup(user: UserSignup): Promise<void> {
        try {
            await axios.post(`${this.baseUrl}/account/signup`, user);
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to sign up');
        }
    },

    async login(user: UserLogin): Promise<void> {
        try {
            const response = await axios.post(`${this.baseUrl}/account/login`, user);
            console.log('Full response:', response);
            const token = response.data;
            if (token) {
                authToken.set(token);
                const userName = getUserFromToken(token);
                userNameStore.set(userName);
                console.log('token returned at login: ', token);
                return token;
            }
            else {
                throw new Error('Failed to log in: error with the auth token');
            }
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Login error:', error.response ? error.response.data : error.message);
            } else {
                console.error('Login error:', error);
            }
            throw new Error('Failed to log in: request error');       
        }
    },

    async search(termName: string): Promise<TermAndCurrentVersion> {
        try {
            const token = get(authToken);
            const response = await axios.get(`${this.baseUrl}/term/search/?term=${termName}`, {
                headers: {
                    Authorization: `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                }
            });
            console.log('search response:', response);
            return response.data;
        }
        catch (error) {
            console.error(error);
            throw new Error('search failed!');
        }
    },

    async getTermNames(): Promise<string[]> {
        try {
            const response = await axios.get(`${this.baseUrl}/term/terms`);
            return response.data;
        }
        catch (error) {
            console.error(error);
            throw new Error('failed to retrieve the terms list');
        }
    }


};