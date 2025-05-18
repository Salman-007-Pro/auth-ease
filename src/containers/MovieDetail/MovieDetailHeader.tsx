import Fonts from '@/utilities/shared/Fonts';
import { scale, verticalScale } from '@/utilities/shared/Metrics';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { Colors } from '@/constants/colors';

import { MovieDetailHeaderProps } from './types';

const MovieDetailHeader: React.FC<MovieDetailHeaderProps> = ({ title, posterPath, rating, year, runtime, onBack }) => {
    const formatRuntime = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes}m`;
    };

    return (
        <Animated.View style={styles.container} entering={FadeIn}>
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color={Colors.white} />
            </TouchableOpacity>
            <View style={styles.posterContainer}>
                <Image source={{ uri: posterPath }} style={styles.poster} resizeMode="cover" />
                <View style={styles.overlay} />
            </View>
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={2}>
                    {title}
                </Text>
                <View style={styles.infoContainer}>
                    <View style={styles.rating}>
                        <Ionicons name="star" size={16} color={Colors.primary} />
                        <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
                    </View>
                    <Text style={styles.info}>{year}</Text>
                    <Text style={styles.info}>{formatRuntime(runtime)}</Text>
                </View>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
    },
    backButton: {
        position: 'absolute',
        top: verticalScale(16),
        left: scale(16),
        zIndex: 2,
        padding: scale(8),
        backgroundColor: Colors.primary + '80',
        borderRadius: scale(20),
    },
    posterContainer: {
        width: '100%',
        height: verticalScale(300),
        position: 'relative',
    },
    poster: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: Colors.black + '40',
    },
    content: {
        padding: scale(16),
        marginTop: -verticalScale(40),
        backgroundColor: Colors.primary,
        borderTopLeftRadius: scale(10),
        borderTopRightRadius: scale(10),
    },
    title: {
        ...Fonts.Bold(24),
        color: Colors.white,
        marginBottom: verticalScale(8),
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(16),
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(4),
        backgroundColor: Colors.card,
        paddingHorizontal: scale(8),
        paddingVertical: verticalScale(4),
        borderRadius: scale(4),
    },
    ratingText: {
        ...Fonts.SemiBold(14),
        color: Colors.primary,
    },
    info: {
        ...Fonts.Regular(14),
        color: Colors.textSecondary,
    },
});

export default MovieDetailHeader;
