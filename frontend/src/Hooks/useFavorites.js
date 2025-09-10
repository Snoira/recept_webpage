import { useQuery, useMutation } from "@tanstack/react-query";
import { getFavorites, addToFavorites, removeFromFavorites, getFavoritesPopulated } from '../API/favorites.js'

export const useFavorites = (id) => {
    const favoritesQuery = useQuery({
        queryKey: ['favorites'],
        queryFn: getFavorites,
    });

    const addFavoriteMutation = useMutation({
        mutationFn: () => addToFavorites(id),
        onSuccess: (data) => {
            setQueryData(['favorites'], data);
        }
    });

    const removeFavoriteMutation = useMutation({
        mutationFn: () => removeFromFavorites(id),
        onSuccess: (data) => {
            setQueryData(['favorites'], data);
        }
    });

    return {
        favorites: favoritesQuery.data,
        isLoading: favoritesQuery.isLoading,
        addFavorite: addFavoriteMutation.mutate,
        removeFavorite: removeFavoriteMutation.mutate,
    };
};

export const useFavoriteRecipes = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['favoritesPopulated'],
        queryFn: getFavoritesPopulated,
    });

    return {
        favoriteRecipes: data,
        isLoading,
    };
}