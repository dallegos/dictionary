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
export function InfoBox(props: InfoBoxProps): JSX.Element {
    return (
        <div {...className(styles.infoBoxContainer, { [styles.open]: !props.show })}>
            <div>
                <h5>{props.title}</h5>
            </div>
        </div>
    );
}
