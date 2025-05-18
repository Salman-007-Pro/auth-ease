import { Platform } from 'react-native';

// third-party library
import get from 'lodash/get';
import lodashIsEmpty from 'lodash/isEmpty';

const utilService = (() => {
    // This function is used to identify if the user platform is Android or not.
    function isPlatformAndroid(): boolean {
        return Platform.OS === 'android';
    }

    // This function is used to identify if the user platform is Android or not.
    function isPlatformIOS(): boolean {
        return Platform.OS === 'ios';
    }

    // This function is used to find a value in an object. If the value is not found, return undefined.
    function getValue(...param: Parameters<typeof get>) {
        return get(...param);
    }

    function isEmpty(value: any) {
        return lodashIsEmpty(value);
    }

    // This function is used to generate a random alphanumeric key for a unique purpose.
    function genRandomAlphanumericNumber(size: number): string {
        return [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    }

    // This method is used to create a delay.
    function delay(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    // This function converts any opacity percentage to hex value for colors
    function getOpacityHex(opacity: string): string {
        // Remove % sign and convert to number
        const percentage = parseFloat(opacity.replace('%', ''));

        // Validate percentage is between 0-100
        if (isNaN(percentage) || percentage < 0 || percentage > 100) {
            return 'FF'; // Return 100% opacity for invalid values
        }

        // Convert percentage to hex
        // 255 is max opacity (FF in hex)
        const decimal = Math.round((percentage / 100) * 255);
        const hex = decimal.toString(16).toUpperCase();

        // Ensure two digits by padding with 0 if needed
        return hex.length === 1 ? `0${hex}` : hex;
    }

    return {
        delay,
        isEmpty,
        getValue,
        isPlatformIOS,
        getOpacityHex,
        isPlatformAndroid,
        genRandomAlphanumericNumber,
    };
})();

export default utilService;
