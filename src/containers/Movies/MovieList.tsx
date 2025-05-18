import { scale } from '@/utilities/shared/Metrics';
import React from 'react';
import { ListRenderItemInfo, StyleSheet } from 'react-native';

import FlatListHandler from '@/components/FlatListHandler/FlatListHandler';

import MovieItem from './MovieItem';
import MovieSkeleton from './MovieSkeleton';
import { Movie, MovieListProps } from './types';

const MovieList: React.FC<MovieListProps> = ({
    movies,
    isLoading = false,
    isFetching = false,
    isLoadingMore = false,
    hasNextPage = false,
    onMoviePress,
    onRefresh,
    onLoadMore,
}) => {
    const renderMovie = ({ item }: ListRenderItemInfo<Movie>) => (
        <MovieItem
            posterPath={item.poster}
            releaseDate={item.year.toString()}
            voteAverage={item.rating}
            {...item}
            onPress={() => onMoviePress(item)}
        />
    );

    if (isLoading) {
        return <MovieSkeleton count={8} />;
    }

    const meta =
        onRefresh || onLoadMore
            ? {
                  refetch: onRefresh || (async () => {}),
                  isFetched: true,
                  isFetchingNextPage: isLoadingMore,
                  fetchNextPage: onLoadMore || (async () => {}),
                  hasNextPage,
              }
            : undefined;
    return (
        <FlatListHandler<Movie>
            data={movies}
            extraData={isFetching || isLoading}
            renderItem={renderMovie}
            keyExtractor={(movie) => `movie-${movie.id}`}
            containerStyle={styles.list}
            meta={meta}
            shouldRefresh={!!onRefresh}
            shouldFetchMore={!!onLoadMore}
            footerLoadingCondition={isLoadingMore}
            loadingStyle={styles.loadingStyle}
        />
    );
};

const styles = StyleSheet.create({
    list: {
        paddingHorizontal: scale(16),
    },
    loadingStyle: {
        paddingHorizontal: scale(16),
    },
});

export default MovieList;
