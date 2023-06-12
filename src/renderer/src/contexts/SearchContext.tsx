import { createContext, Dispatch, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';
import { SearchResult } from 'interfaces';
import { getErrorMessage } from '../../../utils';

interface SearchContextPayload {
    word: string;
    results: SearchResult[] | undefined;
    wordsList: string[];
    isLoading: boolean;
    error?: string;
    setWord: Dispatch<React.SetStateAction<string>>;
    searchWord: () => void;
    clear: () => void;
    getAudioSource: () => string | undefined;
}

const SearchContext = createContext<SearchContextPayload>({} as SearchContextPayload);

/**
 * Search context provider
 */
export function SearchProvider(props: PropsWithChildren<unknown>): JSX.Element {
    const [word, setWord] = useState<string>('');
    const [results, setResults] = useState<SearchResult[]>();
    const [wordsList, setWordsList] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    /**
     *
     */
    async function searchWord(): Promise<void> {
        if (!word) return;
        setIsLoading(true);
        setError(undefined);
        setResults([]);

        try {
            const response = await window.api.fetchWord(word.trim());
            setResults(response);
        } catch (error) {
            //throw new Error();
            setError(getErrorMessage(error));
        } finally {
            setIsLoading(false);
        }
    }

    function clear(): void {
        setWord('');
        setError(undefined);
        setResults([]);
    }

    /**
     *
     */
    const getAudioSource = useCallback((): string | undefined => {
        if (!results) return;

        return results.find(res => res.phonetics.length)?.phonetics.find(phonetic => phonetic.audio.includes('-us') || phonetic.audio.includes('-uk'))
            ?.audio;
    }, [results]);

    /**
     *
     */
    useEffect(() => {
        (async () => {
            const wordsList = await window.api.wordsList();
            setWordsList(wordsList);
        })();
    }, [results]);

    useEffect(() => {
        //console.log('wordsList', wordsList);
    }, [wordsList]);

    useEffect(() => {
        console.log('isLoading', isLoading);
    }, [isLoading]);

    return (
        <SearchContext.Provider
            value={{
                word,
                results,
                wordsList,
                isLoading,
                error,
                setWord,
                searchWord,
                clear,
                getAudioSource
            }}>
            {props.children}
        </SearchContext.Provider>
    );
}

/**
 * Exposes the context
 */
export function useSearch(): SearchContextPayload {
    const context = useContext(SearchContext);

    if (Object.entries(context).length === 0) {
        throw new Error('useSearch must be used within a SearchContext');
    }

    return context;
}
