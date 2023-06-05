import { createContext, PropsWithChildren, useContext, useState } from 'react';

interface SearchContextPayload {
    search: never[];
}

const SearchContext = createContext<SearchContextPayload>({} as SearchContextPayload);

/**
 * Search context provider
 */
export function SearchProvider(props: PropsWithChildren<unknown>): JSX.Element {
    const [search, setSearch] = useState([]);

    return <SearchContext.Provider value={{ search }}>{props.children}</SearchContext.Provider>;
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
