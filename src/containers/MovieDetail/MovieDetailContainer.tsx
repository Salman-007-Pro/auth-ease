import Fonts from '@/utilities/shared/Fonts';
import { scale } from '@/utilities/shared/Metrics';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/colors';

import PrimaryButton from '@/components/Buttons/PrimaryButton';

import moviesService from '@/services/movies.service';

import { useQuery } from '@/hooks/useQuery';

import { Movie } from '../Movies/types';
import MovieDetailHeader from './MovieDetailHeader';
import MovieDetailInfo from './MovieDetailInfo';
import MovieDetailSkeleton from './MovieDetailSkeleton';
import { MovieDetailContainerProps } from './types';

const MovieDetailContainer: React.FC<MovieDetailContainerProps> = ({ id }) => {
    const router = useRouter();

    const {
        data: movie,
        isLoading,
        isRefetching,
        refetch,
    } = useQuery<Movie>(['movieDetail', id], async () => moviesService.getMovieDetail(id));

    console.log(id, movie);

    const handleBack = () => {
        router.back();
    };

    if (isLoading) {
        return <MovieDetailSkeleton />;
    }

    if (!movie) {
        return (
            <View style={styles.notFoundContainer}>
                <Text style={styles.notFoundTitle}>Movie Not Found</Text>
                <Text style={styles.notFoundText}>Sorry, we couldn't find the movie you're looking for.</Text>
                <PrimaryButton title="Go Back" onPress={handleBack} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MovieDetailHeader {...movie} posterPath={movie.poster} onBack={handleBack} />
            <MovieDetailInfo {...movie} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    notFoundContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: scale(16),
    },
    notFoundTitle: {
        ...Fonts.Bold(24, Colors.primary),
    },
    notFoundText: {
        ...Fonts.Regular(16, Colors.textSecondary),
    },
});

export default MovieDetailContainer;
