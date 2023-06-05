// import Versions from './components/Versions';
import { SearchInput } from '..';
import { SearchProvider } from '../../contexts';
import styles from './App.module.css';

/**
 *
 * @returns
 */
export function App(): JSX.Element {
    return (
        <SearchProvider>
            <div className={styles.appContainer}>
                <SearchInput />

                {/* <Versions></Versions> */}
                {/* <h1>keyboard</h1>

                <p>/ˈkiːbɔːd/</p> */}
            </div>
        </SearchProvider>
    );
}
