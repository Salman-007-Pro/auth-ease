import * as Haptics from 'expo-haptics';
import React from 'react';
import { Pressable, PressableProps, PressableStateCallbackType, StyleProp, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

// third-party library
import lodashDebounce from 'lodash/debounce';

/**
 * Custom button style type that can be a ViewStyle, a function returning ViewStyle array,
 * or an array of ViewStyles
 */
export type TButtonStyle = StyleProp<ViewStyle> | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>[]);

/**
 * Props for the ButtonView component
 * @interface ButtonViewProps
 * @extends {PressableProps}
 */
export interface ButtonViewProps extends PressableProps {
    /** Style prop that can be a ViewStyle, function, or array */
    style?: TButtonStyle;
    /** React node to be rendered inside the button */
    children: React.ReactNode;
    /** Function called when button is pressed */
    onPress: () => void;
    /** Optional function called when button is long pressed */
    onLongPress?: () => void;
    /** Whether to enable immediate click response or use debounce */
    enableClick?: boolean;
    /** Whether the button is disabled */
    disabled?: boolean;
    /** Debounce wait time in milliseconds */
    waitTime?: number;
    /** Allow for additional props */
    [x: string]: any;
}

/**
 * A customizable button component that supports regular and long press actions
 * with optional debounce functionality and haptic feedback
 *
 * @component
 * @param {ButtonViewProps} props - The props for the ButtonView component
 * @returns {React.ReactElement} A pressable button component
 */
export const ButtonView: React.FC<ButtonViewProps> = ({
    style,
    children,
    onPress = () => null,
    onLongPress = () => null,
    enableClick = true,
    disabled = false,
    waitTime = 200,
    ...rest
}) => {
    // Animation shared value for scale
    const scale = useSharedValue(1);

    // Create debounced versions of press handlers
    const debounceOnPress = lodashDebounce(onPress, waitTime);
    const debounceOnLongPress = lodashDebounce(onLongPress, waitTime);

    // Animated style using Reanimated
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    /**
     * Handles the press event with optional haptic feedback
     */
    const _onPress = () => {
        // Trigger light haptic feedback
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

        if (enableClick && onPress) {
            onPress();
        } else {
            debounceOnPress();
        }
    };

    /**
     * Handles the long press event with optional haptic feedback
     */
    const _onLongPress = () => {
        // Trigger medium haptic feedback for long press
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

        if (enableClick && onLongPress) {
            onLongPress();
        } else {
            debounceOnLongPress();
        }
    };

    const onPressIn = () => {
        scale.value = withSpring(0.95, { damping: 10, stiffness: 400 });
    };

    const onPressOut = () => {
        scale.value = withSpring(1, { damping: 10, stiffness: 400 });
    };

    return (
        <Animated.View style={animatedStyle}>
            <Pressable
                onPress={_onPress}
                onLongPress={_onLongPress}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                style={style}
                disabled={disabled}
                {...rest}
            >
                {children}
            </Pressable>
        </Animated.View>
    );
};

export default ButtonView;
