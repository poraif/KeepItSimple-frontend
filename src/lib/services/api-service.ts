import axios from 'axios';
import type { TermVersion, UserLogin, UserSignup, TermAndCurrentVersion } from '$lib/entity-types';

export const apiService = {
    baseUrl: import.meta.env.VITE_API_URL,

    async addTermVersion(termId: string, termVersion: TermVersion): Promise<boolean> {
        try {
            const response = await axios.post(`${this.baseUrl}/term/${termId}/termversions`, termVersion);
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

    async login(user: UserLogin): Promise<string> {
        try {
            const response = await axios.post(`${this.baseUrl}/account/login`, user);
            return response.data.token;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to log in');
            return "";          
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
    }


};