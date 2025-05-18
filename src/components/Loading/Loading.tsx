import { scale } from '@/utilities/shared/Metrics';
import React, { useEffect } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';

import { Colors } from '@/constants/colors';

/**
 * Props for the Loading component
 * @interface LoadingProps
 */
interface LoadingProps {
    /** Size of each loading dot in pixels */
    size?: number;
    /** Color of the loading dots */
    color?: string;
    /** Custom styles for the container */
    containerStyle?: ViewStyle;
    /** Number of dots to display (default: 3) */
    dotCount?: number;
    /** Delay between each dot's animation in milliseconds (default: 200) */
    animationDelay?: number;
    /** Duration of each animation cycle in milliseconds (default: 500) */
    animationDuration?: number;
    /** Scale factor for the animation (default: 1.5) */
    scaleFactor?: number;
}

/**
 * Props for the LoadingDot component
 * @interface LoadingDotProps
 */
interface LoadingDotProps {
    /** Delay before starting the animation */
    delay: number;
    /** Size of the dot */
    size: number;
    /** Color of the dot */
    color: string;
    /** Duration of the animation */
    duration: number;
    /** Scale factor for the animation */
    scaleFactor: number;
}

/**
 * Individual dot component for the loading animation
 * @component
 * @param {LoadingDotProps} props - The props for the LoadingDot component
 * @returns {React.ReactElement} An animated dot
 */
const LoadingDot = ({ delay, size, color, duration, scaleFactor }: LoadingDotProps) => {
    const scale = useSharedValue(1);

    useEffect(() => {
        scale.value = withRepeat(
            withSequence(withDelay(delay, withTiming(scaleFactor, { duration })), withTiming(1, { duration })),
            -1,
            true,
        );
    }, [delay, duration, scaleFactor]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <Animated.View
            style={[
                styles.dot,
                {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    backgroundColor: color,
                },
                animatedStyle,
            ]}
        />
    );
};

/**
 * Loading component that displays animated dots
 * @component
 * @param {LoadingProps} props - The props for the Loading component
 * @returns {React.ReactElement} A loading indicator with animated dots
 *
 * @example
 * // Basic usage
 * <Loading />
 *
 * // Custom size and color
 * <Loading size={20} color="#FF0000" />
 *
 * // Custom animation
 * <Loading
 *   dotCount={5}
 *   animationDelay={100}
 *   animationDuration={300}
 *   scaleFactor={2}
 * />
 */
export const Loading = ({
    size = 10,
    color = Colors.primary,
    containerStyle,
    dotCount = 3,
    animationDelay = 200,
    animationDuration = 500,
    scaleFactor = 1.5,
}: LoadingProps) => {
    return (
        <View style={[styles.container, containerStyle]}>
            {Array.from({ length: dotCount }).map((_, index) => (
                <LoadingDot
                    key={index}
                    delay={index * animationDelay}
                    size={size}
                    color={color}
                    duration={animationDuration}
                    scaleFactor={scaleFactor}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: scale(10),
    },
    dot: {
        width: scale(10),
        height: scale(10),
        borderRadius: scale(5),
        backgroundColor: Colors.primary,
    },
});
