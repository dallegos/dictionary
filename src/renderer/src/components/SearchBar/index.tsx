import { useSearch } from '../../contexts';
import { SearchInput } from '../SearchInput';
import { Icon } from '../Icon';
import styles from './SearchBar.module.css';
import { MenuButton } from '../Menu';

/**
 *
 * @returns
 */
export function SearchBar(): JSX.Element {
    const { searchWord } = useSearch();

    return (
        <header className={styles.headerContainer}>
            <MenuButton />

            <SearchInput />

            <button onClick={searchWord}>
                <Icon name="search" size={30} />
            </button>
        </header>
    );
}
