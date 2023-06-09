import { useEventListener } from './useEventListener';

/**
 *
 * @param key
 * @param callback
 * @param target
 */
export function useKeyPress(key: string, callback: (event: KeyboardEvent) => unknown, target?: HTMLElement | Window): void {
    function handleKeyPress(event: KeyboardEvent): void {
        if (event.key === key) {
            callback(event);
        }
    }

    useEventListener('keydown', handleKeyPress, target);
}
