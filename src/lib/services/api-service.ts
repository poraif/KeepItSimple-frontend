import axios from 'axios';
import type { Term, TermVersion, UserLogin, UserSignup, TermAndCurrentVersion } from '$lib/entity-types';
import { authToken } from '$lib/stores';

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
    
    async addTermVersion(termId: string, termVersion: TermVersion): Promise<boolean> {
        try {
            let token: string = '';
            authToken.subscribe((t) => (token = t));
            const response = await axios.post(`${this.baseUrl}/term/${termId}/termversions`, termVersion,  {
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
            const response = await axios.get(`${this.baseUrl}/term/search/?term=${termName}`);
            return response.data;
        }
        catch (error) {
            console.error(error);
            throw new Error('search failed!');
        }
    },

    async getTerms(): Promise<string[] | null> {
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