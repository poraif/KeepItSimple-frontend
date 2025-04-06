import axios from 'axios';
import type { Term, TermVersion, UserLogin, UserSignup, TermAndCurrentVersion, AddTermAndVersion, TermCollection } from '$lib/entity-types';
import { authToken, usernameStore, getUserFromToken } from '$lib/stores';
// import { persisted } from 'svelte-persisted-store';
import { get } from 'svelte/store';

export const apiService = {
    baseUrl: import.meta.env.VITE_API_URL,

    /*TERM CRUD METHODS*/

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

    async updateTermVersion(termName: string, termVersion: TermVersion, versionId: bigint): Promise<boolean> {
        try {
            const token = get(authToken);
            const response = await axios.put(`${this.baseUrl}/term/${termName}/termversion/${versionId}/update`, termVersion,  {
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

    async deleteTermVersion(termName: string, versionId: bigint | undefined): Promise<boolean> {
        try {
            const token = get(authToken);
            const response = await axios.delete(`${this.baseUrl}/term/${termName}/termversion/${versionId}/delete`,  {
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

    async addTermAndVersion(termAndCurrentVersion: AddTermAndVersion): Promise<boolean> {
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


    /*VOTE FOR TERM*/


    async voteTermVersion(termName: string, versionId: bigint, voteValue: number): Promise<boolean> {
        try {
            const token = get(authToken);
            const response = await axios.put(`${this.baseUrl}/term/${termName}/termversion/${versionId}/vote`, voteValue,  {
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


    /* AUTH */

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
                const username = getUserFromToken(token);
                usernameStore.set(username);
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

    /* SEARCH TERM */

    async search(termName: string): Promise<TermAndCurrentVersion> {
        try {
            const response = await axios.get(`${this.baseUrl}/term/search?term=${termName}`);
            console.log('search response:', response);
            return response.data;
        }
        catch (error) {
            console.error(error);
            throw new Error('search failed!');
        }
    },

    /* LIST ALL TERMS */

    async getTermNames(): Promise<string[]> {
        try {
            const response = await axios.get(`${this.baseUrl}/term/terms`);
            return response.data;
        }
        catch (error) {
            console.error(error);
            throw new Error('failed to retrieve the terms list');
        }
    },

    /* TERM COLLECTION CRUD */

    async addCollection(TermCollection: TermCollection): Promise<boolean> {
        try {
            const token = get(authToken);
            const response = await axios.post(`${this.baseUrl}/collections/add`, TermCollection,  {
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

    async updateCollection(termCollection: TermCollection, collectionName: string): Promise<boolean> {
        try {
            const token = get(authToken);
            const response = await axios.put(`${this.baseUrl}/collections/${collectionName}/update`, termCollection,  {
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

    async addTermtoCollection(termName: string, collectionName: string): Promise<boolean> {
        try {
            const token = get(authToken);
            const response = await axios.put(`${this.baseUrl}/collections/${collectionName}/addterm?=${termName}`,  {
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

    async removeTermFromCollection(termName: string, collectionName: string): Promise<boolean> {
        try {
            const token = get(authToken);
            const response = await axios.put(`${this.baseUrl}/collections/${collectionName}/removeterm?=${termName}`,  {
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

    async getUserCollections(): Promise<TermCollection[]|[]> {
        try {
            const token = get(authToken);
            const response = await axios.get(`${this.baseUrl}/collections/list`,  {
                headers: {
                    Authorization: `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                }
            });
            return response.data as TermCollection[];
        }
        catch (error) {
            console.error(error);
            return [];
        }
    },

    async getCollectionTerms(collectionName: string): Promise<Term[]|[]> {
        try {
            const token = get(authToken);
            const response = await axios.get(`${this.baseUrl}/collections/${collectionName}/termlist`,  {
                headers: {
                    Authorization: `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                }
            });
            return response.data as Term[];
        }
        catch (error) {
            console.error(error);
            return [];
        }
    },

    async deleteCollection(collectionName: string): Promise<boolean> {
        try {
            const token = get(authToken);
            const response = await axios.delete(`${this.baseUrl}/collections/${collectionName}/delete`,  {
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



};