import Fonts from '@/utilities/shared/Fonts';
import { scale, verticalScale } from '@/utilities/shared/Metrics';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { Colors } from '@/constants/colors';

import { MovieItemProps } from './types';

const MovieItem: React.FC<MovieItemProps> = ({ title, posterPath, releaseDate, voteAverage, onPress, director }) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
            <Animated.View style={styles.container} entering={FadeIn}>
                <Image source={{ uri: posterPath }} style={styles.poster} resizeMode="cover" />
                <View style={styles.content}>
                    <Text style={styles.title} numberOfLines={2}>
                        {title}
                    </Text>
                    <View style={styles.info}>
                        <View style={styles.infoItem}>
                            <Text style={styles.date}>{releaseDate}</Text>
                            <Text style={styles.director}>{director ?? ''}</Text>
                        </View>
                        <View style={styles.rating}>
                            <Text style={styles.ratingText}>{voteAverage.toFixed(1)}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.chevronContainer}>
                    <Ionicons name="chevron-forward" size={24} color={Colors.primary} />
                </View>
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: Colors.card,
        borderRadius: scale(12),
        marginBottom: verticalScale(12),
        overflow: 'hidden',
    },
    poster: {
        width: scale(80),
        height: 'auto',
        backgroundColor: Colors.card,
        shadowColor: Colors.shadow,
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowOpacity: 0.9,
        shadowRadius: 4,
        elevation: 8, // Increased elevation for better visibility on Android
    },
    content: {
        flex: 1,
        padding: scale(12),
    },
    title: {
        ...Fonts.SemiBold(18),
        color: Colors.textPrimary,
        marginBottom: verticalScale(8),
    },
    info: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: verticalScale(10),
    },
    date: {
        ...Fonts.Regular(14),
        color: Colors.textSecondary,
    },
    rating: {
        backgroundColor: Colors.primary,
        paddingHorizontal: scale(8),
        paddingVertical: verticalScale(4),
        borderRadius: scale(4),
    },
    ratingText: {
        ...Fonts.SemiBold(12),
        color: Colors.white,
    },
    skeleton: {
        backgroundColor: Colors.skeleton,
    },
    titleSkeleton: {
        height: verticalScale(20),
        width: '80%',
        borderRadius: scale(4),
        marginBottom: verticalScale(8),
    },
    infoSkeleton: {
        height: verticalScale(16),
        width: '40%',
        borderRadius: scale(4),
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(10),
    },
    director: {
        ...Fonts.Regular(14),
        color: Colors.textSecondary,
    },
    chevronContainer: {
        justifyContent: 'center',
    },
});

export default MovieItem;
