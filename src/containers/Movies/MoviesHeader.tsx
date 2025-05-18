import Fonts from '@/utilities/shared/Fonts';
import { scale, verticalScale } from '@/utilities/shared/Metrics';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { Colors } from '@/constants/colors';

import { MovieHeaderProps } from './types';

const MoviesHeader: React.FC<MovieHeaderProps> = ({ searchQuery, onSearchChange }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Movies</Text>
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color={Colors.textSecondary} style={styles.searchIcon} />
                <TextInput
                    value={searchQuery}
                    onChangeText={onSearchChange}
                    placeholder="Search"
                    placeholderTextColor={Colors.primary}
                    style={styles.searchInput}
                    returnKeyType="search"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: scale(16),
        paddingVertical: verticalScale(16),
        backgroundColor: Colors.primary,
        marginBottom: verticalScale(16),
    },
    title: {
        ...Fonts.Bold(32),
        color: Colors.white,
        marginBottom: verticalScale(16),
        textAlign: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.card,
        borderRadius: scale(12),
        paddingHorizontal: scale(12),
        height: verticalScale(44),
    },
    searchIcon: {
        marginRight: scale(8),
    },
    searchInput: {
        flex: 1,
        ...Fonts.Regular(16),
        color: Colors.textPrimary,
        padding: 0, // Remove default padding
    },
});

export default MoviesHeader;
