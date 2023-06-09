const fetch = require('node-fetch');

import { SearchResult, SearchResultNotFound } from '../../interfaces';
import { getErrorMessage } from '../../utils/errors';
import { FilesAndFolder } from './FilesAndFolders';

interface FetchPayload {
    fetchWord: (word: string) => Promise<SearchResult[]>;
}

const PRELOAD_VITE_API_URL = 'https://api.dictionaryapi.dev/api';
const PRELOAD_VITE_API_VERSION = '/v2';
const PRELOAD_VITE_API_ENDPOINT = '/entries/en/';

/**
 *
 */
export const Fetch = ((): FetchPayload => {
    const defaultURL = PRELOAD_VITE_API_URL + PRELOAD_VITE_API_VERSION + PRELOAD_VITE_API_ENDPOINT;
    let searchedWord = '';

    async function fetchWord(word: string): Promise<SearchResult[]> {
        searchedWord = word.toLowerCase();

        try {
            const wordExistsLocally = await FilesAndFolder.findFileByName(searchedWord);
            return wordExistsLocally.length ? fetchFromLocal() : fetchFromAPI();
        } catch (error) {
            throw new Error(getErrorMessage(error));
        }
    }

    /**
     *
     */
    async function fetchFromAPI(): Promise<SearchResult[]> {
        const response = await fetch(defaultURL + searchedWord);
        const data = await response.json();

        // If it's not an array is because the API doesn't have/find the word
        if (!Array.isArray(data)) {
            throw new Error((data as SearchResultNotFound).message);
        }

        FilesAndFolder.saveWord(searchedWord, data as unknown as SearchResult[]);

        return data as unknown as SearchResult[];
    }

    /**
     *
     * @returns
     */
    function fetchFromLocal(): SearchResult[] {
        console.info('USANDO DATA LOCAL');
        return FilesAndFolder.getWord(searchedWord);
    }

    return {
        fetchWord
    };
})();
