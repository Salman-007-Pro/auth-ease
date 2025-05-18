import { scale, verticalScale } from '@/utilities/shared/Metrics';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, withRepeat, withSequence, withTiming } from 'react-native-reanimated';

import { Colors } from '@/constants/colors';

const MovieDetailSkeleton = () => {
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
            {/* Header Skeleton */}
            <View style={styles.posterContainer}>
                <View style={styles.poster} />
                <View style={styles.backButton} />
            </View>

            <View style={styles.content}>
                {/* Title Skeleton */}
                <View style={styles.titleSkeleton} />
                <View style={styles.infoContainer}>
                    <View style={styles.ratingSkeleton} />
                    <View style={styles.infoSkeleton} />
                    <View style={styles.infoSkeleton} />
                </View>

                {/* Overview Section */}
                <View style={styles.section}>
                    <View style={styles.sectionTitleSkeleton} />
                    <View style={styles.plotSkeleton} />
                    <View style={styles.plotSkeleton} />
                </View>

                {/* Cast Section */}
                <View style={styles.section}>
                    <View style={styles.sectionTitleSkeleton} />
                    <View style={styles.infoRowSkeleton} />
                    <View style={styles.infoRowSkeleton} />
                </View>

                {/* Details Section */}
                <View style={styles.section}>
                    <View style={styles.sectionTitleSkeleton} />
                    <View style={styles.infoRowSkeleton} />
                    <View style={styles.infoRowSkeleton} />
                    <View style={styles.infoRowSkeleton} />
                </View>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    posterContainer: {
        width: '100%',
        height: verticalScale(300),
        position: 'relative',
        backgroundColor: Colors.card,
    },
    poster: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.skeleton,
    },
    backButton: {
        position: 'absolute',
        top: verticalScale(16),
        left: scale(16),
        width: scale(40),
        height: scale(40),
        borderRadius: scale(20),
        backgroundColor: Colors.skeleton,
    },
    content: {
        padding: scale(16),
        marginTop: -verticalScale(40),
    },
    titleSkeleton: {
        height: verticalScale(28),
        width: '80%',
        backgroundColor: Colors.skeleton,
        borderRadius: scale(4),
        marginBottom: verticalScale(16),
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(16),
        marginBottom: verticalScale(24),
        backgroundColor: Colors.primary,
        padding: scale(16),
        borderTopLeftRadius: scale(10),
        borderTopRightRadius: scale(10),
    },
    ratingSkeleton: {
        width: scale(60),
        height: verticalScale(24),
        backgroundColor: Colors.skeleton,
        borderRadius: scale(4),
    },
    infoSkeleton: {
        width: scale(40),
        height: verticalScale(16),
        backgroundColor: Colors.skeleton,
        borderRadius: scale(4),
    },
    section: {
        marginBottom: verticalScale(24),

        // remove this if this look not good
        backgroundColor: Colors.primary,
        padding: scale(16),
        borderTopLeftRadius: scale(10),
        borderTopRightRadius: scale(10),
    },
    sectionTitleSkeleton: {
        width: scale(120),
        height: verticalScale(24),
        backgroundColor: Colors.skeleton,
        borderRadius: scale(4),
        marginBottom: verticalScale(16),
    },
    plotSkeleton: {
        height: verticalScale(16),
        backgroundColor: Colors.skeleton,
        borderRadius: scale(4),
        marginBottom: verticalScale(8),
    },
    infoRowSkeleton: {
        height: verticalScale(20),
        backgroundColor: Colors.skeleton,
        borderRadius: scale(4),
        marginBottom: verticalScale(12),
        width: '60%',
    },
});

export default MovieDetailSkeleton;
