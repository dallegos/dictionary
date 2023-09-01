import { useEffect, useMemo, useState } from 'react';
import styles from './Sentence.module.css';
import { useSearch } from '../../contexts';

interface SentenceProps {
    value: string;
}

/**
 *
 * @returns
 */
export function Sentence(props: SentenceProps): JSX.Element {
    const newSentences = useMemo((): JSX.Element => {
        const splitWords = props.value.split(' ');

        const finalSentence = splitWords.map((word: string, i: number) => {
            return <Word key={`split-word-${i}`} text={word} last={i === splitWords.length - 1} />;
        });

        return <>{finalSentence}</>;
    }, [props.value]);

    useEffect(() => {}, [props.value]);

    return newSentences;
}

interface WordProps {
    text: string;
    last: boolean;
}

/**
 *
 */
export function Word(props: WordProps): JSX.Element {
    const [clicked, setClicked] = useState<boolean>();
    const { word, setWord, searchWord } = useSearch();

    function handleOnWordClick(word: string): void {
        setWord(word.replace(/[^a-z0-9]/gi, ''));
        setClicked(true);
    }

    useEffect(() => {
        if (clicked) searchWord();
        setClicked(false);
    }, [word, clicked, setClicked]);

    return (
        <>
            <span
                onClick={() => {
                    handleOnWordClick(props.text);
                }}
                className={styles.word}>
                {props.text}
            </span>
            {!props.last && <>{` `}</>}
        </>
    );
}
