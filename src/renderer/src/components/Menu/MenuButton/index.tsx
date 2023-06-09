import { useEffect, useState } from 'react';
import styles from './MenuButton.module.css';
import { className } from '../../../utils';
import { useInfoBox } from '../../InfoBox';

/**
 *
 * @returns
 */
export function MenuButton(): JSX.Element {
    const [opened, setOpened] = useState<boolean>(false);
    const { setIsOpen } = useInfoBox();

    useEffect(() => {
        console.log('OPENED ', opened);

        setIsOpen(opened);
    }, [opened]);

    return (
        <button {...className(styles.button, { [styles.opened]: opened })} onClick={() => setOpened(!opened)}>
            <span></span>
        </button>
    );
}
