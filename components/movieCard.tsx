import { icons } from '@/constants/icons';
import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const MovieCard = ({
    imdbID,
    Title,
    Year,
    Type,
    Poster,
}: {
    imdbID: string;
    Title: string;
    Year: string;
    Type: string;
    Poster: 'string';
}) => {
    return (
        <Link href={`/movies/${imdbID}`}>
            <TouchableOpacity className='w-[100px]'>
                <Image source={{ uri: Poster }} className='w-full h-52 rounded-lg' resizeMode='cover' />
                <Text className='text-sm font-bold text-white mt-2' numberOfLines={1}>
                    {Title}
                </Text>
                <View className='flex-row items-center justify-start gap-x-1'>
                    <Image source={icons.star} />
                    <Text className='text-sx text-white font-bold uppercase'>{(Math.random() * 9 + 1).toFixed(1)}</Text>
                </View>
                <View className='flex-row items-center justify-between'>
                    <Text className='text-xs text-light-300 font-medium mt-1'>{Year}</Text>
                    <Text className='text-xs text-light-300 font-medium uppercase'>{Type}</Text>
                </View>
            </TouchableOpacity>
        </Link>
    );
};

export default MovieCard;
