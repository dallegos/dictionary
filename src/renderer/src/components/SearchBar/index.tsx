import { useSearch } from '../../contexts';
import { SearchInput } from '../SearchInput';
import { Icon } from '../Icon';
import { MenuButton } from '../MenuButton';
import styles from './SearchBar.module.css';
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
