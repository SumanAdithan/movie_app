import { icons } from '@/constants/icons';
import { fetchMovieDetails } from '@/services/api';
import useFetch from '@/services/useFetch';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

const MovieDetails = () => {
    const { id } = useLocalSearchParams();
    const { data: movie, loading } = useFetch(() => fetchMovieDetails(id as string));

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
                </View>
            </ScrollView>
        </View>
    );
};

export default MovieDetails;
