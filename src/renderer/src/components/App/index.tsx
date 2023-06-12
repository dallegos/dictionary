import { ConfigurationProvider, SearchProvider } from '../../contexts';
import { Results } from '../Results';
import { SearchBar } from '../SearchBar';
import styles from './App.module.css';

/**
 *
 * @returns
 */
export function App(): JSX.Element {
    return (
        <ConfigurationProvider>
            <SearchProvider>
                <div className={styles.appContainer}>
                    <SearchBar />
                    <Results />
                </div>
            </SearchProvider>
        </ConfigurationProvider>
    );
}
