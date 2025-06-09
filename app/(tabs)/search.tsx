import MovieCard from '@/components/movieCard';
import SearchBar from '@/components/SearchBar';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchMovies } from '@/services/api';
import { updateSearchCount } from '@/services/appWrite';
import useFetch from '@/services/useFetch';
import { useIsFocused } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, Text, TextInput, View } from 'react-native';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const inputRef = useRef<TextInput>(null);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            const timeout = setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
            return () => clearTimeout(timeout);
        }
    }, [isFocused]);

    const {
        data: movies,
        loading,
        error,
        refetch: loadMovies,
        reset,
    } = useFetch(() => fetchMovies({ query: searchQuery }), false);

    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (searchQuery.trim()) {
                const movies = await loadMovies();
            } else {
                reset();
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    useEffect(() => {
        if (movies?.length > 0 && movies?.[0]) {
            updateSearchCount(searchQuery, movies[0]);
        }
    }, [movies]);

    return (
        <View className='flex-1 bg-primary'>
            <Image source={images.bg} className='absolute w-full z-0' />

            <View className='flex-1 px-2 min-h-screen pb-3'>
                <View className='flex-1 px-2 min-h-screen pb-3'>
                    <FlatList
                        data={movies}
                        renderItem={({ item }) => <MovieCard {...item} />}
                        keyExtractor={(item) => item.imdbID.toString()}
                        numColumns={3}
                        columnWrapperStyle={{
                            justifyContent: 'flex-start',
                            gap: 20,
                            padding: 5,
                            marginBottom: 10,
                            marginTop: 10,
                        }}
                        className='mt-2 pb-32'
                        ListHeaderComponent={
                            <>
                                <Image source={icons.logo} className='w-12 h-10 mt-20 mb-5 mx-auto' />
                                <View className='my-4'>
                                    <Pressable>
                                        <SearchBar
                                            ref={inputRef}
                                            placeholder='Search for a movie'
                                            value={searchQuery}
                                            onChangeText={(text: string) => setSearchQuery(text)}
                                        />
                                    </Pressable>
                                </View>

                                {loading && <ActivityIndicator size='large' color='#0000ff' className='my-3' />}

                                {error && <Text className='text-center text-gray-500'>No movies found</Text>}

                                {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
                                    <Text className='text-xl text-white font-bold'>
                                        Search Results for <Text className='text-accent'>{searchQuery}</Text>
                                    </Text>
                                )}
                            </>
                        }
                        ListEmptyComponent={
                            !loading && !error ? (
                                <View className='mt-10 px-5'>
                                    <Text className='text-center text-gray-500'>
                                        {searchQuery.trim() ? 'No movies found' : 'Search for a movie'}
                                    </Text>
                                </View>
                            ) : null
                        }
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 40 }}
                    />
                </View>
            </View>
        </View>
    );
};

export default Search;
