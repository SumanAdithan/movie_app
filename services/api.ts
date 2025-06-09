import axios from 'axios';

export const OMDB_CONFIG = {
    BASE_URL: 'http://www.omdbapi.com/',
    OMDB_API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    OMDB_API_ID: process.env.EXPO_PUBLIC_MOVIE_ID,
};

const omdbAxios = axios.create({
    baseURL: OMDB_CONFIG.BASE_URL,
    params: {
        apikey: OMDB_CONFIG.OMDB_API_KEY,
    },
});

export const fetchMovies = async ({ query }: { query: string }) => {
    try {
        const response = await omdbAxios.get('', {
            params: {
                s: query ? query : 'movie',
            },
        });

        if (response.data.Response === 'False') {
            throw new Error(response.data.Error);
        }

        return response.data.Search;
    } catch (err) {
        throw err;
    }
};

export const fetchMovieDetails = async (movieId: string): Promise<any> => {
    try {
        const response = await omdbAxios.get('', {
            params: {
                i: movieId,
            },
        });

        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};
