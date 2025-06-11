import { icons } from '@/constants/icons';
import { fetchMovieDetails } from '@/services/api';
import useFetch from '@/services/useFetch';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const MovieDetails = () => {
    const { id } = useLocalSearchParams();
    const { data: movie, loading } = useFetch(() => fetchMovieDetails(id as string));

    const MovieInfo = ({ label, value }: any) => (
        <View className='flex-col items-start justify-center mt-5'>
            <Text className='text-light-200 font-normal text-sm'>{label}</Text>
            <Text className='text-light-100 font-bold text-sm mt-2'>{value || 'N/A'}</Text>
        </View>
    );

    return (
        <View className='bg-primary flex-1'>
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 80,
                }}
            >
                <View>
                    <Image source={{ uri: movie?.Poster }} className='w-full h-[550px]' resizeMode='stretch' />
                </View>
                <View className='flex-col items-start justify-center mt-5 px-5'>
                    <Text className='text-white font-bold text-xl'>{movie?.Title}</Text>
                    <View className='flex-row items-center gap-x-1 mt-2'>
                        <Text className='text-light-200 text-sm'>{movie?.Released?.split(' ')[2]}</Text>
                        <Text className='text-light-200 text-sm'>{movie?.Runtime}</Text>
                    </View>
                    <View className='flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2'>
                        <Image source={icons.star} className='size-4' />

                        <Text className='text-white font-bold text-sm'>{Math.round(movie?.imdbRating ?? 0)}/10</Text>

                        <Text className='text-light-200 text-sm'>({movie?.imdbVotes} votes)</Text>
                    </View>
                    <MovieInfo label='Overview' value={movie?.Plot} />
                    <MovieInfo label='Genres' value={movie?.Genre} />
                    <View className='flex flex-row justify-between w-1/2'>
                        <MovieInfo label='Budget' value={movie?.Production} />
                        <MovieInfo label='Revenue' value={movie?.BoxOffice} />
                    </View>
                    <TouchableOpacity
                        className='w-full bottom-5 mt-10 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50'
                        onPress={router.back}
                    >
                        <Image source={icons.arrow} className='size-5 mr-1 mt-0.5 rotate-180' tintColor='#fff' />
                        <Text className='text-white font-semibold text-base'>Go Back</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default MovieDetails;
