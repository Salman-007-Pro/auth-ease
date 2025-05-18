import Fonts from '@/utilities/shared/Fonts';
import { scale, verticalScale } from '@/utilities/shared/Metrics';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';

import { Colors } from '@/constants/colors';

import { MovieDetailInfoProps } from './types';

const InfoSection: React.FC<{ title: string; content: string }> = ({ title, content }) => (
    <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>{title}</Text>
        <Text style={styles.infoContent}>{content}</Text>
    </View>
);

const MovieDetailInfo: React.FC<MovieDetailInfoProps> = ({
    director,
    actors,
    plot,
    genre,
    language,
    country,
    boxOffice,
    awards,
}) => {
    return (
        <Animated.ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            entering={FadeInDown.delay(200)}
            exiting={FadeOutDown}
        >
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Overview</Text>
                <Text style={styles.plot}>{plot}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Cast & Crew</Text>
                <InfoSection title="Director" content={director} />
                <InfoSection title="Cast" content={actors.join(', ')} />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Details</Text>
                <InfoSection title="Genre" content={genre.join(', ')} />
                <InfoSection title="Language" content={language} />
                <InfoSection title="Country" content={country} />
            </View>

            <View style={[styles.section, styles.lastSection]}>
                <Text style={styles.sectionTitle}>Box Office & Awards</Text>
                <InfoSection title="Box Office" content={boxOffice} />
                <InfoSection title="Awards" content={awards} />
            </View>
        </Animated.ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    section: {
        padding: scale(16),
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    lastSection: {
        borderBottomWidth: 0,
        paddingBottom: verticalScale(32),
    },
    sectionTitle: {
        ...Fonts.Bold(18, Colors.primary),
        marginBottom: verticalScale(12),
    },
    plot: {
        ...Fonts.Regular(14),
        color: Colors.textSecondary,
        lineHeight: verticalScale(22),
    },
    infoSection: {
        marginBottom: verticalScale(12),
    },
    infoTitle: {
        ...Fonts.SemiBold(14),
        color: Colors.textPrimary,
        marginBottom: verticalScale(4),
    },
    infoContent: {
        ...Fonts.Regular(14),
        color: Colors.textSecondary,
    },
});

export default MovieDetailInfo;
