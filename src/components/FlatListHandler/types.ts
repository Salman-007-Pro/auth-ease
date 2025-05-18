import { FlatList, FlatListProps, ViewStyle } from 'react-native';

import EmptyList from '../EmptyList/EmptyList';

/**
 * Meta information for pagination and data fetching
 * @interface MetaInfo
 */
export interface MetaInfo {
    /** Function to refetch data */
    refetch: () => Promise<void>;
    /** Whether the data has been fetched */
    isFetched: boolean;
    /** Whether the next page is being fetched */
    isFetchingNextPage: boolean;
    /** Function to fetch the next page */
    fetchNextPage: () => Promise<void>;
    /** Whether there is a next page */
    hasNextPage?: boolean;
}

/**
 * Props for the FlatListHandler component
 * @type FlatListHandlerProps
 * @template T - The type of items in the list
 */
export type FlatListHandlerProps<T> = {
    /** The data to render */
    data: T[];
    /** Meta information for pagination and data fetching */
    meta?: MetaInfo;
    /** Whether the list is currently loading */
    isLoading?: boolean;
    /** Whether to enable pull-to-refresh */
    shouldRefresh?: boolean;
    /** Whether to enable infinite scrolling */
    shouldFetchMore?: boolean;
    /** Custom loading condition for the footer */
    footerLoadingCondition?: boolean;
    /** Reference to the FlatList */
    flatListRef?: React.RefObject<FlatList<T>>;
    /** Whether to hide the empty component */
    noEmptyComponent?: boolean;
    /** Props to pass to the EmptyList component */
    emptyComponentProps?: React.ComponentProps<typeof EmptyList>;
    /** Custom styles for the container */
    containerStyle?: ViewStyle;
    /** Custom styles for the loading indicator */
    loadingStyle?: ViewStyle;
    /** Key extractor function for list items */
    keyExtractor: (item: T) => string;
} & FlatListProps<T>;
