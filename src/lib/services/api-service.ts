import axios from 'axios';
import type { TermVersion } from '$lib/entity-types';

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
    }
};