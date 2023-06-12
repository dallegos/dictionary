import { createContext, Dispatch, PropsWithChildren, useContext, useState } from 'react';

interface AudioOptions {
    volume: number;
    setVolume: Dispatch<React.SetStateAction<number>>;
}

interface FontOptions {
    fontSize: string;
    setFontSize: Dispatch<React.SetStateAction<string>>;
}

export const fontSizesMap = {
    small: '12px',
    normal: '16px',
    large: '20px',
    extra: '24px'
};

interface ConfigurationContextPayload {
    audio: AudioOptions;
    font: FontOptions;
}

const ConfigurationContext = createContext<ConfigurationContextPayload>({} as ConfigurationContextPayload);

/**
 * Search context provider
 */
export function ConfigurationProvider(props: PropsWithChildren<unknown>): JSX.Element {
    const [volume, setVolume] = useState<number>(0.3);
    const [fontSize, setFontSize] = useState<string>(fontSizesMap.normal);

    return (
        <ConfigurationContext.Provider
            value={{
                audio: {
                    volume,
                    setVolume
                },
                font: {
                    fontSize,
                    setFontSize
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
