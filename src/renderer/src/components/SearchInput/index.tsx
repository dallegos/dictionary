import { Fragment, useCallback, useEffect, useState } from 'react';
import { SearchResult } from 'interfaces';
import styles from './SearchInput.module.css';

/**
 *
 * @returns
 */
export function SearchInput(): JSX.Element {
    const [word, setWord] = useState<string>('');
    const [audio, setAudio] = useState<HTMLAudioElement>();
    const [results, setResults] = useState<SearchResult[]>();
    const [wordsList, setWordsList] = useState<string[]>([]);

    /**
     *
     */
    function handleOnChange(value: string): void {
        setWord(value);
    }

    /**
     *
     */
    async function handleOnSearch(): Promise<void> {
        const results = (await window.api.fetchWord(word)) as SearchResult[];

        setResults(results);

        const lastAudioLink = results![0].phonetics.find(phonetic => phonetic.audio.includes('-us') || phonetic.audio.includes('-uk'));

        setAudio(lastAudioLink ? new Audio(lastAudioLink.audio) : undefined);
    }

    const handleOnClickPlayAudio = useCallback((): void => {
        if (audio) audio.play();
    }, [results]);

    useEffect(() => {
        (async () => {
            const wordsList = await window.api.wordsList();
            setWordsList(wordsList);
        })();
    }, [results]);

    useEffect(() => {
        console.log('wordsList', wordsList);
    }, [wordsList]);

    return (
        <>
            <div className={styles.inputContainer}>
                <input type="text" value={word} onChange={event => handleOnChange(event.currentTarget.value)} />

                <button onClick={handleOnSearch}>Search</button>
            </div>

            <div className={styles.resultsContainer}>
                {results && (
                    <>
                        {audio && (
                            <div>
                                <button onClick={handleOnClickPlayAudio}>Play audio</button>
                            </div>
                        )}
                        <ResultsBox results={results} />
                    </>
                )}
            </div>
        </>
    );
}

function ResultsBox({ results }: { results: SearchResult[] }): JSX.Element {
    return (
        <>
            {results.map((result, i) => (
                <Fragment key={`search-result-${i}`}>
                    <h1>{result.word}</h1>
                    <p>{result.phonetic}</p>

                    {result.meanings.map((meaning, i) => (
                        <Fragment key={`meaning-result-${i}`}>
                            <span>{meaning.partOfSpeech}</span>
                            <ul>
                                {meaning.definitions.map((definition, i) => (
                                    <li key={`word-definition-${i}`}>{definition.definition}</li>
                                ))}
                            </ul>
                        </Fragment>
                    ))}
                </Fragment>
            ))}
        </>
    );
}
