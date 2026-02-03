import { useState, useEffect } from 'react';

const ENC_PREFIX = 'enc:';

export function useLocalStorage(key, initialValue) {
    // Pass function to useState to initialize only once
    const [storedValue, setStoredValue] = useState(() => {
        if (typeof window === 'undefined') {
            return initialValue;
        }
        try {
            const item = window.localStorage.getItem(key);
            if (!item) return initialValue;

            // Decrypt if encrypted
            if (item.startsWith(ENC_PREFIX)) {
                const encrypted = item.slice(ENC_PREFIX.length);
                const decrypted = atob(encrypted);
                return JSON.parse(decrypted);
            }

            // Fallback for legacy cleartext
            return JSON.parse(item);
        } catch (error) {
            console.warn(`Error reading localStorage key “${key}”:`, error);
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;

            setStoredValue(valueToStore);

            if (typeof window !== 'undefined') {
                // Encrypt before saving
                const stringified = JSON.stringify(valueToStore);
                const encrypted = ENC_PREFIX + btoa(stringified);
                window.localStorage.setItem(key, encrypted);
            }
        } catch (error) {
            console.warn(`Error setting localStorage key “${key}”:`, error);
        }
    };

    // Auto-migrate cleartext to encrypted on mount
    useEffect(() => {
        try {
            const item = window.localStorage.getItem(key);
            if (item && !item.startsWith(ENC_PREFIX)) {
                // Detect cleartext and force save (encrypt)
                console.log(`Migrating ${key} to encrypted storage...`);
                setValue(JSON.parse(item));
            }
        } catch (e) {
            // ignore
        }
    }, [key]);

    return [storedValue, setValue];
}
