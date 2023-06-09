import { useCallback, useEffect, useMemo } from 'react';
import { useConfiguration, useSearch } from '../../contexts';
import styles from './AudioButton.module.css';
import { Icon } from '../Icon';

/**
 *
 * @returns
 */
export function AudioButton(): JSX.Element {
    const { audio: audioConfig } = useConfiguration();
    const { results, getAudioSource } = useSearch();
    const audioElement = useMemo(() => new Audio(), []);

    const handlePlayAudio = useCallback(() => {
        audioElement.play();
    }, [audioElement]);

    useEffect(() => {
        const source = getAudioSource();
        if (!source) return;
        audioElement.src = source;
    }, [audioElement, results, getAudioSource]);

    useEffect(() => {
        audioElement.volume = audioConfig.volume;
    }, [audioConfig]);

    return (
        <div className={styles.audioContainer}>
            <Icon name="play" size={32} onClick={handlePlayAudio} />
        </div>
    );
}
