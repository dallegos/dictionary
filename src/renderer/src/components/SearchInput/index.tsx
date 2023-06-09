import { useRef } from 'react';
import { useSearch } from '../../contexts';
import { useKeyPress } from '../../hooks';
import styles from './SearchInput.module.css';
import { Icon } from '../Icon';

/**
 *
 * @returns
 */
export function SearchInput(): JSX.Element {
    const inputRef = useRef<HTMLInputElement>(null);
    const { word, setWord, searchWord, clear } = useSearch();

    useKeyPress('Enter', searchWord, inputRef.current || window);

    return (
        <div className={styles.inputContainer}>
            <input ref={inputRef} placeholder="type a word..." type="text" value={word} onChange={event => setWord(event.currentTarget.value)} />

            {word && <Icon className={styles.icon} name="close" size={22} onClick={clear} />}
        </div>
    );
}
