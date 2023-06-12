import { useState } from 'react';
import styles from './MenuButton.module.css';
import { className } from '../../utils';
import { Menu } from '../Menu';

/**
 *
 * @returns
 */
export function MenuButton(): JSX.Element {
    const [opened, setOpened] = useState<boolean>(false);

    return (
        <>
            <Menu isOpen={opened} />

            <button {...className(styles.button, { [styles.opened]: opened })} onClick={() => setOpened(!opened)}>
                <span></span>
            </button>
        </>
    );
}
