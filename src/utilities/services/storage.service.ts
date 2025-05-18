import { StorageKeys } from "@/constants";
import { MMKV } from "react-native-mmkv";


/**
 * Service for handling local storage operations using MMKV
 */
const storageService = (() => {
    // Initialize MMKV storage
    const storage = new MMKV({
        id: StorageKeys.APP_INFO,
        encryptionKey: StorageKeys.APP_ENCRYPTION_KEY,
    });

    /**
     * Sets a value in local storage
     * @param {string} key - The key to store the value under
     * @param {string | number | boolean} value - The value to store
     * @returns {Promise<boolean>} Resolves to true when value is set
     */
    function setItem(key: string, value: string | number | boolean): Promise<boolean> {
        storage.set(key, value);
        return Promise.resolve(true);
    }

    /**
     * Checks if a key exists in local storage
     * @param {string} key - The key to check
     * @returns {boolean} True if key exists, false otherwise
     */
    function keyContain(key: string): boolean {
        return storage.contains(key);
    }

    /**
     * Retrieves a value from local storage
     * @param {string} key - The key to retrieve
     * @returns {string | undefined} The stored value or undefined if not found
     */
    function getItem(key: string): string | undefined {
        return storage.getString(key);
    }

    /**
     * Gets all keys stored in local storage
     * @returns {string[]} Array of all storage keys
     */
    function getAllKeys(): string[] {
        return storage.getAllKeys();
    }

    /**
     * Removes a key-value pair from local storage
     * @param {string} key - The key to remove
     * @returns {Promise<boolean>} Resolves to true when key is removed
     */
    function removeKey(key: string): Promise<boolean> {
        storage.delete(key);
        return Promise.resolve(true);
    }

    /**
     * Clears all data from local storage
     * @returns {Promise<boolean>} Resolves to true when storage is cleared
     */
    function clear(): Promise<boolean> {
        storage.clearAll();
        return Promise.resolve(true);
    }
    
    return {
        storage,
        clear,
        setItem,
        getItem,
        removeKey,
        keyContain,
        getAllKeys,      
    };
})();

export default storageService;
