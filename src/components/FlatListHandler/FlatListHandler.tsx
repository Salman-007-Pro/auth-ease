import { verticalScale } from '@/utilities/shared/Metrics';
import React, { useState } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';

import { Colors } from '@/constants/colors';

import EmptyList from '../EmptyList/EmptyList';
import { Loading } from '../Loading/Loading';
import { FlatListHandlerProps } from './types';

/**
 * A wrapper component for FlatList that handles loading states, empty states,
 * pull-to-refresh, and infinite scrolling
 * @component
 * @template T - The type of items in the list
 * @param {FlatListHandlerProps<T>} props - The props for the FlatListHandler component
 * @returns {React.ReactElement} A FlatList with enhanced functionality
 *
 * @example
 * // Basic usage
 * <FlatListHandler
 *   data={items}
 *   renderItem={({ item }) => <ItemComponent item={item} />}
 *   keyExtractor={(item) => item.id}
 * />
 *
 * // With pagination and refresh
 * <FlatListHandler
 *   data={items}
 *   meta={metaInfo}
 *   isLoading={isLoading}
 *   shouldRefresh
 *   shouldFetchMore
 *   renderItem={({ item }) => <ItemComponent item={item} />}
 *   keyExtractor={(item) => item.id}
 * />
 *
 * // With custom empty state
 * <FlatListHandler
 *   data={items}
 *   noEmptyComponent={false}
 *   emptyComponentProps={{
 *     title: "No Results",
 *     description: "Try adjusting your search criteria"
 *   }}
 *   renderItem={({ item }) => <ItemComponent item={item} />}
 *   keyExtractor={(item) => item.id}
 * />
 */
const FlatListHandler = <T,>({
    data,
    meta,
    isLoading = false,
    shouldRefresh = true,
    shouldFetchMore = true,
    footerLoadingCondition = false,
    flatListRef,
    noEmptyComponent = false,
    emptyComponentProps,
    containerStyle,
    loadingStyle,
    renderItem,
    keyExtractor,
    ...rest
}: FlatListHandlerProps<T>) => {
    const [isRefreshing, setIsRefreshing] = useState(false);

    /**
     * Handles the refresh action
     */
    const handleRefresh = async () => {
        if (!meta?.refetch) return;

        setIsRefreshing(true);
        try {
            await meta.refetch();
        } finally {
            setIsRefreshing(false);
        }
    };

    /**
     * Handles fetching more data when reaching the end of the list
     */
    const handleEndReached = () => {
        if (!meta?.fetchNextPage || !meta.hasNextPage) return;
        meta.fetchNextPage();
    };

    return (
        <FlatList
            ref={flatListRef}
            data={data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={StyleSheet.flatten([styles.container, containerStyle])}
            ListEmptyComponent={() =>
                isLoading ? (
                    <Loading
                        size={6}
                        color={Colors.primary}
                        containerStyle={StyleSheet.flatten([styles.loading, loadingStyle])}
                        animationDuration={400}
                        scaleFactor={1.3}
                    />
                ) : (
                    !noEmptyComponent && <EmptyList {...emptyComponentProps} />
                )
            }
            refreshControl={
                shouldRefresh && meta?.refetch ? (
                    <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} tintColor={Colors.primary} />
                ) : undefined
            }
            onEndReached={shouldFetchMore ? handleEndReached : undefined}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
                shouldFetchMore && (footerLoadingCondition || meta?.isFetchingNextPage) ? (
                    <Loading
                        size={6}
                        color={Colors.primary}
                        containerStyle={StyleSheet.flatten([styles.footerLoading, loadingStyle])}
                        animationDuration={400}
                        scaleFactor={1.3}
                    />
                ) : null
            }
            {...rest}
        />
    );
};

export default FlatListHandler;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    loading: {
        marginVertical: verticalScale(20),
    },
    footerLoading: {
        marginVertical: verticalScale(10),
    },
});
