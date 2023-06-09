import { SearchResult } from 'interfaces';
import { createContext, Dispatch, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';
import { getErrorMessage } from '../../../utils';

interface AudioOptions {
    volume: number;
}

interface ConfigurationContextPayload {
    audio: AudioOptions;
}

const ConfigurationContext = createContext<ConfigurationContextPayload>({} as ConfigurationContextPayload);

/**
 * Search context provider
 */
export function ConfigurationProvider(props: PropsWithChildren<unknown>): JSX.Element {
    const [volume, setVolume] = useState<number>(0.3);

    return (
        <ConfigurationContext.Provider
            value={{
                audio: {
                    volume
                }
            }}>
            {props.children}
        </ConfigurationContext.Provider>
    );
}

/**
 * Exposes the context
 */
export function useConfiguration(): ConfigurationContextPayload {
    const context = useContext(ConfigurationContext);

    if (Object.entries(context).length === 0) {
        throw new Error('useConfiguration must be used within a ConfigurationContext');
    }

    return context;
}
