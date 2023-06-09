import { createContext, Dispatch, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';
import { IconType } from '../utils';

interface ToastContextPayload {
    isOpen: boolean;
    setIsOpen: Dispatch<React.SetStateAction<boolean>>;
}

const ToastContext = createContext<ToastContextPayload>({} as ToastContextPayload);

/**
 * Toast context provider
 */
export function ToastProvider(props: PropsWithChildren<unknown>): JSX.Element {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <ToastContext.Provider
            value={{
                isOpen,
                setIsOpen
            }}>
            {props.children}
        </ToastContext.Provider>
    );
}

/**
 * Exposes the context
 */
export function useToast(): ToastContextPayload {
    const context = useContext(ToastContext);

    if (Object.entries(context).length === 0) {
        throw new Error('useToast must be used within a ToastContext');
    }

    return context;
}
