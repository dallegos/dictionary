import { useState } from 'react';
import { className } from '../../utils';
import styles from './InfoBox.module.css';

interface InfoBoxProps {
    show: boolean;
    title: string;
}

/**
 *
 * @returns
 */
function InfoBox(props: InfoBoxProps): JSX.Element {
    return (
        <div {...className(styles.infoBoxContainer, { [styles.open]: !props.show })}>
            <div>
                <h3>{props.title}</h3>
            </div>
        </div>
    );
}

export function useInfoBox() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return {
        element: <InfoBox show={isOpen} title={'Searching...'} />,
        isOpen,
        setIsOpen
    };
}
