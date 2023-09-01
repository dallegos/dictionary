import { fontSizesMap, useConfiguration, useSearch } from '../../contexts';
import { Definition, MappedStyles, Meaning, SearchResult } from 'interfaces';
import { NotFound } from '../NotFound';
import { Sentence, Word } from '../Sentence';
import { AudioButton } from '../AudioButton';
import { InfoBox } from '../InfoBox';
import styles from './Results.module.css';

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

                        <p style={{ marginBottom: '16px' }}>
                            Source:{' '}
                            <a
                                style={{ textDecoration: 'underline', fontWeight: 700 }}
                                href={results[0].sourceUrls[0]}
                                target="_blank"
                                rel="noopener noreferrer">
                                {results[0].sourceUrls[0]}
                            </a>
                        </p>
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

                        <Synonyms key={`synonyms-block-${i}`} words={meaning.synonyms} />
                    </article>
                )
            )}
        </>
    );
}

interface SynonymsProps {
    words: string[];
}

function Synonyms(props: SynonymsProps): JSX.Element | null {
    return props.words.length ? (
        <>
            <h6>Synonyms</h6>
            <ul className={styles.synonymsList}>
                {props.words.map((word, i) => {
                    return (
                        <li key={`synonym-button-${i}`}>
                            <Word text={word} last={true} />
                        </li>
                    );
                })}
            </ul>
        </>
    ) : null;
}
