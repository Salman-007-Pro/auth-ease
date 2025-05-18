import { scale, verticalScale } from '@/utilities/shared/Metrics';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, withRepeat, withSequence, withTiming } from 'react-native-reanimated';

import { Colors } from '@/constants/colors';

interface MovieSkeletonProps {
    count?: number;
}

const MovieSkeletonItem = () => {
    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: withRepeat(
                withSequence(withTiming(0.5, { duration: 800 }), withTiming(1, { duration: 800 })),
                -1,
                true,
            ),
        };
    });

    return (
        <Animated.View style={[styles.container, animatedStyle]}>
            <View style={styles.poster} />
            <View style={styles.content}>
                <View style={styles.titleSkeleton} />
                <View style={styles.infoContainer}>
                    <View style={styles.dateSkeleton} />
                    <View style={styles.ratingSkeleton} />
                </View>
            </View>
        </Animated.View>
    );
};

const MovieSkeleton: React.FC<MovieSkeletonProps> = ({ count = 8 }) => {
    return (
        <View style={styles.listContainer}>
            {Array(count)
                .fill(null)
                .map((_, index) => (
                    <MovieSkeletonItem key={`skeleton-${index}`} />
                ))}
        </View>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        paddingHorizontal: scale(16),
    },
    container: {
        flexDirection: 'row',
        backgroundColor: Colors.card,
        borderRadius: scale(12),
        marginBottom: verticalScale(12),
        overflow: 'hidden',
    },
    poster: {
        width: scale(80),
        height: verticalScale(120),
        backgroundColor: Colors.skeleton,
    },
    content: {
        flex: 1,
        padding: scale(12),
    },
    titleSkeleton: {
        height: verticalScale(20),
        width: '80%',
        backgroundColor: Colors.skeleton,
        borderRadius: scale(4),
        marginBottom: verticalScale(8),
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    dateSkeleton: {
        height: verticalScale(16),
        width: '30%',
        backgroundColor: Colors.skeleton,
        borderRadius: scale(4),
    },
    ratingSkeleton: {
        height: verticalScale(24),
        width: '15%',
        backgroundColor: Colors.skeleton,
        borderRadius: scale(4),
    },
});

export default MovieSkeleton;
