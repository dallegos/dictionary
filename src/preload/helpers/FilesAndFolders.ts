const os = require('os');
const fs = require('fs');
const path = require('path');
const { readdir } = require('fs/promises');
import { LocalDBSearchResult, SearchResult } from '../../interfaces';
import { getErrorMessage } from './Errors';

const FOLDER_NAME = import.meta.env.PRELOAD_VITE_DB_FOLDER;

interface FilesAndFolderPayload {
    init: () => void;
    findFileByName: (name: string) => Promise<string[]>;
    getWord: (word: string) => SearchResult[];
    saveWord: (word: string, data: SearchResult[]) => void;
    getWordsLocallySavedList: () => Promise<string[]>;
}

/**
 *
 */
export const FilesAndFolder = ((): FilesAndFolderPayload => {
    const folder = path.join(os.homedir(), FOLDER_NAME);

    /**
     * The initial method it's just for create the folder if not exists.
     */
    function init(): void {
        try {
            if (!fs.existsSync(folder)) fs.mkdirSync(folder);
        } catch (error) {
            throw new Error(getErrorMessage(error));
        }
    }

    /**
     *
     * @param name
     * @returns
     */
    const findFileByName = async (name: string): Promise<string[]> => {
        const matchedFiles: string[] = [];

        const files = await getFilesFromFolder();

        for (const file of files) {
            const filename = path.parse(file).name;

            if (filename === name) {
                matchedFiles.push(file);
            }
        }

        return matchedFiles;
    };

    /**
     *
     * @returns
     */
    async function getFilesFromFolder(): Promise<string[]> {
        const files = await readdir(folder);
        return files;
    }

    /**
     *
     * @param word
     * @returns
     */
    function getWord(word: string): SearchResult[] {
        try {
            const data = fs.readFileSync(path.join(folder, `${word}.json`), 'utf8');
            return (JSON.parse(data) as LocalDBSearchResult).raw;
        } catch (error) {
            throw new Error(getErrorMessage(error));
        }
    }

    /**
     *
     * @param word
     * @param data
     */
    function saveWord(word: string, data: SearchResult[]): void {
        fs.appendFile(
            path.join(folder, `${word}.json`),
            JSON.stringify({
                word,
                raw: data
            }),
            error => {
                if (error) throw new Error(getErrorMessage(error));
            }
        );
    }

    /**
     *
     * @returns
     */
    async function getWordsLocallySavedList(): Promise<string[]> {
        const files = await getFilesFromFolder();

        return files.reduce((acc: string[], file: string): string[] => {
            const parsed = path.parse(file);
            if (parsed.ext === '.json') acc.push(path.parse(file).name);

            return acc;
        }, []);
    }

    return {
        init,
        findFileByName,
        getWord,
        saveWord,
        getWordsLocallySavedList
    };
})();
