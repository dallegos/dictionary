/**
 *
 */
export const icons = Object.freeze({
    search: (
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"></path>
        </svg>
    ),
    close: (
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm86.63 272L320 342.63l-64-64-64 64L169.37 320l64-64-64-64L192 169.37l64 64 64-64L342.63 192l-64 64z"></path>
        </svg>
    ),
    missing: (
        <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M3 7v4a1 1 0 0 0 1 1h3"></path>
            <path d="M7 7v10"></path>
            <path d="M10 8v8a1 1 0 0 0 1 1h2a1 1 0 0 0 1 -1v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1z"></path>
            <path d="M17 7v4a1 1 0 0 0 1 1h3"></path>
            <path d="M21 7v10"></path>
        </svg>
    ),
    play: (
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path d="M892.1 737.8l-110.3-63.7a15.9 15.9 0 0 0-21.7 5.9l-19.9 34.5c-4.4 7.6-1.8 17.4 5.8 21.8L856.3 800a15.9 15.9 0 0 0 21.7-5.9l19.9-34.5c4.4-7.6 1.7-17.4-5.8-21.8zM760 344a15.9 15.9 0 0 0 21.7 5.9L892 286.2c7.6-4.4 10.2-14.2 5.8-21.8L878 230a15.9 15.9 0 0 0-21.7-5.9L746 287.8a15.99 15.99 0 0 0-5.8 21.8L760 344zm174 132H806c-8.8 0-16 7.2-16 16v40c0 8.8 7.2 16 16 16h128c8.8 0 16-7.2 16-16v-40c0-8.8-7.2-16-16-16zM625.9 115c-5.9 0-11.9 1.6-17.4 5.3L254 352H90c-8.8 0-16 7.2-16 16v288c0 8.8 7.2 16 16 16h164l354.5 231.7c5.5 3.6 11.6 5.3 17.4 5.3 16.7 0 32.1-13.3 32.1-32.1V147.1c0-18.8-15.4-32.1-32.1-32.1z"></path>
        </svg>
    )
});

export type IconType = keyof typeof icons;
