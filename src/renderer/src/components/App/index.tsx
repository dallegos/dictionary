import { ConfigurationProvider, SearchProvider, ToastProvider } from '../../contexts';
import { Results } from '../Results';
import { SearchBar } from '../SearchBar';
import styles from './App.module.css';

/**
 *
 * @returns
 */
export function App(): JSX.Element {
    return (
        <ToastProvider>
            <ConfigurationProvider>
                <SearchProvider>
                    <div className={styles.appContainer}>
                        <SearchBar />
                        <Results />
                    </div>
                </SearchProvider>
            </ConfigurationProvider>
        </ToastProvider>
    );
}
