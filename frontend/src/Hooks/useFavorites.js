import { useQuery, useMutation } from "@tanstack/react-query";
import { getFavorites, addToFavorites, removeFromFavorites, getFavoritesPopulated } from '../API/favorites.js'
import { useSession } from "./useSession.js";
import { useMemo } from "react";

export const useFavorites = (recipeId) => {
    const { user } = useSession();

    const { data: favorites, isLoading, refetch } = useQuery({
        queryKey: ['favorites', recipeId],
        queryFn: getFavorites,
        enabled: !!recipeId && !!user,
    });

    const isFavorite = useMemo(() => {
        const isFav = favorites?.includes(recipeId);
        console.log("isFav", isFav);
        return isFav;
    }, [isLoading, favorites, recipeId]);

    const addFavoriteMutation = useMutation({
        mutationFn: () => addToFavorites(recipeId),
        enabled: !!user,
        onSuccess: () => {
            refetch();
        }
    });

    const removeFavoriteMutation = useMutation({
        mutationFn: () => removeFromFavorites(recipeId),
        enabled: !!user,
        onSuccess: () => {
            refetch();
        }
    });

    return {
        isFavorite,
        favorites,
        isLoading,
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
        isLoadingFavoriteRecipes: isLoading,
    };
}