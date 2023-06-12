import { fontSizesMap, useConfiguration, useSearch } from '../../contexts';
import { Definition, MappedStyles, Meaning, SearchResult } from 'interfaces';
import { NotFound } from '../NotFound';
import { Sentence } from '../Sentence';
import styles from './Results.module.css';
import { AudioButton } from '../AudioButton';
import { InfoBox } from '../InfoBox';

/**
 *
 * @returns
 */
export function Results(): JSX.Element {
    const { results, error, isLoading, getAudioSource } = useSearch();
    const {
        font: { fontSize }
    } = useConfiguration();

    return (
        <>
            <main
                className={styles.resultsContainer}
                style={
                    {
                        '--font-size': fontSizesMap[fontSize]
                    } as MappedStyles
                }>
                {results?.length ? (
                    <>
                        <section>
                            <h1>{results[0].word}</h1>
                            <p>{results[0].phonetic}</p>

                            {getAudioSource() && <AudioButton />}
                        </section>

                        {results.map(
                            (result: SearchResult, i: number): JSX.Element => (
                                <ResultBlock result={result} key={`result-block-article-${i}`} />
                            )
                        )}
                    </>
                ) : (
                    error && <NotFound message={error} />
                )}
            </main>

            <InfoBox show={!isLoading} title={'Searching...'} />
        </>
    );
}

interface ResultBlockProps {
    result: SearchResult;
}

/**
 *
 * @param param
 */
function ResultBlock(props: ResultBlockProps): JSX.Element {
    return (
        <>
            {props.result.meanings.map(
                (meaning: Meaning, i: number): JSX.Element => (
                    <article key={`meaning-result-${i}`}>
                        <strong>{meaning.partOfSpeech}</strong>
                        <ul>
                            {meaning.definitions.map(
                                (definition: Definition, i: number): JSX.Element => (
                                    <li key={`word-definition-${i}`}>
                                        <Sentence value={definition.definition} />
                                    </li>
                                )
                            )}
                        </ul>
                    </article>
                )
            )}
        </>
    );
}
