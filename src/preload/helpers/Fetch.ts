const fetch = require('node-fetch');
import { SearchResult, SearchResultNotFound } from '../../interfaces';
import { getErrorMessage } from './Errors';
import { FilesAndFolder } from './FilesAndFolders';

interface FetchPayload {
    fetchWord: (word: string) => Promise<SearchResult[]>;
}

/**
 *
 */
export const Fetch = ((): FetchPayload => {
    const defaultURL = import.meta.env.PRELOAD_VITE_API_URL + import.meta.env.PRELOAD_VITE_API_VERSION + import.meta.env.PRELOAD_VITE_API_ENDPOINT;
    let searchedWord = '';

    async function fetchWord(word: string): Promise<SearchResult[]> {
        searchedWord = word;

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
