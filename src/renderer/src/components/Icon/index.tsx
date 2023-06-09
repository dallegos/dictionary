import { MouseEvent } from 'react';
import { IconType, className, icons } from '../../utils';
import { MappedStyles } from 'interfaces';
import styles from './Icon.module.css';

interface IconProps {
    id?: string;
    name: IconType;
    size?: number;
    fill?: string;
    stoke?: string;
    className?: string;
    onClick?: (e: MouseEvent<HTMLSpanElement>) => void;
}

/**
 *
 * @returns
 */
export function Icon(props: IconProps): JSX.Element {
    return (
        <span
            {...className(styles.icon, props.className)}
            style={
                {
                    '--icon-size': `${props.size || 18}px`,
                    '--icon-fill-color': props.fill,
                    '--icon-stroke-color': props.stoke
                } as MappedStyles
            }
            id={props.id}
            onClick={props.onClick}>
            {icons[props.name]}
        </span>
    );
}
