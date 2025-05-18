import MovieDetailContainer from '@/containers/MovieDetail/MovieDetailContainer';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/colors';

const MovieDetailScreen = () => {
    const { id } = useLocalSearchParams<{ id: string }>();

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
            <MovieDetailContainer id={id} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
});

export default MovieDetailScreen;
