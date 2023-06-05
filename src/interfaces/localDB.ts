import { SearchResult } from './search';

export interface LocalDBSearchResult {
    word: string;
    raw: SearchResult[];
}
