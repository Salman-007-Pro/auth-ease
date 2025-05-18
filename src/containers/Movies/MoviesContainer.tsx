import { pathGenerator } from '@/utilities/services/router.service';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Colors } from '@/constants/colors';
import Routes from '@/constants/routes';

import moviesService from '@/services/movies.service';

import { useQuery } from '@/hooks/useQuery';

import lodashDebounce from 'lodash/debounce';

import MovieList from './MovieList';
import MoviesHeader from './MoviesHeader';
import { Movie } from './types';

// Sample data for testing
const sampleMovies: Movie[] = [
    {
        id: 3,
        title: 'The Dark Knight',
        year: 2008,
        genre: ['Action', 'Crime', 'Drama'],
        rating: 9,
        director: 'Christopher Nolan',
        actors: ['Christian Bale', 'Heath Ledger', 'Gary Oldman'],
        plot: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
        poster: 'https://fakeimg.pl/220x310/ff00ff',
        trailer: 'https://example.com/the_dark_knight_trailer.mp4',
        runtime: 152,
        awards: 'Won 2 Oscars',
        country: 'USA',
        language: 'English',
        boxOffice: '$1.005 billion',
        production: 'Warner Bros. Pictures',
        website: 'https://www.warnerbros.com/movies/dark-knight',
    },
];

const Movies: React.FC = () => {
    const router = useRouter();

    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchQuery = useMemo(() => lodashDebounce((text: string) => setSearchQuery(text), 500), []);

    const { data, isLoading, isRefetching, refetch } = useQuery(['movies', searchQuery], async () =>
        moviesService.getMovies(searchQuery),
    );

    const handleMoviePress = (movie: Movie) => {
        router.push(pathGenerator(Routes.MovieDetail, { id: movie.id }));
    };

    const handleRefresh = async () => {
        await refetch();
    };

    return (
        <View style={styles.container}>
            <MoviesHeader onSearchChange={debouncedSearchQuery} />
            <MovieList
                movies={data}
                isLoading={isLoading}
                isFetching={isRefetching}
                onMoviePress={handleMoviePress}
                onRefresh={handleRefresh}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
});

export default Movies;
