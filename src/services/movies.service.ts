import apiService from '@/utilities/services/api.service';

const moviesService = (() => {
    const getMovies = async (search: string) => {
        try {
            const response = await apiService.GET('/movies', { search });
            return response;
        } catch (error) {
            console.error('Error fetching movies:', error);
            throw error;
        }
    };

    const getMovieDetail = async (id: string) => {
        try {
            const response = await apiService.GET(`/movies/${id}`);
            return response;
        } catch (error) {
            console.error('Error fetching movie detail:', error);
            throw error;
        }
    };

    return {
        getMovies,
        getMovieDetail,
    };
})();

export default moviesService;
