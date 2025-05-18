/**
 * Props for the movie detail header component
 * @interface MovieDetailHeaderProps
 */
export interface MovieDetailHeaderProps {
    /** Movie title */
    title: string;
    /** Movie poster URL */
    posterPath: string;
    /** Movie rating */
    rating: number;
    /** Release year */
    year: number;
    /** Movie runtime in minutes */
    runtime: number;
    /** Function to handle back navigation */
    onBack: () => void;
}

/**
 * Props for the movie detail info component
 * @interface MovieDetailInfoProps
 */
export interface MovieDetailInfoProps {
    /** Movie director */
    director: string;
    /** Movie cast */
    actors: string[];
    /** Movie plot */
    plot: string;
    /** Movie genres */
    genre: string[];
    /** Movie language */
    language: string;
    /** Movie country */
    country: string;
    /** Box office earnings */
    boxOffice: string;
    /** Awards received */
    awards: string;
}

/**
 * Props for the movie detail container component
 * @interface MovieDetailContainerProps
 */
export interface MovieDetailContainerProps {
    id: string;
}
