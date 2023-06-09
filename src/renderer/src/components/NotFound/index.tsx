import { Icon } from '../Icon';
import styles from './NotFound.module.css';

interface NotFoundProps {
    message: string;
}

/**
 *
 */
export function NotFound(props: NotFoundProps): JSX.Element {
    return (
        <div className={styles.missingContainer}>
            <Icon name="missing" size={52} />
            <p>{props.message}</p>
        </div>
    );
}
