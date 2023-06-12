import { ChangeEvent } from 'react';
import { fontSizesMap, useConfiguration } from '../../contexts';
import { className } from '../../utils';
import styles from './Menu.module.css';

interface MenuProps {
    isOpen: boolean;
}

/**
 *
 * @returns
 */
export function Menu(props: MenuProps): JSX.Element {
    const {
        audio: { setVolume, volume },
        font: { fontSize, setFontSize }
    } = useConfiguration();

    function handleRangeChange(event: ChangeEvent<HTMLInputElement>) {
        setVolume(Math.floor(Number(event.target.value)) / 100);
    }

    return (
        <div {...className(styles.menuContainer, { [styles.opened]: props.isOpen })}>
            <section>
                <h3>Volume</h3>
                <input type="range" value={volume * 100} min="0" max="100" onChange={handleRangeChange} step={1} />
                <small {...className(styles.volumeValue)}>{Math.floor(volume * 100)} %</small>
            </section>

            <section>
                <h3>Font size</h3>
                <div>
                    {Object.keys(fontSizesMap).map(size => {
                        return (
                            <button
                                key={`font-size-button-${size}`}
                                style={{ fontSize: fontSizesMap[size], textTransform: 'capitalize' }}
                                {...className({ [styles.selected]: size === fontSize })}
                                onClick={() => setFontSize(size)}>
                                {size}
                            </button>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
