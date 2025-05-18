/**
 * Represents a movie object from the API
 * @interface Movie
 */
export interface Movie {
    /** Unique identifier for the movie */
    id: number;
    /** Movie title */
    title: string;
    /** Release year */
    year: number;
    /** List of genres */
    genre: string[];
    /** Movie rating out of 10 */
    rating: number;
    /** Movie director */
    director: string;
    /** List of main actors */
    actors: string[];
    /** Movie plot summary */
    plot: string;
    /** URL to movie poster image */
    poster: string;
    /** URL to movie trailer */
    trailer: string;
    /** Movie runtime in minutes */
    runtime: number;
    /** Awards received */
    awards: string;
    /** Country of origin */
    country: string;
    /** Movie language */
    language: string;
    /** Box office earnings */
    boxOffice: string;
    /** Production company */
    production: string;
    /** Official website URL */
    website: string;
}

/**
 * Props for movie list items
 * @interface MovieItemProps
 */
export interface MovieItemProps extends Movie {
    /** URL to movie poster */
    posterPath: string;
    /** Release date or year */
    releaseDate: string;
    /** Average vote rating */
    voteAverage: number;
    /** Function to handle movie selection */
    onPress: () => void;
}

/**
 * Props for movie list component
 * @interface MovieListProps
 */
export interface MovieListProps {
    /** Array of movies to display */
    movies: Movie[];
    /** Whether the list is in initial loading state */
    isLoading?: boolean;
    /** Whether the list is in fetching state */
    isFetching?: boolean;
    /** Whether more items are being loaded */
    isLoadingMore?: boolean;
    /** Whether there are more pages to load */
    hasNextPage?: boolean;
    /** Function to handle movie selection */
    onMoviePress: (movie: Movie) => void;
    /** Function to handle list refresh */
    onRefresh?: () => Promise<void>;
    /** Function to handle loading more items */
    onLoadMore?: () => Promise<void>;
}

/**
 * Props for movie header component
 * @interface MovieHeaderProps
 */
export interface MovieHeaderProps {
    /** Current search query */
    searchQuery?: string;
    /** Function to handle search query changes */
    onSearchChange: (text: string) => void;
}
