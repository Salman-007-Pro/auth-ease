import utilService from '@/utilities/services/utils.service';
import { useEffect } from 'react';
import KeyboardManager from 'react-native-keyboard-manager';

/**
 * Custom hook to manage keyboard behavior across iOS and Android platforms
 *
 * On iOS:
 * - Enables IQKeyboardManager for better keyboard handling
 * - Adds previous/next navigation buttons above keyboard
 * - Automatically scrolls to focused input
 *
 * On Android:
 * - Uses default Android keyboard behavior
 * - Adjusts window insets automatically
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   useKeyboardManager();
 *   return <TextInput />;
 * };
 * ```
 */
const useKeyboardManager = () => {
    useEffect(() => {
        if (!utilService.isPlatformAndroid()) {
            // Enable IQKeyboardManager
            KeyboardManager.setEnable(true);

            // Enable toolbar with previous/next buttons
            KeyboardManager.setToolbarPreviousNextButtonEnable(true);

            // Additional iOS keyboard configurations
            KeyboardManager.setKeyboardDistanceFromTextField(10);
            KeyboardManager.setEnableAutoToolbar(true);
            KeyboardManager.setShouldShowToolbarPlaceholder(true);
            KeyboardManager.setShouldResignOnTouchOutside(true);
        }
    }, []);
};

export default useKeyboardManager;
